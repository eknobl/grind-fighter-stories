import StarMapGlobeClient from './StarMapGlobeClient';
import { getAllArticles } from '@/lib/wiki';
import { svgPaths } from './hud-svg-paths';

// ── SVG Decoration Components ────────────────────────────────────────────────

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

function DiagStripes() {
  return (
    <svg width="38" height="50" viewBox="0 0 38 49.5" fill="none" style={{ flexShrink: 0 }}>
      <path d="M38 40L28.5 49.5H38V40Z" fill="white" />
      <path d={svgPaths.p16bcc580} fill="white" />
      <path d={svgPaths.p179c2600} fill="white" />
      <path d="M0 11V22.5L22 0H11L0 11Z" fill="white" />
    </svg>
  );
}

function DoubleChevron() {
  return (
    <div style={{ display: 'flex' }}>
      <svg width="44" height="32" viewBox="0 0 45.4863 34" fill="none">
        <path d={svgPaths.p1965e080} fill="white" />
      </svg>
      <svg width="44" height="32" viewBox="0 0 45.4863 34" fill="none">
        <path d={svgPaths.p35ad93c0} fill="white" />
      </svg>
    </div>
  );
}

function ArrowBracket() {
  return (
    <svg width="32" height="32" viewBox="0 0 35 34.5654" fill="none">
      <path d={svgPaths.p231b9000} fill="white" />
    </svg>
  );
}

function TickBar() {
  const ticks = Array.from({ length: 44 }, (_, i) => i * 3);
  return (
    <svg
      viewBox="0 0 354 12"
      fill="none"
      style={{ width: '100%', maxWidth: '354px', height: '12px', display: 'block' }}
    >
      {ticks.map((x) => (
        <line
          key={x}
          x1={x + 0.5}
          x2={x + 0.5}
          y1="0"
          y2="12"
          stroke="white"
          strokeOpacity="0.5"
        />
      ))}
      <path d={svgPaths.p2ac91cb0} fill="white" fillOpacity="0.5" stroke="white" strokeOpacity="0.5" />
    </svg>
  );
}

function StarMapFrame() {
  return (
    <svg
      viewBox="0 0 426 145"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      fill="none"
    >
      <path d={svgPaths.p2199a180} stroke="white" strokeOpacity="0.7" />
    </svg>
  );
}

// ── Universe Panel ────────────────────────────────────────────────────────────

