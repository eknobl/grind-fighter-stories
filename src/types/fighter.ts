// ─── Enums ───────────────────────────────────────────────────────────────────

export type Species = 'Human' | 'Cyborg' | 'Android';

export type OrgAffiliation =
  | 'Acheron'
  | 'Minos'
  | 'Cerberus'
  | 'Lethe'
  | 'Dis'
  | 'Stygia'
  | 'Malebolge'
  | 'Cain'
  | 'Tartarus'
  | 'Unaligned';

export type PrimaryAxis = 'Physical' | 'Digital' | 'Balanced';

export type HumanwareType = 3 | 4;

export type LuckLabel = 'Cursed' | 'Unlucky' | 'Neutral' | 'Fortunate' | 'Fated';

export type FightingStyle =
  | 'Aggressive'
  | 'Defensive'
  | 'Balanced'
  | 'Tactical'
  | 'Stealth'
  | 'Brutal'
  | 'Evasive'
  | 'Technical';

export type StoryType = 'fight' | 'rest' | 'preparation' | 'interaction';

// ─── Powers ──────────────────────────────────────────────────────────────────

export type PowerCategory = 'Combat' | 'System' | 'Biological' | 'Preparation';

export type PowerTier = 'Passive' | 'Minor' | 'Moderate' | 'Major' | 'Signature';

export interface Power {
  id: string;           // e.g. 'C1', 'S4', 'B3', 'P2'
  name: string;
  category: PowerCategory;
  tier: PowerTier;
  mpCost: number;       // 0 for Passives and pre-fight Preparation powers
  recoverySeconds: number; // 0 for Passives
  durationSeconds: number; // 0 for instant
  effect: string;       // one-sentence summary for story prompts
  preFight: boolean;    // Preparation powers activated before fight
}

// ─── Origin Worlds (cyberpunk / sci-fi) ──────────────────────────────────────

export type OriginWorld =
  | 'Neon City'
  | 'The Sprawl'
  | 'Irongate'
  | 'Meridian Station'
  | 'Ashveil'
  | 'The Undercroft'
  | 'Helios Prime'
  | 'Coldharbor'
  | 'Vertex'
  | 'The Fringe'
  | 'Liminal'
  | 'Crimson Basin'
  | 'Sector Zero'
  | 'Drift'
  | 'New Arcadia'
  | 'Vantablack'
  | 'The Nexus'
  | 'Obsidian Shore'
  | 'Rust Belt'
  | 'Cauldron';

// ─── Stats ───────────────────────────────────────────────────────────────────

export interface BaseStats {
  strength: number;    // Physical damage output (Layer 1)
  dexterity: number;   // Physical dodge/evasion (Layer 1)
  endurance: number;   // Physical resilience → HP = END × 2 (Layer 1)
  logic: number;       // Digital damage output (Layer 2)
  instinct: number;    // Digital defense (Layer 2)
  willpower: number;   // Digital resilience → MP = WIL × 2 (Layer 2)
}

// ─── Humanware ───────────────────────────────────────────────────────────────

export interface Fighter {
  // Identity
  id: string;
  name: string;
  species: Species;
  origin: OriginWorld;
  org: OrgAffiliation;
  fightingStyle: FightingStyle;
  signatureMove: string;
  backstory: string;
  motivation: string;
  personality: string;

  // Stats (all ≥ 10)
  stats: BaseStats;

  // Derived
  hp: number;           // endurance × 2
  mp: number;           // willpower × 2

  // Humanware
  humanwareType: HumanwareType;   // 3 or 4
  primaryAxis: PrimaryAxis;

  // Luck
  luck: number;         // 2–20 (2d10)
  luckLabel: LuckLabel;

  // Team
  teamQuality: number;  // 1–10
  teamNote: string;     // one sentence

  // Powers
  powers: Power[];      // 1 power for T3, 2 for T4
  powerSlots: number;   // 1 or 2

  // Tournament
  officialScore: number;
  rank: number;         // seed 1–128

  // Legacy fields (kept for compatibility)
  wins: number;
  losses: number;
  isEliminated: boolean;
}

// ─── Story ───────────────────────────────────────────────────────────────────

export interface GeneratedStory {
  id: string;
  type: StoryType;
  content: string;
  fighters: Fighter[];
  timestamp: number;
}
