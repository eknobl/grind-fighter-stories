export interface WikiFrontmatter {
    title: string;
    category: 'locations' | 'characters' | 'factions' | 'technology' | 'lore';
    tags: string[];
    description: string;
    related?: string[];
    series?: 'grind-fighter' | 'star-wyrms' | 'shared';
    status?: 'complete' | 'stub';
}

export interface WikiArticle {
    slug: string;
    frontmatter: WikiFrontmatter;
    readingTime: string;   // e.g. "3 min read"
    excerpt: string;       // first 160 chars of plain text content
}

export interface WikiArticleFull extends WikiArticle {
    content: string;       // raw MDX string, for rendering with next-mdx-remote
}
