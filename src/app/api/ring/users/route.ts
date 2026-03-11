import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { ringUsers } from '@/db/schema';
import { and, gte, lte, asc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const from  = parseFloat(searchParams.get('from')  ?? '-0.4');
    const to    = parseFloat(searchParams.get('to')    ?? '3.5');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '500', 10), 1000);

    if (isNaN(from) || isNaN(to)) {
        return NextResponse.json({ error: 'Invalid from/to params' }, { status: 400 });
    }

    try {
        const rows = await db
            .select({
                username:     ringUsers.username,
                avatar_url:   ringUsers.avatarUrl,
                ring_angle:   ringUsers.ringAngle,
                arc_start:    ringUsers.arcStart,
                arc_end:      ringUsers.arcEnd,
                repo_count:   ringUsers.repoCount,
                star_count:   ringUsers.starCount,
                top_language: ringUsers.topLanguage,
                joined_at:    ringUsers.joinedAt,
            })
            .from(ringUsers)
            .where(and(
                gte(ringUsers.ringAngle, from),
                lte(ringUsers.ringAngle, to),
            ))
            .orderBy(asc(ringUsers.ringAngle))
            .limit(limit);

        return NextResponse.json(rows, {
            headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            },
        });
    } catch (err) {
        console.error('[/api/ring/users]', err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
