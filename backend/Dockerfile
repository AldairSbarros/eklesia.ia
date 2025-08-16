# Dockerfile para Eklesia IA Backend
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponha a porta padrão do backend
EXPOSE 3001

CMD ["npm", "run", "start"]
