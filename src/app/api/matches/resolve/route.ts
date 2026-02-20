
import { db } from '@/db';
import { matches, fighters, stories } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { matchId, winnerId, storyContent, type } = await req.json();

        if (!matchId || !winnerId || !storyContent) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Get the current match to know where we are
        const currentMatchResult = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
        if (currentMatchResult.length === 0) return NextResponse.json({ error: 'Match not found' }, { status: 404 });
        const currentMatch = currentMatchResult[0];

        // 2. Save the Story
        const newStory = await db.insert(stories).values({
            type: type || 'fight',
            content: storyContent,
            fighterIds: [currentMatch.fighter1Id?.toString() || '', currentMatch.fighter2Id?.toString() || ''],
            tournamentId: currentMatch.tournamentId,
        }).returning({ id: stories.id });

        // 3. Update Current Match with Winner and Story
        await db.update(matches)
            .set({ winnerId, storyId: newStory[0].id })
            .where(eq(matches.id, matchId));

        // 4. Update Loser Status (Optional, good for tracking)
        const loserId = currentMatch.fighter1Id === winnerId ? currentMatch.fighter2Id : currentMatch.fighter1Id;
        if (loserId) {
            await db.update(fighters).set({ status: 'eliminated' }).where(eq(fighters.id, loserId));
        }

        // 5. Advance Winner to Next Round
        const nextRound = currentMatch.round + 1;
        const nextMatchOrder = Math.floor(currentMatch.matchOrder / 2);
        const isPlayer1Slot = currentMatch.matchOrder % 2 === 0; // Even order goes to slot 1, odd to slot 2

        // Check if next match exists, if not create it (it might not exist yet if only one side finished?)
        // Actually, we should probably pre-generate empty slots or create on demand.
        // Creating on demand is safer for sparsity.

        // Let's find if the next match already exists
        if (!currentMatch.tournamentId) {
            throw new Error("Match has no tournament ID");
        }

        const nextMatchResult = await db.select().from(matches).where(and(
            eq(matches.tournamentId, currentMatch.tournamentId),
            eq(matches.round, nextRound),
            eq(matches.matchOrder, nextMatchOrder)
        )).limit(1);

        if (nextMatchResult.length > 0) {
            // Update existing match slot
            const updateData: any = {};
            if (isPlayer1Slot) updateData.fighter1Id = winnerId;
            else updateData.fighter2Id = winnerId;

            await db.update(matches).set(updateData).where(eq(matches.id, nextMatchResult[0].id));
        } else {
            // Create new match for next round
            const newMessageData: any = {
                tournamentId: currentMatch.tournamentId,
                round: nextRound,
                matchOrder: nextMatchOrder,
            };
            if (isPlayer1Slot) newMessageData.fighter1Id = winnerId;
            else newMessageData.fighter2Id = winnerId;

            await db.insert(matches).values(newMessageData);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Failed to resolve match:', error);
        return NextResponse.json({ error: 'Failed to resolve match' }, { status: 500 });
    }
}
