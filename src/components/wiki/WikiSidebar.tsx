import Link from 'next/link';
import { getAllArticles, getRelatedArticles } from '@/lib/wiki';
import { CATEGORY_COLORS } from '@/lib/wiki-colors';
import { WikiFrontmatter } from '@/types/wiki';

interface WikiSidebarProps {
  currentSlug: string;
  category: WikiFrontmatter['category'];
  relatedSlugs: string[];
}

const ALL_CATEGORIES: WikiFrontmatter['category'][] = [
  'lore', 'characters', 'factions', 'locations', 'technology',
];

export default async function WikiSidebar({ currentSlug, category, relatedSlugs }: WikiSidebarProps) {
  const [allArticles, relatedArticles] = await Promise.all([
    getAllArticles(),
    getRelatedArticles(relatedSlugs),
  ]);

  // Count per category
  const counts = ALL_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = allArticles.filter(a => a.frontmatter.category === cat).length;
    return acc;
  }, {});

  return (
    <>
      <style>{`
        .wiki-sidebar {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .wiki-sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .wiki-sidebar-heading {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(232,232,232,0.35);
          border-bottom: 1px solid rgba(232,232,232,0.06);
          padding-bottom: 8px;
          margin: 0;
        }
        .wiki-cat-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .wiki-cat-item a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-radius: 1px;
          text-decoration: none;
          transition: background 0.15s;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(232,232,232,0.45);
          border: 1px solid transparent;
        }
        .wiki-cat-item a:hover {
          background: rgba(255,255,255,0.04);
          color: rgba(232,232,232,0.8);
        }
        .wiki-cat-item.active a {
          border-color: rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
        }
        .wiki-cat-count {
          font-size: 9px;
          opacity: 0.5;
        }
        .wiki-related-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .wiki-related-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 10px 12px;
          border: 1px solid rgba(232,232,232,0.07);
          border-radius: 2px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          background: rgba(10,10,10,0.4);
        }
        .wiki-related-item:hover {
          border-color: rgba(232,232,232,0.15);
          background: rgba(10,10,10,0.7);
        }
        .wiki-related-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 0.75rem;
          color: #e8e8e8;
          margin: 0;
        }
        .wiki-related-desc {
          font-size: 11px;
          color: rgba(232,232,232,0.45);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>

      <aside className="wiki-sidebar">
        {/* Category nav */}
        <div className="wiki-sidebar-section">
          <p className="wiki-sidebar-heading">Categories</p>
          <ul className="wiki-cat-list">
            <li className="wiki-cat-item">
              <Link href="/wiki">
                <span style={{ color: 'rgba(232,232,232,0.7)' }}>ALL</span>
                <span className="wiki-cat-count">{allArticles.length}</span>
              </Link>
            </li>
            {ALL_CATEGORIES.map(cat => {
              const color = CATEGORY_COLORS[cat];
              const isActive = cat === category;
              return (
                <li key={cat} className={`wiki-cat-item${isActive ? ' active' : ''}`}>
                  <Link href={`/wiki?category=${cat}`} style={isActive ? { color } : {}}>
                    <span style={isActive ? { color } : {}}>{cat.toUpperCase()}</span>
                    <span className="wiki-cat-count">{counts[cat] ?? 0}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="wiki-sidebar-section">
            <p className="wiki-sidebar-heading">Related</p>
            <div className="wiki-related-list">
              {relatedArticles.slice(0, 4).map(article => (
                <Link key={article.slug} href={`/wiki/${article.slug}`} className="wiki-related-item">
                  <p className="wiki-related-title">{article.frontmatter.title}</p>
                  <p className="wiki-related-desc">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
