import {
    Fighter, Species, OrgAffiliation, FightingStyle, OriginWorld,
    PrimaryAxis, HumanwareType, LuckLabel, BaseStats, Power, PowerTier
} from '../types/fighter';

// ─── Static Data ─────────────────────────────────────────────────────────────

const SPECIES: Species[] = ['Human', 'Cyborg', 'Android'];

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

// ─── Org TQ Ranges ───────────────────────────────────────────────────────────

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

const MISMATCH_NOTES_HIGH = [
    "Poached from a rival org at the last minute — the new team hasn't meshed yet.",
    'Their previous team dissolved mid-season; this crew was assembled in a week.',
    'A sponsor controversy left them with a replacement team of uncertain quality.',
    "Their operator has a grudge against the org lead — it shows in practice.",
    "Brought in as a prestige pick; the support team didn't get a say.",
];

const MISMATCH_NOTES_LOW = [
    'Their operator spent a decade in Tier-1 support and followed them here out of loyalty.',
    'A retired Premier-tier operator took this as a favor — and stayed.',
    'A ghost team operating under false org credentials; their real identity is Premier quality.',
    "An independent crew with a reputation that far outstrips the fighter's seeding.",
    'The operator had beef with the org and came to prove a point.',
];

// ─── Full Power Pool ──────────────────────────────────────────────────────────

