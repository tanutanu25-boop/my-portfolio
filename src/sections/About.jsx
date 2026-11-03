import Section from "../components/Section";

const points = [
  ["Full-stack focus", "Drawn to building complete web applications, from interface to database."],
  ["Frontend and backend", "Learning HTML, CSS, JavaScript and React alongside Node.js, Express and REST APIs."],
  ["Practical experience", "Built and deployed working web applications, including e-commerce and tracking tools."],
  ["AI-powered apps", "Exploring generative AI through projects that generate answers and content."],
  ["Teamwork", "Comfortable with problem solving and pair programming."],
  ["Continuous learning", "Always improving through new projects and feedback."],
];

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="about reveal">
        <p className="lead">I'm a BCA student at Eternal University, Baru Sahib, and part of the NavGurukul program. I enjoy turning ideas into working software and I'm building the skills to grow as a professional full stack developer.</p>
        <dl className="points">
          {points.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
        </dl>
      </div>
    </Section>
  );
}
