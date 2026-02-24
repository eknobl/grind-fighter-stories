'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import HudOverlay from '@/components/landing/HudOverlay';
import ProjectGrid from '@/components/landing/ProjectGrid';
import { PROJECTS } from '@/data/projects';

const ParticleNetwork = dynamic(() => import('@/components/landing/ParticleNetwork'), { ssr: false });

const onlineCount = PROJECTS.filter(p => p.status === 'ONLINE').length;

export default function LandingPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <style>{`
        .nmc-root {
          background: #000;
          min-height: 100vh;
        }
        .nmc-main {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .nmc-header {
          text-align: center;
          padding: 90px 24px 56px;
        }
        .nmc-logo-wrap {
          position: relative;
          display: inline-block;
        }
        .nmc-logo {
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 900;
          font-size: clamp(2.4rem, 9vw, 6.5rem);
          color: #ffffff;
          letter-spacing: 0.18em;
          line-height: 1;
          margin: 0;
          position: relative;
          animation: logo-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes logo-in {
          from {
            letter-spacing: 0.5em;
            filter: blur(8px);
            opacity: 0;
          }
          to {
            letter-spacing: 0.18em;
            filter: blur(0);
            opacity: 1;
          }
        }
        .nmc-logo::before,
        .nmc-logo::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          color: #fff;
          animation: glitch-fire 7s step-end infinite;
          animation-delay: 5s;
        }
        .nmc-logo::before {
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          transform: translateX(-3px);
          opacity: 0.7;
          color: #4fc3f7;
          mix-blend-mode: screen;
          animation-duration: 7s;
          animation-delay: 5.1s;
        }
        .nmc-logo::after {
          clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          transform: translateX(3px);
          opacity: 0.5;
          color: #ff8c42;
          mix-blend-mode: screen;
          animation-duration: 7.3s;
          animation-delay: 5s;
        }
        @keyframes glitch-fire {
          0%, 92%, 94%, 96%, 100% { opacity: 0; transform: translateX(0); }
          93% { opacity: 1; transform: translateX(-4px); }
          95% { opacity: 1; transform: translateX(4px); }
        }
        .nmc-subtext {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          letter-spacing: 0.55em;
          color: rgba(232,232,232,0.75);
          margin-top: 16px;
          text-transform: uppercase;
        }
        .nmc-rule {
          width: 180px;
          height: 1px;
          margin: 28px auto 0;
          background: linear-gradient(to right, transparent, rgba(232,232,232,0.5), transparent);
          animation: rule-in 1.4s ease both;
          animation-delay: 0.4s;
        }
        @keyframes rule-in {
          from { width: 0; opacity: 0; }
          to { width: 180px; opacity: 1; }
        }
        .nmc-footer {
          margin-top: auto;
          padding: 40px 24px 48px;
          text-align: center;
        }
        .nmc-footer-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(232,232,232,0.1), transparent);
          margin-bottom: 28px;
        }
        .nmc-social-links {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 24px;
        }
        .nmc-social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.65);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nmc-social-link:hover { color: rgba(232,232,232,0.9); }
        .nmc-social-link svg { width: 14px; height: 14px; fill: currentColor; }
        .nmc-copyright {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 3px;
          color: rgba(232,232,232,0.5);
          text-transform: uppercase;
        }
      `}</style>

      <div className="nmc-root">
        <ParticleNetwork onMouseMove={(x, y) => setCursorPos({ x, y })} />
        <HudOverlay onlineCount={onlineCount} cursorPos={cursorPos} />

        <main className="nmc-main">
          <header className="nmc-header">
            <h1 className="nmc-logo" data-text="NEURONOMICON">NEURONOMICON</h1>
            <p className="nmc-subtext">Cinematic Universe</p>
            <div className="nmc-rule" />
          </header>

          <ProjectGrid />

          <footer className="nmc-footer">
            <div className="nmc-footer-rule" />
            <div className="nmc-social-links">
              <a
                href="https://x.com/Erik_Knobl"
                target="_blank"
                rel="noopener noreferrer"
                className="nmc-social-link"
              >
                {/* X / Twitter icon */}
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @Erik_Knobl
              </a>
              <a
                href="https://www.youtube.com/@NeuronomiconTV"
                target="_blank"
                rel="noopener noreferrer"
                className="nmc-social-link"
              >
                {/* YouTube icon */}
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                NeuronomiconTV
              </a>
            </div>
            <p className="nmc-copyright">© 2026 NEURONOMICON — ALL RIGHTS RESERVED</p>
          </footer>
        </main>
      </div>
    </>
  );
}