const POWER_POOL: Power[] = [
    // ── Combat Passives ──────────────────────────────────────────────────────
    { id: 'C1', name: 'Iron Lining', category: 'Combat', tier: 'Passive', mpCost: 0, recoverySeconds: 0, durationSeconds: -1, preFight: false, effect: 'Subdermal plating absorbs the first 2 points of physical damage from each strike; requires END ≥ 14.' },
    { id: 'C2', name: 'Static Field', category: 'Combat', tier: 'Passive', mpCost: 0, recoverySeconds: 0, durationSeconds: -1, preFight: false, effect: 'Constant low-voltage discharge; opponents with LOG < 12 take −1 to digital attacks at contact range.' },
    { id: 'C3', name: 'Overclock Passive', category: 'Combat', tier: 'Passive', mpCost: 0, recoverySeconds: 0, durationSeconds: -1, preFight: false, effect: 'Humanware runs 8% above rated speed — DEX effectively +1 for dodge, at the cost of slightly reduced MP recovery.' },
    // ── Combat Minor ─────────────────────────────────────────────────────────
    { id: 'C4', name: 'Burst Step', category: 'Combat', tier: 'Minor', mpCost: 3, recoverySeconds: 20, durationSeconds: 3, preFight: false, effect: 'Explosive 6–8m dash that bypasses one DEX-based dodge attempt; Ghost Feed shows as a motion-blur spike.' },
    { id: 'C5', name: 'Pressure Strike', category: 'Combat', tier: 'Minor', mpCost: 4, recoverySeconds: 25, durationSeconds: 0, preFight: false, effect: 'Hydraulic amplification on one strike — effective STR +4 for that single blow.' },
    { id: 'C6', name: 'Signal Noise', category: 'Combat', tier: 'Minor', mpCost: 2, recoverySeconds: 15, durationSeconds: 10, preFight: false, effect: 'Floods Ghost Feed with false data; opponent team loses −2 TQ on intrusion attempts for duration.' },
    { id: 'C7', name: 'Reflex Overwrite', category: 'Combat', tier: 'Minor', mpCost: 5, recoverySeconds: 30, durationSeconds: 15, preFight: false, effect: 'Bypasses conscious motor control — Humanware moves the body faster than thought; DEX effectively +3 for dodge.' },
    { id: 'C8', name: 'Pain Dampener', category: 'Combat', tier: 'Minor', mpCost: 3, recoverySeconds: 20, durationSeconds: 20, preFight: false, effect: 'Suppresses pain response for duration — fighter operates at full capability regardless of visible damage.' },
    // ── Combat Moderate ──────────────────────────────────────────────────────
    { id: 'C9', name: 'Adrenaline Spike', category: 'Combat', tier: 'Moderate', mpCost: 8, recoverySeconds: 60, durationSeconds: 30, preFight: false, effect: 'Synthetic adrenaline surge: STR +3, DEX +2 for 30 sec; crash effect: STR −1 for 60 sec after.' },
    { id: 'C10', name: 'Armour Protocol', category: 'Combat', tier: 'Moderate', mpCost: 7, recoverySeconds: 45, durationSeconds: 25, preFight: false, effect: 'Ceramic sub-layers lock into position: END +4 for damage, DEX −2 for movement.' },
    { id: 'C11', name: 'Kinetic Siphon', category: 'Combat', tier: 'Moderate', mpCost: 10, recoverySeconds: 90, durationSeconds: 40, preFight: false, effect: 'Harvests kinetic energy from incoming strikes — every hit taken restores 1 MP.' },
    { id: 'C12', name: 'Neural Spike', category: 'Combat', tier: 'Moderate', mpCost: 9, recoverySeconds: 75, durationSeconds: 20, preFight: false, effect: 'Directed EMP-equivalent through physical contact forces 5 MP drain on opponent; INS check to partially resist.' },
    { id: 'C13', name: 'Phantom Limb', category: 'Combat', tier: 'Moderate', mpCost: 6, recoverySeconds: 45, durationSeconds: 30, preFight: false, effect: "Projects a holographic ghost-image of a limb; opponent's next 2 strikes have 40% chance to target the phantom." },
    { id: 'C14', name: 'Hardline', category: 'Combat', tier: 'Moderate', mpCost: 12, recoverySeconds: 90, durationSeconds: 45, preFight: false, effect: 'Routes all digital resources to physical: STR +4, END +3, LOG suppressed to 0 — Ghost Feed goes silent.' },
    // ── Combat Major ─────────────────────────────────────────────────────────
    { id: 'C15', name: 'Overdrive', category: 'Combat', tier: 'Major', mpCost: 15, recoverySeconds: 180, durationSeconds: 60, preFight: false, effect: 'STR +5, DEX +4, END +3; thermal throttling at 45 sec reduces bonuses to +3/+2/+1 for the final 15 sec.' },
    { id: 'C16', name: 'Marrow Crush', category: 'Combat', tier: 'Major', mpCost: 18, recoverySeconds: 240, durationSeconds: 0, preFight: false, effect: 'Effective STR doubles for one devastating blow; thermal limiter auto-engages if this KOs the opponent.' },
    { id: 'C17', name: 'Ghost Step', category: 'Combat', tier: 'Major', mpCost: 14, recoverySeconds: 150, durationSeconds: 45, preFight: false, effect: 'Near-invisibility on Arena Feed: DEX effectively +6 for dodge, opponent accuracy −30%; Ghost Feed sees the fighter clearly.' },
    { id: 'C18', name: 'Dead Zone', category: 'Combat', tier: 'Major', mpCost: 17, recoverySeconds: 240, durationSeconds: 60, preFight: false, effect: "Localized EMP envelope: opponent team loses Ghost Feed access and system powers are suppressed; own team −3 TQ." },
    { id: 'C19', name: 'Apex Fall', category: 'Combat', tier: 'Major', mpCost: 16, recoverySeconds: 180, durationSeconds: 30, preFight: false, effect: 'Every physical impact deals bonus damage equal to STR +4; stopping mid-charge requires END vs. opponent STR.' },
    // ── Combat Signature ─────────────────────────────────────────────────────
    { id: 'C20', name: 'Total Collapse', category: 'Combat', tier: 'Signature', mpCost: 25, recoverySeconds: 480, durationSeconds: 90, preFight: false, effect: 'STR +8, END +6, DEX +4; post-effect: all physical stats −3 for fight remainder — Ghost Feed shows structural stress in real time.' },
    { id: 'C21', name: 'Coreline Strike', category: 'Combat', tier: 'Signature', mpCost: 22, recoverySeconds: 360, durationSeconds: 0, preFight: false, effect: "Targets opponent's Humanware trunk line: hit forces 15 MP drain and cancels their most recent power; requires visible 3-sec charge." },
    { id: 'C22', name: 'Hollow', category: 'Combat', tier: 'Signature', mpCost: 28, recoverySeconds: 600, durationSeconds: 60, preFight: false, effect: 'Suppresses all pain, fear, and hesitation: STR +5, immune to psychological pressure and submission holds — Ghost Feed shows biometric flatline.' },
    { id: 'C23', name: 'Full Burn', category: 'Combat', tier: 'Signature', mpCost: 24, recoverySeconds: 480, durationSeconds: 45, preFight: false, effect: 'All stats +4 simultaneously; after duration: no powers for 5 min, MP recovery halved for fight remainder.' },

    // ── System Minor ─────────────────────────────────────────────────────────
    { id: 'S1', name: 'Jam', category: 'System', tier: 'Minor', mpCost: 4, recoverySeconds: 20, durationSeconds: 12, preFight: false, effect: "Targeted interference on opponent's comm channel: team TQ −3 for duration." },
    { id: 'S2', name: 'Cooldown Bleed', category: 'System', tier: 'Minor', mpCost: 5, recoverySeconds: 30, durationSeconds: 0, preFight: false, effect: "On hit: extends opponent's current power recovery window by 30 sec; INS check to partially resist." },
    { id: 'S3', name: 'Feed Spoof', category: 'System', tier: 'Minor', mpCost: 3, recoverySeconds: 15, durationSeconds: 15, preFight: false, effect: 'Floods Ghost Feed with mirrored movement data: opponent team targeting −20% accuracy for duration.' },
    // ── System Moderate ──────────────────────────────────────────────────────
    { id: 'S4', name: 'Dampen', category: 'System', tier: 'Moderate', mpCost: 8, recoverySeconds: 60, durationSeconds: 35, preFight: false, effect: 'Reduces one identified opponent power currently in effect by 50%; TQ 7+ team can partially block.' },
    { id: 'S5', name: 'Logic Burn', category: 'System', tier: 'Moderate', mpCost: 10, recoverySeconds: 75, durationSeconds: 0, preFight: false, effect: "Attacks opponent's LOG processor: instant 8 MP drain; if their MP is already < 10, forces 30-sec digital layer lockout." },
    { id: 'S6', name: 'Feedback Loop', category: 'System', tier: 'Moderate', mpCost: 9, recoverySeconds: 60, durationSeconds: 25, preFight: false, effect: 'Reverses opponent power signals: if they activate a power during duration, they receive 4 MP blowback.' },
    { id: 'S7', name: 'Sensor Blind', category: 'System', tier: 'Moderate', mpCost: 11, recoverySeconds: 90, durationSeconds: 40, preFight: false, effect: "Overloads opponent's sensory Humanware: INS effectively −5 for duration; invisible on Arena Feed." },
    // ── System Major ─────────────────────────────────────────────────────────
    { id: 'S8', name: 'System Crash', category: 'System', tier: 'Major', mpCost: 18, recoverySeconds: 240, durationSeconds: 60, preFight: false, effect: "Full OS intrusion (LOG vs. opponent INS): success disables all opponent powers for duration — Ghost Feed goes dark." },
    { id: 'S9', name: 'Parasite Protocol', category: 'System', tier: 'Major', mpCost: 16, recoverySeconds: 180, durationSeconds: 45, preFight: false, effect: 'Embeds a draining signal: opponent loses 3 MP every 10 sec during duration — Ghost Feed shows a slow red pulse.' },
    { id: 'S10', name: 'Mirror', category: 'System', tier: 'Major', mpCost: 14, recoverySeconds: 150, durationSeconds: 30, preFight: false, effect: "Copies opponent's last-used power at 60% effectiveness; requires LOG vs. opponent INS and sufficient MP." },
    // ── System Signature ─────────────────────────────────────────────────────
    { id: 'S11', name: 'Blackout', category: 'System', tier: 'Signature', mpCost: 27, recoverySeconds: 540, durationSeconds: 90, preFight: false, effect: 'Ghost Feed blackout for both fighters: no team support, no digital layer — pure physical fight until duration ends.' },
    { id: 'S12', name: 'Deep Burn', category: 'System', tier: 'Signature', mpCost: 25, recoverySeconds: 480, durationSeconds: 0, preFight: false, effect: "Targets Humanware core (high LOG vs. INS): success drains all opponent MP instantly; resisted by INS 18+ or TQ 9+ teams." },

    // ── Biological Passive ───────────────────────────────────────────────────
    { id: 'B1', name: 'Shed', category: 'Biological', tier: 'Passive', mpCost: 0, recoverySeconds: 0, durationSeconds: -1, preFight: false, effect: 'Continuously emits low-density sensor chaff: INS-based targeting reads −1 accuracy at close range' },
    { id: 'B2', name: 'Inoculate', category: 'Biological', tier: 'Passive', mpCost: 0, recoverySeconds: 0, durationSeconds: -1, preFight: false, effect: 'Fighter\'s systems are hardened against nanite attacks — all Biological category powers used against them are 30% less effective.' },
    // ── Biological Minor ─────────────────────────────────────────────────────
    { id: 'B3', name: 'Brand', category: 'Biological', tier: 'Minor', mpCost: 4, recoverySeconds: 25, durationSeconds: 45, preFight: false, effect: 'On successful strike: injects nanite marker — own team gains +2 TQ on all operations targeting that opponent; INS 14+ shortens duration.' },
    // ── Biological Moderate ──────────────────────────────────────────────────
    { id: 'B4', name: 'Contaminate', category: 'Biological', tier: 'Moderate', mpCost: 10, recoverySeconds: 90, durationSeconds: 60, preFight: false, effect: 'Nanite payload delivered through direct contact: opponent STR and END bonuses from active powers −2; 30-sec residual at −1 after.' },
    { id: 'B5', name: 'Thread', category: 'Biological', tier: 'Moderate', mpCost: 9, recoverySeconds: 75, durationSeconds: 0, preFight: false, effect: 'Builds through proximity (within 3m): WIL −1 per 20 cumulative seconds (max −3); resets if opponent exits range for 15 sec.' },
    // ── Biological Major ─────────────────────────────────────────────────────
    { id: 'B6', name: 'Wither', category: 'Biological', tier: 'Major', mpCost: 16, recoverySeconds: 210, durationSeconds: 90, preFight: false, effect: 'Full-spectrum nanite injection via 2-sec held grapple: all active/passive combat power stat bonuses halved; 60-sec recovery phase at 50%.' },
    // ── Biological Signature ─────────────────────────────────────────────────
    { id: 'B7', name: 'Gray', category: 'Biological', tier: 'Signature', mpCost: 26, recoverySeconds: 540, durationSeconds: 120, preFight: false, effect: 'Nanite cloud in 4m radius: opponents accumulate 1 STR/END degradation per 15 sec (max −4/−4) — degradation is permanent for the fight.' },

    // ── Preparation Passive ──────────────────────────────────────────────────
    { id: 'P1', name: 'Ledger', category: 'Preparation', tier: 'Passive', mpCost: 0, recoverySeconds: 0, durationSeconds: -1, preFight: false, effect: 'Archives behavioral data throughout the fight: +1 LOG per 60 sec of fight time (max +3); team gains +1 TQ after 2 minutes.' },
    // ── Preparation Moderate ─────────────────────────────────────────────────
    { id: 'P2', name: 'Confession', category: 'Preparation', tier: 'Moderate', mpCost: 8, recoverySeconds: 0, durationSeconds: -1, preFight: true, effect: 'Pre-fight meditative observation: INS +3 for first 90 sec of fight; first unseen opponent power auto-identifies on Ghost Feed.' },
    { id: 'P3', name: 'Redact', category: 'Preparation', tier: 'Moderate', mpCost: 7, recoverySeconds: 90, durationSeconds: 30, preFight: false, effect: "Purges 30 sec of own Ghost Feed signature data — opponent team's TQ-based operations lose −3 for duration." },
    // ── Preparation Major ────────────────────────────────────────────────────
    { id: 'P4', name: 'Bind', category: 'Preparation', tier: 'Major', mpCost: 15, recoverySeconds: 0, durationSeconds: -1, preFight: true, effect: 'Pre-fight exploit: embeds conditional that doubles MP cost the next time opponent activates a chosen power tier; TQ 8+ team can remove it for 6 MP.' },
    { id: 'P5', name: 'Mark', category: 'Preparation', tier: 'Major', mpCost: 14, recoverySeconds: 0, durationSeconds: -1, preFight: true, effect: "Pre-fight custom exploit: first activation of the marked opponent power costs 4 MP instead of standard and fires with +4 LOG; wasted if opponent never uses it." },
];

