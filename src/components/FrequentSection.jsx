import { useState, useEffect } from "preact/hooks";
import { getFrequent } from "../hooks/useFrequent.js";
import { Card } from "./Card.jsx";

export function FrequentSection() {
  const [entries, setEntries] = useState(() => getFrequent());

  useEffect(() => {
    const update = () => setEntries(getFrequent());
    window.addEventListener("kotrol-freq-changed", update);
    return () => window.removeEventListener("kotrol-freq-changed", update);
  }, []);

  if (entries.length === 0) return null;

  return (
    <section id="frequent" class="group visible">
      <h2>Frequently Used</h2>
      <div class="grid">
        {entries.map((entry) => (
          <Card key={entry.title + "|" + entry.links[0].url} project={entry} />
        ))}
      </div>
    </section>
  );
}
