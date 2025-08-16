#!/bin/bash
# Backup do banco de dados PostgreSQL do Eklesia IA
# Uso: ./backup_postgres.sh [nome_do_arquivo.sql]

ARQUIVO=${1:-backup_eklesia_$(date +%Y%m%d_%H%M%S).sql}
PGUSER=eklesia
PGPASSWORD=eklesia123
PGDATABASE=eklesiaia
PGHOST=localhost

export PGPASSWORD
pg_dump -U $PGUSER -h $PGHOST -d $PGDATABASE > $ARQUIVO
unset PGPASSWORD

echo "Backup salvo em $ARQUIVO"