// ─── Org Power Tendency Weights ───────────────────────────────────────────────
// Each entry is a list of power IDs this org favours.
// Selection algorithm: pick from favourites with 70% probability, full pool 30%.

const ORG_POWER_FAVOURITES: Record<OrgAffiliation, string[]> = {
    Acheron: ['C2', 'C3', 'C7', 'C8', 'C10', 'C22', 'S4', 'S3', 'S6', 'P2'],
    Minos: ['C2', 'C3', 'C4', 'C5', 'C9', 'C23', 'S1', 'S3', 'B5'],
    Cerberus: ['C1', 'C3', 'C5', 'C9', 'C10', 'C14', 'C15', 'C16', 'C18', 'C20', 'C22'],
    Lethe: ['C4', 'C7', 'C13', 'C17', 'S3', 'S10', 'S11', 'P3'],
    Dis: ['C1', 'C11', 'C10', 'C9', 'C15', 'C19', 'C14', 'C20', 'C18', 'S9'],
    Stygia: ['C3', 'C2', 'C10', 'C8', 'C14', 'S5', 'S6', 'S9', 'S12', 'P4'],
    Malebolge: ['C2', 'C3', 'C10', 'C8', 'S3', 'S8', 'S9', 'S10', 'S12', 'P1'],
    Cain: ['C3', 'C4', 'C5', 'C7', 'C17', 'C21', 'S2', 'B3', 'P5'],
    Tartarus: ['C3', 'C12', 'C20', 'C21', 'S8', 'B1', 'B2', 'B4', 'B5', 'B6', 'B7'],
    Unaligned: [], // no tendency — fully random from eligible pool
};

