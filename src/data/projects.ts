export type ProjectStatus = 'ONLINE' | 'INCOMING';

export interface Project {
    id: string;
    title: string;
    tagline: string;
    tags: string[];
    color: string;
    url: string | null;
    status: ProjectStatus;
}

export const PROJECTS: Project[] = [
    {
        id: 'NMC-001',
        title: 'STAR WYRMS',
        tagline: 'Top Gun × Attack on Titan × Space Dragons',
        tags: ['MILITARY SCI-FI', 'PROGRESSION', 'SPACE OPERA'],
        color: '#4fc3f7',
        url: 'https://www.royalroad.com/fiction/146773/star-wyrms-top-gun-attack-on-titan-space-dragons',
        status: 'ONLINE',
    },
    {
        id: 'NMC-002',
        title: 'GRIND FIGHTER',
        tagline: 'Hunger Games × Gladiator × Ghost in the Shell',
        tags: ['CYBERPUNK', 'ARENA', 'PROGRESSION'],
        color: '#ff8c42',
        url: 'https://www.royalroad.com/fiction/138724/grind-fighter-hunger-games-gladiator-ghost-in',
        status: 'ONLINE',
    },
    {
        id: 'NMC-003',
        title: 'GRIND FIGHTER: ARENA',
        tagline: 'Interactive Tournament Chronicles — powered by Claude',
        tags: ['INTERACTIVE', 'AI-GENERATED', 'EXPERIMENT'],
        color: '#ff8c42',
        url: '/grind-fighter/arena',
        status: 'ONLINE',
    },
    {
        id: 'NMC-004',
        title: 'ARCHIVE',
        tagline: 'Lore database — characters, factions, technology, locations',
        tags: ['WIKI', 'LORE', 'WORLD-BUILDING'],
        color: '#f9d72f',
        url: '/wiki',
        status: 'ONLINE',
    },
];
