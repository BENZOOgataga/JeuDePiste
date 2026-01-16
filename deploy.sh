#!/bin/bash

# Script de déploiement automatique
echo "🚀 Démarrage du déploiement..."

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier que PostgreSQL est installé
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL détecté${NC}"

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) détecté${NC}"

# Installation des dépendances backend
echo "📦 Installation des dépendances backend..."
cd backend
npm install

# Configuration de l'environnement
if [ ! -f .env ]; then
    echo "⚙️ Création du fichier .env..."
    cp .env.example .env
    echo -e "${RED}⚠️  Veuillez configurer le fichier backend/.env avant de continuer${NC}"
    exit 1
fi

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Exécuter les migrations
echo "🗄️ Exécution des migrations de base de données..."
npx prisma migrate deploy

# Seed de la base de données
read -p "Voulez-vous peupler la base de données avec des données de test? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Peuplement de la base de données..."
    npm run db:seed
fi

# Build du backend
echo "🏗️ Build du backend..."
npm run build

# Installation des dépendances frontend
echo "📦 Installation des dépendances frontend..."
cd ../frontend
npm install

# Build du frontend
echo "🏗️ Build du frontend..."
npm run build

cd ..

echo -e "${GREEN}✅ Déploiement terminé avec succès!${NC}"
echo ""
echo "Pour démarrer l'application :"
echo "  - Backend: cd backend && npm start"
echo "  - Frontend: cd frontend && npm start"
echo ""
echo "Ou depuis la racine: npm run dev"
