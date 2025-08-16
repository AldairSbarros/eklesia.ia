
import { Document, Packer } from 'docx';
import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import path from 'path';

import { PrismaClient } from '@prisma/client';
import { gerarEmbedding } from '../semantic/embedding.js';
import { requireAuth } from '../middleware/auth.js';

// POST /ingest/pdf - upload e extração de texto de PDF
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const prisma = new PrismaClient();

router.post('/pdf', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    fs.unlinkSync(filePath);
    // Indexar automaticamente
    const embedding = await gerarEmbedding(data.text);
    const doc = await prisma.ingestedText.create({
      data: {
        filename: req.file.originalname,
        text: data.text,
        embedding,
        userId: req.body.userId ? Number(req.body.userId) : null
      }
    });
    res.json({ text: data.text, indexed: true, id: doc.id });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar PDF', details: err.message });
  }
});
  try {
    const filePath = req.file.path;
router.post('/docx', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const { value } = await mammoth.extractRawText({ path: filePath });
    fs.unlinkSync(filePath);
    // Indexar automaticamente
    const embedding = await gerarEmbedding(value);
    const doc = await prisma.ingestedText.create({
      data: {
        filename: req.file.originalname,
        text: value,
        embedding,
        userId: req.body.userId ? Number(req.body.userId) : null
      }
    });
    res.json({ text: value, indexed: true, id: doc.id });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar DOCX', details: err.message });
  }
});
  try {
    const filePath = req.file.path;
router.post('/html', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    const text = dom.window.document.body.textContent || '';
    fs.unlinkSync(filePath);
    // Indexar automaticamente
    const embedding = await gerarEmbedding(text);
    const doc = await prisma.ingestedText.create({
      data: {
        filename: req.file.originalname,
        text,
        embedding,
        userId: req.body.userId ? Number(req.body.userId) : null
      }
    });
    res.json({ text, indexed: true, id: doc.id });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar HTML', details: err.message });
  }
});
