import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Compartilhar() {
  const { shareId } = useParams();
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/share/sermon/${shareId}`)
      .then(res => res.json())
      .then(data => { setSermon(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [shareId]);

  if (loading) return <p>Carregando sermão...</p>;
  if (!sermon || sermon.error) return <p>Sermão não encontrado.</p>;

  return (
    <div style={{ maxWidth: 700, margin: '32px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8, background: '#fafaff' }}>
      <h2 style={{ textAlign: 'center', color: '#2a2a6a' }}>Sermão Compartilhado</h2>
      <p><b>Tema:</b> {sermon.tema}</p>
      <p><b>Texto Base:</b> {sermon.textoBase}</p>
      <p><b>Tópicos:</b> {sermon.topicos}</p>
      <p><b>Versos por tópico:</b> {sermon.versos}</p>
      <p><b>Ilustração:</b> {sermon.ilustracao}</p>
      <pre style={{ background: '#eee', padding: 12 }}>{sermon.conteudo}</pre>
      <p style={{ textAlign: 'right', fontSize: 12, color: '#888' }}>Gerado por Eklesia IA</p>
    </div>
  );
}