export default async function UniversePanel() {
  let worldItems: { title: string; url: string }[] = [];
  try {
    const all = await getAllArticles();
    worldItems = all.slice(0, 2).map(a => ({
      title: a.frontmatter.title,
      url: `/wiki/${a.slug}`,
    }));
  } catch {
    worldItems = [
      { title: 'Nano Banana 2 is here, and brings precision over hype: steal these prompts', url: 'https://www.youtube.com/@NeuronomiconTV' },
      { title: 'Kling 3.0 Omni is a wild tool. This is how I used to generate cinematic trailers', url: 'https://www.youtube.com/@NeuronomiconTV' },
    ];
  }

  return (
    <>
      <style>{`
        .up-panel {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vh, 28px);
          height: 100%;
          padding: clamp(50px, 6vh, 90px) clamp(24px, 3.5vw, 60px) clamp(30px, 4vh, 60px);
          overflow: hidden;
          position: relative;
          z-index: 5;
          opacity: 0;
          animation: up-fadein 0.6s ease 0.4s both;
        }
        @keyframes up-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Logo */
        .up-logo {
          font-family: 'Roboto', 'Arial Black', sans-serif;
          font-size: clamp(22px, 3.2vw, 47px);
          font-weight: 900;
          color: #fff;
          margin: 0;
          line-height: 1;
          letter-spacing: 0.01em;
          position: relative;
        }
        .up-logo::before, .up-logo::after {
          content: attr(data-text);
          position: absolute; inset: 0;
          font-family: inherit; font-size: inherit;
          font-weight: inherit; letter-spacing: inherit;
          color: #fff;
        }
        .up-logo::before {
          animation: glitch-1 7s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 38%, 0 38%);
          transform: translate(-3px, 0);
          opacity: 0.4;
        }
        .up-logo::after {
          animation: glitch-2 7s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
          transform: translate(3px, 0);
          opacity: 0.4;
        }
        @keyframes glitch-1 {
          0%,94%,100% { transform: translate(0); opacity: 0; }
          95%          { transform: translate(-4px, 1px); opacity: 0.5; filter: hue-rotate(180deg); }
          96%          { transform: translate(4px, -1px); opacity: 0.3; }
          97%          { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch-2 {
          0%,95%,100% { transform: translate(0); opacity: 0; }
          96%          { transform: translate(4px, -2px); opacity: 0.4; filter: hue-rotate(-90deg); }
          97%          { transform: translate(-2px, 1px); opacity: 0.3; }
          98%          { transform: translate(0); opacity: 0; }
        }

        /* Subtitle */
        .up-subtitle {
          font-family: 'Roboto', sans-serif;
          font-size: clamp(11px, 1.2vw, 18px);
          font-weight: 700;
          color: #fff;
          margin: 6px 0 0;
          line-height: 1.4;
        }

        /* Year row */
        .up-year-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Section label */
        .up-section-label {
          font-family: 'Roboto', sans-serif;
          font-size: 12px;
          letter-spacing: 1px;
          color: #fff;
          margin-bottom: 8px;
        }

        /* Orbitron year */
        .up-year-num {
          font-family: var(--font-orbitron), 'Orbitron', sans-serif;
          font-size: clamp(24px, 3.2vw, 47px);
          font-weight: 400;
          color: #fff;
          line-height: 1;
        }

        /* Star map */
        .up-starmap-block {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .up-starmap-globe-wrap {
          flex: 1;
          position: relative;
          aspect-ratio: 3/1;
          overflow: hidden;
        }

        /* World building */
        .up-world-block {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .up-world-left {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 20px;
        }
        .up-world-sep {
          width: 44px; height: 3px;
          background: white; opacity: 0.5;
          margin: 2px 0;
        }
        .up-article-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .up-article-row {
          display: flex;
          align-items: stretch;
          gap: 8px;
        }
        .up-article-link {
          flex: 1;
          background: #ffffff;
          color: #2d3540;
          font-family: 'Roboto', sans-serif;
          font-size: clamp(11px, 0.95vw, 14px);
          font-weight: 700;
          padding: 10px 14px;
          text-decoration: none;
          line-height: 1.3;
          display: flex;
          align-items: center;
          border-radius: 0;
        }

        /* LORE */
        .up-lore-block {
          margin-top: auto;
        }
        .up-lore-title {
          font-family: var(--font-orbitron), 'Orbitron', sans-serif;
          font-size: clamp(18px, 2.2vw, 28px);
          font-weight: 400;
          color: #fff;
          margin: 0 0 10px;
        }

        /* Socials */
        .up-social-row {
          display: flex;
          gap: 28px;
          padding-top: 12px;
        }
        .up-social-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: rgba(232,232,232,0.35);
          text-decoration: none;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: color 0.2s;
          font-family: var(--font-mono-nmc), 'Share Tech Mono', monospace;
        }
        .up-social-link:hover { color: #fff; }
        .up-social-link svg { flex-shrink: 0; }

        @media (max-width: 767px) {
          .up-panel { gap: 16px; overflow: visible; }
          .up-starmap-globe-wrap { aspect-ratio: 2/1; }
        }
      `}</style>

      <div className="up-panel">

        {/* ── Title ─────────────────────────────────────────── */}
        <div>
          <h1 className="up-logo" data-text="NEURONOMICON">NEURONOMICON</h1>
          <p className="up-subtitle">
            Humanity built artificial gods to conquer the stars.<br />
            They never explained why.
          </p>
        </div>

        {/* ── Year + chevrons ───────────────────────────────── */}
        <div className="up-year-row">
          <DoubleChevron />
          <span className="up-year-num">2234</span>
          <ArrowBracket />
        </div>

        {/* ── Star Map ──────────────────────────────────────── */}
        <div className="up-starmap-block">
          <div style={{ flexShrink: 0, paddingTop: '20px' }}>
            <NotchedBox filled={false} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="up-section-label">STAR MAP &gt;&gt;</p>
            <div className="up-starmap-globe-wrap">
              <StarMapGlobeClient />
              <StarMapFrame />
            </div>
          </div>
        </div>

        {/* ── World Building ────────────────────────────────── */}
        <div className="up-world-block">
          <div className="up-world-left">
            <NotchedBox filled={true} />
            <div className="up-world-sep" />
            <NotchedBox filled={false} />
          </div>
          <div style={{ flex: 1 }}>
            <p className="up-section-label">WORLD BUILDING &gt;&gt;</p>
            <div className="up-article-list">
              {worldItems.map((item, i) => (
                <div key={i} className="up-article-row">
                  <a
                    href={item.url}
                    className="up-article-link"
                  >
                    {item.title}
                  </a>
                  <DiagStripes />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LORE + TickBar ────────────────────────────────── */}
        <div className="up-lore-block">
          <p className="up-lore-title">LORE</p>
          <TickBar />
        </div>

        {/* ── Socials ───────────────────────────────────────── */}
        <div className="up-social-row">
          <a href="https://x.com/Erik_Knobl" target="_blank" rel="noopener noreferrer" className="up-social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @Erik_Knobl
          </a>
          <a href="https://www.youtube.com/@NeuronomiconTV" target="_blank" rel="noopener noreferrer" className="up-social-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            NeuronomiconTV
          </a>
        </div>

      </div>
    </>
  );
}
