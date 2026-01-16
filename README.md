# 🗺️ Jeu de Piste - Application de Géolocalisation

Application web moderne permettant de créer et jouer à des jeux de piste géolocalisés avec système d'énigmes.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration de la base de données](#configuration-de-la-base-de-données)
- [Lancement de l'application](#lancement-de-lapplication)
- [Utilisation](#utilisation)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)
- [API Documentation](#api-documentation)
- [Backup de la base de données](#backup-de-la-base-de-données)

## 🎯 Fonctionnalités

### Fonctionnalités Utilisateur
- ✅ **Inscription et connexion** avec authentification JWT
- ✅ **Gestion des rôles** : Administrateur et Participant
- ✅ **Géolocalisation en temps réel** pour valider la position
- ✅ **Système d'énigmes** avec validation de réponses
- ✅ **Suivi des participations** avec scores
- ✅ **Interface responsive** adaptée mobile et desktop

### Fonctionnalités Administrateur
- ✅ **Création de jeux de piste**
- ✅ **Gestion des énigmes** avec coordonnées GPS
- ✅ **Tableau de bord** avec statistiques
- ✅ **Activation/Désactivation** des jeux

## 🛠️ Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Langage typé
- **Prisma** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe

### Frontend
- **React** - Framework UI
- **TypeScript** - Langage typé
- **React Router** - Navigation
- **Axios** - Client HTTP
- **Leaflet** - Cartes interactives
- **React Leaflet** - Intégration Leaflet avec React

## 📦 Prérequis

- **Node.js** 24.x ou supérieur
- **npm** ou **yarn**
- **PostgreSQL** 12.x ou supérieur (installé et en cours d'exécution)
- **Git**

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/JeuDePiste.git
cd JeuDePiste
```

### 2. Installer les dépendances

#### Installation globale
```bash
npm install
```

#### Installation backend
```bash
cd backend
npm install
```

#### Installation frontend
```bash
cd ../frontend
npm install
```

## 🗄️ Configuration de la base de données

### 1. Créer la base de données PostgreSQL

```bash
# Connexion à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE jeu_de_piste;

# Créer un utilisateur (optionnel)
CREATE USER jeu_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE jeu_de_piste TO jeu_user;

# Quitter
\q
```

### 2. Configurer les variables d'environnement

Copier le fichier `.env.example` et le renommer en `.env` :

```bash
cd backend
cp .env.example .env
```

Modifier le fichier `.env` avec vos informations :

```env
# Database
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/jeu_de_piste?schema=public"

# JWT
JWT_SECRET=votre_secret_key_securisee_a_changer
JWT_EXPIRES_IN=7d

# Server
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Exécuter les migrations Prisma

```bash
cd backend

# Générer le client Prisma
npm run prisma:generate

# Créer les tables dans la base de données
npm run prisma:migrate

# (Optionnel) Peupler la base avec des données de test
npm run db:seed
```

## 🎮 Lancement de l'application

### Méthode 1 : Lancer tout en une fois (depuis la racine)

```bash
npm run dev
```

### Méthode 2 : Lancer séparément

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

L'application sera accessible à :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001

## 👤 Utilisation

### Comptes de test (après le seed)

**Administrateur :**
- Email : `admin@jeudepiste.com`
- Mot de passe : `admin123`

**Participant :**
- Email : `user1@example.com`
- Mot de passe : `user123`

### Workflow Administrateur

1. Se connecter avec un compte admin
2. Aller dans "Administration"
3. Cliquer sur "Créer un Jeu"
4. Remplir les informations du jeu et ajouter des énigmes avec coordonnées GPS
5. Activer le jeu

### Workflow Participant

1. S'inscrire ou se connecter
2. Parcourir les jeux disponibles
3. Démarrer une participation
4. Se rendre aux emplacements GPS
5. Résoudre les énigmes
6. Consulter son score

## 🌐 Déploiement

### Option 1 : Déploiement sur Heroku

#### Backend

```bash
cd backend

# Créer une app Heroku
heroku create jeu-de-piste-api

# Ajouter PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Configurer les variables d'environnement
heroku config:set JWT_SECRET=votre_secret_key
heroku config:set NODE_ENV=production

# Déployer
git subtree push --prefix backend heroku main

# Exécuter les migrations
heroku run npm run prisma:migrate
```

#### Frontend (Netlify ou Vercel)

**Netlify :**
```bash
cd frontend
npm run build

# Déployer avec Netlify CLI
netlify deploy --prod --dir=build
```

**Vercel :**
```bash
cd frontend
vercel --prod
```

### Option 2 : Déploiement sur VPS (Ubuntu)

```bash
# Installer Node.js et PostgreSQL
sudo apt update
sudo apt install nodejs npm postgresql

# Cloner le projet
git clone https://github.com/votre-username/JeuDePiste.git
cd JeuDePiste

# Configuration de la base de données
sudo -u postgres psql
CREATE DATABASE jeu_de_piste;
\q

# Installation et build
cd backend
npm install
npm run build
npm run prisma:migrate

cd ../frontend
npm install
npm run build

# Utiliser PM2 pour le backend
npm install -g pm2
cd ../backend
pm2 start dist/index.js --name jeu-de-piste-api

# Servir le frontend avec nginx
sudo apt install nginx
sudo cp -r ../frontend/build/* /var/www/html/
```

## 📁 Structure du projet

```
JeuDePiste/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Schéma de la base de données
│   ├── src/
│   │   ├── controllers/           # Logique métier
│   │   ├── middleware/            # Middleware (auth, etc.)
│   │   ├── routes/                # Routes API
│   │   ├── index.ts               # Point d'entrée
│   │   └── seed.ts                # Données de test
│   ├── .env.example               # Variables d'environnement exemple
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/            # Composants réutilisables
│   │   ├── pages/                 # Pages de l'application
│   │   ├── services/              # Services API
│   │   ├── App.tsx                # Composant principal
│   │   └── index.tsx              # Point d'entrée
│   └── package.json
└── README.md
```

## 📚 API Documentation

### Authentification

#### POST `/api/auth/register`
Inscription d'un nouvel utilisateur

**Body :**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Connexion

**Body :**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Obtenir l'utilisateur connecté (nécessite token)

### Jeux

#### GET `/api/games`
Lister tous les jeux

#### GET `/api/games/:id`
Obtenir un jeu par ID

#### POST `/api/games` (Admin)
Créer un jeu

**Body :**
```json
{
  "title": "Nom du jeu",
  "description": "Description"
}
```

#### PUT `/api/games/:id` (Admin)
Mettre à jour un jeu

#### DELETE `/api/games/:id` (Admin)
Supprimer un jeu

### Énigmes

#### GET `/api/riddles/game/:gameId`
Obtenir les énigmes d'un jeu

#### POST `/api/riddles` (Admin)
Créer une énigme

**Body :**
```json
{
  "gameId": "uuid",
  "title": "Titre",
  "question": "Question",
  "answer": "Réponse",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "radius": 100,
  "order": 1,
  "points": 10
}
```

#### POST `/api/riddles/:id/validate`
Valider une réponse

**Body :**
```json
{
  "answer": "réponse",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "participationId": "uuid"
}
```

### Participations

#### GET `/api/participations/user/:userId`
Obtenir les participations d'un utilisateur

#### POST `/api/participations`
Démarrer une participation

**Body :**
```json
{
  "gameId": "uuid"
}
```

## 💾 Backup de la base de données

### Créer un backup

```bash
# Backup complet
pg_dump -U postgres jeu_de_piste > backup_$(date +%Y%m%d).sql

# Backup avec Prisma
cd backend
npx prisma db pull
```

### Restaurer un backup

```bash
# Restaurer depuis un fichier SQL
psql -U postgres jeu_de_piste < backup_20260116.sql

# Restaurer avec Prisma
cd backend
npx prisma db push
```

### Script automatique de backup (Linux/Mac)

Créer un fichier `backup.sh` :

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR
pg_dump -U postgres jeu_de_piste > $BACKUP_DIR/backup_$DATE.sql
echo "Backup created: backup_$DATE.sql"

# Garder seulement les 7 derniers backups
ls -t $BACKUP_DIR/backup_*.sql | tail -n +8 | xargs rm -f
```

Rendre exécutable et ajouter à cron :
```bash
chmod +x backup.sh
crontab -e
# Ajouter : 0 2 * * * /chemin/vers/backup.sh
```

## 🔧 Commandes utiles

### Backend

```bash
# Développement
npm run dev

# Build
npm run build

# Démarrage production
npm start

# Prisma Studio (Interface graphique BDD)
npm run prisma:studio

# Générer le client Prisma
npm run prisma:generate

# Créer une migration
npm run prisma:migrate
```

### Frontend

```bash
# Développement
npm run dev

# Build
npm run build

# Démarrage production (après build)
serve -s build
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

MIT License

## 👥 Auteurs

Projet réalisé dans le cadre d'un projet académique.

## 🐛 Problèmes connus

- La géolocalisation nécessite HTTPS en production
- Certains navigateurs bloquent la géolocalisation par défaut

## 📞 Support

Pour toute question ou problème, ouvrir une issue sur GitHub.
