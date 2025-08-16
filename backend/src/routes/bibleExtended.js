import express from 'express';
import {
  listarIdiomas,
  listarBibliasPorIdioma,
  listarLivros,
  listarCapitulos,
  buscarVersiculo,
  buscarAudio,
  buscarVideo
} from '../bible/bibleApiExtended.js';

const router = express.Router();

router.get('/languages', async (req, res) => {
  try {
    const data = await listarIdiomas();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar idiomas', details: err.message });
  }
});

router.get('/bibles', async (req, res) => {
  const { languageCode } = req.query;
  try {
    const data = await listarBibliasPorIdioma(languageCode);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar bíblias', details: err.message });
  }
});

router.get('/books', async (req, res) => {
  const { bibleId } = req.query;
  try {
    const data = await listarLivros(bibleId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar livros', details: err.message });
  }
});

router.get('/chapters', async (req, res) => {
  const { bibleId, bookId } = req.query;
  try {
    const data = await listarCapitulos(bibleId, bookId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar capítulos', details: err.message });
  }
});

router.get('/verse', async (req, res) => {
  const { bibleId, bookId, chapter, verse } = req.query;
  try {
    const data = await buscarVersiculo(bibleId, bookId, chapter, verse);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar versículo', details: err.message });
  }
});

router.get('/audio', async (req, res) => {
  const { bibleId, bookId, chapter } = req.query;
  try {
    const data = await buscarAudio(bibleId, bookId, chapter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar áudio', details: err.message });
  }
});

router.get('/video', async (req, res) => {
  const { bibleId, bookId, chapter } = req.query;
  try {
    const data = await buscarVideo(bibleId, bookId, chapter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vídeo', details: err.message });
  }
});

export default router;
