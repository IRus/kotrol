import { trackClick } from "../hooks/useFrequent.js";

export function Card({ project }) {
  const onClick = () => trackClick(project);

  if (project.links.length === 1) {
    return (
      <a
        href={project.links[0].url}
        class="card"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <img class="logo" alt={project.title} src={`logos/${project.logo}`} />
        <span class="title">{project.title}</span>
      </a>
    );
  }

  return (
    <div class="card">
      <img class="logo" alt={project.title} src={`logos/${project.logo}`} />
      <span class="title">{project.title}</span>
      <div class="links">
        {project.links.map((link) => (
          <a
            href={link.url}
            class="link-btn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
