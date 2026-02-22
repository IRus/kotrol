import { Card } from "./Card.jsx";

export function Group({ group }) {
  const visibleProjects = group.projects.filter((project) => project.display !== false);

  return (
    <section class="group">
      <h2>{group.name}</h2>
      <div class="grid">
        {visibleProjects.map((project) => (
          <Card key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
