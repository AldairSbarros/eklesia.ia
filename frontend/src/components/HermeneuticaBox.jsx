import React, { useState } from 'react';
import { analisarHermeneutica } from '../services/hermeneutics';

export default function HermeneuticaBox() {
  const [texto, setTexto] = useState('');
  const [analise, setAnalise] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setAnalise('');
    try {
      const resp = await analisarHermeneutica(texto);
      setAnalise(resp);
    } catch (err) {
      setErro('Erro ao analisar: ' + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '32px auto', maxWidth: 700, padding: 24, border: '2px solid #2a2a6a', borderRadius: 10, background: '#fafdff' }}>
      <h2>Análise Hermenêutica e Semântica</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <textarea value={texto} onChange={e => setTexto(e.target.value)} placeholder="Digite um versículo, palavra ou trecho bíblico..." rows={3} style={{ width: '100%', marginBottom: 8 }} />
        <br />
        <button type="submit" disabled={loading || !texto}>{loading ? 'Analisando...' : 'Analisar'}</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {analise && (
        <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16, marginTop: 12 }}>
          <b>Resultado:</b>
          <p style={{ whiteSpace: 'pre-line' }}>{analise}</p>
        </div>
      )}
    </div>
  );
}
