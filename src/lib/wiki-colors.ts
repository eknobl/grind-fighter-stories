/**
 * Color maps for wiki categories and series.
 * This file is client-safe (no Node.js dependencies).
 */

export type WikiCategory = 'locations' | 'characters' | 'factions' | 'technology' | 'lore';

export const CATEGORY_COLORS: Record<WikiCategory, string> = {
    characters: '#4fc3f7',
    factions: '#ff8c42',
    locations: '#4ade80',
    technology: '#c084fc',
    lore: '#f9d72f',
};

export const SERIES_COLORS: Record<string, string> = {
    'grind-fighter': '#ff8c42',
    'star-wyrms': '#4fc3f7',
    'shared': '#e8e8e8',
};
