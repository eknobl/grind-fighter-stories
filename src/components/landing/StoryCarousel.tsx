'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Story } from '@/data/stories';

interface StoryCarouselProps {
    stories: Story[];
}

export default function StoryCarousel({ stories }: StoryCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const story = stories[activeIndex];
    const total = stories.length;

    const goTo = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsTransitioning(false);
        }, 400);
    }, [isTransitioning]);

    const prev = useCallback(() => goTo((activeIndex - 1 + total) % total), [activeIndex, total, goTo]);
    const next = useCallback(() => goTo((activeIndex + 1) % total), [activeIndex, total, goTo]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [prev, next]);

    const counterLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    const accentColor = story.accentColor;
    const seriesName = story.id === 'NMC-002' ? 'GRIND FIGHTER' : story.id === 'NMC-001' ? 'STAR WYRMS' : story.title;
    const wikiTag = story.id === 'NMC-002' ? 'grind-fighter' : 'star-wyrms';

    return (
        <>
            <style>{`
        /* ── Carousel Panel ─────────────────────────────────── */
        .sc-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          position: relative;
          z-index: 5;
          padding: 20px 24px 16px;
          animation: sc-fadein 0.7s ease both;
          animation-delay: 0.5s;
          opacity: 0;
        }
        @keyframes sc-fadein {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Header Row ─────────────────────────────────────── */
        .sc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .sc-title-label {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: #e8e8e8;
          text-transform: uppercase;
        }
        .sc-counter-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sc-counter {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          color: rgba(232,232,232,0.45);
          letter-spacing: 2px;
        }
        .sc-arrow-btn {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(232,232,232,0.2);
          background: transparent;
          color: rgba(232,232,232,0.6);
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .sc-arrow-btn:hover {
          background: var(--sc-accent, #e8e8e8);
          color: #0d1117;
          border-color: var(--sc-accent, #e8e8e8);
        }

        /* ── Cover Art ──────────────────────────────────────── */
        .sc-cover-wrap {
          flex: 1 1 0;
          position: relative;
          overflow: hidden;
          border-top: 3px solid var(--sc-accent, #e8e8e8);
          min-height: 0;
        }
        .sc-cover-fade {
          opacity: ${isTransitioning ? 0 : 1};
          transition: opacity 0.4s ease;
          height: 100%;
          position: relative;
        }
        .sc-cover-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .sc-placeholder-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, var(--sc-accent-dim, rgba(232,232,232,0.06)) 0%, transparent 70%);
          pointer-events: none;
        }
        .sc-placeholder-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--sc-accent, #e8e8e8);
          letter-spacing: 0.12em;
          text-align: center;
          position: relative;
          z-index: 1;
          text-shadow: 0 0 60px var(--sc-accent, #e8e8e8), 0 0 20px var(--sc-accent, #e8e8e8);
          line-height: 1.1;
          padding: 0 20px;
        }
        .sc-cover-gradient {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(13,17,23,0.95) 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }
        .sc-tags {
          position: absolute;
          bottom: 12px; left: 12px;
          display: flex;
          gap: 6px;
          z-index: 3;
          flex-wrap: wrap;
        }
        .sc-tag {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.7);
          background: rgba(13,17,23,0.75);
          border: 1px solid rgba(232,232,232,0.15);
          padding: 2px 8px;
          text-transform: uppercase;
          border-radius: 0;
        }

        /* ── Info Row ───────────────────────────────────────── */
        .sc-info-row {
          flex-shrink: 0;
          padding: 10px 0 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .sc-info-text { flex: 1 1 0; min-width: 0; }
        .sc-story-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 1.3rem;
          font-weight: 900;
          color: #e8e8e8;
          margin: 0 0 4px;
          letter-spacing: 0.08em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sc-story-subtitle {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          color: rgba(232,232,232,0.45);
          letter-spacing: 1px;
        }
        .sc-read-btn {
          flex-shrink: 0;
          display: inline-block;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--sc-accent, #e8e8e8);
          border: 1px solid var(--sc-accent, #e8e8e8);
          padding: 8px 16px;
          text-decoration: none;
          text-transform: uppercase;
          border-radius: 0;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .sc-read-btn:hover {
          background: var(--sc-accent, #e8e8e8);
          color: #0d1117;
        }

        /* ── Bottom Split Row ───────────────────────────────── */
        .sc-bottom-row {
          flex-shrink: 0;
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0;
          min-height: 120px;
          border-top: 1px solid rgba(232,232,232,0.08);
        }
        .sc-bottom-divider {
          background: rgba(232,232,232,0.1);
          position: relative;
        }

        /* ── YouTube Column ─────────────────────────────────── */
        .sc-yt-col { padding: 10px 12px 10px 0; }
        .sc-yt-label {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.18);
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .sc-yt-frame-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
        }
        .sc-yt-frame-wrap iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          border: none;
        }
        .sc-yt-placeholder {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(232,232,232,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          height: 100%;
          min-height: 90px;
        }
        .sc-yt-placeholder-icon {
          font-size: 22px;
          color: rgba(232,232,232,0.18);
        }
        .sc-yt-placeholder-text {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.18);
          text-transform: uppercase;
        }

        /* ── Info Card Column ───────────────────────────────── */
        .sc-card-col { padding: 10px 0 10px 12px; }
        .sc-info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(232,232,232,0.1);
          padding: 10px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .sc-info-card-id {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          color: rgba(232,232,232,0.3);
          letter-spacing: 2px;
        }
        .sc-info-card-series {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 10px;
          color: rgba(232,232,232,0.6);
          letter-spacing: 0.08em;
          flex: 1;
        }
        .sc-info-card-link {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--sc-accent, #e8e8e8);
          text-decoration: none;
          text-transform: uppercase;
          display: block;
          transition: opacity 0.2s;
        }
        .sc-info-card-link:hover { opacity: 0.7; }

        /* ── Transition dots ────────────────────────────────── */
        .sc-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 8px 0 0;
          flex-shrink: 0;
        }
        .sc-dot {
          width: 6px;
          height: 6px;
          border: 1px solid rgba(232,232,232,0.25);
          background: transparent;
          transition: background 0.3s, border-color 0.3s;
        }
        .sc-dot.active {
          background: var(--sc-accent, #e8e8e8);
          border-color: var(--sc-accent, #e8e8e8);
        }

        /* ── Mobile ─────────────────────────────────────────── */
        @media (max-width: 767px) {
          .sc-panel { padding: 16px; overflow: visible; }
          .sc-bottom-row { grid-template-columns: 1fr; }
          .sc-bottom-divider { display: none; }
          .sc-card-col { padding: 10px 0 0; }
          .sc-yt-col { padding: 10px 0; }
          .sc-yt-frame-wrap { padding-top: 56.25%; }
        }
      `}</style>

            <div
                className="sc-panel"
                style={{
                    ['--sc-accent' as string]: accentColor,
                    ['--sc-accent-dim' as string]: `${accentColor}18`,
                }}
            >
                {/* ── Header Row ──────────────────────────────────── */}
                <div className="sc-header">
                    <span className="sc-title-label">THE STORIES &gt;&gt;</span>
                    <div className="sc-counter-wrap">
                        <span className="sc-counter">{counterLabel}</span>
                        <button className="sc-arrow-btn" onClick={prev} aria-label="Previous story">←</button>
                        <button className="sc-arrow-btn" onClick={next} aria-label="Next story">→</button>
                    </div>
                </div>

                {/* ── Cover Art ─────────────────────────────────────── */}
                <div className="sc-cover-wrap">
                    <div className="sc-cover-fade">
                        {story.coverArt ? (
                            <Image
                                src={story.coverArt}
                                alt={story.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        ) : (
                            <div className="sc-cover-placeholder">
                                <div className="sc-placeholder-glow" />
                                <p className="sc-placeholder-title">{story.title}</p>
                            </div>
                        )}
                        <div className="sc-cover-gradient" />
                        <div className="sc-tags">
                            {story.tags.map(tag => (
                                <span key={tag} className="sc-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Info Row ──────────────────────────────────────── */}
                <div className="sc-info-row">
                    <div className="sc-info-text">
                        <h2 className="sc-story-title">{story.title}</h2>
                        <p className="sc-story-subtitle">{story.subtitle}</p>
                    </div>
                    <a
                        href={story.royalRoadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sc-read-btn"
                    >
                        READ →
                    </a>
                </div>

                {/* ── Bottom Split Row ──────────────────────────────── */}
                <div className="sc-bottom-row">
                    {/* YouTube Column */}
                    <div className="sc-yt-col">
                        <p className="sc-yt-label">{story.youtubeLabel}</p>
                        {story.youtubeId ? (
                            <div className="sc-yt-frame-wrap">
                                <iframe
                                    src={`https://www.youtube.com/embed/${story.youtubeId}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`${story.title} — ${story.youtubeLabel}`}
                                />
                            </div>
                        ) : (
                            <div className="sc-yt-placeholder">
                                <span className="sc-yt-placeholder-icon">▶</span>
                                <span className="sc-yt-placeholder-text">VIDEO COMING SOON</span>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="sc-bottom-divider" />

                    {/* Info Card Column */}
                    <div className="sc-card-col">
                        <div className="sc-info-card">
                            <span className="sc-info-card-id">// {story.id}</span>
                            <span className="sc-info-card-series">{seriesName}</span>
                            <a
                                href={`/wiki?series=${wikiTag}`}
                                className="sc-info-card-link"
                            >
                                ENTER ARCHIVE →
                            </a>
                            {story.id === 'NMC-002' && (
                                <a href="/grind-fighter/arena" className="sc-info-card-link">
                                    ARENA →
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Transition Dots ───────────────────────────────── */}
                <div className="sc-dots">
                    {stories.map((_, i) => (
                        <div
                            key={i}
                            className={`sc-dot${i === activeIndex ? ' active' : ''}`}
                            onClick={() => goTo(i)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
