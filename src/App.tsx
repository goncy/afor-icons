import icons from "./icons.json";

function App() {
  return (
    <div>
      <h1>Afor Icon</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem'}}>
        {icons.map((icon) => (
          <div key={icon.name}>
            <img src={icon.src} alt={icon.name} />
            <div>{icon.name}</div>
            <div>{icon.metadata.categories.join(", ")}</div>
            <div>{icon.metadata.tags.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
