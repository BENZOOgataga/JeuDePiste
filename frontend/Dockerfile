# Build stage
FROM node:24-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY public ./public
COPY src ./src
COPY tsconfig.json ./

# Build de l'application
RUN npm run build

# Production stage avec nginx
FROM nginx:alpine

# Copier le build
COPY --from=build /app/build /usr/share/nginx/html

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
