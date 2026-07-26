import { trackClick } from "../hooks/useFrequent.js";

function hostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Card({ project }) {
  const onClick = () => trackClick(project);

  const art = (
    <span class="art">
      <img src={`logos/${project.logo}`} alt="" />
    </span>
  );

  if (project.links.length === 1) {
    const link = project.links[0];
    return (
      <a
        class="tile"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {art}
        <span class="tile-title" title={project.title}>
          {project.title}
        </span>
        <span class="tile-sub">{hostname(link.url)}</span>
      </a>
    );
  }

  return (
    <div class="tile">
      {art}
      <span class="tile-title">{project.title}</span>
      <span class="tile-links">
        {project.links.map((link) => (
          <a
            class="chip"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
          >
            {link.label}
          </a>
        ))}
      </span>
    </div>
  );
}
