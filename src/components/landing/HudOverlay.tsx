'use client';

interface HudOverlayProps {
    onlineCount: number;
    cursorPos: { x: number; y: number };
}

export default function HudOverlay({ onlineCount, cursorPos }: HudOverlayProps) {
    const px = String(Math.round(cursorPos.x)).padStart(4, '0');
    const py = String(Math.round(cursorPos.y)).padStart(4, '0');

    return (
        <>
            <style>{`
        .hud-scanlines {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.07) 3px,
            rgba(0,0,0,0.07) 4px
          );
        }
        .hud-vignette {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.72) 100%);
        }
        .hud-corner {
          position: fixed;
          z-index: 3;
          pointer-events: none;
          width: 56px;
          height: 56px;
          opacity: 0.5;
        }
        .hud-corner::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 1px;
          background: rgba(232,232,232,0.6);
        }
        .hud-corner.tl {
          top: 20px; left: 20px;
          border-top: 1px solid rgba(232,232,232,0.6);
          border-left: 1px solid rgba(232,232,232,0.6);
        }
        .hud-corner.tl::after { bottom: -1px; right: -8px; }
        .hud-corner.tr {
          top: 20px; right: 20px;
          border-top: 1px solid rgba(232,232,232,0.6);
          border-right: 1px solid rgba(232,232,232,0.6);
        }
        .hud-corner.tr::after { bottom: -1px; left: -8px; }
        .hud-corner.bl {
          bottom: 20px; left: 20px;
          border-bottom: 1px solid rgba(232,232,232,0.6);
          border-left: 1px solid rgba(232,232,232,0.6);
        }
        .hud-corner.bl::after { top: -1px; right: -8px; }
        .hud-corner.br {
          bottom: 20px; right: 20px;
          border-bottom: 1px solid rgba(232,232,232,0.6);
          border-right: 1px solid rgba(232,232,232,0.6);
        }
        .hud-corner.br::after { top: -1px; left: -8px; }
        .hud-label {
          position: fixed;
          z-index: 3;
          pointer-events: none;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.18);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .hud-label.tl { top: 24px; left: 84px; }
        .hud-label.tr { top: 24px; right: 84px; text-align: right; }
        .hud-label.bl { bottom: 24px; left: 84px; }
        .hud-label.br { bottom: 24px; right: 84px; text-align: right; }
        .hud-blink {
          animation: blink-step 1.6s step-end infinite;
        }
        @keyframes blink-step {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 600px) {
          .hud-label { display: none; }
        }
      `}</style>

            <div className="hud-scanlines" />
            <div className="hud-vignette" />

            {/* Corner brackets */}
            <div className="hud-corner tl" />
            <div className="hud-corner tr" />
            <div className="hud-corner bl" />
            <div className="hud-corner br" />

            {/* HUD labels */}
            <div className="hud-label tl">
                NEURONOMICON.WORLD / <span className="hud-blink">■</span> SIGNAL LOCKED
            </div>
            <div className="hud-label tr">
                NODES ONLINE: {onlineCount} / STATUS: ACTIVE
            </div>
            <div className="hud-label bl">
                BUILD v1.0 / 2026
            </div>
            <div className="hud-label br">
                X: {px}&nbsp;&nbsp;Y: {py}
            </div>
        </>
    );
}