// ─── Tier eligibility by Humanware type ──────────────────────────────────────
// T3: up to Major for its single power slot
// T4: first power up to Major, second power can be Signature
const TIER_ORDER: PowerTier[] = ['Passive', 'Minor', 'Moderate', 'Major', 'Signature'];

function tierIndex(t: PowerTier): number { return TIER_ORDER.indexOf(t); }

function tierValue(t: PowerTier): number {
    return { Passive: 2, Minor: 4, Moderate: 8, Major: 12, Signature: 18 }[t] ?? 4;
}

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

function luckLabel(value: number): LuckLabel {
    if (value <= 5) return 'Cursed';
    if (value <= 9) return 'Unlucky';
    if (value <= 13) return 'Neutral';
    if (value <= 17) return 'Fortunate';
    return 'Fated';
}

function assignPowers(org: OrgAffiliation, hwType: HumanwareType): Power[] {
    const slots = hwType === 4 ? 2 : 1;
    const favourites = ORG_POWER_FAVOURITES[org];
    const assigned: Power[] = [];
    const usedIds = new Set<string>();

    for (let slot = 0; slot < slots; slot++) {
        // Slot 0: max tier = Major; Slot 1 (T4 only): max tier = Signature
        const maxTierIdx = slot === 0 ? tierIndex('Major') : tierIndex('Signature');
        const eligible = POWER_POOL.filter(
            p => tierIndex(p.tier) <= maxTierIdx && !usedIds.has(p.id)
        );

        let pool: Power[];
        if (favourites.length > 0 && Math.random() < 0.70) {
            // Pick from org favourites (filtered to eligible)
            const favEligible = eligible.filter(p => favourites.includes(p.id));
            pool = favEligible.length > 0 ? favEligible : eligible;
        } else {
            pool = eligible;
        }

        const pick = randomItem(pool);
        assigned.push(pick);
        usedIds.add(pick.id);
    }

    return assigned;
}

