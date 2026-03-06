import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

const ARC_S = -Math.PI * 0.10;
const ARC_E = Math.PI * 1.085;
const ARC_SPAN = ARC_E - ARC_S;

// Total slots reserved (capacity of the ring)
const RING_CAPACITY = 150_000_000;

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        if (!username || typeof username !== 'string') {
            return NextResponse.json({ error: 'username required' }, { status: 400 });
        }

        // 1. Fetch GitHub user profile
        const ghUserRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
            headers: { 'Accept': 'application/vnd.github+json' },
        });
        if (!ghUserRes.ok) {
            return NextResponse.json(
                { error: ghUserRes.status === 404 ? 'GitHub user not found' : 'GitHub API error' },
                { status: ghUserRes.status }
            );
        }
        const ghUser = await ghUserRes.json();

        // 2. Fetch repos to get star count and top language
        const reposRes = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
            { headers: { 'Accept': 'application/vnd.github+json' } }
        );
        const repos = reposRes.ok ? await reposRes.json() : [];

        // Aggregate stats
        const starCount = Array.isArray(repos)
            ? repos.reduce((sum: number, r: { stargazers_count?: number }) => sum + (r.stargazers_count || 0), 0)
            : 0;

        const langCounts: Record<string, number> = {};
        if (Array.isArray(repos)) {
            for (const r of repos) {
                if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            }
        }
        const topLanguage = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

        // 3. Check if user already registered (upsert by github_id)
        const { data: existing } = await supabaseAdmin
            .from('ring_users')
            .select('ring_angle')
            .eq('github_id', ghUser.id)
            .single();

        let ringAngle = existing?.ring_angle;

        if (ringAngle === undefined) {
            // Assign next available slot based on current count
            const { count } = await supabaseAdmin
                .from('ring_users')
                .select('*', { count: 'exact', head: true });

            const slotIndex = count ?? 0;
            ringAngle = ARC_S + (slotIndex / RING_CAPACITY) * ARC_SPAN;
        }

        // 4. Upsert user record
        const { data, error } = await supabaseAdmin
            .from('ring_users')
            .upsert({
                github_id: ghUser.id,
                username: ghUser.login,
                avatar_url: ghUser.avatar_url,
                ring_angle: ringAngle,
                repo_count: ghUser.public_repos ?? 0,
                star_count: starCount,
                top_language: topLanguage,
                last_synced: new Date().toISOString(),
            }, { onConflict: 'github_id' })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (err) {
        console.error('[/api/ring/register]', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
