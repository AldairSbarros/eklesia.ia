import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth.js';
import { criarPagamentoPix } from '../payments/pagseguro.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /payment/create - cria cobrança (Pix)
router.post('/create', requireAuth, async (req, res) => {
  const { amount, description } = req.body;
  try {
    // Chama PagSeguro para criar cobrança Pix
    const pagseguroResp = await criarPagamentoPix(amount, description, req.user.cpf || '00000000191');
    // Salva no banco
    const payment = await prisma.payment.create({
      data: {
        userId: req.user.userId,
        status: pagseguroResp.status || 'pending',
        method: 'pix',
        amount,
      }
    });
    res.json({ payment, pagseguro: pagseguroResp });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar pagamento', details: err.message });
  }
});

// GET /payment/status/:id - status do pagamento
router.get('/status/:id', requireAuth, async (req, res) => {
  try {
    const payment = await prisma.payment.findUnique({ where: { id: Number(req.params.id) } });
    if (!payment || payment.userId !== req.user.userId) return res.status(404).json({ error: 'Pagamento não encontrado' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pagamento', details: err.message });
  }
});

export default router;
