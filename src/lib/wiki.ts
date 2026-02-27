import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { cache } from 'react';
import { WikiArticle, WikiArticleFull, WikiFrontmatter } from '@/types/wiki';
import { CATEGORY_COLORS, SERIES_COLORS } from '@/lib/wiki-colors';

export { CATEGORY_COLORS, SERIES_COLORS };


const WIKI_DIR = path.join(process.cwd(), 'content', 'wiki');

/** Converts Obsidian wikilinks to markdown links */
function transformWikilinks(content: string): string {
    return content.replace(/\[\[([^\]]+)\]\]/g, (_, title: string) => {
        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return `[${title}](/wiki/${slug})`;
    });
}

/** Strips MDX/markdown syntax and returns plain text excerpt */
function extractExcerpt(content: string, length = 160): string {
    const plain = content
        // Remove frontmatter
        .replace(/^---[\s\S]*?---\s*/m, '')
        // Remove import/export statements
        .replace(/^(import|export).*$/gm, '')
        // Remove MDX/JSX tags
        .replace(/<[^>]+>/g, '')
        // Remove markdown headers
        .replace(/^#{1,6}\s+/gm, '')
        // Remove bold/italic
        .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
        // Remove links
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        // Collapse whitespace
        .replace(/\s+/g, ' ')
        .trim();
    return plain.slice(0, length) + (plain.length > length ? '…' : '');
}

function parseArticle(filename: string): WikiArticle {
    const slug = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(WIKI_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as WikiFrontmatter;
    const rt = readingTime(content);
    const readingTimeStr = rt.minutes < 1 ? '< 1 min read' : `${Math.ceil(rt.minutes)} min read`;

    return {
        slug,
        frontmatter,
        readingTime: readingTimeStr,
        excerpt: extractExcerpt(content),
    };
}

function getFilenames(): string[] {
    if (!fs.existsSync(WIKI_DIR)) return [];
    return fs.readdirSync(WIKI_DIR).filter(f => /\.mdx?$/.test(f));
}

/** Returns metadata for all articles, sorted alphabetically by title */
export const getAllArticles = cache(async (): Promise<WikiArticle[]> => {
    const filenames = getFilenames();
    const articles = filenames.map(parseArticle);
    return articles.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
});

/** Returns full article data including raw MDX content */
export const getArticleBySlug = cache(async (slug: string): Promise<WikiArticleFull | null> => {
    const filename = `${slug}.mdx`;
    const filePath = path.join(WIKI_DIR, filename);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = data as WikiFrontmatter;
    const rt = readingTime(content);
    const readingTimeStr = rt.minutes < 1 ? '< 1 min read' : `${Math.ceil(rt.minutes)} min read`;
    const transformed = transformWikilinks(content);

    return {
        slug,
        frontmatter,
        readingTime: readingTimeStr,
        excerpt: extractExcerpt(content),
        content: transformed,
    };
});

/** Returns all unique tags across all articles */
export const getAllTags = cache(async (): Promise<string[]> => {
    const articles = await getAllArticles();
    const tagSet = new Set<string>();
    articles.forEach(a => a.frontmatter.tags?.forEach(t => tagSet.add(t)));
    return Array.from(tagSet).sort();
});

/** Returns all articles in a given category */
export const getArticlesByCategory = cache(async (category: string): Promise<WikiArticle[]> => {
    const articles = await getAllArticles();
    return articles.filter(a => a.frontmatter.category === category);
});

/** Returns articles whose slugs appear in the related array */
export const getRelatedArticles = cache(async (slugs: string[]): Promise<WikiArticle[]> => {
    if (!slugs || slugs.length === 0) return [];
    const articles = await getAllArticles();
    return articles.filter(a => slugs.includes(a.slug));
});
