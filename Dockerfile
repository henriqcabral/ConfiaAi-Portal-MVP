# Estágio de build
FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm ci

# Copia o código fonte
COPY . .

# Gera a build de produção
RUN npm run build

# Estágio de produção
FROM node:20-alpine AS runner
WORKDIR /app

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=8080

# Copia apenas os arquivos necessários
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expõe a porta
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "server.js"] 