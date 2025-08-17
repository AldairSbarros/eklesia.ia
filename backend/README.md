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

### Novos endpoints de enriquecimento bíblico e IA
- `/bible/maps?local=Jerusalém`: mapas, coordenadas e descrição de locais bíblicos (OpenBible.info)
- `/bible/images?termo=Egito`: imagens públicas e links de artefatos (Wikimedia, BibleAtlas, British Museum)
- `/bible/data?termo=rei Davi`: dados históricos/culturais (Wikidata/Wikipedia)
- `/bible/artifacts?termo=Isaías`: links para manuscritos e artefatos (Dead Sea Scrolls, British Museum)
- `/bible/word?termo=ágape`: consulta palavra original (hebraico/grego), transliteração, significado, pronúncia, exemplos (STEP Bible)
- `/bible/hermeneutics` (POST): análise hermenêutica e semântica via IA local (Ollama)

#### Exemplo de uso (curl):
```
curl 'http://localhost:3001/bible/maps?local=Jerusalém'
curl 'http://localhost:3001/bible/images?termo=Egito'
curl 'http://localhost:3001/bible/data?termo=rei%20Davi'
curl 'http://localhost:3001/bible/word?termo=ágape'
curl -X POST 'http://localhost:3001/bible/hermeneutics' -H 'Content-Type: application/json' -d '{"texto": "João 3:16"}'
```

Esses endpoints permitem enriquecer qualquer estudo, sermão ou pesquisa bíblica com contexto histórico, mapas, imagens, análise semântica e consulta ao original.

---

## Mudanças recentes no schema Prisma

- O campo `embedding` do modelo `IngestedText` agora é `Float[]` (array de floats), não mais `Vector` ou `Bytes`.
- O Prisma não suporta mais o tipo `Vector` diretamente, apenas arrays de floats para embeddings.
- O modelo `User` agora possui relações inversas para `SharedSermon`, `Payment` e `IngestedText`:
  - `sharedSermons SharedSermon[]`
  - `payments Payment[]`
  - `ingestedTexts IngestedText[]`

Se você já tinha um banco com embeddings em formato `vector`, adapte suas queries SQL ou migre os dados para arrays de floats.

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

## Exemplos de Request e Response (JSON)

### Autenticação

#### POST /auth/register
Request:
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "name": "Usuário"
}
```
Response (sucesso):
```json
{
  "token": "jwt_token_aqui",
  "user": { "id": 1, "email": "usuario@exemplo.com", "name": "Usuário" }
}
```

#### POST /auth/login
Request:
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```
Response (sucesso):
```json
{
  "token": "jwt_token_aqui",
  "user": { "id": 1, "email": "usuario@exemplo.com", "name": "Usuário" }
}
```

### Ingestão de Arquivos

#### POST /ingest/pdf|docx|html
Request: multipart/form-data (campo `file`)
Response:
```json
{
  "text": "Texto extraído do arquivo...",
  "indexed": true,
  "id": 42
}
```

### Busca Semântica

#### POST /semantic/index
Request:
```json
{
  "text": "Texto para indexar",
  "userId": 1
}
```
Response:
```json
{
  "id": 42,
  "filename": "arquivo.pdf",
  "text": "Texto para indexar",
  "embedding": [0.1, 0.2, ...],
  "userId": 1
}
```

#### POST /semantic/search
Request:
```json
{
  "query": "busca semântica",
  "userId": 1
}
```
Response:
```json
[
  {
    "id": 42,
    "filename": "arquivo.pdf",
    "text": "Texto indexado...",
    "score": 0.98
  }
]
```

### Pagamentos

#### POST /payment/create
Request:
```json
{
  "amount": 10.0,
  "method": "pix"
}
```
Response:
```json
{
  "payment": { "id": 1, "status": "pending", "amount": 10.0 },
  "pagseguro": { "qr_code": "..." }
}
```

#### GET /payment/status/:id
Response:
```json
{
  "id": 1,
  "status": "paid",
  "amount": 10.0
}
```

### Painel do Usuário

#### GET /user/files
Response:
```json
[
  { "id": 42, "filename": "arquivo.pdf", "text": "..." }
]
```

#### GET /user/payments
Response:
```json
[
  { "id": 1, "status": "paid", "amount": 10.0 }
]
```

### Compartilhamento

#### POST /share/sermon
Request:
```json
{
  "sermonId": 123
}
```
Response:
```json
{
  "url": "https://app.exemplo.com/compartilhar/abc123"
}
```

#### GET /share/sermon/:shareId
Response:
```json
{
  "id": 123,
  "tema": "Tema do sermão",
  "conteudo": "..."
}
```

### Exportação de Sermão

#### POST /sermon/export-pdf
Request:
```json
{
  "sermonId": 123
}
```
Response: PDF (arquivo)

### Endpoints Bíblicos e IA

#### GET /bible/verse?ref=João+3:16
Response:
```json
{
  "livro": "João",
  "capitulo": 3,
  "versiculo": 16,
  "texto": "Porque Deus amou o mundo..."
}
```

#### GET /bible/word?termo=ágape
Response:
```json
{
  "palavra": "ágape",
  "original": "ἀγάπη",
  "significado": "amor incondicional",
  "exemplos": ["João 3:16", "1 Coríntios 13"]
}
```

#### POST /bible/hermeneutics
Request:
```json
{
  "texto": "João 3:16"
}
```
Response:
```json
{
  "analise": "Análise hermenêutica e semântica do texto..."
}
```

> Outros endpoints seguem estrutura semelhante. Consulte o código para detalhes de parâmetros e respostas.

## Como usar as IAs integradas no sistema

### 1. IA Local com Ollama

O sistema utiliza o Ollama para geração de texto, análise semântica e outras funções de IA local.

#### Instalação e execução do Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve &
ollama pull llama3  # ou outro modelo suportado (llama2, phi3, mistral, etc)
```

#### Configuração no .env
```
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

#### Exemplo de uso: Geração de sermão

##### POST /llm/sermon-assistant
Request:
```json
{
  "messages": [
    { "role": "user", "content": "Gere um esboço de sermão sobre João 3:16" }
  ]
}
```
Response:
```json
{
  "resposta": "1. Introdução... 2. Exposição... 3. Aplicação..."
}
```

### 2. Embeddings e Busca Semântica (HuggingFace)

O sistema pode usar modelos da HuggingFace para gerar embeddings de texto.

#### Configuração no .env
```
HF_TOKEN=seu_token_huggingface
```

#### Exemplo de uso: Indexação e busca semântica

##### POST /semantic/index
Request:
```json
{
  "text": "Texto para indexar",
  "userId": 1
}
```

##### POST /semantic/search
Request:
```json
{
  "query": "busca semântica",
  "userId": 1
}
```

### 3. Análise Hermenêutica e Semântica

#### POST /bible/hermeneutics
Request:
```json
{
  "texto": "João 3:16"
}
```
Response:
```json
{
  "analise": "Análise hermenêutica e semântica do texto..."
}
```

### 4. Outras IAs e APIs

- O endpoint `/bible/word` utiliza IA para análise de palavras originais (hebraico/grego).
- O endpoint `/bible/data` pode usar IA para enriquecer dados históricos/culturais.
- O endpoint `/bible/maps` pode usar IA para desambiguação de locais bíblicos.

Consulte os exemplos de request/response acima para cada endpoint.

---

> Certifique-se de que o Ollama está rodando e o modelo correto está disponível antes de usar os endpoints de IA local.
> Para embeddings, garanta que o token HuggingFace está configurado.
> Consulte os logs do backend para mensagens de erro ou problemas de integração.
