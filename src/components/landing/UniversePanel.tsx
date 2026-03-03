import { getAllArticles } from '@/lib/wiki';
import StarMapGlobeClient from './StarMapGlobeClient';

export default async function UniversePanel() {
  // Fetch the 2 most recent wiki articles for the Lore block
  let loreArticles: { title: string; excerpt: string }[] = [];
  try {
    const all = await getAllArticles();
    loreArticles = all.slice(0, 2).map(a => ({
      title: a.frontmatter.title,
      excerpt: a.excerpt ?? '',
    }));
  } catch {
    loreArticles = [
      { title: 'GRIND FIGHTER WORLD', excerpt: 'Neon-soaked megacities where gladiatorial augmentation decides everything.' },
      { title: 'STAR WYRMS WORLD', excerpt: 'The fractured alliance races across a dying galaxy to tame the Wyrms.' },
    ];
  }

  return (
    <>
      <style>{`
        /* ── Universe Panel Layout ─────────────────────────── */
        .up-panel {
          display: flex;
          flex-direction: column;
          gap: 0;
          height: 100%;
          padding: 28px 24px 24px;
          overflow: hidden;
          position: relative;
          z-index: 5;
          animation: up-fadein 0.6s ease both;
          animation-delay: 0.4s;
          opacity: 0;
        }
        @keyframes up-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Logo Block ────────────────────────────────────── */
        .up-logo-wrap { position: relative; margin-bottom: 10px; }
        .up-logo {
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 900;
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          color: #ffffff;
          letter-spacing: 0.15em;
          line-height: 1;
          margin: 0;
          position: relative;
          animation: logo-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes logo-in {
          from { letter-spacing: 0.4em; filter: blur(8px); opacity: 0; }
          to   { letter-spacing: 0.15em; filter: blur(0); opacity: 1; }
        }
        .up-logo::before,
        .up-logo::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          font-family: inherit; font-size: inherit;
          font-weight: inherit; letter-spacing: inherit;
          color: #fff;
          animation: glitch-fire 7s step-end infinite;
          animation-delay: 5s;
        }
        .up-logo::before {
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          transform: translateX(-3px);
          opacity: 0.7; color: #4fc3f7; mix-blend-mode: screen;
          animation-duration: 7s; animation-delay: 5.1s;
        }
        .up-logo::after {
          clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          transform: translateX(3px);
          opacity: 0.5; color: #ff8c42; mix-blend-mode: screen;
          animation-duration: 7.3s; animation-delay: 5s;
        }
        @keyframes glitch-fire {
          0%, 92%, 94%, 96%, 100% { opacity: 0; transform: translateX(0); }
          93% { opacity: 1; transform: translateX(-4px); }
          95% { opacity: 1; transform: translateX(4px); }
        }
        .up-cu-label {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 5px;
          color: rgba(232,232,232,0.18);
          text-transform: uppercase;
          margin-top: 6px;
          margin-bottom: 10px;
        }
        .up-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(232,232,232,0.2), transparent);
          margin-bottom: 10px;
        }
        .up-tagline {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          line-height: 1.8;
          color: rgba(232,232,232,0.45);
          font-style: italic;
          margin-bottom: 14px;
        }

        /* ── Year Block ────────────────────────────────────── */
        .up-year-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          margin-bottom: 14px;
          width: fit-content;
        }
        .up-year-bracket {
          position: absolute;
          pointer-events: none;
        }
        .up-year-bracket.tl {
          top: 0; left: 0;
          width: 14px; height: 14px;
          border-top: 1px solid rgba(232,232,232,0.5);
          border-left: 1px solid rgba(232,232,232,0.5);
        }
        .up-year-bracket.tr {
          top: 0; right: 0;
          width: 14px; height: 14px;
          border-top: 1px solid rgba(232,232,232,0.5);
          border-right: 1px solid rgba(232,232,232,0.5);
        }
        .up-year-bracket.bl {
          bottom: 0; left: 0;
          width: 14px; height: 14px;
          border-bottom: 1px solid rgba(232,232,232,0.5);
          border-left: 1px solid rgba(232,232,232,0.5);
        }
        .up-year-bracket.br {
          bottom: 0; right: 0;
          width: 14px; height: 14px;
          border-bottom: 1px solid rgba(232,232,232,0.5);
          border-right: 1px solid rgba(232,232,232,0.5);
        }
        .up-year-prefix {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 12px;
          color: rgba(232,232,232,0.18);
        }
        .up-year-num {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 1.4rem;
          color: #ffffff;
          letter-spacing: 0.08em;
        }
        .up-year-blink {
          font-size: 10px;
          color: #4fc3f7;
          animation: hf-blink-step 1.6s step-end infinite;
        }
        @keyframes hf-blink-step {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── Section Label ─────────────────────────────────── */
        .up-section-label {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(232,232,232,0.18);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* ── Star Map Block ────────────────────────────────── */
        .up-starmap-wrap {
          position: relative;
          height: 200px;
          margin-bottom: 14px;
          border: 1px solid rgba(232,232,232,0.08);
        }
        .up-starmap-bracket {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .up-starmap-bracket.tl { top: -1px; left: -1px; width: 20px; height: 20px; border-top: 1px solid rgba(232,232,232,0.45); border-left: 1px solid rgba(232,232,232,0.45); }
        .up-starmap-bracket.tr { top: -1px; right: -1px; width: 20px; height: 20px; border-top: 1px solid rgba(232,232,232,0.45); border-right: 1px solid rgba(232,232,232,0.45); }
        .up-starmap-bracket.bl { bottom: -1px; left: -1px; width: 20px; height: 20px; border-bottom: 1px solid rgba(232,232,232,0.45); border-left: 1px solid rgba(232,232,232,0.45); }
        .up-starmap-bracket.br { bottom: -1px; right: -1px; width: 20px; height: 20px; border-bottom: 1px solid rgba(232,232,232,0.45); border-right: 1px solid rgba(232,232,232,0.45); }

        /* ── Nav Links ─────────────────────────────────────── */
        .up-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 0;
          border-bottom: 1px solid rgba(232,232,232,0.08);
          text-decoration: none;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(232,232,232,0.45);
          text-transform: uppercase;
          transition: color 0.2s, border-color 0.2s, padding-left 0.2s;
          border-radius: 0;
        }
        .up-nav-link:hover {
          color: rgba(232,232,232,0.95);
          border-color: rgba(232,232,232,0.4);
          padding-left: 8px;
        }
        .up-nav-arrow {
          color: rgba(232,232,232,0.25);
          transition: color 0.2s;
        }
        .up-nav-link:hover .up-nav-arrow {
          color: rgba(232,232,232,0.9);
        }
        .up-nav-block { margin-bottom: 14px; }

        /* ── Lore Block ────────────────────────────────────── */
        .up-lore-entry {
          margin-bottom: 8px;
        }
        .up-lore-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 11px;
          color: rgba(232,232,232,0.8);
          letter-spacing: 0.08em;
          margin-bottom: 2px;
        }
        .up-lore-desc {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          color: rgba(232,232,232,0.3);
          line-height: 1.6;
        }
        .up-progress-bar-wrap {
          margin-top: 10px;
          height: 2px;
          background: rgba(232,232,232,0.06);
          position: relative;
          overflow: hidden;
        }
        .up-progress-bar-fill {
          position: absolute;
          left: 0; top: 0; height: 100%;
          background: rgba(232,232,232,0.25);
          animation: up-progress 2s cubic-bezier(0.4, 0, 0.2, 1) both;
          animation-delay: 1.2s;
        }
        @keyframes up-progress {
          from { width: 0%; }
          to   { width: 60%; }
        }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width: 767px) {
          .up-panel {
            padding: 20px 16px;
            overflow: visible;
          }
          .up-starmap-wrap { height: 140px; }
          .up-nav-block { display: flex; gap: 0; overflow-x: auto; }
          .up-nav-link {
            min-width: 130px;
            border-bottom: none;
            border-right: 1px solid rgba(232,232,232,0.08);
            padding: 8px 12px;
          }
          .up-nav-link:last-child { border-right: none; }
        }
      `}</style>

      <div className="up-panel">

        {/* ── Logo Block ─────────────────────────────────── */}
        <div className="up-logo-wrap">
          <h1 className="up-logo" data-text="NEURONOMICON">NEURONOMICON</h1>
        </div>
        <p className="up-cu-label">Cinematic Universe</p>
        <div className="up-rule" />
        <p className="up-tagline">
          Humanity built artificial gods to conquer the stars. They never explained why.
        </p>

        {/* ── Year Block ─────────────────────────────────── */}
        <div className="up-year-wrap">
          <div className="up-year-bracket tl" />
          <div className="up-year-bracket tr" />
          <div className="up-year-bracket bl" />
          <div className="up-year-bracket br" />
          <span className="up-year-prefix">//</span>
          <span className="up-year-num">2234</span>
          <span className="up-year-blink">■</span>
        </div>

        {/* ── Star Map Block ──────────────────────────────── */}
        <p className="up-section-label">⟨ STAR MAP ⟩</p>
        <div className="up-starmap-wrap">
          <div className="up-starmap-bracket tl" />
          <div className="up-starmap-bracket tr" />
          <div className="up-starmap-bracket bl" />
          <div className="up-starmap-bracket br" />
          <StarMapGlobeClient />
        </div>

        {/* ── Navigation Links ───────────────────────────── */}
        <p className="up-section-label">⟨ NAVIGATE ⟩</p>
        <div className="up-nav-block">
          <a href="/wiki" className="up-nav-link">
            <span className="up-nav-arrow">→</span>
            ARCHIVE
          </a>
          <a href="/grind-fighter/arena" className="up-nav-link">
            <span className="up-nav-arrow">→</span>
            ARENA
          </a>
          <a href="#" className="up-nav-link">
            <span className="up-nav-arrow">→</span>
            NEWSLETTER
          </a>
        </div>

        {/* ── Lore Block ─────────────────────────────────── */}
        <p className="up-section-label">⟨ LORE ⟩</p>
        {loreArticles.map(article => (
          <div className="up-lore-entry" key={article.title}>
            <p className="up-lore-title">· {article.title}</p>
            <p className="up-lore-desc">{article.excerpt.slice(0, 90)}{article.excerpt.length > 90 ? '…' : ''}</p>
          </div>
        ))}
        <div className="up-progress-bar-wrap">
          <div className="up-progress-bar-fill" />
        </div>

      </div>
    </>
  );
}
