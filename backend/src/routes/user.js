import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /user/files - arquivos/textos ingeridos do usuário
router.get('/files', requireAuth, async (req, res) => {
  try {
    const files = await prisma.ingestedText.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar arquivos', details: err.message });
  }
});

// GET /user/payments - pagamentos do usuário
router.get('/payments', requireAuth, async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pagamentos', details: err.message });
  }
});

export default router;
