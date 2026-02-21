import {
    Fighter, Species, OrgAffiliation, FightingStyle, OriginWorld,
    PrimaryAxis, HumanwareType, LuckLabel, BaseStats
} from '../types/fighter';

// ─── Static Data ─────────────────────────────────────────────────────────────

const SPECIES: Species[] = ['Human', 'Cyborg', 'Android'];

const ORGS: OrgAffiliation[] = [
    'Acheron', 'Minos', 'Cerberus', 'Lethe', 'Dis',
    'Stygia', 'Malebolge', 'Cain', 'Tartarus', 'Unaligned'
];

// ~11–20 fighters will be Unaligned (assigned below in generateFighters)
const ALIGNED_ORGS: OrgAffiliation[] = [
    'Acheron', 'Minos', 'Cerberus', 'Lethe', 'Dis',
    'Stygia', 'Malebolge', 'Cain', 'Tartarus'
];

const STYLES: FightingStyle[] = [
    'Aggressive', 'Defensive', 'Balanced', 'Tactical',
    'Stealth', 'Brutal', 'Evasive', 'Technical'
];

const WORLDS: OriginWorld[] = [
    'Neon City', 'The Sprawl', 'Irongate', 'Meridian Station', 'Ashveil',
    'The Undercroft', 'Helios Prime', 'Coldharbor', 'Vertex', 'The Fringe',
    'Liminal', 'Crimson Basin', 'Sector Zero', 'Drift', 'New Arcadia',
    'Vantablack', 'The Nexus', 'Obsidian Shore', 'Rust Belt', 'Cauldron'
];

const FIRST_NAMES = [
    'Kael', 'Lyra', 'Thorn', 'Grom', 'Zara', 'Vrix', 'Drak', 'Elara', 'Morn', 'Sylas',
    'Ragnar', 'Fae', 'Nyx', 'Orin', 'Korg', 'Vera', 'Xan', 'Jinx', 'Myra', 'Tor',
    'Axel', 'Luna', 'Flint', 'Ska', 'Zix', 'Rex', 'Ivy', 'Knox', 'Ash', 'Sky',
    'Bram', 'Cora', 'Dirk', 'Ember', 'Fynn', 'Gwen', 'Hauk', 'Iris', 'Jax', 'Kira',
    'Loki', 'Mina', 'Nero', 'Ona', 'Pax', 'Quinn', 'Rook', 'Sia', 'Taz', 'Una',
    'Vane', 'Wren', 'Xylo', 'Yara', 'Zane', 'Aris', 'Brea', 'Cade', 'Dyna', 'Eko',
    'Ferris', 'Gale', 'Haze', 'Inyx', 'Jet', 'Koryn',
];

const LAST_NAMES = [
    'Storm', 'Shadow', 'Iron', 'Blade', 'Frost', 'Steel', 'Blood', 'Void', 'Fang', 'Scale',
    'Claw', 'Wing', 'Rage', 'Fury', 'Wrath', 'Static', 'Cipher', 'Node', 'Hex', 'Byte',
    'Volt', 'Flux', 'Null', 'Glitch', 'Surge', 'Core', 'Rift', 'Grid', 'Arc', 'Phase',
    'Echo', 'Drone', 'Cut', 'Edge', 'Burn', 'Crash', 'Spike', 'Zero', 'Forge', 'Link',
];

const SIGNATURE_MOVES = [
    'System Crash', 'Phantom Overload', 'Neural Spike', 'Cortex Burn', 'Iron Cascade',
    'Ghost Protocol', 'Kinetic Rupture', 'Signal Void', 'Hardline Strike', 'Dark Flux',
    'Pressure Wave', 'Carbon Slam', 'Lattice Break', 'Pulse Drive', 'Null Surge',
    'Marrow Crush', 'Deadlock', 'Thermal Burst', 'Apex Fall', 'Overdrive',
    'Fracture Point', 'Red Line', 'Nerve Storm', 'Core Collapse', 'Blackout Kick',
    'Resonance Hit', 'Static Bind', 'Warp Tackle', 'Impact Loop', 'Circuit Breaker',
];

const MOTIVATIONS = [
    'Paying off a debt to an org that owns their contract',
    'Fighting to buy family out of a labor indenture',
    'Seeking a reputation that will open doors beyond this station',
    'Proving the underground was wrong to write them off',
    'Following orders — their org needed a body in this bracket',
    'The prize money is the only way out',
    'They qualified accidentally and refuse to waste the chance',
    'Revenge against a fighter who destroyed their career',
    'Their sponsor is betting everything on this run',
    'They believe they can win, and they have believed it their whole life',
    'Running from something worse than a lost fight',
    'Protecting someone who cannot protect themselves',
    'This is the only place in the world they have ever felt real',
    'One last score before they disappear for good',
    'They made a promise they intend to keep',
];

