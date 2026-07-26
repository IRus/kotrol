import { StarIcon, GridIcon, FolderIcon } from "./icons.jsx";

function Row({ id, label, count, icon, selected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        class={selected === id ? "source is-selected" : "source"}
        aria-current={selected === id ? "true" : undefined}
        onClick={() => onSelect(id)}
      >
        {icon}
        <span class="source-label">{label}</span>
        <span class="source-count">{count}</span>
      </button>
    </li>
  );
}

export function Sidebar({ groups, frequentCount, total, selected, onSelect }) {
  return (
    <nav class="sidebar-nav" aria-label="Collections">
      <ul class="source-list">
        {frequentCount > 0 && (
          <Row
            id="frequent"
            label="Frequently Used"
            count={frequentCount}
            icon={<StarIcon />}
            selected={selected}
            onSelect={onSelect}
          />
        )}
        <Row
          id="all"
          label="All Projects"
          count={total}
          icon={<GridIcon />}
          selected={selected}
          onSelect={onSelect}
        />
      </ul>

      <p class="source-heading">Groups</p>
      <ul class="source-list">
        {groups.map((group) => (
          <Row
            key={group.name}
            id={group.name}
            label={group.name}
            count={group.projects.length}
            icon={<FolderIcon />}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  );
}
