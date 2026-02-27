'use client';

import Link from 'next/link';
import { WikiArticle } from '@/types/wiki';
import { CATEGORY_COLORS, SERIES_COLORS } from '@/lib/wiki-colors';

interface WikiCardProps {
  article: WikiArticle;
  index?: number;
  compact?: boolean;
}

export default function WikiCard({ article, index = 0, compact = false }: WikiCardProps) {
  const { frontmatter, slug, readingTime, excerpt } = article;
  const categoryColor = CATEGORY_COLORS[frontmatter.category] ?? '#e8e8e8';
  const seriesColor = frontmatter.series ? SERIES_COLORS[frontmatter.series] : null;
  const isStub = frontmatter.status === 'stub';

  return (
    <>
      <style>{`
        @keyframes wiki-card-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wiki-card {
          position: relative;
          background: rgba(10,10,10,0.6);
          border: 1px solid rgba(232,232,232,0.08);
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          animation: wiki-card-in 0.5s ease both;
          text-decoration: none;
          color: inherit;
        }
        .wiki-card:hover {
          background: rgba(10,10,10,0.85);
        }
        .wiki-card.is-stub {
          opacity: 0.45;
        }
        .wiki-card-accent {
          height: 2px;
          width: 100%;
        }
        .wiki-card-body {
          padding: ${compact ? '14px 16px' : '18px 20px 20px'};
          display: flex;
          flex-direction: column;
          gap: ${compact ? '8px' : '10px'};
          flex: 1;
        }
        .wiki-card-badges {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .wiki-badge {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 1px;
          border: 1px solid;
        }
        .wiki-stub-badge {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 1px;
          border: 1px solid rgba(232,232,232,0.2);
          color: rgba(232,232,232,0.4);
        }
        .wiki-card-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: ${compact ? '0.85rem' : '1rem'};
          font-weight: 700;
          color: #e8e8e8;
          line-height: 1.3;
          margin: 0;
        }
        .wiki-card-desc {
          font-size: 12px;
          color: rgba(232,232,232,0.55);
          line-height: 1.6;
          margin: 0;
        }
        .wiki-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .wiki-tag {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 1.5px;
          color: rgba(232,232,232,0.5);
          border: 1px solid rgba(232,232,232,0.15);
          padding: 1px 5px;
          border-radius: 1px;
        }
        .wiki-card-footer {
          margin-top: auto;
          padding-top: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .wiki-card-time {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: rgba(232,232,232,0.3);
        }
        .wiki-card-enter {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.5);
          transition: color 0.2s;
        }
        .wiki-card:hover .wiki-card-enter {
          color: rgba(232,232,232,0.9);
        }
      `}</style>

      <Link
        href={`/wiki/${slug}`}
        className={`wiki-card ${isStub ? 'is-stub' : ''}`}
        style={{ animationDelay: `${(index ?? 0) * 0.07}s` }}
      >
        <div
          className="wiki-card-accent"
          style={{
            background: categoryColor,
            boxShadow: `0 0 8px ${categoryColor}80`,
          }}
        />
        <div className="wiki-card-body">
          <div className="wiki-card-badges">
            <span
              className="wiki-badge"
              style={{ color: categoryColor, borderColor: `${categoryColor}60` }}
            >
              {frontmatter.category}
            </span>
            {seriesColor && frontmatter.series && (
              <span
                className="wiki-badge"
                style={{ color: seriesColor, borderColor: `${seriesColor}60` }}
              >
                {frontmatter.series}
              </span>
            )}
            {isStub && <span className="wiki-stub-badge">STUB</span>}
          </div>

          <h3 className="wiki-card-title">{frontmatter.title}</h3>
          <p className="wiki-card-desc">{compact ? excerpt : frontmatter.description}</p>

          {!compact && frontmatter.tags?.length > 0 && (
            <div className="wiki-card-tags">
              {frontmatter.tags.map(tag => (
                <span key={tag} className="wiki-tag">{tag}</span>
              ))}
            </div>
          )}

          {!compact && (
            <div className="wiki-card-footer">
              {isStub ? (
                <span className="wiki-card-time">STUB</span>
              ) : (
                <span className="wiki-card-time">{readingTime}</span>
              )}
              <span className="wiki-card-enter">ENTER →</span>
            </div>
          )}
        </div>
      </Link>
    </>
  );
}