const PERSONALITIES = [
    'Arrogant and self-assured — has the record to back it up',
    'Quiet until the fight starts, then relentless',
    'Constantly underestimated, has learned to use it',
    'Cold and methodical — treats every fight as a math problem',
    'Warm with allies, ruthless with opponents',
    'Obsessive about preparation, terrified of improvisation',
    'Charismatic in the locker room, brutal in the arena',
    'Carries visible scars and never explains them',
    'Nervous in conversation, completely calm in combat',
    'Treats the tournament like a job — professional detachment',
    'Genuinely believes they will win the whole thing',
    'Has been here before and lost. Different now.',
    'Loyal to their team above all else — a liability and a strength',
    'Reads opponents before they speak. Rarely wrong.',
    'The kind of person who makes enemies without trying',
];

const BACKSTORIES = [
    'A former enforcer whose org sponsor folded overnight.',
    'Qualified through the open bracket — trained in secret for three years.',
    'A washed-up circuit fighter getting one more shot on a bigger stage.',
    'Recruited by their org specifically for this bracket — untested at this level.',
    'Escaped a labor contract by winning a regional qualifier.',
    'A veteran of Circles 3 and 6, chasing a first-round win in Circle 1.',
    'Built from the ground up by a mid-tier team with a point to prove.',
    'Their previous fight ended badly. This is the recovery.',
    'Grew up watching the Ghost Feed. Always planned to be on it.',
    'Their family sold everything to fund the Humanware upgrade that got them here.',
    'A street fighter with no org backing who made it to 128 on raw stat variance.',
    'Once worked team support — crossed the line to become a fighter instead.',
    'Carries a reputation from a fight nobody saw coming.',
    'Part of a multi-fighter strategy — their org placed three in the bracket.',
    'The underdog everyone has already written off. Correctly, probably.',
];

// ─── Org-to-TeamQuality base ranges ──────────────────────────────────────────

const ORG_TQ_RANGES: Record<OrgAffiliation, [number, number]> = {
    Acheron: [6, 9],
    Malebolge: [6, 9],
    Tartarus: [6, 9],
    Cain: [6, 9],
    Cerberus: [4, 7],
    Lethe: [4, 7],
    Dis: [4, 7],
    Minos: [3, 6],
    Stygia: [3, 6],
    Unaligned: [1, 7],
};

// Org-to-TeamQuality mismatch notes (for 20% of fighters)
const MISMATCH_NOTES_HIGH = [
    'Poached from a rival org at the last minute — the new team hasn\'t meshed yet.',
    'Their previous team dissolved mid-season; this crew was assembled in a week.',
    'A sponsor controversy left them with a replacement team of uncertain quality.',
    'Their operator has a grudge against the org lead — it shows in practice.',
    'Brought in as a prestige pick; the support team didn\'t get a say.',
];

