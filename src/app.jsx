import { render } from "preact";
import { useState, useEffect, useRef, useMemo } from "preact/hooks";
import { useFrequent } from "./hooks/useFrequent.js";
import { usePreloadedLogos } from "./hooks/usePreloadedLogos.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { Group } from "./components/Group.jsx";
import { SearchIcon, SidebarIcon } from "./components/icons.jsx";
import "./style.css";

const VIEW_KEY = "kotrol-view";
const SIDEBAR_KEY = "kotrol-sidebar";

const IS_MAC = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
const SEARCH_SHORTCUT = IS_MAC ? "⌘K" : "Ctrl K";
const SIDEBAR_SHORTCUT = IS_MAC ? "⌘." : "Alt 1";

function matches(project, query) {
  const haystack = [project.title, ...project.links.map((link) => link.label + " " + link.url)]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function App() {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState(() => localStorage.getItem(VIEW_KEY) || "all");
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(SIDEBAR_KEY) === "1");
  const frequent = useFrequent();
  const logoUrls = usePreloadedLogos(groups);
  const search = useRef(null);

  useEffect(() => {
    fetch("projects.json")
      .then((r) => r.json())
      .then((data) => setGroups(data.groups));
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const focused = document.activeElement === search.current;
      /* event.code, not event.key: Alt+1 does not produce "1" on every layout */
      if (
        (IS_MAC && event.code === "Period" && event.metaKey) ||
        (!IS_MAC && event.code === "Digit1" && event.altKey)
      ) {
        event.preventDefault();
        setCollapsed((value) => {
          localStorage.setItem(SIDEBAR_KEY, value ? "0" : "1");
          return !value;
        });
      } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        search.current.focus();
        search.current.select();
      } else if (event.key === "/" && !focused) {
        event.preventDefault();
        search.current.focus();
      } else if (event.key === "Escape" && focused) {
        setQuery("");
        search.current.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleGroups = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          projects: group.projects.filter((project) => project.display !== false),
        }))
        .filter((group) => group.projects.length > 0),
    [groups],
  );

  const total = visibleGroups.reduce((sum, group) => sum + group.projects.length, 0);

  const select = (id) => {
    setSelected(id);
    localStorage.setItem(VIEW_KEY, id);
  };

  const toggleSidebar = () => {
    setCollapsed((value) => {
      localStorage.setItem(SIDEBAR_KEY, value ? "0" : "1");
      return !value;
    });
  };

  /* A selected group that later disappears from the data falls back to All Projects. */
  const view =
    selected === "all" ||
    (selected === "frequent" && frequent.length > 0) ||
    visibleGroups.some((group) => group.name === selected)
      ? selected
      : "all";

  let heading;
  let sections;

  if (query.trim()) {
    const needle = query.trim().toLowerCase();
    heading = "Results";
    sections = visibleGroups
      .map((group) => ({
        title: group.name,
        projects: group.projects.filter((project) => matches(project, needle)),
      }))
      .filter((section) => section.projects.length > 0);
  } else if (view === "frequent") {
    heading = "Frequently Used";
    sections = [{ title: null, projects: frequent }];
  } else if (view === "all") {
    heading = "All Projects";
    sections = visibleGroups.map((group) => ({ title: group.name, projects: group.projects }));
  } else {
    const group = visibleGroups.find((g) => g.name === view);
    heading = group.name;
    sections = [{ title: null, projects: group.projects }];
  }

  const count = sections.reduce((sum, section) => sum + section.projects.length, 0);

  return (
    <div class={collapsed ? "app is-collapsed" : "app"}>
      <aside class="sidebar" inert={collapsed || undefined}>
        <Sidebar
          groups={visibleGroups}
          frequentCount={frequent.length}
          total={total}
          selected={view}
          onSelect={select}
        />
      </aside>

      <main class="content">
        <div class="toolbar">
          <div class="toolbar-left">
            <button
              type="button"
              class="toolbar-btn"
              onClick={toggleSidebar}
              aria-expanded={!collapsed}
              aria-label={`${collapsed ? "Show" : "Hide"} sidebar`}
              title={`${collapsed ? "Show" : "Hide"} sidebar (${SIDEBAR_SHORTCUT})`}
            >
              <SidebarIcon />
            </button>
            <span class="app-title">Kotrol</span>
          </div>
          <label class="search">
            <SearchIcon />
            <input
              ref={search}
              type="search"
              placeholder="Search"
              aria-label="Search projects"
              value={query}
              onInput={(event) => setQuery(event.currentTarget.value)}
            />
            {!query && <kbd class="search-hint">{SEARCH_SHORTCUT}</kbd>}
          </label>
        </div>

        <div class="scroller">
          <header class="page-head">
            <h1 class="page-title">{heading}</h1>
            <p class="page-count">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </header>

          {sections.length > 0 ? (
            sections.map((section) => (
              <Group
                key={section.title || heading}
                title={section.title}
                projects={section.projects}
                logoUrls={logoUrls}
              />
            ))
          ) : (
            <p class="empty">No projects match “{query.trim()}”.</p>
          )}
        </div>
      </main>
    </div>
  );
}

render(<App />, document.getElementById("app"));
