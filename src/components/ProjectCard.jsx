import { Github, ExternalLink, Images } from "lucide-react";
import Picture from "./Picture";

export default function ProjectCard({ p, onOpen }) {
  const stop = (e) => e.stopPropagation();
  return (
    <article className="card project reveal" onClick={() => onOpen(p)}>
      <div className="media"><Picture slot={p.imageKey} alt={`${p.name} screenshot`} label={p.name} /></div>
      <div className="project-body">
        <div className="project-top">
          <h3>{p.name}</h3>
          <span className={`status ${p.status === "Live" ? "live" : ""}`}>{p.status}</span>
        </div>
        <p className="muted small">{p.fullName || p.type}</p>
        <p>{p.description}</p>
        {p.contributionNote && <p className="note">{p.contributionNote}</p>}
        <ul className="chips" aria-label="Technologies">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="actions">
          <button type="button" className="btn ghost" onClick={(e) => { stop(e); onOpen(p); }} aria-haspopup="dialog"><Images size={16} /> Details</button>
          {p.github && <a className="btn ghost" href={p.github} target="_blank" rel="noopener noreferrer" onClick={stop}><Github size={16} /> GitHub</a>}
          {p.demo && <a className="btn solid" href={p.demo} target="_blank" rel="noopener noreferrer" onClick={stop}><ExternalLink size={16} /> Live Demo</a>}
        </div>
      </div>
    </article>
  );
}