const MISMATCH_NOTES_LOW = [
    'Their operator spent a decade in Tier-1 support and followed them here out of loyalty.',
    'A retired Premier-tier operator took this as a favor — and stayed.',
    'A ghost team operating under false org credentials; their real identity is Premier quality.',
    'An independent crew with a reputation that far outstrips the fighter\'s seeding.',
    'The operator had beef with the org and came to prove a point.',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(items: T[]): T {
    return items[randomInt(0, items.length - 1)];
}

function roll2d10(): number {
    return randomInt(1, 10) + randomInt(1, 10);
}

function luckLabel(value: number): string {
    if (value <= 5) return 'Cursed';
    if (value <= 9) return 'Unlucky';
    if (value <= 13) return 'Neutral';
    if (value <= 17) return 'Fortunate';
    return 'Fated';
}

function powerTierValue(tier: string): number {
    const map: Record<string, number> = {
        Passive: 1, Minor: 3, Moderate: 6, Major: 10, Signature: 15
    };
    return map[tier] ?? 3;
}

function calcOfficialScore(stats: BaseStats, hwType: HumanwareType, tq: number): number {
    const physComp = stats.strength + stats.dexterity + stats.endurance;
    const digComp = stats.logic + stats.instinct + stats.willpower;
    const hwBonus = hwType === 4 ? 20 : 10;
    // Phase 2 will add power tier values; using a default Major (10) placeholder
    const powerBonus = hwType === 4 ? 10 + 6 : 10; // placeholder: one Major + one Moderate for T4
    return physComp + digComp + hwBonus + powerBonus + (tq * 4);
}

function distributeStats(
    axis: PrimaryAxis,
    hwType: HumanwareType
): BaseStats {
    const bonusPoints = hwType === 4 ? 16 : 10;
    const maxPerStat = 8; // max from Humanware per stat

    // Base stats all start at 10
    const stats: BaseStats = {
        strength: 10,
        dexterity: 10,
        endurance: 10,
        logic: 10,
        instinct: 10,
        willpower: 10,
    };

    const physStats: (keyof BaseStats)[] = ['strength', 'dexterity', 'endurance'];
    const digStats: (keyof BaseStats)[] = ['logic', 'instinct', 'willpower'];

    // ~60% of bonus to primary axis, remainder to secondary
    let primaryPool: number;
    let primaryKeys: (keyof BaseStats)[];
    let secondaryKeys: (keyof BaseStats)[];

    if (axis === 'Physical') {
        primaryPool = Math.round(bonusPoints * 0.6);
        primaryKeys = physStats;
        secondaryKeys = digStats;
    } else if (axis === 'Digital') {
        primaryPool = Math.round(bonusPoints * 0.6);
        primaryKeys = digStats;
        secondaryKeys = physStats;
    } else {
        // Balanced — split evenly
        primaryPool = Math.round(bonusPoints * 0.5);
        primaryKeys = physStats;
        secondaryKeys = digStats;
    }

    const secondaryPool = bonusPoints - primaryPool;

    function distribute(pool: number, keys: (keyof BaseStats)[]) {
        let remaining = pool;
        while (remaining > 0) {
            const key = randomItem(keys);
            const currentBonus = stats[key] - 10;
            if (currentBonus < maxPerStat) {
                stats[key]++;
                remaining--;
            }
        }
    }

    distribute(primaryPool, primaryKeys);
    distribute(secondaryPool, secondaryKeys);

    return stats;
}

// ─── Main Generator ───────────────────────────────────────────────────────────

export function generateFighter(id: string, org?: OrgAffiliation): Fighter {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);

    const hwType: HumanwareType = Math.random() < 0.4 ? 4 : 3;
    const axis: PrimaryAxis = randomItem<PrimaryAxis>(['Physical', 'Digital', 'Balanced']);
    const stats = distributeStats(axis, hwType);

    const hp = stats.endurance * 2;
    const mp = stats.willpower * 2;

    const luckValue = roll2d10();
    const label = luckLabel(luckValue) as Fighter['luckLabel'];

    const assignedOrg: OrgAffiliation = org ?? 'Unaligned';
    const [tqMin, tqMax] = ORG_TQ_RANGES[assignedOrg];
    let tq = randomInt(tqMin, tqMax);
    let teamNote = '';

    // 20% mismatch rule
    const isMismatch = Math.random() < 0.2;
    if (isMismatch) {
        const expectedMid = Math.round((tqMin + tqMax) / 2);
        if (tq >= expectedMid) {
            // Flip to low
            tq = randomInt(1, Math.max(1, tqMin - 1));
            teamNote = randomItem(MISMATCH_NOTES_HIGH);
        } else {
            // Flip to high
            tq = randomInt(Math.min(10, tqMax + 1), 10);
            teamNote = randomItem(MISMATCH_NOTES_LOW);
        }
    }

    const officialScore = calcOfficialScore(stats, hwType, tq);

    return {
        id,
        name: `${firstName} ${lastName}`,
        species: randomItem(SPECIES),
        origin: randomItem(WORLDS),
        org: assignedOrg,
        fightingStyle: randomItem(STYLES),
        signatureMove: randomItem(SIGNATURE_MOVES),
        backstory: randomItem(BACKSTORIES),
        motivation: randomItem(MOTIVATIONS),
        personality: randomItem(PERSONALITIES),
        stats,
        hp,
        mp,
        humanwareType: hwType,
        primaryAxis: axis,
        luck: luckValue,
        luckLabel: label,
        teamQuality: tq,
        teamNote,
        officialScore,
        rank: 0, // will be sorted + assigned after all 128 are generated
        wins: 0,
        losses: 0,
        isEliminated: false,
    };
}

export function generateFighters(count: number = 128): Fighter[] {
    // Assign org affiliations: 9 orgs × ~13 fighters, rest Unaligned (~11)
    const orgs: OrgAffiliation[] = [];
    const fightersPerOrg = Math.floor((count * 0.9) / ALIGNED_ORGS.length); // ~13

    for (const org of ALIGNED_ORGS) {
        for (let i = 0; i < fightersPerOrg; i++) {
            orgs.push(org);
        }
    }

    // Fill remaining slots as Unaligned
    while (orgs.length < count) {
        orgs.push('Unaligned');
    }

    // Shuffle org assignments
    for (let i = orgs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orgs[i], orgs[j]] = [orgs[j], orgs[i]];
    }

    const fighters: Fighter[] = [];
    for (let i = 0; i < count; i++) {
        fighters.push(generateFighter(`fighter-${i + 1}`, orgs[i]));
    }

    // Sort by Official Score descending and assign seed ranks
    fighters.sort((a, b) => b.officialScore - a.officialScore);
    fighters.forEach((f, idx) => {
        f.rank = idx + 1;
    });

    return fighters;
}
