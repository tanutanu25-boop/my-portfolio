import Section from "../components/Section";

const items = [
  ["Wellbeing Facilitator", "Supported student wellbeing and earned the Wellbeing Facilitator Certificate."],
  ["Student wellbeing activities", "Took part in activities that support a healthy student community."],
  ["Akal Connect volunteering", "Volunteered with Akal Connect."],
  ["Academic participation", "Recognised with Academic Excellence and Academic certificates."],
  ["Collaboration and teamwork", "Works in teams through NavGurukul, including pair programming and group projects."],
];

export default function Experience() {
  return (
    <Section id="experience" title="Experience and activities">
      <ul className="timeline">
        {items.map(([t, d]) => <li key={t} className="reveal"><h3>{t}</h3><p>{d}</p></li>)}
      </ul>
    </Section>
  );
}
