
# Eklesia IA Backend

## Requisitos
- Node.js 18+
- PostgreSQL (com extensão pgvector)
- Ollama (para IA local)

## Setup rápido
1. Copie `.env.example` para `.env` e configure as variáveis (Postgres, JWT, APIs, PagSeguro, HuggingFace, Ollama).
2. Execute o script de setup:
   ```bash
   cd backend
   sh scripts/setup.sh
   ```
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Variáveis de ambiente principais
- `DATABASE_URL`: conexão Postgres
- `JWT_SECRET`: segredo JWT
- `BIBLE_API_KEY`: chave API de Bíblia
- `PAGSEGURO_TOKEN`: token PagSeguro
- `HF_TOKEN`: token HuggingFace (embeddings)
- `OLLAMA_URL` e `OLLAMA_MODEL`: endpoint/modelo IA local
- `PUBLIC_URL`: URL pública do frontend

## Principais endpoints
- `/auth/login`, `/auth/register`: autenticação JWT
- `/ingest/pdf|docx|html`: upload e indexação de arquivos (protegido)
- `/semantic/index|search`: indexação e busca semântica (protegido)
- `/biblex/*`: integração com API de Bíblia (idioma, versão, texto, áudio, vídeo)
- `/llm/sermon-assistant`: geração de sermão via IA (Ollama)
- `/payment/create|status`: monetização PagSeguro (Pix)
- `/user/files|payments`: painel do usuário (protegido)
- `/sermon/export-pdf`: exportação de sermão em PDF
- `/share/sermon`: gerar link público de compartilhamento
- `/share/sermon/:shareId`: acessar sermão compartilhado

## Deploy Ollama (IA local)
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &
ollama pull llama3  # ou outro modelo suportado
```

## Deploy PostgreSQL com pgvector
```bash
# No psql:
CREATE EXTENSION IF NOT EXISTS vector;
```

## Scripts úteis
- `npm run dev`: inicia servidor em modo desenvolvimento
- `npm run start`: inicia servidor em produção
- `sh scripts/setup.sh`: instala dependências e prepara banco

## Docker e Docker Compose
Para rodar tudo (Postgres, backend, frontend, Ollama) com um comando:

```bash
docker compose up --build
```

O arquivo `docker-compose.yml` já está pronto para uso. Ajuste variáveis de ambiente conforme necessário.

## Observações
- Todas as rotas sensíveis exigem autenticação JWT.
- O backend está pronto para deploy em VPS Debian 12 ou Docker.
- Veja o README do frontend para integração completa.
