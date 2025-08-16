import React, { useState } from 'react';
import axios from 'axios';
import { conversarComIA } from '../services/llmApi';
import SermonExport from './SermonExport';
import SermonShare from './SermonShare';

export default function SermonAssistant() {
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState('');
  const [baseChoice, setBaseChoice] = useState('user');
  const [baseText, setBaseText] = useState('');
  const [topics, setTopics] = useState(3);
  const [verses, setVerses] = useState(3);
  const [illustration, setIllustration] = useState(false);
  const [sermon, setSermon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Você é Eklesia IA, um assistente para criação de sermões cristãos. Guie o usuário passo a passo, faça perguntas e gere sermões personalizados.' }
  ]);
  const [history, setHistory] = useState([]);
  const [refineInput, setRefineInput] = useState('');

  // Simulação de busca de texto bíblico base
  const fetchBibleBase = async () => {
    // Aqui você pode integrar com a API de Bíblia para buscar um texto relevante
    // Exemplo: busca Gênesis 1:1
    const { data } = await axios.get('http://localhost:3001/biblex/verse', {
      params: { bibleId: 'por-NTLH', bookId: 'GEN', chapter: 1, verse: 1 }
    });
    return data;
  };

  const handleSubmit = async () => {
    setLoading(true);
    let base = baseText;
    if (baseChoice === 'auto') {
      const bib = await fetchBibleBase();
      base = bib.text || 'Gênesis 1:1';
    }
    // Monta o prompt conversacional
    const userPrompt = `Por favor, me ajude a criar um sermão.\nTema: ${theme}\nTexto base: ${base}\nTópicos: ${topics}\nVersos por tópico: ${verses}\n${illustration ? 'Inclua uma ilustração.' : ''}`;
    const novaConversa = [
      ...messages,
      { role: 'user', content: userPrompt }
    ];
    setMessages(novaConversa);
    setHistory(h => [...h, { role: 'user', content: userPrompt }]);
    try {
      const resposta = await conversarComIA(novaConversa);
      setHistory(h => [...h, { role: 'assistant', content: resposta }]);
      setSermon({
        tema: theme,
        textoBase: base,
        topicos: topics,
        versos: verses,
        ilustracao: illustration ? 'Incluindo ilustração...' : 'Sem ilustração',
        conteudo: resposta
      });
    } catch (err) {
      setHistory(h => [...h, { role: 'assistant', content: 'Erro ao consultar IA: ' + err.message }]);
      setSermon({ conteudo: 'Erro ao consultar IA: ' + err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ border: '2px solid #444', borderRadius: 8, padding: 24, maxWidth: 500, margin: '32px auto', background: '#fafaff' }}>
      <h2 style={{ textAlign: 'center', color: '#2a2a6a' }}>Eklesia IA</h2>
      {sermon ? (
        <div>
          <h3>Sermão Gerado</h3>
          <p><b>Tema:</b> {sermon.tema}</p>
          <p><b>Texto Base:</b> {sermon.textoBase}</p>
          <p><b>Tópicos:</b> {sermon.topicos}</p>
          <p><b>Versos por tópico:</b> {sermon.versos}</p>
          <p><b>Ilustração:</b> {sermon.ilustracao}</p>
          <pre style={{ background: '#eee', padding: 12 }}>{sermon.conteudo}</pre>
          <SermonExport sermon={sermon} token={localStorage.getItem('token')} />
          <SermonShare sermon={sermon} token={localStorage.getItem('token')} />
          <form style={{ marginTop: 16 }} onSubmit={async e => {
            e.preventDefault();
            if (!refineInput.trim()) return;
            setLoading(true);
            const novaConversa = [
              ...messages,
              { role: 'user', content: refineInput }
            ];
            setMessages(novaConversa);
            setHistory(h => [...h, { role: 'user', content: refineInput }]);
            try {
              const resposta = await conversarComIA(novaConversa);
              setHistory(h => [...h, { role: 'assistant', content: resposta }]);
              setSermon(s => ({ ...s, conteudo: resposta }));
            } catch (err) {
              setHistory(h => [...h, { role: 'assistant', content: 'Erro ao consultar IA: ' + err.message }]);
            }
            setRefineInput('');
            setLoading(false);
          }}>
            <label>Refinar/Personalizar/Feedback:</label><br />
            <input
              value={refineInput}
              onChange={e => setRefineInput(e.target.value)}
              placeholder="Ex: Adicione uma conclusão, mude o texto base, etc."
              style={{ width: '100%' }}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !refineInput.trim()}>Enviar</button>
          </form>
          <button style={{ marginTop: 12 }} onClick={() => { setSermon(null); setStep(0); setHistory([]); setMessages([
            { role: 'system', content: 'Você é Eklesia IA, um assistente para criação de sermões cristãos. Guie o usuário passo a passo, faça perguntas e gere sermões personalizados.' }
          ]); }}>Novo Sermão</button>
          <hr />
          <h4>Histórico da Conversa</h4>
          <div style={{ maxHeight: 200, overflow: 'auto', background: '#f5f5f5', padding: 8, borderRadius: 6 }}>
            {history.map((msg, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <b>{msg.role === 'user' ? 'Você' : 'Eklesia IA'}:</b>
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
          {step === 0 && (
            <div>
              <label>Qual o tema do sermão?</label><br />
              <input value={theme} onChange={e => setTheme(e.target.value)} required style={{ width: '100%' }} />
              <button type="button" onClick={() => setStep(1)} disabled={!theme}>Próximo</button>
            </div>
          )}
          {step === 1 && (
            <div>
              <label>Deseja sugerir um texto bíblico base?</label><br />
              <input type="radio" name="baseChoice" value="user" checked={baseChoice === 'user'} onChange={() => setBaseChoice('user')} /> Sim
              <input type="radio" name="baseChoice" value="auto" checked={baseChoice === 'auto'} onChange={() => setBaseChoice('auto')} style={{ marginLeft: 16 }} /> Deixar Eklesia escolher
              <br />
              {baseChoice === 'user' && (
                <input value={baseText} onChange={e => setBaseText(e.target.value)} placeholder="Ex: João 3:16" style={{ width: '100%' }} />
              )}
              <button type="button" onClick={() => setStep(2)} disabled={baseChoice === 'user' && !baseText}>Próximo</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <label>Quantos tópicos?</label><br />
              <input type="number" min={1} max={10} value={topics} onChange={e => setTopics(Number(e.target.value))} />
              <br />
              <label>Quantos versos por tópico?</label><br />
              <input type="number" min={1} max={10} value={verses} onChange={e => setVerses(Number(e.target.value))} />
              <br />
              <label>Deseja incluir ilustração?</label>
              <input type="checkbox" checked={illustration} onChange={e => setIllustration(e.target.checked)} />
              <br />
              <button type="submit" disabled={loading}>Gerar Sermão</button>
            </div>
          )}
        </form>
      )}
      {loading && <p>Gerando sermão...</p>}
    </div>
  );
}
