import { NextRequest, NextResponse } from 'next/server';
import { sql, eq } from 'drizzle-orm';
import { db } from '@/db';
import { ringUsers } from '@/db/schema';
import { fetchGitHubUserStats } from '@/lib/githubUser';

const ARC_S = -Math.PI * 0.10;

// Each user gets an equal-width plot: 1.5 world units wide
// At RI=186, this is 1.5/186 ≈ 0.00806 radians
const PLOT_W = 1.5 / 186;

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        if (!username || typeof username !== 'string') {
            return NextResponse.json({ error: 'username required' }, { status: 400 });
        }

        // 1. Fetch GitHub stats
        let stats;
        try {
            stats = await fetchGitHubUserStats(username);
        } catch (err: unknown) {
            const e = err as { message?: string; statusCode?: number };
            return NextResponse.json(
                { error: e.message ?? 'GitHub API error' },
                { status: e.statusCode ?? 502 }
            );
        }

        // 2. Check if user already has a plot assigned
        const existing = await db
            .select({ ringAngle: ringUsers.ringAngle, arcStart: ringUsers.arcStart, arcEnd: ringUsers.arcEnd })
            .from(ringUsers)
            .where(eq(ringUsers.githubId, stats.githubId))
            .limit(1);

        let arcStart: number;
        let arcEnd: number;
        let ringAngle: number;

        const hasPlot = existing.length > 0 && existing[0].arcStart != null;

        if (hasPlot) {
            // Returning user with an existing plot — keep it
            arcStart  = existing[0].arcStart!;
            arcEnd    = existing[0].arcEnd!;
            ringAngle = (arcStart + arcEnd) / 2;
        } else {
            // New user (or legacy user without a plot) — assign next available plot
            const [{ frontier }] = await db
                .select({ frontier: sql<number>`COALESCE(MAX(arc_end), ${ARC_S})` })
                .from(ringUsers);

            arcStart  = frontier;
            arcEnd    = frontier + PLOT_W;
            ringAngle = (arcStart + arcEnd) / 2;
        }

        // 3. Upsert — preserve plot on conflict, update stats
        const [row] = await db
            .insert(ringUsers)
            .values({
                githubId:    stats.githubId,
                username:    stats.username,
                avatarUrl:   stats.avatarUrl,
                ringAngle,
                arcStart,
                arcEnd,
                repoCount:   stats.repoCount,
                starCount:   stats.starCount,
                topLanguage: stats.topLanguage,
                claimed:     true,   // manual registration = user has claimed their plot
                lastSynced:  new Date(),
            })
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
                    claimed:     true,
                    lastSynced:  new Date(),
                },
            })
            .returning();

        return NextResponse.json({
            username:     row.username,
            ring_angle:   row.ringAngle,
            arc_start:    row.arcStart,
            arc_end:      row.arcEnd,
            star_count:   row.starCount,
            repo_count:   row.repoCount,
            top_language: row.topLanguage,
            claimed:      row.claimed,
        });
    } catch (err) {
        console.error('[/api/ring/register]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
