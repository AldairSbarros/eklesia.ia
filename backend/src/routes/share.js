import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
import { nanoid } from 'nanoid';

const router = express.Router();
const prisma = new PrismaClient();

// POST /share/sermon - cria link público
router.post('/sermon', requireAuth, async (req, res) => {
  const { tema, textoBase, topicos, versos, ilustracao, conteudo } = req.body;
  try {
    const shareId = nanoid(12);
    const shared = await prisma.sharedSermon.create({
      data: {
        userId: req.user.userId,
        tema,
        textoBase,
        topicos,
        versos,
        ilustracao,
        conteudo,
        shareId
      }
    });
    res.json({ url: `${process.env.PUBLIC_URL || 'http://localhost:3000'}/compartilhar/${shareId}` });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao compartilhar', details: err.message });
  }
});

// GET /share/sermon/:shareId - acessar sermão público
router.get('/sermon/:shareId', async (req, res) => {
  try {
    const shared = await prisma.sharedSermon.findUnique({ where: { shareId: req.params.shareId } });
    if (!shared) return res.status(404).json({ error: 'Sermão não encontrado' });
    res.json(shared);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar sermão', details: err.message });
  }
});

export default router;
