const KEY = "kotrol-freq";
const MAX = 8;

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function trackClick(project) {
  const { title, logo, links } = project;
  if (!links || links.length === 0) return;

  const data = load();
  const cardKey = title + "|" + links[0].url;
  const entry = data[cardKey] || { count: 0 };
  entry.count++;
  entry.title = title;
  entry.logo = logo;
  entry.links = links;
  data[cardKey] = entry;
  save(data);

  window.dispatchEvent(new Event("kotrol-freq-changed"));
}

export function getFrequent() {
  const data = load();
  return Object.values(data)
    .filter((d) => d.links)
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX);
}
