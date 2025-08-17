import React, { useState } from 'react';
import { buscarPalavraOriginal } from '../services/bibleWord';

export default function PalavraOriginal({ termo }) {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!termo) return;
    setLoading(true);
    setErro('');
    setDados(null);
    buscarPalavraOriginal(termo)
      .then(setDados)
      .catch(e => setErro('Não encontrado ou erro na API.'))
      .finally(() => setLoading(false));
  }, [termo]);

  if (!termo) return null;
  if (loading) return <p>Buscando dados originais...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
  if (!dados) return null;

  return (
    <div style={{ background: '#fafdff', border: '1px solid #e0e0e0', borderRadius: 8, padding: 12, margin: '16px 0' }}>
      <b>Palavra no original:</b> <span style={{ fontSize: 18 }}>{dados.escritaOriginal || dados.termo}</span> <br />
      <b>Transliteração:</b> {dados.transliteracao} <br />
      <b>Significado:</b> {dados.significado} <br />
      <b>Idioma:</b> {dados.idioma} <br />
      <b>Strong:</b> {dados.strong} <br />
      {dados.pronuncia && <><b>Pronúncia:</b> {dados.pronuncia} <br /></>}
      {dados.audio && <audio controls src={dados.audio} />}
      {dados.exemplos && dados.exemplos.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <b>Exemplos bíblicos:</b>
          <ul>
            {dados.exemplos.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
        </div>
      )}
      {dados.referencias && dados.referencias.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <b>Referências:</b>
          <ul>
            {dados.referencias.map((ref, i) => <li key={i}>{ref}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
