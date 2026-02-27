import { getAllArticles } from '@/lib/wiki';
import { CATEGORY_COLORS } from '@/lib/wiki-colors';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiIndex from '@/components/wiki/WikiIndex';
import WikiSearch from '@/components/wiki/WikiSearch';
import Link from 'next/link';
import type { Metadata } from 'next';
import { WikiFrontmatter } from '@/types/wiki';

export const metadata: Metadata = {
  title: 'ARCHIVE — NEURONOMICON WIKI',
  description: 'The official Neuronomicon lore database — characters, factions, locations, technology, and lore entries.',
};

const CATEGORIES: WikiFrontmatter['category'][] = ['lore', 'characters', 'factions', 'locations', 'technology'];

interface WikiPageProps {
  searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function WikiIndexPage({ searchParams }: WikiPageProps) {
  const params = await searchParams;
  const { category, tag } = params;

  const allArticles = await getAllArticles();

  const filtered = allArticles.filter(a => {
    if (category && a.frontmatter.category !== category) return false;
    if (tag && !a.frontmatter.tags?.includes(tag)) return false;
    return true;
  });

  return (
    <>
      <style>{`
        .wiki-index-root {
          min-height: 100vh;
          background: #050505;
          color: #c8c8c8;
          padding-top: 40px;
          position: relative;
          overflow: hidden;
        }
        /* Scanlines overlay */
        .wiki-index-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.06) 2px,
            rgba(0,0,0,0.06) 4px
          );
          pointer-events: none;
          z-index: 0;
        }
        /* Vignette */
        .wiki-index-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
          z-index: 0;
        }
        .wiki-index-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }
        .wiki-header {
          margin-bottom: 48px;
        }
        .wiki-header-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .wiki-title-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .wiki-eyebrow {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(249,215,47,0.7);
          text-transform: uppercase;
        }
        .wiki-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.12em;
          line-height: 1;
          margin: 0;
        }
        .wiki-subtitle {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.4);
          text-transform: uppercase;
          margin: 0;
        }
        .wiki-meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 8px;
        }
        .wiki-article-count {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.3);
        }
        .wiki-header-rule {
          height: 1px;
          background: linear-gradient(to right, rgba(249,215,47,0.4), transparent);
          margin-bottom: 24px;
        }
        .wiki-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .wiki-filter-pill {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 1px;
          border: 1px solid;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
      `}</style>

      <div className="wiki-index-root">
        <div className="wiki-index-inner">
          {/* Header */}
          <header className="wiki-header">
            <div className="wiki-header-top">
              <div className="wiki-title-block">
                <p className="wiki-eyebrow">neuronomicon.world / lore database</p>
                <h1 className="wiki-title">ARCHIVE</h1>
                <p className="wiki-subtitle">World-building · Lore · Characters · Factions</p>
                <div className="wiki-meta-row">
                  <span className="wiki-article-count">
                    {filtered.length} ENTR{filtered.length !== 1 ? 'IES' : 'Y'}&nbsp;
                    {(category || tag) ? `— FILTERED` : ''}
                  </span>
                </div>
              </div>
              <WikiSearch articles={allArticles} />
            </div>
            <div className="wiki-header-rule" />

            {/* Category filter pills */}
            <nav className="wiki-filters" aria-label="Category filter">
              <Link
                href="/wiki"
                className="wiki-filter-pill"
                style={{
                  color: !category ? '#050505' : 'rgba(232,232,232,0.5)',
                  borderColor: !category ? '#e8e8e8' : 'rgba(232,232,232,0.15)',
                  background: !category ? '#e8e8e8' : 'transparent',
                }}
              >
                ALL
              </Link>
              {CATEGORIES.map(cat => {
                const color = CATEGORY_COLORS[cat];
                const isActive = category === cat;
                return (
                  <Link
                    key={cat}
                    href={`/wiki?category=${cat}`}
                    className="wiki-filter-pill"
                    style={{
                      color: isActive ? '#050505' : color,
                      borderColor: isActive ? color : `${color}60`,
                      background: isActive ? color : 'transparent',
                    }}
                  >
                    {cat.toUpperCase()}
                  </Link>
                );
              })}
            </nav>
          </header>

          <WikiIndex articles={filtered} />
        </div>
      </div>
    </>
  );
}
