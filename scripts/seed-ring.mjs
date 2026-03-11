/**
 * seed-ring.mjs
 * Populates Ilion with GitHub users via the Search API.
 *
 * Usage:
 *   npm run seed:ring                                    # default: followers:>500, 5 pages (500 users)
 *   npm run seed:ring -- "followers:>1000" 3            # 300 high-profile users
 *   npm run seed:ring -- "language:rust followers:>100" 10
 *
 * Requires: DATABASE_URL and GITHUB_TOKEN in .env
 */

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, text, integer, doublePrecision, bigint, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql, eq } from 'drizzle-orm';

// ─── Minimal schema (mirrors src/db/schema.ts) ───────────────────────────────

const ringUsers = pgTable('ring_users', {
  id:          uuid('id').primaryKey().defaultRandom(),
  githubId:    bigint('github_id', { mode: 'number' }).unique().notNull(),
  username:    text('username').notNull(),
  avatarUrl:   text('avatar_url'),
  ringAngle:   doublePrecision('ring_angle').notNull(),
  repoCount:   integer('repo_count').default(0),
  starCount:   integer('star_count').default(0),
  topLanguage: text('top_language'),
  arcStart:    doublePrecision('arc_start'),
  arcEnd:      doublePrecision('arc_end'),
  lastSynced:  timestamp('last_synced', { withTimezone: true }).defaultNow(),
  joinedAt:    timestamp('joined_at', { withTimezone: true }).defaultNow(),
});

// ─── Constants ────────────────────────────────────────────────────────────────

const ARC_S   = -Math.PI * 0.10;
const PLOT_W  = 1.5 / 186;          // radians per plot (~0.00806)
const DELAY_MS = 800;               // pause between users (safe for 5000 req/hr token limit)
const PAGE_PAUSE_MS = 3000;         // pause between search pages (30 search req/min limit)

// ─── GitHub headers ───────────────────────────────────────────────────────────

if (!process.env.GITHUB_TOKEN) {
  console.warn('⚠  GITHUB_TOKEN not set — rate limit is 60 req/hr (very slow). Add it to .env.');
}

const GH_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

// ─── CLI args ─────────────────────────────────────────────────────────────────

const query    = process.argv[2] ?? 'followers:>500';
const maxPages = parseInt(process.argv[3] ?? '5', 10);

console.log(`\n🌐  Ilion Ring Seeder`);
console.log(`   Query:    "${query}"`);
console.log(`   Pages:    ${maxPages} (up to ${maxPages * 100} users)\n`);

// ─── DB connection ────────────────────────────────────────────────────────────

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!connectionString) {
  console.error('❌  DATABASE_URL not set. Add it to .env and retry.');
  process.exit(1);
}

const client = postgres(connectionString, { ssl: 'require' });
const db     = drizzle(client);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchUserStats(username) {
  const userRes = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    { headers: GH_HEADERS }
  );
  if (!userRes.ok) throw new Error(`/users/${username} → ${userRes.status}`);
  const ghUser = await userRes.json();

  const reposRes = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    { headers: GH_HEADERS }
  );
  const repos = reposRes.ok ? await reposRes.json() : [];

  const starCount = Array.isArray(repos)
    ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
    : 0;

  const langCounts = {};
  if (Array.isArray(repos)) {
    for (const r of repos) {
      if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  }
  const topLanguage = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    githubId:    ghUser.id,
    username:    ghUser.login,
    avatarUrl:   ghUser.avatar_url,
    repoCount:   ghUser.public_repos ?? 0,
    starCount,
    topLanguage,
  };
}

async function registerOnRing(stats) {
  // Check for existing plot
  const existing = await db
    .select({ arcStart: ringUsers.arcStart, arcEnd: ringUsers.arcEnd })
    .from(ringUsers)
    .where(eq(ringUsers.githubId, stats.githubId))
    .limit(1);

  const hasPlot = existing.length > 0 && existing[0].arcStart != null;

  let arcStart, arcEnd, ringAngle;

  if (hasPlot) {
    arcStart  = existing[0].arcStart;
    arcEnd    = existing[0].arcEnd;
    ringAngle = (arcStart + arcEnd) / 2;
  } else {
    const [{ frontier }] = await db
      .select({ frontier: sql`COALESCE(MAX(arc_end), ${ARC_S})` })
      .from(ringUsers);
    arcStart  = Number(frontier);
    arcEnd    = arcStart + PLOT_W;
    ringAngle = (arcStart + arcEnd) / 2;
  }

  await db
    .insert(ringUsers)
    .values({ ...stats, ringAngle, arcStart, arcEnd, claimed: false, lastSynced: new Date() })
    .onConflictDoUpdate({
      target: ringUsers.githubId,
      set: {
        username:    stats.username,
        avatarUrl:   stats.avatarUrl,
        ringAngle,
        arcStart,
        arcEnd,
        repoCount:   stats.repoCount,
        starCount:   stats.starCount,
        topLanguage: stats.topLanguage,
        lastSynced:  new Date(),
      },
    });

  return { arcStart, arcEnd, ringAngle };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  let registered = 0;
  let skipped    = 0;
  let errors     = 0;

  for (let page = 1; page <= maxPages; page++) {
    console.log(`📄  Page ${page}/${maxPages} …`);

    const searchRes = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&sort=followers&order=desc&per_page=100&page=${page}`,
      { headers: GH_HEADERS }
    );

    if (searchRes.status === 422) {
      console.error(`   GitHub only returns up to 1000 results per query (10 pages). Stopping.`);
      break;
    }
    if (!searchRes.ok) {
      console.error(`   Search API error ${searchRes.status} — stopping.`);
      break;
    }

    const { items, total_count } = await searchRes.json();
    if (!items?.length) { console.log('   No results.'); break; }

    console.log(`   ${items.length} users on this page (${total_count.toLocaleString()} total matches)\n`);

    for (const item of items) {
      try {
        const stats  = await fetchUserStats(item.login);
        const plot   = await registerOnRing(stats);
        const isNew  = plot.arcStart >= (plot.arcEnd - PLOT_W - 0.000001);
        const marker = isNew ? '✦' : '↺';
        console.log(`   ${marker} ${stats.username.padEnd(25)} ` +
          `repos:${String(stats.repoCount).padStart(4)}  stars:${String(stats.starCount).padStart(6)}  ` +
          `lang:${(stats.topLanguage ?? '—').padEnd(12)}  angle:${plot.ringAngle.toFixed(5)}`);
        registered++;
      } catch (err) {
        console.log(`   ✗ ${item.login.padEnd(25)} ${err.message}`);
        errors++;
      }

      await sleep(DELAY_MS);
    }

    if (page < maxPages) {
      console.log(`\n   ⏳  Waiting ${PAGE_PAUSE_MS / 1000}s before next page…\n`);
      await sleep(PAGE_PAUSE_MS);
    }
  }

  console.log(`\n✅  Done  —  registered: ${registered}  errors: ${errors}`);

  // Show current ring occupancy
  const [{ total }] = await db
    .select({ total: sql`COUNT(*)` })
    .from(ringUsers);
  const [{ frontier }] = await db
    .select({ frontier: sql`COALESCE(MAX(arc_end), ${ARC_S})` })
    .from(ringUsers);
  const arcSpan  = Math.PI * 1.085 - ARC_S;
  const pct      = (((Number(frontier) - ARC_S) / arcSpan) * 100).toFixed(1);
  console.log(`\n🌐  Ring status: ${total} colonists — ${pct}% of arc occupied\n`);

  await client.end();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
