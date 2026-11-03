import Section from "../components/Section";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="edu">
        <article className="card reveal">
          <h3>Bachelor of Computer Applications (BCA)</h3>
          <p>Eternal University, Baru Sahib, Himachal Pradesh</p>
          <ul className="facts">
            <li><b>Program</b> NavGurukul</li>
            <li><b>Current year</b> 2nd Year</li>
            <li><b>CGPA</b> 9.30 (as listed in my resume)</li>
            <li><b>Expected graduation</b> 2028</li>
          </ul>
        </article>
        <article className="card reveal">
          <h3>Certificates and recognition</h3>
          <ul className="plain"><li>Wellbeing Facilitator Certificate</li><li>Academic Excellence Certificate</li><li>Academic Certificate</li></ul>
          <h3 className="sub">Volunteering</h3>
          <ul className="plain"><li>Akal Connect Volunteering</li></ul>
        </article>
      </div>
    </Section>
  );
}
