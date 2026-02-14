# -------------------------------------------------------------
#  ETAPA 1 — BUILDER (compila TypeScript del backend)
# -------------------------------------------------------------
FROM node:18 AS builder

# Carpeta de trabajo raíz
WORKDIR /app

# Copiar TODO el repo
COPY . .

# Entrar al backend
WORKDIR /app/backend

# Instalar dependencias del backend
RUN npm ci

# Compilar TypeScript usando el tsconfig correcto
RUN npx tsc -p /app/backend/tsconfig.json

# -------------------------------------------------------------
#  ETAPA 2 — RUNNER (imagen final, limpia)
# -------------------------------------------------------------
FROM node:18-slim

WORKDIR /app/backend

ENV NODE_ENV=production

# Copiar dist compilado desde el builder
COPY --from=builder /app/backend/dist ./dist

# Copiar package.json del backend
COPY backend/package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev

# Ejecutar servidor soberano
CMD ["node", "dist/server.js"]