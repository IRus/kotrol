import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { FrequentSection } from "./components/FrequentSection.jsx";
import { Group } from "./components/Group.jsx";
import "./style.css";

function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("projects.json")
      .then((r) => r.json())
      .then((data) => setGroups(data.groups));
  }, []);

  return (
    <div class="container">
      <h1>Kotrol</h1>
      <FrequentSection />
      {groups.map((group) => (
        <Group key={group.name} group={group} />
      ))}
    </div>
  );
}

render(<App />, document.getElementById("app"));
