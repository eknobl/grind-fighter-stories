'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { label: 'NEURONOMICON', href: '/' },
    { label: 'ARCHIVE', href: '/wiki' },
    { label: 'ARENA', href: '/grind-fighter/arena' },
];

export default function NavBar() {
    const pathname = usePathname();

    // Hide on the landing page
    if (pathname === '/') return null;

    return (
        <>
            <style>{`
        .nmc-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: rgba(5,5,5,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        .nmc-navbar-link {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 3px;
          text-decoration: none;
          color: rgba(232,232,232,0.35);
          transition: color 0.2s;
        }
        .nmc-navbar-link:hover {
          color: rgba(232,232,232,0.75);
        }
        .nmc-navbar-link.active {
          color: #ffffff;
        }
        .nmc-navbar-sep {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          color: rgba(232,232,232,0.12);
          user-select: none;
        }
      `}</style>

            <nav className="nmc-navbar" aria-label="Site navigation">
                {NAV_LINKS.map((link, i) => {
                    const isActive = link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href);
                    return (
                        <span key={link.href} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                            {i > 0 && <span className="nmc-navbar-sep">·</span>}
                            <Link
                                href={link.href}
                                className={`nmc-navbar-link${isActive ? ' active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </span>
                    );
                })}
            </nav>
        </>
    );
}
