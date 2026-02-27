import Link from 'next/link';

export default function WikiNotFound() {
    return (
        <>
            <style>{`
        .wiki-404-root {
          min-height: 100vh;
          background: #050505;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px 24px;
          text-align: center;
        }
        .wiki-404-code {
          font-family: var(--font-orbitron), sans-serif;
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 900;
          color: rgba(232,232,232,0.06);
          line-height: 1;
          letter-spacing: 0.1em;
        }
        .wiki-404-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 1.2rem;
          color: rgba(232,232,232,0.7);
          letter-spacing: 0.1em;
          margin: 0;
        }
        .wiki-404-sub {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.3);
          margin: 0;
        }
        .wiki-404-link {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(232,232,232,0.5);
          border: 1px solid rgba(232,232,232,0.15);
          padding: 8px 20px;
          text-decoration: none;
          border-radius: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .wiki-404-link:hover {
          color: #e8e8e8;
          border-color: rgba(232,232,232,0.4);
        }
      `}</style>

            <div className="wiki-404-root">
                <div className="wiki-404-code">404</div>
                <h1 className="wiki-404-title">ENTRY NOT FOUND</h1>
                <p className="wiki-404-sub">This record does not exist in the archive.</p>
                <Link href="/wiki" className="wiki-404-link">← RETURN TO ARCHIVE</Link>
            </div>
        </>
    );
}
