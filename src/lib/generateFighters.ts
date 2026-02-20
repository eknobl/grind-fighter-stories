import { Fighter, Species, FightingStyle, OriginWorld, Stats } from '../types/fighter';

const SPECIES: Species[] = ['Human', 'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Dragonborn'];
const STYLES: FightingStyle[] = ['Aggressive', 'Defensive', 'Balanced', 'Tactical', 'Magical', 'Stealth', 'Brutal', 'Evasive', 'Technical'];
const WORLDS: OriginWorld[] = ['Terra', 'Aetheria', 'Inferno', 'Celestia', 'Shadowreaver', 'Mechanus', 'Verdant', 'Aquatica', 'Frostholm', 'Sandstorm', 'Ironclad', 'Mistvale', 'Stormpeak', 'Void', 'Elysium', 'Tartarus', 'Nether', 'Gaia', 'Olympus', 'Asgard'];

const FIRST_NAMES = [
    'Kael', 'Lyra', 'Thorn', 'Grom', 'Zara', 'Vrix', 'Drak', 'Elara', 'Morn', 'Sylas',
    'Ragnar', 'Fae', 'Nyx', 'Orin', 'Korg', 'Vera', 'Xan', 'Jinx', 'Myra', 'Tor',
    'Axel', 'Luna', 'Flint', 'Ska', 'Zix', 'Rex', 'Ivy', 'Knox', 'Ash', 'Sky',
    'Bram', 'Cora', 'Dirk', 'Ember', 'Fynn', 'Gwen', 'Hauk', 'Iris', 'Jax', 'Kira',
    'Loki', 'Mina', 'Nero', 'Ona', 'Pax', 'Quinn', 'Rook', 'Sia', 'Taz', 'Una',
    'Vane', 'Wren', 'Xylo', 'Yara', 'Zane', 'Aris', 'Brea', 'Cade', 'Dyna', 'Eko',
];

const LAST_NAMES = [
    'Storm', 'Shadow', 'Iron', 'Blade', 'Fire', 'Frost', 'Thunder', 'Steel', 'Blood', 'Bone',
    'Moon', 'Star', 'Sun', 'Night', 'Day', 'Light', 'Dark', 'Void', 'Spirit', 'Soul',
    'Fang', 'Claw', 'Scale', 'Wing', 'Horn', 'Tail', 'Eye', 'Heart', 'Mind', 'Fist',
    'Rage', 'Fury', 'Wrath', 'Peace', 'Hope', 'Fear', 'Love', 'Hate', 'Joy', 'Pain',
    'Life', 'Death', 'Time', 'Space', 'Earth', 'Wind', 'Water', 'Stone', 'Wood', 'Metal',
    'Gold', 'Silver', 'Bronze', 'Copper', 'Glass', 'Crystal', 'Gem', 'Jewel', 'Rock', 'Dust',
];

const MOVES = [
    'Dragon Punch', 'Phoenix Kick', 'Tiger Claw', 'Cobra Strike', 'Eagle Dive',
    'Thunder Smash', 'Lightning Bolt', 'Fire Blast', 'Ice Shard', 'Earth Quake',
    'Shadow Step', 'Ghost Walk', 'Soul Drain', 'Mind Control', 'Time Warp',
    'Blade Dance', 'Sword Storm', 'Axe Swing', 'Hammer Bash', 'Spear Thrust',
    'Arrow Shot', 'Dagger Stab', 'Fist Flurry', 'Kick Barrage', 'Head Butt',
    'Elbow Drop', 'Knee Strike', 'Shoulder Tackle', 'Body Slam', 'Suplex',
];

const MOTIVATIONS = [
    'To prove they are the strongest',
    'To save their village',
    'To avenge their family',
    'To find a legendary artifact',
    'To earn money for a debt',
    'To gain fame and glory',
    'To test their limits',
    'To escape their past',
    'To fulfill a prophecy',
    'To impress a loved one',
    'To reclaim their honor',
    'To protect the weak',
    'To discover the truth',
    'To control the world',
    'To destroy the tournament',
];

const PERSONALITIES = [
    'Arrogant but skilled',
    'Humble and quiet',
    'Loud and boisterous',
    'Cold and calculating',
    'Friendly and optimistic',
    'Mysterious and brooding',
    'Crazy and unpredictable',
    'Honorable and strict',
    'Lazy but talented',
    'Hardworking and determined',
    'Cunning and deceptive',
    'Naive and innocent',
    'Brave and reckless',
    'Cowardly but lucky',
    'Wise and old',
];

const BACKSTORIES = [
    'A former champion seeking redemption.',
    'A rookie with hidden potential.',
    'A cursed warrior fighting for freedom.',
    'A mercenary hired to win.',
    'A monk from a distant temple.',
    'A prince in disguise.',
    'A gladiator from the pits.',
    'A sorcerer testing new spells.',
    'A beast tamer with a loyal companion.',
    'A cyborg built for combat.',
    'A ninja from the shadow clan.',
    'A pirate looking for treasure.',
    'A knight serving a dark lord.',
    'A thief with a heart of gold.',
    'A god in mortal form.',
];

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(items: T[]): T {
    return items[randomInt(0, items.length - 1)];
}

export function generateFighter(id: string): Fighter {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);

    return {
        id,
        name: `${firstName} ${lastName}`,
        species: randomItem(SPECIES),
        origin: randomItem(WORLDS),
        fightingStyle: randomItem(STYLES),
        signatureMove: randomItem(MOVES),
        backstory: randomItem(BACKSTORIES),
        motivation: randomItem(MOTIVATIONS),
        personality: randomItem(PERSONALITIES),
        stats: {
            strength: randomInt(1, 10),
            agility: randomInt(1, 10),
            endurance: randomInt(1, 10),
            intelligence: randomInt(1, 10),
            willpower: randomInt(1, 10),
        },
        wins: 0,
        losses: 0,
        isEliminated: false,
        rank: randomInt(1, 100),
    };
}

export function generateFighters(count: number = 128): Fighter[] {
    const fighters: Fighter[] = [];
    for (let i = 0; i < count; i++) {
        fighters.push(generateFighter(`fighter-${i + 1}`));
    }
    return fighters;
}
