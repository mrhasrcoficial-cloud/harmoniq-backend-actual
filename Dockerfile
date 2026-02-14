# -------------------------------------------------------------
#  ETAPA 1 — BUILDER (compila TypeScript del backend)
# -------------------------------------------------------------
FROM node:18 AS builder

WORKDIR /app

# Copiar todo el repo
COPY . .

# Entrar a backend
WORKDIR /app/backend

# Instalar dependencias del backend
RUN npm ci

# Compilar TypeScript
RUN npx tsc -p .

# -------------------------------------------------------------
#  ETAPA 2 — RUNNER (imagen final)
# -------------------------------------------------------------
FROM node:18-slim

WORKDIR /app/backend

ENV NODE_ENV=production

# Copiar dist compilado
COPY --from=builder /app/backend/dist ./dist

# Copiar package.json del backend
COPY backend/package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev

CMD ["node", "dist/server.js"]