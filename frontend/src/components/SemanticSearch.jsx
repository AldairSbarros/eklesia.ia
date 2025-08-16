import React, { useState } from 'react';
import axios from 'axios';

export default function SemanticSearch({ userId = 1 }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:3001/semantic/search', {
        query,
        userId,
        limit: 5
      });
      setResults(data);
    } catch (err) {
      setResults([{ text: 'Erro na busca: ' + err.message }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Busca Semântica</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Digite sua pergunta ou termo..."
        style={{ width: 300 }}
      />
      <button onClick={handleSearch} disabled={loading || !query}>Buscar</button>
      {loading && <p>Buscando...</p>}
      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <pre style={{ maxHeight: 100, overflow: 'auto' }}>{r.text}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
