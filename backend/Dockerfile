FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY prisma ./prisma
COPY src ./src

# Générer le client Prisma
RUN npx prisma generate

# Build de l'application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copier les dépendances de production
COPY package*.json ./
RUN npm install --only=production

# Copier Prisma
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copier le build
COPY --from=build /app/dist ./dist

# Exposer le port
EXPOSE 3001

# Script de démarrage
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/index.js"]
