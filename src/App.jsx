import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDefinition = async () => {
    if (!word) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) {
        throw new Error("Word not found or API error");
      }

      const data = await response.json();
      setDefinition(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefinition();
  };

  return (
    <div className="app">
      <h1>Dictionary App</h1>
      <p>
        {" "}
        By{" "}
        <a
          href="https://github.com/Jeroboam-francis"
          target="_blank"
        >
          Jeroboam Francis
        </a>
      </p>
      <p>Type a word to get its meaning</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={handleInputChange}
          placeholder="Type A Name to Search"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      {definition && (
        <div className="definition">
          <h2>{definition.word}</h2>
          {definition.meanings.map((meaning, index) => (
            <div key={index}>
              <h3>{meaning.partOfSpeech}</h3>
              <ul>
                {meaning.definitions.map((def, idx) => (
                  <li key={idx}>{def.definition}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
