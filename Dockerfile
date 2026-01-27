FROM node:18

WORKDIR /app

COPY package*.json ./

# Instalar TODAS las dependencias (incluye TypeScript)
RUN npm install

# Copiar el resto del código, sin node_modules
COPY . .

# Compilar TypeScript
RUN npx tsc -p .

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]