'use client';

import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const isInternal = project.url?.startsWith('/');

    return (
        <>
            <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .project-card {
          position: relative;
          background: rgba(10,10,10,0.6);
          border: 1px solid rgba(232,232,232,0.08);
          border-radius: 2px;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          animation: card-in 0.6s ease both;
        }
        .project-card:hover {
          border-color: var(--c);
          box-shadow: 0 0 24px rgba(255,255,255,0.04), 0 0 0 1px var(--c) inset;
          background: rgba(10,10,10,0.8);
        }
        .card-accent {
          height: 2px;
          background: var(--c);
          box-shadow: 0 0 12px var(--c);
          width: 100%;
        }
        .card-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .card-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .card-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--c);
          animation: pulse-dot 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        .card-status-text {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: var(--c);
          flex: 1;
        }
        .card-id {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: rgba(232,232,232,0.2);
        }
        .card-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #e8e8e8;
          line-height: 1.2;
          margin: 0;
        }
        .card-tagline {
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(232,232,232,0.4);
          margin: 0;
        }
        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .card-tag {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.3);
          border: 1px solid rgba(232,232,232,0.1);
          padding: 2px 6px;
          border-radius: 1px;
        }
        .card-cta {
          margin-top: auto;
          padding-top: 8px;
        }
        .card-btn {
          display: inline-block;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--c);
          border: 1px solid var(--c);
          padding: 7px 16px;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
          border-radius: 1px;
        }
        .card-btn:hover {
          background: var(--c);
          color: #000;
        }
        .card-btn.disabled {
          opacity: 0.35;
          cursor: default;
          pointer-events: none;
        }
      `}</style>

            <div
                className="project-card"
                style={{
                    // @ts-expect-error CSS custom property
                    '--c': project.color,
                    animationDelay: `${index * 0.1}s`,
                }}
            >
                <div className="card-accent" />
                <div className="card-body">
                    <div className="card-status-row">
                        <div className="card-dot" />
                        <span className="card-status-text">{project.status}</span>
                        <span className="card-id">{project.id}</span>
                    </div>

                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-tagline">{project.tagline}</p>

                    <div className="card-tags">
                        {project.tags.map(tag => (
                            <span key={tag} className="card-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="card-cta">
                        {project.status === 'ONLINE' && project.url ? (
                            isInternal ? (
                                <Link href={project.url} className="card-btn">ENTER →</Link>
                            ) : (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="card-btn">
                                    READ →
                                </a>
                            )
                        ) : (
                            <span className="card-btn disabled">INCOMING —</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
