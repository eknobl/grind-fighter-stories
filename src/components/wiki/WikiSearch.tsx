'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { WikiArticle } from '@/types/wiki';
import { CATEGORY_COLORS } from '@/lib/wiki-colors';

interface WikiSearchProps {
    articles: WikiArticle[];
}

export default function WikiSearch({ articles }: WikiSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<WikiArticle[]>([]);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const fuse = useRef(
        new Fuse(articles, {
            threshold: 0.35,
            keys: ['frontmatter.title', 'frontmatter.description', 'frontmatter.tags'],
        })
    );

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setOpen(false);
            return;
        }
        const hits = fuse.current.search(query).map(r => r.item).slice(0, 8);
        setResults(hits);
        setOpen(true);
    }, [query]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setQuery('');
                setOpen(false);
                inputRef.current?.blur();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <>
            <style>{`
        .wiki-search-wrap {
          position: relative;
        }
        .wiki-search-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 7px 12px;
          border-radius: 2px;
          transition: border-color 0.2s;
        }
        .wiki-search-input-row:focus-within {
          border-color: rgba(255,255,255,0.5);
        }
        .wiki-search-prefix {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 12px;
          color: rgba(232,232,232,0.3);
          user-select: none;
          flex-shrink: 0;
        }
        .wiki-search-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 12px;
          letter-spacing: 1px;
          color: #e8e8e8;
          width: 220px;
        }
        .wiki-search-input::placeholder {
          color: rgba(232,232,232,0.25);
          letter-spacing: 2px;
        }
        .wiki-search-results {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          background: #0d0d0d;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 2px;
          z-index: 50;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        }
        .wiki-search-result {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          cursor: pointer;
          transition: background 0.15s;
          text-decoration: none;
          color: inherit;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .wiki-search-result:last-child {
          border-bottom: none;
        }
        .wiki-search-result:hover {
          background: rgba(255,255,255,0.04);
        }
        .wiki-result-title {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 12px;
          color: #e8e8e8;
          flex: 1;
        }
        .wiki-result-badge {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 2px 5px;
          border-radius: 1px;
          border: 1px solid;
          flex-shrink: 0;
        }
        .wiki-search-empty {
          padding: 14px;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.25);
          text-align: center;
        }
      `}</style>

            <div className="wiki-search-wrap" ref={containerRef}>
                <div className="wiki-search-input-row">
                    <span className="wiki-search-prefix">&gt;_</span>
                    <input
                        ref={inputRef}
                        className="wiki-search-input"
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="SEARCH ARCHIVE..."
                        aria-label="Search wiki"
                    />
                </div>

                {open && (
                    <div className="wiki-search-results" role="listbox">
                        {results.length === 0 ? (
                            <div className="wiki-search-empty">NO SIGNAL</div>
                        ) : (
                            results.map(article => {
                                const color = CATEGORY_COLORS[article.frontmatter.category];
                                return (
                                    <a
                                        key={article.slug}
                                        href={`/wiki/${article.slug}`}
                                        className="wiki-search-result"
                                        onClick={() => {
                                            setQuery('');
                                            setOpen(false);
                                            router.push(`/wiki/${article.slug}`);
                                        }}
                                        role="option"
                                    >
                                        <span className="wiki-result-title">{article.frontmatter.title}</span>
                                        <span
                                            className="wiki-result-badge"
                                            style={{ color, borderColor: `${color}60` }}
                                        >
                                            {article.frontmatter.category}
                                        </span>
                                    </a>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
