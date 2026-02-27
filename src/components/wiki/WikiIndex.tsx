'use client';

import { WikiArticle } from '@/types/wiki';
import WikiCard from './WikiCard';

interface WikiIndexProps {
    articles: WikiArticle[];
}

export default function WikiIndex({ articles }: WikiIndexProps) {
    return (
        <>
            <style>{`
        .wiki-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .wiki-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 24px;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 12px;
          letter-spacing: 3px;
          color: rgba(232,232,232,0.2);
        }
      `}</style>

            <div className="wiki-grid">
                {articles.length === 0 ? (
                    <div className="wiki-empty">NO ENTRIES FOUND</div>
                ) : (
                    articles.map((article, i) => (
                        <WikiCard key={article.slug} article={article} index={i} />
                    ))
                )}
            </div>
        </>
    );
}