function calcOfficialScore(
    stats: BaseStats,
    hwType: HumanwareType,
    tq: number,
    powers: Power[]
): number {
    const physComp = stats.strength + stats.dexterity + stats.endurance;
    const digComp = stats.logic + stats.instinct + stats.willpower;
    const hwBonus = hwType === 4 ? 20 : 10;
    const powerBonus = powers.reduce((sum, p) => sum + tierValue(p.tier), 0);
    return physComp + digComp + hwBonus + powerBonus + (tq * 4);
}

function distributeStats(axis: PrimaryAxis, hwType: HumanwareType): BaseStats {
    const bonusPoints = hwType === 4 ? 16 : 10;
    const maxBonus = 8;

    const stats: BaseStats = {
        strength: 10, dexterity: 10, endurance: 10,
        logic: 10, instinct: 10, willpower: 10,
    };

    const physKeys: (keyof BaseStats)[] = ['strength', 'dexterity', 'endurance'];
    const digKeys: (keyof BaseStats)[] = ['logic', 'instinct', 'willpower'];

    let primaryPool: number;
    let primaryKeys: (keyof BaseStats)[];
    let secondaryKeys: (keyof BaseStats)[];

    if (axis === 'Physical') {
        primaryPool = Math.round(bonusPoints * 0.6);
        primaryKeys = physKeys; secondaryKeys = digKeys;
    } else if (axis === 'Digital') {
        primaryPool = Math.round(bonusPoints * 0.6);
        primaryKeys = digKeys; secondaryKeys = physKeys;
    } else {
        primaryPool = Math.round(bonusPoints * 0.5);
        primaryKeys = physKeys; secondaryKeys = digKeys;
    }

    const secondaryPool = bonusPoints - primaryPool;

    function distribute(pool: number, keys: (keyof BaseStats)[]) {
        let remaining = pool;
        while (remaining > 0) {
            const key = randomItem(keys);
            if (stats[key] - 10 < maxBonus) { stats[key]++; remaining--; }
        }
    }

    distribute(primaryPool, primaryKeys);
    distribute(secondaryPool, secondaryKeys);
    return stats;
}

// ─── Canon Fighter Helpers ──────────────────────────────────────────────────────

function getPower(id: string): Power {
    const p = POWER_POOL.find(p => p.id === id);
    if (!p) throw new Error(`Unknown power id: ${id}`);
    return p;
}

