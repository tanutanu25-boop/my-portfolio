import { useState } from "react";
import { Mail, Phone, Github, Linkedin, MapPin, Download } from "lucide-react";
import Section from "../components/Section";
import { profile } from "../data";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  // No backend: this opens the visitor's email app with the message prefilled.
  // To send straight from the page, connect an email service (EmailJS, Formspree) or your own API.
  const submit = (e) => {
    e.preventDefault();
    const body = `${f.message}\n\nFrom: ${f.name} (${f.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Section id="contact" title="Get in touch" intro="Open to internships, entry-level roles and collaboration.">
      <div className="contact">
        <div className="contact-links reveal">
          <a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
          <a href={`tel:+91${profile.phone}`}><Phone size={18} /> {profile.phone}</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18} /> github.com/tanutanu25-boop</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn profile</a>
          <p className="muted"><MapPin size={18} /> {profile.location}</p>
          <a className="btn solid" href={profile.resume} download="Tanu_Thakur_Resume.pdf"><Download size={16} /> Download Resume</a>
        </div>
        <form className="card reveal" onSubmit={submit}>
          <label>Name<input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
          <label>Email<input required type="email" value={f.email} onChange={set("email")} autoComplete="email" /></label>
          <label>Subject<input required value={f.subject} onChange={set("subject")} /></label>
          <label>Message<textarea required rows="5" value={f.message} onChange={set("message")} /></label>
          <button className="btn solid" type="submit">Open in email app</button>
          <p className="small muted" role="status">
            {sent ? `Your email app should have opened. If not, write to ${profile.email} directly.` : "This form prepares an email in your email app. Nothing is sent from this page."}
          </p>
        </form>
      </div>
    </Section>
  );
}
