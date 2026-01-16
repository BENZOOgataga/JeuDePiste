# Guide de Déploiement - Jeu de Piste

Ce guide détaille les différentes options pour déployer l'application Jeu de Piste en ligne.

## Table des matières

1. [Déploiement sur Heroku (Backend) + Netlify (Frontend)](#option-1-heroku--netlify)
2. [Déploiement sur Vercel (Full-stack)](#option-2-vercel)
3. [Déploiement sur VPS (DigitalOcean, AWS, etc.)](#option-3-vps)
4. [Déploiement avec Docker](#option-4-docker)

---

## Option 1: Heroku + Netlify

### Backend sur Heroku

#### 1. Créer un compte Heroku
- Aller sur https://heroku.com
- Créer un compte gratuit

#### 2. Installer Heroku CLI
```bash
# Windows (avec Chocolatey)
choco install heroku-cli

# Mac
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

#### 3. Connexion et création de l'app
```bash
heroku login
heroku create jeu-de-piste-api
```

#### 4. Ajouter PostgreSQL
```bash
heroku addons:create heroku-postgresql:mini
```

#### 5. Configuration des variables d'environnement
```bash
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://votre-app.netlify.app
```

#### 6. Déploiement
```bash
# Depuis la racine du projet
git subtree push --prefix backend heroku main

# Ou créer un repository séparé pour le backend
cd backend
git init
heroku git:remote -a jeu-de-piste-api
git add .
git commit -m "Initial commit"
git push heroku main
```

#### 7. Exécuter les migrations
```bash
heroku run npm run prisma:migrate
heroku run npm run db:seed
```

### Frontend sur Netlify

#### 1. Préparer le frontend
```bash
cd frontend

# Créer un fichier .env.production
echo "REACT_APP_API_URL=https://jeu-de-piste-api.herokuapp.com/api" > .env.production
```

#### 2. Build local
```bash
npm run build
```

#### 3. Déployer sur Netlify

**Méthode A: Drag & Drop**
- Aller sur https://netlify.com
- Glisser-déposer le dossier `build/`

**Méthode B: Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build
```

**Méthode C: Connexion GitHub**
- Pousser le code sur GitHub
- Connecter le repository à Netlify
- Configuration build:
  - Build command: `cd frontend && npm install && npm run build`
  - Publish directory: `frontend/build`
  - Environment variables: `REACT_APP_API_URL=https://jeu-de-piste-api.herokuapp.com/api`

---

## Option 2: Vercel

### Configuration

#### 1. Installer Vercel CLI
```bash
npm install -g vercel
vercel login
```

#### 2. Configuration du projet

Créer `vercel.json` à la racine (déjà créé) et configurer:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/package.json",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ]
}
```

#### 3. Ajouter une base de données

**Option A: Vercel Postgres**
```bash
vercel postgres create jeu-de-piste-db
```

**Option B: Supabase (PostgreSQL gratuit)**
- Aller sur https://supabase.com
- Créer un projet
- Récupérer la connection string

#### 4. Déploiement
```bash
vercel --prod
```

#### 5. Configurer les variables d'environnement

Dans le dashboard Vercel:
- DATABASE_URL
- JWT_SECRET
- NODE_ENV=production

---

## Option 3: VPS (Ubuntu/Debian)

### 1. Prérequis sur le serveur

```bash
# Connexion SSH
ssh user@votre-serveur-ip

# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

# Installer PostgreSQL
sudo apt install postgresql postgresql-contrib

# Installer Nginx
sudo apt install nginx

# Installer PM2
sudo npm install -g pm2
```

### 2. Configuration PostgreSQL

```bash
sudo -u postgres psql
CREATE DATABASE jeu_de_piste;
CREATE USER jeu_user WITH PASSWORD 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON DATABASE jeu_de_piste TO jeu_user;
\q
```

### 3. Déployer le projet

```bash
# Cloner le repository
cd /var/www
sudo git clone https://github.com/votre-username/JeuDePiste.git
cd JeuDePiste

# Configuration backend
cd backend
cp .env.example .env
nano .env  # Modifier avec vos valeurs

# Installation et build
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run build

# Démarrer avec PM2
pm2 start dist/index.js --name jeu-de-piste-api
pm2 save
pm2 startup

# Frontend
cd ../frontend
npm install
npm run build
```

### 4. Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/jeu-de-piste
```

Ajouter:
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    # Frontend
    location / {
        root /var/www/JeuDePiste/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site:
```bash
sudo ln -s /etc/nginx/sites-available/jeu-de-piste /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

---

## Option 4: Docker

### 1. Créer les Dockerfiles

**backend/Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

**frontend/Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. docker-compose.yml

Créer à la racine:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: jeu_de_piste
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/jeu_de_piste
      JWT_SECRET: your_secret_key
      PORT: 3001
    ports:
      - "3001:3001"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 3. Déploiement

```bash
docker-compose up -d

# Exécuter les migrations
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend npm run db:seed
```

---

## Configuration DNS

Après le déploiement, configurer votre DNS:

1. Aller sur votre registrar de domaine
2. Ajouter un enregistrement A pointant vers votre IP
3. Attendre la propagation DNS (jusqu'à 48h)

---

## Monitoring et Maintenance

### Logs

**Heroku:**
```bash
heroku logs --tail
```

**VPS avec PM2:**
```bash
pm2 logs jeu-de-piste-api
```

**Docker:**
```bash
docker-compose logs -f
```

### Backups automatiques

Configurer un cron job (VPS):
```bash
crontab -e
# Ajouter: 0 2 * * * /var/www/JeuDePiste/backup.sh
```

---

## Checklist finale

- [ ] Variables d'environnement configurées
- [ ] Base de données migrée
- [ ] SSL/HTTPS activé
- [ ] CORS configuré correctement
- [ ] Backups automatiques en place
- [ ] Monitoring configuré
- [ ] Documentation à jour
- [ ] Tests effectués

---

## Support

Pour plus d'informations:
- Heroku: https://devcenter.heroku.com/
- Netlify: https://docs.netlify.com/
- Vercel: https://vercel.com/docs
- DigitalOcean: https://docs.digitalocean.com/
