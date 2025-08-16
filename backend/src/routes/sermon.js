import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import PDFDocument from 'pdfkit';

const router = express.Router();

// POST /sermon/export-pdf
// Body: { tema, textoBase, topicos, versos, ilustracao, conteudo }
router.post('/export-pdf', requireAuth, async (req, res) => {
  const { tema, textoBase, topicos, versos, ilustracao, conteudo } = req.body;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="sermao-${Date.now()}.pdf"`);
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(20).text('Sermão Eklesia IA', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Tema: ${tema}`);
  doc.text(`Texto Base: ${textoBase}`);
  doc.text(`Tópicos: ${topicos}`);
  doc.text(`Versos por tópico: ${versos}`);
  doc.text(`Ilustração: ${ilustracao}`);
  doc.moveDown();
  doc.fontSize(12).text(conteudo, { align: 'left' });
  doc.end();
});

export default router;
