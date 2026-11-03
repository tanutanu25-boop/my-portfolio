import { nav, profile } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-in">
        <div><p className="foot-name">{profile.name}</p><p className="muted">{profile.role}</p></div>
        <nav aria-label="Footer">{nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
        <div className="foot-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
      <p className="wrap copy muted small">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </footer>
  );
}
