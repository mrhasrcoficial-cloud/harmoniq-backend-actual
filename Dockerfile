# -------------------------------------------------------------
#  ETAPA 1 — BUILDER (compila TypeScript del backend)
# -------------------------------------------------------------
FROM node:18 AS builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend ./
RUN npx tsc -p .

# -------------------------------------------------------------
#  ETAPA 2 — RUNNER (imagen final)
# -------------------------------------------------------------
FROM node:18-slim

WORKDIR /app/backend

ENV NODE_ENV=production

COPY --from=builder /app/backend/dist ./dist
COPY backend/package*.json ./

RUN npm ci --omit=dev

CMD ["node", "dist/server.js"]