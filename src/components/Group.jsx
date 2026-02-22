import { Card } from "./Card.jsx";

export function Group({ group }) {
  return (
    <section class="group">
      <h2>{group.name}</h2>
      <div class="grid">
        {group.projects.map((project) => (
          <Card key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
