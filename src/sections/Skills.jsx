import Section from "../components/Section";
import { skills } from "../data";

export default function Skills() {
  return (
    <Section id="skills" title="Technical skills">
      <div className="skills">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="card reveal">
            <h3>{cat}</h3>
            <ul className="chips big">{items.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
