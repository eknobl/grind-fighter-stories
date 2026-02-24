import { PROJECTS } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  return (
    <>
      <style>{`
        .project-grid-section {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .project-grid-label {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 5px;
          color: rgba(232,232,232,0.65);
          text-align: center;
          margin-bottom: 32px;
          text-transform: uppercase;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
      `}</style>
      <section className="project-grid-section">
        <p className="project-grid-label">⟨ ACTIVE TRANSMISSIONS ⟩</p>
        <div className="project-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
