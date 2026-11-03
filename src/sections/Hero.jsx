import { Download, Github, Linkedin, ArrowDown } from "lucide-react";
import { profile } from "../data";
import Picture from "../components/Picture";
import ImageSlot from "../components/ImageSlot";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="orb o1" aria-hidden="true" /><div className="orb o2" aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-text">
          <p className="muted">Hello, I'm</p>
          <h1>Tanu<br />Thakur</h1>
          <p className="headline">{profile.headline}</p>
          <p className="intro">{profile.intro}</p>
          <div className="actions">
            <a className="btn solid" href={profile.resume} download="Tanu_Thakur_Resume.pdf"><Download size={16} /> Download Resume</a>
            <a className="btn ghost" href="#projects"><ArrowDown size={16} /> View Projects</a>
          </div>
          <div className="social">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={20} /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={20} /></a>
          </div>
        </div>
        <figure className="photo">
          <div className="frame"><Picture slot="profile-tanu" alt="Portrait of Tanu Thakur" label="TT" eager /></div>
          {import.meta.env.DEV && <ImageSlot slotKey="profile-tanu" label="Profile photograph" compact />}
        </figure>
      </div>
    </section>
  );
}
