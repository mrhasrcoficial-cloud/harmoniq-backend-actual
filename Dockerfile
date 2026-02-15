# -------------------------------------------------------------
# ETAPA 1 — BUILDER
# -------------------------------------------------------------
FROM node:18 AS builder

# Carpeta raíz del contenedor
WORKDIR /app

# Copiar SOLO el backend soberano
COPY backend ./backend

# Entrar al backend soberano
WORKDIR /app/backend

# Instalar dependencias
RUN npm ci

# Compilar TypeScript usando el tsconfig del backend
RUN npx tsc -p tsconfig.json

# -------------------------------------------------------------
# ETAPA 2 — RUNNER
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

# Ejecutar servidor
CMD ["node", "dist/server.js"]