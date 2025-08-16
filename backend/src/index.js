
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bibleRouter from './routes/bible.js';
import bibleExtendedRouter from './routes/bibleExtended.js';
import ingestRouter from './routes/ingest.js';
import semanticRouter from './routes/semantic.js';
import llmRouter from './routes/llm.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import paymentRouter from './routes/payment.js';
import sermonRouter from './routes/sermon.js';
import shareRouter from './routes/share.js';
// ... outros imports necessários

const app = express();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });


app.use(cors());
app.use(express.json());

// Rotas de Bíblia
app.use('/bible', bibleRouter);
app.use('/biblex', bibleExtendedRouter); // Rotas avançadas: idiomas, versões, livros, capítulos, áudio, vídeo

// Rota de ingestão de arquivos
app.use('/ingest', ingestRouter);

// Rotas de busca semântica
app.use('/semantic', semanticRouter);

// Rotas de integração com LLM (Ollama)
app.use('/llm', llmRouter);

// Rotas de autenticação
app.use('/auth', authRouter);

// Rotas do usuário (arquivos, pagamentos)
app.use('/user', userRouter);

// Rotas de pagamento (PagSeguro)
app.use('/payment', paymentRouter);

// Rotas de sermão (exportação, compartilhamento)
app.use('/sermon', sermonRouter);
// Rotas de compartilhamento
app.use('/share', shareRouter);


app.get('/', (req, res) => {
  res.send('API Eklesia IA rodando!');
});

// Rotas de autenticação, ingestão, perguntas, pagamentos, etc. serão adicionadas aqui

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
