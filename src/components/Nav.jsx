import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "../data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a href="#home" className="mono" aria-label="Tanu Thakur, home">TT</a>
        <button className="nav-toggle" aria-expanded={open} aria-controls="menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="menu" className={open ? "open" : ""} aria-label="Primary">
          {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}>{n}</a>)}
        </nav>
      </div>
    </header>
  );
}
