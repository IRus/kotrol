import { Card } from "./Card.jsx";

export function Group({ title, projects, logoUrls }) {
  return (
    <section class="section">
      {title && <h3 class="section-title">{title}</h3>}
      <div class="grid">
        {projects.map((project) => (
          <Card key={project.title} project={project} logoUrl={logoUrls[project.logo]} />
        ))}
      </div>
    </section>
  );
}
