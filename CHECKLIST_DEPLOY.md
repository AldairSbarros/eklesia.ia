# Checklist Final de Deploy – Eklesia IA

## 1. Pré-requisitos
- VPS rodando Debian 12 (ou similar)
- Docker e Docker Compose instalados
- Nginx instalado
- Domínios configurados: ia.eklesia.app.br e api-ia.eklesia.app.br apontando para o IP do servidor

## 2. Clonar o projeto
```
git clone git@github.com:AldairSbarros/eklesia.ia.git
cd eklesia.ia
```

## 3. Configurar variáveis de ambiente
- Copie os arquivos `.env.example` e `.env.prod.example` para `.env` e ajuste as variáveis (backend e frontend)

## 4. Subir containers com Docker Compose
```
docker-compose up -d --build
```
- Isso irá subir: Postgres, backend, frontend e Ollama

## 5. Configurar Nginx
- Copie o arquivo `nginx.conf` para `/etc/nginx/sites-available/eklesia.ia`
- Crie o link simbólico:
```
sudo ln -s /etc/nginx/sites-available/eklesia.ia /etc/nginx/sites-enabled/
```
- Teste e recarregue o Nginx:
```
sudo nginx -t
sudo systemctl reload nginx
```

## 6. Gerar certificados SSL (Let's Encrypt)
```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d ia.eklesia.app.br -d api-ia.eklesia.app.br
```
- Siga as instruções do certbot para ativar HTTPS

## 7. Backup do banco de dados
- Use o script `/scripts/backup_postgres.sh` para backups manuais ou agende via cron

## 8. Acesso e Testes
- Acesse https://ia.eklesia.app.br (frontend)
- Acesse https://api-ia.eklesia.app.br/docs (backend, se habilitado o Swagger ou rota de saúde)
- Teste login, ingestão, busca, exportação e pagamentos

## 9. Monitoramento e Logs
- Use `docker logs <container>` para logs
- Monitore recursos do VPS (CPU, RAM, disco)

## 10. Atualizações
- Para atualizar o código:
```
git pull
sudo docker-compose up -d --build
sudo systemctl reload nginx
```

---

Dúvidas ou problemas? Consulte os READMEs do backend e frontend ou peça suporte.
