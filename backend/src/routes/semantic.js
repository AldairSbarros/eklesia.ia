import express from 'express';
import { PrismaClient } from '@prisma/client';
import { gerarEmbedding } from '../semantic/embedding.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Indexar texto ingerido (gera embedding e salva)
router.post('/index', requireAuth, async (req, res) => {
  const { filename, text, userId } = req.body;
  try {
    const embedding = await gerarEmbedding(text);
    const doc = await prisma.ingestedText.create({
      data: { filename, text, embedding, userId }
    });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao indexar texto', details: err.message });
  }
});

// Busca semântica
router.post('/search', requireAuth, async (req, res) => {
  const { query, userId, limit = 5 } = req.body;
  try {
    const embedding = await gerarEmbedding(query);
    // Busca por similaridade usando pgvector
    const results = await prisma.$queryRawUnsafe(
      `SELECT *, (embedding <#> $1::vector) AS distance FROM "IngestedText" WHERE "userId" = $2 ORDER BY distance ASC LIMIT $3`,
      embedding,
      userId,
      limit
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Erro na busca semântica', details: err.message });
  }
});

export default router;
