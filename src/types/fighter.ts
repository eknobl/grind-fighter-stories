export type Species = 'Human' | 'Elf' | 'Dwarf' | 'Orc' | 'Goblin' | 'Troll' | 'Dragonborn';
export type FightingStyle = 'Aggressive' | 'Defensive' | 'Balanced' | 'Tactical' | 'Magical' | 'Stealth' | 'Brutal' | 'Evasive' | 'Technical';
export type OriginWorld = 'Terra' | 'Aetheria' | 'Inferno' | 'Celestia' | 'Shadowreaver' | 'Mechanus' | 'Verdant' | 'Aquatica' | 'Frostholm' | 'Sandstorm' | 'Ironclad' | 'Mistvale' | 'Stormpeak' | 'Void' | 'Elysium' | 'Tartarus' | 'Nether' | 'Gaia' | 'Olympus' | 'Asgard';

export interface Stats {
  strength: number;
  agility: number;
  endurance: number;
  intelligence: number;
  willpower: number;
}

export interface Fighter {
  id: string;
  name: string;
  species: Species;
  origin: OriginWorld;
  fightingStyle: FightingStyle;
  signatureMove: string;
  backstory: string;
  motivation: string;
  personality: string;
  stats: Stats;
  wins: number;
  losses: number;
  isEliminated: boolean;
  rank: number;
}

export type StoryType = 'fight' | 'rest' | 'preparation' | 'interaction';

export interface GeneratedStory {
  id: string;
  type: StoryType;
  content: string;
  fighters: Fighter[];
  timestamp: number;
}
