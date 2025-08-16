import express from 'express';
import { gerarRespostaOllama } from '../llm/ollama.js';

const router = express.Router();

// POST /llm/sermon-assistant
// { messages: [{role, content}, ...] }
router.post('/sermon-assistant', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array obrigatório' });
  }
  try {
    const resposta = await gerarRespostaOllama(messages);
    res.json({ resposta });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar IA', details: err.message });
  }
});

export default router;
