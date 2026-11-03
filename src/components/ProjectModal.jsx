import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Github, ExternalLink } from "lucide-react";
import Picture from "./Picture";
import ImageSlot from "./ImageSlot";
import { useImages } from "../lib/images";

export const slotKeys = (base) => [base, ...[2, 3, 4, 5].map((n) => `${base}-${n}`)];

export default function ProjectModal({ p, onClose }) {
  const { url } = useImages();
  const keys = slotKeys(p.imageKey);
  const available = keys.filter((k) => url(k));
  const [active, setActive] = useState(p.imageKey);
  const shown = available.includes(active) ? active : p.imageKey;
  const box = useRef(); const closeBtn = useRef();

  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = box.current.querySelectorAll("a[href],button:not([disabled]),input:not([disabled]),label[for]");
      const list = [...f].filter((el) => el.offsetParent !== null || el === closeBtn.current);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus?.(); };
  }, [onClose]);

  return createPortal(
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" ref={box}>
        <button ref={closeBtn} className="modal-close" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
        <div className="modal-media">
          <div className="media big"><Picture slot={shown} alt={`${p.name} screenshot`} label={p.name} eager /></div>
          {available.length > 1 && (
            <ul className="thumbs" aria-label="Project screenshots">
              {available.map((k, i) => (
                <li key={k}><button type="button" className={k === shown ? "on" : ""} onClick={() => setActive(k)} aria-label={`Show screenshot ${i + 1}`} aria-pressed={k === shown}>
                  <Picture slot={k} alt="" label={p.name} /></button></li>
              ))}
            </ul>
          )}
        </div>
        <div className="modal-body">
          <span className={`status ${p.status === "Live" ? "live" : ""}`}>{p.status}</span>
          <h3 id="pm-title" className="modal-title">{p.fullName || p.name}</h3>
          <p className="muted small">{p.type}</p>
          <p>{p.description}</p>
          {p.contributionNote && <p className="note">{p.contributionNote}</p>}
          <h4>Key features</h4>
          <ul className="features">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <h4>Technologies</h4>
          <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
          <div className="actions">
            {p.github && <a className="btn ghost" href={p.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub Repository</a>}
            {p.demo && <a className="btn solid" href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live Demo</a>}
            {!p.github && !p.demo && <span className="muted small">{p.status === "In Progress" ? "Repository and demo coming soon" : "No public repository or deployment"}</span>}
          </div>
          {import.meta.env.DEV && (
            <div className="admin">
              <h4>Manage images (local dev only)</h4>
              <p className="small muted">Saves to <code>public/images/</code>. Main image plus up to four gallery images.</p>
              {keys.map((k, i) => <ImageSlot key={k} slotKey={k} label={i === 0 ? `${p.name}: main screenshot` : `${p.name}: gallery image ${i}`} />)}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
