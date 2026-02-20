import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { db } from '@/db';
import { stories } from '@/db/schema';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { fighters, type, remix } = await req.json();

    if (!fighters || fighters.length === 0) {
      return new Response('No fighters selected', { status: 400 });
    }

    const prompt = `
      You are an expert storyteller for the "Grind Fighter" LitRPG universe.
      Generate a ${type} story involving these fighters:
      ${fighters.map((f: any) => `- Name: ${f.name} (Species: ${f.species}, Style: ${f.fightingStyle}, Move: ${f.signatureMove}, Origin: ${f.origin})`).join('\n')}
      
      Context:
      ${fighters.map((f: any) => `${f.name}'s Backstory: ${f.backstory}. Motivation: ${f.motivation}. Personality: ${f.personality}.`).join('\n')}

      Requirements:
      - Write a compelling narrative in the present tense.
      - Include sensory details and internal monologue.
      - If it's a fight, describe the combat mechanics clearly (LitRPG style).
      - Length: ${type === 'fight' ? '800-1200' : '500-800'} words.
      - Focus on their unique traits and stats.
      ${remix ? `\n    REMIX INSTRUCTION: This is a remix of a previous generation. ${remix}` : ''}
    `;

    const result = streamText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt,
      onFinish: async ({ text }) => {
        try {
          await db.insert(stories).values({
            type,
            content: text,
            fighterIds: fighters.map((f: any) => f.id),
          });
        } catch (dbError) {
          console.error('Failed to save story to DB:', dbError);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating story:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate story. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
