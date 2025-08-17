// Endpoint para análise hermenêutica/semântica via IA local (Ollama)
import { Router } from 'express';
import { conversarComIA } from '../llm/ollama.js';

const router = Router();

// POST /bible/hermeneutics { texto: string }
router.post('/hermeneutics', async (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ error: 'Texto obrigatório' });
  try {
    const prompt = `Faça uma análise hermenêutica e semântica detalhada do seguinte texto bíblico, incluindo contexto histórico, significado original, aplicações práticas e possíveis interpretações: \n"${texto}"`;
    const resposta = await conversarComIA(prompt);
    res.json({ analise: resposta });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar IA', details: err.message });
  }
});

export default router;
