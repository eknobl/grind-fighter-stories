'use client';

import { useEffect, useState } from 'react';

interface HudFrameProps {
    onlineCount: number;
}

export default function HudFrame({ onlineCount }: HudFrameProps) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const px = String(Math.round(pos.x)).padStart(4, '0');
    const py = String(Math.round(pos.y)).padStart(4, '0');

    return (
        <>
            <style>{`
        .hf-scanlines {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.06) 3px,
            rgba(0,0,0,0.06) 4px
          );
        }
        .hf-corner {
          position: fixed;
          z-index: 30;
          pointer-events: none;
          width: 56px;
          height: 56px;
          opacity: ${mounted ? '0.4' : '0'};
          transition: opacity 0.3s ease-out;
        }
        .hf-corner.tl { top: 16px; left: 16px; border-top: 1px solid rgba(232,232,232,0.7); border-left: 1px solid rgba(232,232,232,0.7); }
        .hf-corner.tr { top: 16px; right: 16px; border-top: 1px solid rgba(232,232,232,0.7); border-right: 1px solid rgba(232,232,232,0.7); }
        .hf-corner.bl { bottom: 16px; left: 16px; border-bottom: 1px solid rgba(232,232,232,0.7); border-left: 1px solid rgba(232,232,232,0.7); }
        .hf-corner.br { bottom: 16px; right: 16px; border-bottom: 1px solid rgba(232,232,232,0.7); border-right: 1px solid rgba(232,232,232,0.7); }
        .hf-label {
          position: fixed;
          z-index: 30;
          pointer-events: none;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.18);
          text-transform: uppercase;
          white-space: nowrap;
          opacity: ${mounted ? '1' : '0'};
          transition: opacity 0.5s ease 0.3s;
        }
        .hf-label.tl { top: 20px; left: 80px; }
        .hf-label.tr { top: 20px; right: 80px; text-align: right; }
        .hf-label.bl { bottom: 20px; left: 80px; }
        .hf-label.br { bottom: 20px; right: 80px; text-align: right; }
        .hf-blink {
          animation: hf-blink-step 1.6s step-end infinite;
        }
        @keyframes hf-blink-step {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 767px) {
          .hf-label { display: none; }
        }
      `}</style>

            <div className="hf-scanlines" />

            {/* Corner brackets */}
            <div className="hf-corner tl" />
            <div className="hf-corner tr" />
            <div className="hf-corner bl" />
            <div className="hf-corner br" />

            {/* HUD labels */}
            <div className="hf-label tl">
                NEURONOMICON.WORLD&nbsp;&nbsp;<span className="hf-blink">■</span>&nbsp;SIGNAL LOCKED
            </div>
            <div className="hf-label tr">
                NODES:&nbsp;{onlineCount}&nbsp;&nbsp;·&nbsp;&nbsp;STATUS:&nbsp;ACTIVE
            </div>
            <div className="hf-label bl">
                BUILD v1.0 · 2026
            </div>
            <div className="hf-label br">
                X: {px}&nbsp;&nbsp;Y: {py}
            </div>
        </>
    );
}