// ─── Canon Fighter Definitions ──────────────────────────────────────────────────
//
// BRACKET MATH (standard balanced 128-player single-elimination):
//   R1 pairs: seed X vs seed (129-X).
//   R2 pod: R1-pair k pairs with R1-pair (65-k).
//   R3 pod: R2-pod k pairs with R2-pod (33-k).
//   R4 pod: R3-pod k pairs with R3-pod (17-k).
//   R5 pod: R4-pod k pairs with R4-pod (9-k).
//   R6 pod: R5-pod k pairs with R5-pod (5-k).
//   R7 (Final): R6-pod 1 vs R6-pod 2.
//
//   Beatrix = seed 126:
//     R1: 129-126=3         → Rauk      seed 3
//     R2: R1-pair 62={62,67}→ Troika    seed 62
//     R3: R2-pod30={30,99,35,94} → Malatesta seed 30
//     R4: R3-pod14={14,115,51,78,...} → Jaeger  seed 14
//     R5: R4-pod6 ={6,123,59,70,...} → Tarasque seed 6
//     R6: R5-pod2 contains seed 2   → Kuzima   seed 2
//     R7: opposite half              → Charon   seed 1
//
// Canon seeds are fixed by narrative. OfficialScore reflects fight capability
// only and does NOT determine bracket placement for these 8 fighters.

interface CanonFighterDef {
    id: string;
    seed: number;
    name: string;
    species: Species;
    origin: OriginWorld;
    org: OrgAffiliation;
    fightingStyle: FightingStyle;
    signatureMove: string;
    backstory: string;
    motivation: string;
    personality: string;
    stats: BaseStats;
    humanwareType: HumanwareType;
    primaryAxis: PrimaryAxis;
    luck: number;
    luckLabel: LuckLabel;
    teamQuality: number;
    teamNote: string;
    powerIds: string[];
}

