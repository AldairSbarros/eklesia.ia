#!/bin/bash
# Script de setup para backend Node.js + Prisma + PostgreSQL

if ! command -v psql &> /dev/null; then
  echo "PostgreSQL não encontrado. Instale antes de prosseguir."
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "npm não encontrado. Instale Node.js antes de prosseguir."
  exit 1
fi

echo "Instalando dependências Node.js..."
npm install

echo "Habilitando extensão pgvector no PostgreSQL..."
psql "$DATABASE_URL" -f scripts/enable_pgvector.sql || true

echo "Executando migrations do Prisma..."
npx prisma migrate deploy

echo "Setup concluído. Configure o arquivo .env com DATABASE_URL."
