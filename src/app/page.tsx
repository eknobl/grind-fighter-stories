import { STORIES } from '@/data/stories';
import HudFrame from '@/components/landing/HudFrame';
import UniversePanel from '@/components/landing/UniversePanel';
import StoryCarousel from '@/components/landing/StoryCarousel';
import { svgPaths } from '@/components/landing/hud-svg-paths';

// ── Tick bar used in bottom decorations ─────────────────────────────────────
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

function ArrowBracketIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 35 34.5654" fill="none">
      <path d={svgPaths.p231b9000} fill="white" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{`
        .hud-root {
          background: #050505;
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
          position: relative;
          font-family: 'Roboto', sans-serif;
          color: #ffffff;
        }

        /* Background gradient polygon */
        .hud-bg-polygon {
          position: absolute;
          top: 25px;
          left: 27px;
          right: 27px;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* Main grid */
        .hud-layout {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          gap: clamp(24px, 3vw, 56px);
        }

        /* Bottom angled separator */
        .hud-bottom-sep {
          position: absolute;
          bottom: 0;
          left: 64px;
          right: 64px;
          height: 50px;
          pointer-events: none;
          z-index: 1;
          overflow: visible;
        }

        /* Bottom tick bars */
        .hud-bottom-ticks {
          position: absolute;
          bottom: 20px;
          left: 200px;
          display: flex;
          gap: 80px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 1;
        }

        /* Bottom arrow bracket */
        .hud-bottom-bracket {
          position: absolute;
          bottom: 16px;
          left: 155px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 767px) {
          .hud-root {
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .hud-layout {
            grid-template-columns: 1fr;
            min-height: 100vh;
          }
          .hud-bottom-sep,
          .hud-bottom-ticks,
          .hud-bottom-bracket { display: none; }
        }
      `}</style>

      <div className="hud-root">
        {/* Background polygon gradient */}
        <div className="hud-bg-polygon">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1386 814"
            preserveAspectRatio="xMidYMid slice"
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient
                id="bgGrad"
                gradientUnits="userSpaceOnUse"
                x1="11"
                y1="0"
                x2="291"
                y2="285"
              >
                <stop stopColor="#7184A0" />
                <stop offset="1" stopColor="#2D3540" />
              </linearGradient>
            </defs>
            <path d={svgPaths.p149fd2c0} fill="url(#bgGrad)" fillOpacity="0.8" />
          </svg>
        </div>

        {/* HUD frame overlays */}
        <HudFrame onlineCount={STORIES.length} />

        {/* Two-column layout */}
        <div className="hud-layout">
          <UniversePanel />
          <StoryCarousel stories={STORIES} />
        </div>

        {/* Bottom angled separator line */}
        <div className="hud-bottom-sep">
          <svg
            width="100%"
            height="50"
            viewBox="0 0 1350 50"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 0.5H331L450 49.5H1350"
              stroke="white"
              strokeOpacity="0.2"
            />
          </svg>
        </div>

        {/* Bottom decorative tick bars */}
        <div className="hud-bottom-ticks">
          <TickBar />
          <TickBar />
        </div>

        {/* Bottom arrow bracket */}
        <div className="hud-bottom-bracket">
          <ArrowBracketIcon />
        </div>
      </div>
    </>
  );
}
