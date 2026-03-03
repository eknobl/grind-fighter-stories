'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Story } from '@/data/stories';
import { svgPaths } from './hud-svg-paths';

interface StoryCarouselProps {
  stories: Story[];
}

// ── SVG Decorations ──────────────────────────────────────────────────────────

function NotchedBox({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="44" height="42" viewBox="0 0 51 48" fill="none">
      {filled ? (
        <path d={svgPaths.p341b4680} fill="white" />
      ) : (
        <path d={svgPaths.p2ee73180} stroke="white" strokeOpacity="0.6" />
      )}
    </svg>
  );
}

function ModuleFrame() {
  return (
    <svg
      viewBox="0 0 169 168"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      fill="none"
    >
      <path d={svgPaths.p244b8f80} stroke="white" strokeOpacity="0.6" />
    </svg>
  );
}

// ── Carousel ─────────────────────────────────────────────────────────────────

export default function StoryCarousel({ stories }: StoryCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const switchTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setVisible(true);
    }, 380);
  }, []);

  // Auto-cycle every 5.5 s (matches Figma)
  useEffect(() => {
    const interval = setInterval(() => {
      switchTo((activeIdx + 1) % stories.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [activeIdx, switchTo, stories.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') switchTo((activeIdx - 1 + stories.length) % stories.length);
      if (e.key === 'ArrowRight') switchTo((activeIdx + 1) % stories.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIdx, switchTo, stories.length]);

  const story = stories[activeIdx];
  const fade: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.38s ease',
  };

  return (
    <>
      <style>{`
        .sc-panel {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.5vh, 16px);
          height: 100%;
          padding: clamp(50px, 6vh, 90px) clamp(24px, 3.5vw, 60px) clamp(30px, 4vh, 60px);
          overflow: hidden;
          position: relative;
          z-index: 5;
          opacity: 0;
          animation: sc-fadein 0.7s ease 0.5s both;
        }
        @keyframes sc-fadein {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Header row */
        .sc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .sc-header-label {
          font-family: 'Roboto', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          color: #fff;
        }
        .sc-counter {
          font-family: var(--font-orbitron), 'Orbitron', sans-serif;
          font-size: 12px;
          color: #fff;
          letter-spacing: 2px;
        }

        /* Cover */
        .sc-cover-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .sc-cover-img {
          width: 100%;
          display: block;
          aspect-ratio: 3/2;
          object-fit: cover;
        }
        .sc-cover-placeholder {
          width: 100%;
          aspect-ratio: 3/2;
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .sc-cover-placeholder-title {
          font-family: var(--font-orbitron), 'Orbitron', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 900;
          color: var(--sc-accent, #fff);
          text-shadow: 0 0 60px var(--sc-accent, #fff);
          letter-spacing: 0.1em;
          text-align: center;
          padding: 0 20px;
        }

        /* Bottom row: video + module */
        .sc-bottom-row {
          display: grid;
          grid-template-columns: 62% 1fr;
          gap: 12px;
        }

        /* Video */
        .sc-video-wrap {
          position: relative;
          border-radius: 0;
          overflow: hidden;
        }
        .sc-video-img {
          width: 100%;
          display: block;
          aspect-ratio: 16/9;
          object-fit: cover;
        }
        .sc-video-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-direction: column;
        }
        .sc-video-placeholder-text {
          font-family: var(--font-mono-nmc), 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.3);
          text-transform: uppercase;
        }
        .sc-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.15);
        }

        /* Module info box */
        .sc-module-wrap {
          position: relative;
          min-height: 80px;
        }
        .sc-module-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 14px 18px;
        }
        .sc-module-title {
          font-family: 'Roboto', sans-serif;
          font-size: clamp(11px, 1vw, 14px);
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
          margin: 0;
          white-space: pre-line;
        }

        /* Nav / dots row */
        .sc-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sc-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .sc-dot {
          height: 4px;
          background: rgba(255,255,255,0.28);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.35s ease;
        }
        .sc-dot.active {
          width: 28px;
          background: #fff;
        }
        .sc-dot:not(.active) {
          width: 8px;
        }
        .sc-decorations {
          display: flex;
          gap: 0;
          align-items: center;
        }
        .sc-deco-sep {
          width: 3px; height: 44px;
          background: white; opacity: 0.4;
          margin: 0 2px;
        }

        @media (max-width: 767px) {
          .sc-panel { overflow: visible; }
          .sc-bottom-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sc-panel">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="sc-header">
          <span className="sc-header-label">THE STORIES &gt;&gt;</span>
          <span className="sc-counter" style={fade}>{story.id === 'NMC-002' ? '01::01' : '01::02'}</span>
        </div>

        {/* ── Cover ────────────────────────────────────────── */}
        <a href={story.royalRoadUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', ...fade }}>
          {story.coverArt ? (
            <div className="sc-cover-wrap">
              <Image
                src={story.coverArt}
                alt={story.title}
                width={900}
                height={600}
                className="sc-cover-img"
                priority
              />
            </div>
          ) : (
            <div className="sc-cover-placeholder">
              <p className="sc-cover-placeholder-title">{story.title}</p>
            </div>
          )}
        </a>

        {/* ── Bottom: video + module ────────────────────────── */}
        <div className="sc-bottom-row" style={fade}>
          {/* Video left */}
          <div>
            {story.youtubeId ? (
              <div className="sc-video-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${story.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={story.title}
                  style={{ width: '100%', aspectRatio: '16/9', border: 'none', display: 'block' }}
                />
              </div>
            ) : (
              <div className="sc-video-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" />
                  <path d="M10 8l6 4-6 4V8z" fill="rgba(255,255,255,0.4)" />
                </svg>
                <span className="sc-video-placeholder-text">VIDEO COMING SOON</span>
              </div>
            )}
          </div>

          {/* Module right */}
          <div className="sc-module-wrap">
            <ModuleFrame />
            <div className="sc-module-inner">
              <p className="sc-module-title">
                {story.id === 'NMC-002' ? 'Grind Fighters:\nFirst Circle' : 'Star Wyrms:\nFirst Contact'}
              </p>
            </div>
          </div>
        </div>

        {/* ── Nav row ───────────────────────────────────────── */}
        <div className="sc-nav-row">
          {/* Story dots */}
          <div className="sc-dots">
            {stories.map((s, i) => (
              <button
                key={s.id}
                className={`sc-dot${i === activeIdx ? ' active' : ''}`}
                onClick={() => switchTo(i)}
                aria-label={`Switch to ${s.title}`}
              />
            ))}
          </div>

          {/* Decorative notched boxes */}
          <div className="sc-decorations">
            <NotchedBox filled={false} />
            <div className="sc-deco-sep" />
            <NotchedBox filled={true} />
            <NotchedBox filled={false} />
          </div>
        </div>

      </div>
    </>
  );
}
