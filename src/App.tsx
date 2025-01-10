import icons from "./icons.json";
import { Masonry } from "masonic";
import { useEffect, useState } from "react";

type IconType = {
  name: string;
  src: string;
  metadata: {
    tags: string[];
    categories: string[];
  };
};

function App() {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(debouncedInput.toLowerCase())
  );
  return (
    <div style={{ padding: "1rem", width: "calc(100vw - 3rem)" }}>
      <div className="header">
        <h1>Afor Icon</h1>
        <input
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </div>
      {filteredIcons.length === 0 ? (
        <div className="no-results">No results found</div>
      ) : (
        <Masonry items={filteredIcons} render={IconCard} columnGutter={8} />
      )}
    </div>
  );
}

const IconCard = ({ data: icon }: { index: number; data: IconType }) => (
  <div className="icon-card">
    <img src={icon.src} alt={icon.name} width={28} />
    <h4 style={{ margin: "0rem" }}>{icon.name}</h4>
    <span>{icon.metadata.categories.join(", ")}</span>
    <span>{icon.metadata.tags.join(", ")}</span>
  </div>
);

export default App;
