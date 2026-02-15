# -------------------------------------------------------------
# ETAPA 1 — BUILDER
# -------------------------------------------------------------
FROM node:18 AS builder

WORKDIR /app

# Copiar TODO el backend soberano
COPY . .

# Instalar dependencias
RUN npm ci

# Compilar TypeScript usando el tsconfig del backend
RUN npx tsc -p tsconfig.json

# -------------------------------------------------------------
# ETAPA 2 — RUNNER
# -------------------------------------------------------------
FROM node:18-slim

WORKDIR /app

ENV NODE_ENV=production

# Copiar dist compilado
COPY --from=builder /app/dist ./dist

# Copiar package.json y lock
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev

# Ejecutar servidor
CMD ["node", "dist/server.js"]