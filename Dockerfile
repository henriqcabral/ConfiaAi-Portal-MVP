# Estágio de build
FROM node:20-alpine AS builder
WORKDIR /app

# Define o argumento de build
ARG OPENAI_API_KEY
ARG NEXTAUTH_SECRET

# Instala dependências
COPY package*.json ./
RUN npm ci

# Copia o código fonte
COPY . .

# Cria o diretório public se não existir e adiciona um arquivo .gitkeep
RUN mkdir -p public && touch public/.gitkeep

# Define as variáveis de ambiente para o build
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Gera a build de produção
RUN npm run build

# Estágio de produção
FROM node:20-alpine AS runner
WORKDIR /app

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=8080
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Cria diretórios necessários
RUN mkdir -p public

# Copia apenas os arquivos necessários
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public/.gitkeep ./public/.gitkeep
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expõe a porta
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "server.js"] 