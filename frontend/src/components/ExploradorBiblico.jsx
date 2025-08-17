import React, { useState } from 'react';
import { buscarMapa, buscarImagens, buscarDadosHistoricos, buscarArtefatos } from '../services/bibleEnrichment';

export default function ExploradorBiblico() {
  const [termo, setTermo] = useState('Jerusalém');
  const [mapa, setMapa] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [dados, setDados] = useState(null);
  const [artefatos, setArtefatos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarTudo = async e => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setMapa(null); setImagens([]); setDados(null); setArtefatos(null);
    try {
      const [m, i, d, a] = await Promise.all([
        buscarMapa(termo), buscarImagens(termo), buscarDadosHistoricos(termo), buscarArtefatos(termo)
      ]);
      setMapa(m);
      setImagens(i.imagens || []);
      setDados(d);
      setArtefatos(a);
    } catch (err) {
      setErro('Erro ao buscar dados: ' + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '32px auto', maxWidth: 700, padding: 24, border: '2px solid #2a2a6a', borderRadius: 10, background: '#fafdff' }}>
      <h2>Explorador Bíblico</h2>
      <form onSubmit={buscarTudo} style={{ marginBottom: 16 }}>
        <input value={termo} onChange={e => setTermo(e.target.value)} placeholder="Ex: Jerusalém, Davi, Egito, denário..." style={{ width: 300, marginRight: 8 }} />
        <button type="submit" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {mapa && (
        <div style={{ marginBottom: 16 }}>
          <b>Local:</b> {mapa.nome}<br />
          <b>Coordenadas:</b> {mapa.latitude}, {mapa.longitude}<br />
          <a href={mapa.mapa} target="_blank" rel="noopener noreferrer">Ver mapa interativo</a><br />
          {mapa.descricao && <p>{mapa.descricao}</p>}
        </div>
      )}
      {imagens.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <b>Imagens públicas:</b><br />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {imagens.map((img, i) => <img key={i} src={img} alt="Imagem bíblica" style={{ maxHeight: 120, borderRadius: 4 }} />)}
          </div>
        </div>
      )}
      {dados && (
        <div style={{ marginBottom: 16 }}>
          <b>História/Cultura:</b><br />
          <a href={dados.wikipedia} target="_blank" rel="noopener noreferrer">{dados.label}</a><br />
          <span>{dados.resumo}</span>
        </div>
      )}
      {artefatos && (
        <div style={{ marginBottom: 16 }}>
          <b>Artefatos e manuscritos:</b><br />
          <a href={artefatos.deadSeaScrolls} target="_blank" rel="noopener noreferrer">Manuscritos do Mar Morto</a> |{' '}
          <a href={artefatos.britishMuseum} target="_blank" rel="noopener noreferrer">British Museum</a>
        </div>
      )}
    </div>
  );
}