const CANON_FIGHTER_DEFS: CanonFighterDef[] = [
    // Charon — seed 1 — Acheron champion — T4 Digital
    // Stats: phys bonus 0+3+3=6, dig bonus 3+5+2=10, total=16 ✓
    {
        id: 'canon-charon', seed: 1,
        name: 'Charon',
        species: 'Human', origin: 'The Undercroft', org: 'Acheron',
        fightingStyle: 'Technical', signatureMove: 'Final Clause',
        backstory: 'Undefeated in Circle 1 for three consecutive tournaments. His record is not public — Acheron sealed it.',
        motivation: 'The tournament is maintenance. He already won.',
        personality: 'Speaks rarely. When he does, the room adjusts.',
        stats: { strength: 10, dexterity: 13, endurance: 13, logic: 13, instinct: 15, willpower: 12 },
        humanwareType: 4, primaryAxis: 'Digital',
        luck: 17, luckLabel: 'Fortunate',
        teamQuality: 9, teamNote: '',
        powerIds: ['S4', 'S12'],
    },
    // Kuzima — seed 2 — Dis powerhouse — T4 Physical
    // Stats: phys bonus 8+0+2=10, dig bonus 2+0+4=6, total=16 ✓
    {
        id: 'canon-kuzima', seed: 2,
        name: 'Kuzima',
        species: 'Cyborg', origin: 'Rust Belt', org: 'Dis',
        fightingStyle: 'Brutal', signatureMove: 'Pressure Breach',
        backstory: 'Dis built him over six years for this bracket. He has never been told he can lose.',
        motivation: 'Every fight is a proof of concept for Dis manufacturing.',
        personality: "Methodical. Doesn't talk during fights. Doesn't need to.",
        stats: { strength: 18, dexterity: 10, endurance: 12, logic: 12, instinct: 10, willpower: 14 },
        humanwareType: 4, primaryAxis: 'Physical',
        luck: 15, luckLabel: 'Fortunate',
        teamQuality: 9, teamNote: '',
        powerIds: ['C16', 'C20'],
    },
    // Rauk — seed 3 — Acheron precision striker — T4 Balanced
    // Stats: phys bonus 4+2+2=8, dig bonus 4+2+2=8, total=16 ✓
    {
        id: 'canon-rauk', seed: 3,
        name: 'Rauk One-Eye',
        species: 'Human', origin: 'Neon City', org: 'Acheron',
        fightingStyle: 'Technical', signatureMove: 'Null Convergence',
        backstory: 'Lost his left eye in Circle 3 eight years ago. Refused the replacement. Says the blindspot keeps him honest.',
        motivation: 'He owes Acheron a win. He always pays his debts.',
        personality: 'Measured and deliberate. Watching him warm up feels like watching someone pray.',
        stats: { strength: 14, dexterity: 12, endurance: 12, logic: 14, instinct: 12, willpower: 12 },
        humanwareType: 4, primaryAxis: 'Balanced',
        luck: 12, luckLabel: 'Neutral',
        teamQuality: 7, teamNote: '',
        powerIds: ['C7', 'C22'],
    },
    // Tarasque — seed 6 — Tartarus biological horror — T3 Physical
    // Stats: phys bonus 2+0+8=10, dig bonus 0, total=10 ✓ (T3)
    // Seed 6 reflects Tartarus tournament record; OfficialScore is lower by formula.
    {
        id: 'canon-tarasque', seed: 6,
        name: 'Tarasque',
        species: 'Cyborg', origin: 'Cauldron', org: 'Tartarus',
        fightingStyle: 'Aggressive', signatureMove: 'Gray Embrace',
        backstory: 'Left the Tartarus labs with seventeen unregistered biological modifications. The committee noted nine of them.',
        motivation: 'Tartarus wants data on high-end opponents under biological stress. Tarasque is the instrument.',
        personality: 'Genuinely curious. Asks questions during fights that make opponents deeply uncomfortable.',
        stats: { strength: 12, dexterity: 10, endurance: 18, logic: 10, instinct: 10, willpower: 10 },
        humanwareType: 3, primaryAxis: 'Physical',
        luck: 8, luckLabel: 'Unlucky',
        teamQuality: 5, teamNote: 'Tartarus research team — more interested in collecting data than winning.',
        powerIds: ['B6'],
    },
    // Jaeger — seed 14 — Malebolge system architect — T3 Digital
    // Stats: phys bonus 0+0+4=4, dig bonus 6+0+0=6, total=10 ✓ (T3)
    {
        id: 'canon-jaeger', seed: 14,
        name: 'Jaeger',
        species: 'Android', origin: 'Vertex', org: 'Malebolge',
        fightingStyle: 'Tactical', signatureMove: 'Hostile Acquisition',
        backstory: "Former Malebolge infrastructure architect. Entered the bracket when his audit of the tournament's Ghost Feed exposed exploits he decided to use personally.",
        motivation: "He invested in the Ghost Feed infrastructure. He's here to collect the return.",
        personality: 'Polite in the way that large institutions are polite — completely and without warmth.',
        stats: { strength: 10, dexterity: 10, endurance: 14, logic: 16, instinct: 10, willpower: 10 },
        humanwareType: 3, primaryAxis: 'Digital',
        luck: 13, luckLabel: 'Neutral',
        teamQuality: 7, teamNote: '',
        powerIds: ['S8'],
    },
    // Malatesta — seed 30 — Minos chaos agent — T3 Physical
    // Stats: phys bonus 4+2+0=6, dig bonus 0+0+4=4, total=10 ✓ (T3)
    {
        id: 'canon-malatesta', seed: 30,
        name: 'Malatesta',
        species: 'Human', origin: 'The Sprawl', org: 'Minos',
        fightingStyle: 'Aggressive', signatureMove: 'Impact Loop',
        backstory: 'Qualified through the open bracket three times. Minos finally sponsored him when he hospitalized two seeded fighters in R1.',
        motivation: "He loves this. That's the entire motivation.",
        personality: 'Loud before the fight. Completely silent during it. The contrast is disturbing.',
        stats: { strength: 14, dexterity: 12, endurance: 10, logic: 10, instinct: 10, willpower: 14 },
        humanwareType: 3, primaryAxis: 'Physical',
        luck: 10, luckLabel: 'Neutral',
        teamQuality: 6, teamNote: '',
        powerIds: ['C9'],
    },
    // Troika — seed 62 — Cerberus tank — T3 Physical
    // Stats: phys bonus 4+0+2=6, dig bonus 0+2+2=4, total=10 ✓ (T3)
    {
        id: 'canon-troika', seed: 62,
        name: 'Troika',
        species: 'Human', origin: 'Irongate', org: 'Cerberus',
        fightingStyle: 'Defensive', signatureMove: 'Carbon Slam',
        backstory: 'Dis trained, Cerberus recruited. His previous team was rotated out after he survived a fight they declared lost at the 30-second mark.',
        motivation: "He is here because Cerberus put him here. He doesn't ask questions.",
        personality: 'Quiet, consistent, and impossible to rattle. Cerberus fighters train for this.',
        stats: { strength: 14, dexterity: 10, endurance: 12, logic: 10, instinct: 12, willpower: 12 },
        humanwareType: 3, primaryAxis: 'Physical',
        luck: 11, luckLabel: 'Neutral',
        teamQuality: 6, teamNote: '',
        powerIds: ['C10'],
    },
    // Beatrix — seed 126 — the protagonist — T4 Physical
    // Stats: phys bonus 8+0+2=10, dig bonus 0+0+6=6, total=16 ✓
    // Seed 126 reflects TQ 5 + Unaligned status; raw stats are elite tier.
    // Hulk Mode (Type 5) activates outside of normal power pool parameters.
    {
        id: 'canon-beatrix', seed: 126,
        name: 'Beatrix',
        species: 'Cyborg', origin: 'Sector Zero', org: 'Unaligned',
        fightingStyle: 'Aggressive', signatureMove: 'Full Overload',
        backstory: "Qualified through the open bracket on raw stat variance. No org. No team history. The Ghost Feed analytics flagged her Humanware as 'unclassified' — twice.",
        motivation: "She doesn't explain herself.",
        personality: 'Direct to the point of being rude. Has a reputation for finishing faster than the Ghost Feed can process.',
        stats: { strength: 18, dexterity: 10, endurance: 12, logic: 10, instinct: 10, willpower: 16 },
        humanwareType: 4, primaryAxis: 'Physical',
        luck: 18, luckLabel: 'Fortunate',
        teamQuality: 5, teamNote: 'Independent operator — ad hoc crew assembled 48 hours before the tournament.',
        powerIds: ['C9', 'C15'],
    },
];

