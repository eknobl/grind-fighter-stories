import { NextRequest, NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const from = parseFloat(searchParams.get('from') ?? '-0.4');
    const to = parseFloat(searchParams.get('to') ?? '3.5');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '500'), 1000);

    if (isNaN(from) || isNaN(to)) {
        return NextResponse.json({ error: 'Invalid from/to params' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
        .from('ring_users')
        .select('username, avatar_url, ring_angle, repo_count, star_count, top_language, joined_at')
        .gte('ring_angle', from)
        .lte('ring_angle', to)
        .order('ring_angle', { ascending: true })
        .limit(limit);

    if (error) {
        console.error('[/api/ring/users]', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json(data ?? [], {
        headers: {
            'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
    });
}
