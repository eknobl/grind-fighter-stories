import { STORIES } from '@/data/stories';
import HudFrame from '@/components/landing/HudFrame';
import UniversePanel from '@/components/landing/UniversePanel';
import StoryCarousel from '@/components/landing/StoryCarousel';

export default function LandingPage() {
  return (
    <>
      <style>{`
        /* ── Root ────────────────────────────────────────────── */
        .hud-root {
          background: #0d1117;
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }

        /* ── Main Grid ───────────────────────────────────────── */
        .hud-layout {
          display: grid;
          grid-template-columns: 38fr 1px 62fr;
          height: 100vh;
          position: relative;
          z-index: 5;
        }

        /* ── Panel Divider ───────────────────────────────────── */
        .hud-divider {
          position: relative;
          background: rgba(232,232,232,0.12);
          z-index: 6;
        }
        .hud-divider::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: -4px;
          width: 8px;
          background: repeating-linear-gradient(
            45deg,
            transparent 0px,
            transparent 3px,
            rgba(255,255,255,0.04) 3px,
            rgba(255,255,255,0.04) 4px
          );
          pointer-events: none;
        }

        /* ── Mobile ──────────────────────────────────────────── */
        @media (max-width: 767px) {
          .hud-root {
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .hud-layout {
            display: flex;
            flex-direction: column-reverse;  /* carousel first (hero), then universe */
            height: auto;
            min-height: 100vh;
          }
          .hud-divider {
            display: none;
          }
        }
      `}</style>

      <div className="hud-root">
        {/* Fixed viewport overlays */}
        <HudFrame onlineCount={STORIES.length} />

        {/* Two-panel grid */}
        <div className="hud-layout">
          {/* Left: Universe Panel (server component) */}
          <UniversePanel />

          {/* Divider */}
          <div className="hud-divider" />

          {/* Right: Story Carousel (client component) */}
          <StoryCarousel stories={STORIES} />
        </div>
      </div>
    </>
  );
}