const CANON_SEEDS = new Set(CANON_FIGHTER_DEFS.map(d => d.seed));

function buildCanonFighter(def: CanonFighterDef): Fighter {
    const powers = def.powerIds.map(getPower);
    const stats = def.stats;
    return {
        id: def.id,
        name: def.name,
        species: def.species,
        origin: def.origin,
        org: def.org,
        fightingStyle: def.fightingStyle,
        signatureMove: def.signatureMove,
        backstory: def.backstory,
        motivation: def.motivation,
        personality: def.personality,
        stats,
        hp: stats.endurance * 2,
        mp: stats.willpower * 2,
        humanwareType: def.humanwareType,
        primaryAxis: def.primaryAxis,
        luck: def.luck,
        luckLabel: def.luckLabel,
        teamQuality: def.teamQuality,
        teamNote: def.teamNote,
        powers,
        powerSlots: def.powerIds.length,
        officialScore: calcOfficialScore(stats, def.humanwareType, def.teamQuality, powers),
        rank: def.seed,
        wins: 0,
        losses: 0,
        isEliminated: false,
    };
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
    const label = luckLabel(luckValue);

    const assignedOrg: OrgAffiliation = org ?? 'Unaligned';
    const [tqMin, tqMax] = ORG_TQ_RANGES[assignedOrg];
    let tq = randomInt(tqMin, tqMax);
    let teamNote = '';

    const isMismatch = Math.random() < 0.2;
    if (isMismatch) {
        const expectedMid = Math.round((tqMin + tqMax) / 2);
        if (tq >= expectedMid) {
            tq = randomInt(1, Math.max(1, tqMin - 1));
            teamNote = randomItem(MISMATCH_NOTES_HIGH);
        } else {
            tq = randomInt(Math.min(10, tqMax + 1), 10);
            teamNote = randomItem(MISMATCH_NOTES_LOW);
        }
    }

    const powers = assignPowers(assignedOrg, hwType);
    const officialScore = calcOfficialScore(stats, hwType, tq, powers);

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
        powers,
        powerSlots: hwType === 4 ? 2 : 1,
        officialScore,
        rank: 0,
        wins: 0,
        losses: 0,
        isEliminated: false,
    };
}

export function generateFighters(count: number = 128): Fighter[] {
    // Build canon fighters with fixed seeds
    const canonFighters = CANON_FIGHTER_DEFS.map(buildCanonFighter);

    // Generate random fighters for the remaining seed slots
    const randomCount = count - canonFighters.length;

    const orgs: OrgAffiliation[] = [];
    const fightersPerOrg = Math.floor((randomCount * 0.9) / ALIGNED_ORGS.length);
    for (const org of ALIGNED_ORGS) {
        for (let i = 0; i < fightersPerOrg; i++) orgs.push(org);
    }
    while (orgs.length < randomCount) orgs.push('Unaligned');

    for (let i = orgs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [orgs[i], orgs[j]] = [orgs[j], orgs[i]];
    }

    const randomFighters: Fighter[] = [];
    for (let i = 0; i < randomCount; i++) {
        randomFighters.push(generateFighter(`fighter-${i + 1}`, orgs[i]));
    }

    // Sort random fighters by OfficialScore and assign to remaining seed slots
    randomFighters.sort((a, b) => b.officialScore - a.officialScore);
    const availableSeeds = Array.from({ length: count }, (_, i) => i + 1)
        .filter(s => !CANON_SEEDS.has(s));
    randomFighters.forEach((f, idx) => { f.rank = availableSeeds[idx] ?? count; });

    const result = [...canonFighters, ...randomFighters];
    result.sort((a, b) => a.rank - b.rank);
    return result;
}
