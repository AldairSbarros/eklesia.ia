import { buscarPalavraOriginal } from '../bible/bibleWord.js';

import express from 'express';
import { buscarVersiculo } from '../bible/bibleApi.js';
import { buscarMapaBiblico } from '../bible/bibleMaps.js';
import { buscarImagensBiblicas, buscarDadosWikidata, linkDeadSeaScrolls } from '../bible/bibleEnrichment.js';

const router = express.Router();

// GET /bible/verse?bibleId=por-NTLH&bookId=GEN&chapter=1&verse=1
router.get('/verse', async (req, res) => {
  const { bibleId, bookId, chapter, verse } = req.query;
  try {
    const data = await buscarVersiculo(bibleId, bookId, chapter, verse);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar versículo', details: err.message });
  }
});

export default router;

// GET /bible/word?termo=agape
router.get('/word', async (req, res) => {
  const { termo } = req.query;
  if (!termo) return res.status(400).json({ error: 'Parâmetro termo obrigatório' });
  try {
    const dados = await buscarPalavraOriginal(termo);
    if (!dados) return res.status(404).json({ error: 'Palavra não encontrada' });
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar palavra original', details: err.message });
  }
});

// GET /bible/images?termo=Jerusalém
router.get('/images', async (req, res) => {
  const { termo } = req.query;
  if (!termo) return res.status(400).json({ error: 'Parâmetro termo obrigatório' });
  try {
    const dados = await buscarImagensBiblicas(termo);
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar imagens', details: err.message });
  }
});

// GET /bible/data?termo=rei Davi
router.get('/data', async (req, res) => {
  const { termo } = req.query;
  if (!termo) return res.status(400).json({ error: 'Parâmetro termo obrigatório' });
  try {
    const dados = await buscarDadosWikidata(termo);
    if (!dados) return res.status(404).json({ error: 'Dado não encontrado' });
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados históricos', details: err.message });
  }
});

// GET /bible/artifacts?termo=Isaías
router.get('/artifacts', (req, res) => {
  const { termo } = req.query;
  if (!termo) return res.status(400).json({ error: 'Parâmetro termo obrigatório' });
  res.json({
    deadSeaScrolls: linkDeadSeaScrolls(termo),
    britishMuseum: `https://www.britishmuseum.org/collection/search?keyword=${encodeURIComponent(termo)}`
  });
});

// GET /bible/maps?local=Jerusalém
router.get('/maps', async (req, res) => {
  const { local } = req.query;
  if (!local) return res.status(400).json({ error: 'Parâmetro local obrigatório' });
  try {
    const dados = await buscarMapaBiblico(local);
    if (!dados) return res.status(404).json({ error: 'Local não encontrado' });
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar mapa bíblico', details: err.message });
  }
});
