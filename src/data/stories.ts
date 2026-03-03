export interface Story {
    id: string;
    index: string;
    title: string;
    subtitle: string;
    tags: string[];
    accentColor: string;
    royalRoadUrl: string;
    youtubeId: string;
    youtubeLabel: string;
    coverArt: string | null;
}

export const STORIES: Story[] = [
    {
        id: 'NMC-002',
        index: '01',
        title: 'GRIND FIGHTER',
        subtitle: 'Hunger Games × Gladiator × Ghost in the Shell',
        tags: ['CYBERPUNK', 'ARENA', 'PROGRESSION'],
        accentColor: '#ff8c42',
        royalRoadUrl: 'https://www.royalroad.com/fiction/138724/grind-fighter-hunger-games-gladiator-ghost-in',
        youtubeId: '',
        youtubeLabel: 'LATEST DROP',
        coverArt: '/covers/grind-fighter.png',
    },
    {
        id: 'NMC-001',
        index: '02',
        title: 'STAR WYRMS',
        subtitle: 'Top Gun × Attack on Titan × Space Dragons',
        tags: ['MILITARY SCI-FI', 'SPACE OPERA', 'PROGRESSION'],
        accentColor: '#4fc3f7',
        royalRoadUrl: 'https://www.royalroad.com/fiction/146773/star-wyrms-top-gun-attack-on-titan-space-dragons',
        youtubeId: '',
        youtubeLabel: 'LATEST DROP',
        coverArt: '/covers/star-wyrms.jpg',
    },
];
