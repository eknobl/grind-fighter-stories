
import { db } from '@/db';
import { fighters, tournaments, matches } from '@/db/schema';
import { generateFighters } from '@/lib/generateFighters';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 1. Check for active tournament
        const activeTournaments = await db.select().from(tournaments).where(eq(tournaments.isActive, true)).orderBy(desc(tournaments.createdAt)).limit(1);

        let tournamentId: number;

        if (activeTournaments.length > 0) {
            tournamentId = activeTournaments[0].id;
        } else {
            // 2. Create new tournament if none exists
            // Check if DB usage is possible by trying a simple query, 
            // if it fails we might be in a "no db" mode fallback which we'll handle by just returning generated data
            // But for this route, we want to try to persist.

            const newTournament = await db.insert(tournaments).values({}).returning({ id: tournaments.id });
            tournamentId = newTournament[0].id;

            // 3. Generate fighters
            const newFighters = generateFighters(128);

            // 4. Insert fighters
            // Drizzle insert many
            const insertedFighters = await db.insert(fighters).values(
                newFighters.map(f => ({
                    name: f.name,
                    data: f,
                    tournamentId: tournamentId,
                    status: 'active'
                }))
            ).returning({ id: fighters.id }); // We need IDs to link matches

            // 5. Generate Round 1 Matches
            // Simple sequential pairing for now: 1 vs 2, 3 vs 4, etc.
            const round1Matches: any[] = [];
            for (let i = 0; i < insertedFighters.length; i += 2) {
                if (i + 1 < insertedFighters.length) {
                    round1Matches.push({
                        tournamentId,
                        round: 1,
                        matchOrder: i / 2,
                        fighter1Id: insertedFighters[i].id,
                        fighter2Id: insertedFighters[i + 1].id,
                    });
                }
            }

            if (round1Matches.length > 0) {
                await db.insert(matches).values(round1Matches);
            }
        }

        // 6. Fetch fighters and matches for this tournament
        const tournamentFighters = await db.select().from(fighters).where(eq(fighters.tournamentId, tournamentId));
        const tournamentMatches = await db.select().from(matches).where(eq(matches.tournamentId, tournamentId)).orderBy(matches.round, matches.matchOrder);


        // Map back to the Fighter type structure expected by frontend
        const mappedFighters = tournamentFighters.map(f => {
            const data = f.data as any;
            return {
                ...data,
                id: f.id.toString(), // Use DB ID
                // We could overlay status from DB here if we tracked elimination
            };
        });

        return NextResponse.json({
            tournamentId,
            fighters: mappedFighters,
            matches: tournamentMatches
        });

    } catch (error) {
        console.error('Failed to fetch/create tournament:', error);
        // Fallback for when DB is not connected/configured
        return NextResponse.json({
            error: 'Database connection failed',
            fallback: true,
            fighters: generateFighters(128)
        });
    }
}

export async function POST() {
    try {
        // Deactivate all tournaments to force a new one next GET
        await db.update(tournaments).set({ isActive: false }).where(eq(tournaments.isActive, true));
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Failed to reset tournament:', error);
        return NextResponse.json({ error: 'Failed to reset tournament', details: error.message }, { status: 500 });
    }
}
