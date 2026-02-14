# -------------------------------------------------------------
#  ETAPA 1 — BUILDER (compila TypeScript)
# -------------------------------------------------------------
FROM node:18 AS builder

WORKDIR /app

# Copiar solo package.json + lock
COPY package*.json ./

# Instalar dependencias (incluye TypeScript)
RUN npm ci

# Copiar el resto del código
COPY . .

# Compilar TypeScript → dist/
RUN npx tsc -p .

# -------------------------------------------------------------
#  ETAPA 2 — RUNNER (imagen final, limpia y soberana)
# -------------------------------------------------------------
FROM node:18-slim

WORKDIR /app

ENV NODE_ENV=production

# Copiar solo node_modules de producción
COPY --from=builder /app/node_modules ./node_modules

# Copiar dist compilado
COPY --from=builder /app/dist ./dist

# Copiar cualquier archivo necesario en runtime (si aplica)
COPY package*.json ./

# Ejecutar servidor soberano
CMD ["node", "dist/server.js"]