import express from 'express';
import { buscarVersiculo } from '../bible/bibleApi.js';

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
