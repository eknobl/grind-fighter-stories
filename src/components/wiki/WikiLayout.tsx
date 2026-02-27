import Link from 'next/link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface WikiLayoutProps {
    children: React.ReactNode;
    sidebar?: React.ReactNode;
    breadcrumb?: BreadcrumbItem[];
}

export default function WikiLayout({ children, sidebar, breadcrumb }: WikiLayoutProps) {
    return (
        <>
            <style>{`
        .wiki-layout-root {
          min-height: 100vh;
          background: #050505;
          color: #c8c8c8;
          padding-top: 40px; /* account for nav bar */
        }
        .wiki-layout-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 80px;
        }
        .wiki-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 40px;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(232,232,232,0.3);
        }
        .wiki-breadcrumb a {
          color: rgba(232,232,232,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .wiki-breadcrumb a:hover { color: rgba(232,232,232,0.7); }
        .wiki-breadcrumb-sep { opacity: 0.3; }
        .wiki-breadcrumb-current { color: rgba(232,232,232,0.6); }
        .wiki-layout-grid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .wiki-layout-grid {
            grid-template-columns: 1fr;
          }
          .wiki-layout-sidebar {
            order: -1;
          }
        }
        .wiki-layout-content {
          min-width: 0;
        }
        .wiki-layout-sidebar {
          position: sticky;
          top: 60px;
        }
      `}</style>

            <div className="wiki-layout-root">
                <div className="wiki-layout-inner">
                    {breadcrumb && breadcrumb.length > 0 && (
                        <nav className="wiki-breadcrumb" aria-label="Breadcrumb">
                            {breadcrumb.map((item, i) => (
                                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {i > 0 && <span className="wiki-breadcrumb-sep">/</span>}
                                    {item.href ? (
                                        <Link href={item.href}>{item.label}</Link>
                                    ) : (
                                        <span className="wiki-breadcrumb-current">{item.label}</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}

                    {sidebar ? (
                        <div className="wiki-layout-grid">
                            <div className="wiki-layout-content">{children}</div>
                            <div className="wiki-layout-sidebar">{sidebar}</div>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </>
    );
}
