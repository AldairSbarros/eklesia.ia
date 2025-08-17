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
      <div style={{ marginTop: 32, background: '#f8f8ff', padding: 16, borderRadius: 8, border: '1px solid #e0e0e0' }}>
        <h3 style={{ textAlign: 'center', marginBottom: 12 }}>Conheça os planos do Eklesia IA</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Plano</th>
              <th>Valor</th>
              <th>Recursos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gratuito</td>
              <td>R$ 0/mês</td>
              <td>10 buscas/mês, 1 PDF, recursos básicos</td>
            </tr>
            <tr>
              <td>Pessoal</td>
              <td>R$ 29/mês</td>
              <td>Ilimitado para 1 usuário, exportação, WhatsApp, IA básica</td>
            </tr>
            <tr>
              <td>Igreja</td>
              <td>R$ 99/mês</td>
              <td>Até 10 usuários, tudo ilimitado, suporte prioritário, relatórios</td>
            </tr>
            <tr>
              <td>Avançado</td>
              <td>R$ 199/mês</td>
              <td>Ilimitado, recursos premium (API, integrações avançadas, customização)</td>
            </tr>
          </tbody>
        </table>
        <p style={{ textAlign: 'center', marginTop: 10 }}>
          <a href="https://ia.eklesia.app.br" target="_blank" rel="noopener noreferrer">Assine já e tenha acesso completo!</a>
        </p>
      </div>
    </div>
  );
}
