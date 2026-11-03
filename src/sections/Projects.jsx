import { useCallback, useState } from "react";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects } from "../data";

export default function Projects() {
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <Section id="projects" title="Projects" intro="Six projects across e-commerce, databases, AI and testing. Select a project for screenshots and details.">
      <div className="projects">{projects.map((p) => <ProjectCard key={p.name} p={p} onOpen={setOpen} />)}</div>
      {open && <ProjectModal p={open} onClose={close} />}
    </Section>
  );
}
