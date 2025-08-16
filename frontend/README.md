# Eklesia IA Frontend

## Requisitos
- Node.js 18+
- Vite
- Backend Eklesia IA rodando (ver pasta backend)

## Setup rápido
1. Instale dependências:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173) (ajuste porta se necessário)

## Funcionalidades
- Login/cadastro de usuário (JWT)
- Assistente de sermão com IA (Ollama)
- Ingestão de arquivos (PDF, DOCX, HTML)
- Busca semântica
- Exploração de bíblias (idioma, versão, texto, áudio, vídeo)
- Painel do usuário (arquivos, pagamentos)
- Monetização (Pix/PagSeguro)
- Exportação de sermão em PDF
- Compartilhamento de sermão por link público e WhatsApp

## Estrutura
- `src/App.jsx`: componente principal, controle de autenticação
- `src/components/`: componentes de UI (assistente, ingestão, busca, painel, pagamentos, exportação, compartilhamento)
- `src/pages/Compartilhar.jsx`: página pública de sermão compartilhado

## Rotas principais
- `/`: painel completo (autenticado)
- `/compartilhar/:shareId`: página pública de sermão compartilhado

## Docker
O frontend já está pronto para rodar via Docker e Docker Compose junto com o backend e banco de dados:

```bash
docker compose up --build
```

## Observações
- O frontend consome o backend em `http://localhost:3001` por padrão (ajuste se necessário)
- Para produção, configure a variável `PUBLIC_URL` no backend para refletir o domínio do frontend
- O projeto está pronto para deploy em VPS Debian 12 ou Docker
