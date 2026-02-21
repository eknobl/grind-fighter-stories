import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { db } from '@/db';
import { stories } from '@/db/schema';
import { Fighter } from '@/types/fighter';

export const maxDuration = 30;

function buildFighterProfile(f: Fighter): string {
  const powerLines = (f.powers ?? []).map(p => {
    const cost = p.mpCost > 0 ? `${p.mpCost} MP` : p.preFight ? 'pre-fight activation' : 'passive (free)';
    const recovery = p.recoverySeconds > 0 ? `${p.recoverySeconds}s recovery` : 'no recovery';
    const duration = p.durationSeconds > 0 ? `${p.durationSeconds}s duration` : p.durationSeconds === 0 ? 'instant' : 'permanent';
    return `    [${p.tier.toUpperCase()} ${p.category.toUpperCase()}] ${p.name} — ${cost}, ${recovery}, ${duration}\n      Effect: ${p.effect}`;
  }).join('\n');

  return `
FIGHTER: ${f.name}
  Org: ${f.org} | Species: ${f.species} | Origin: ${f.origin}
  Style: ${f.fightingStyle} | Signature Move: ${f.signatureMove}
  Humanware: Type ${f.humanwareType} (${f.primaryAxis} axis) | ${f.powerSlots ?? 1} slot${(f.powerSlots ?? 1) > 1 ? 's' : ''}

  PHYSICAL (Arena Feed):
    STR ${f.stats.strength} | DEX ${f.stats.dexterity} | END ${f.stats.endurance}
    HP: ${f.hp}

  DIGITAL (Ghost Feed):
    LOG ${f.stats.logic} | INS ${f.stats.instinct} | WIL ${f.stats.willpower}
    MP: ${f.mp}

  POWERS:
${powerLines || '    (none)'}

  LUCK: ${f.luck}/20 — ${f.luckLabel}
  TEAM QUALITY: ${f.teamQuality}/10${f.teamNote ? ` (Note: ${f.teamNote})` : ''}
  OFFICIAL SCORE: ${f.officialScore} (Seed #${f.rank})

  Backstory: ${f.backstory}
  Motivation: ${f.motivation}
  Personality: ${f.personality}
`.trim();
}

function buildPrompt(fighters: Fighter[], type: string, remix?: string): string {
  const profiles = fighters.map(buildFighterProfile).join('\n\n');

  const typeInstructions: Record<string, string> = {
    fight: `
This is a FIGHT SCENE (900–1,300 words). Two fighters. One outcome (do not determine the winner — leave the outcome ambiguous or at the dramatic peak).

Physical layer (Arena Feed):
- STR determines damage when strikes land. A STR 18 fighter hits like a freight train; STR 12 hits hard but not devastating.
- DEX determines whether strikes land and evasions succeed. High DEX = slippery, unpredictable movement.
- END determines how long a fighter absorbs punishment. HP loss should be referenced concretely (not numerically unless dramatic).

Digital layer (Ghost Feed) — MANDATORY:
- Include a Ghost Feed analyst voice as a second narrative layer. This voice comments on MP fluctuations, system power deployments, and team intrusion attempts.
- Team Quality differential must be felt: a TQ 9 team dominates the feed; a TQ 3 team is barely present.
- MP should be referenced concretely: "her MP had dropped to 8, the Ghost Feed going silent as the audience understood what that meant."
- If Luck labels are Fated or Cursed, build in a Luck-driven moment — a concrete beat, not vague fortune.

Arena context (Circle 1 — Limbo):
- Sand floor, persistent mist, variable gravity from uneven cylinder rotation.
- DEX effectiveness −10% (gravity disrupts dodge); STR effective damage +5% (sand anchors brawlers); team targeting −15% precision.
`.trim(),

    rest: `
This is a REST PERIOD scene (600–900 words). One fighter. Between rounds.

Required elements:
- The fighter and operator reviewing Ghost Feed footage from the previous fight.
- What the feed revealed about the opponent's team tactics.
- Operator's technical debrief on the digital layer.
- Physical and MP recovery state (if MP was depleted, that's a significant narrative beat).
- Emotional/psychological state heading into the next match.

Ghost Feed layer is MANDATORY: the operator should reference specific Ghost Feed moments, not just physical fight moments.
`.trim(),

    preparation: `
This is a PREPARATION scene (500–700 words). One fighter preparing for a specific upcoming match.

Required elements:
- Studying the opponent's Ghost Feed history from previous fights.
- Identifying digital patterns: power activation habits, cooldown windows, team behavior.
- Their own power cooldown state if they're coming from a recent fight.
- Physical conditioning specific to the arena modifiers (gravitational variance, sand floor, mist).

Ghost Feed digital scouting is MANDATORY as the primary preparation tool.
`.trim(),

    interaction: `
This is an INTERACTION scene (600–800 words). One or two fighters.

Required elements:
- Ghost Feed as cultural texture: fan recognition based on feed presence, rival operator acknowledgment, class signaling between Team Quality tiers.
- The social world of the tournament — locker rooms, corridors outside the arena, the betting floor.
- Character dynamics that feel informed by their stats and org affiliation.

Ghost Feed references are MANDATORY as cultural and social texture.
`.trim(),
  };

  const instructions = typeInstructions[type] ?? typeInstructions.fight;

  return `You are a storyteller for GRIND FIGHTER STORIES, a companion platform to the LitRPG novel "Grind Fighter."

WORLD CONTEXT:
Circle 1 is an underground 1v1 tournament run by the Acheron Clan in Limbo — an O'Neill cylinder station. 128 fighters, 7 elimination rounds. No external weapons — Humanware and integrated bionics only. Every fight generates two simultaneous broadcasts: the Arena Feed (physical combat, free/public) and the Ghost Feed (digital warfare layer, paid subscription — MP values, system power deployments, team intrusions).

FIGHTER PROFILES:
${profiles}

STORY TYPE: ${type.toUpperCase()}
${instructions}

ABSOLUTE RULES:
- Stats must be legible in the narrative. A STR 18 fighter does not hit the same as a STR 12 fighter.
- Powers obey MP cost structure. Fighters cannot spam their most powerful moves — cooldowns are real.
- Ghost Feed must appear in every story in a meaningful way.
- Team Quality differentials must be felt through Ghost Feed presence and capability.
- Write in third person, present tense.
- No headers or formatting — prose only.
${remix ? `\nREMIX INSTRUCTION: This is a revised version of a previous generation. ${remix}` : ''}`;
}

export async function POST(req: Request) {
  try {
    const { fighters, type, remix } = await req.json();

    if (!fighters || fighters.length === 0) {
      return new Response('No fighters selected', { status: 400 });
    }

    const prompt = buildPrompt(fighters as Fighter[], type, remix);

    const result = streamText({
      model: anthropic('claude-3-haiku-20240307'),
      prompt,
      onFinish: async ({ text }) => {
        try {
          await db.insert(stories).values({
            type,
            content: text,
            fighterIds: (fighters as Fighter[]).map(f => String(f.id)),
          });
        } catch (dbError) {
          console.error('Failed to save story to DB:', dbError);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating story:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate story. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
