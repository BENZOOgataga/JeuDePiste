#!/bin/bash

# Script de setup initial du projet
echo "🎮 Configuration initiale du projet Jeu de Piste"
echo "================================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifications préalables
echo "🔍 Vérification des prérequis..."

# Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# PostgreSQL
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL n'est pas installé${NC}"
    echo "Veuillez installer PostgreSQL depuis https://www.postgresql.org/download/"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL installé${NC}"

echo ""
echo "📦 Installation des dépendances..."

# Installation des dépendances racine
npm install

# Installation backend
echo ""
echo "Backend..."
cd backend
npm install

# Configuration de l'environnement
echo ""
echo "⚙️ Configuration de l'environnement..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Fichier .env créé. Configuration requise:${NC}"
    echo ""
    
    # Demander les informations de la base de données
    read -p "Nom d'utilisateur PostgreSQL [postgres]: " db_user
    db_user=${db_user:-postgres}
    
    read -sp "Mot de passe PostgreSQL: " db_password
    echo ""
    
    read -p "Nom de la base de données [jeu_de_piste]: " db_name
    db_name=${db_name:-jeu_de_piste}
    
    # Mettre à jour le .env
    sed -i "s|postgresql://username:password@localhost:5432/jeu_de_piste|postgresql://$db_user:$db_password@localhost:5432/$db_name|g" .env
    
    # Générer un secret JWT aléatoire
    jwt_secret=$(openssl rand -base64 32)
    sed -i "s|your_super_secret_key_change_this_in_production|$jwt_secret|g" .env
    
    echo -e "${GREEN}✅ Fichier .env configuré${NC}"
fi

# Créer la base de données si elle n'existe pas
echo ""
echo "🗄️ Configuration de la base de données..."
read -p "Voulez-vous créer la base de données maintenant? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    psql -U $db_user -tc "SELECT 1 FROM pg_database WHERE datname = '$db_name'" | grep -q 1 || \
    psql -U $db_user -c "CREATE DATABASE $db_name"
    echo -e "${GREEN}✅ Base de données créée${NC}"
fi

# Prisma
echo ""
echo "🔧 Configuration de Prisma..."
npx prisma generate
npx prisma migrate dev --name init

# Seed
read -p "Voulez-vous peupler la base avec des données de test? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run db:seed
    echo -e "${GREEN}✅ Données de test ajoutées${NC}"
fi

# Installation frontend
cd ../frontend
echo ""
echo "Frontend..."
npm install

cd ..

# Créer le dossier de backups
mkdir -p backups

# Rendre les scripts exécutables
chmod +x backup.sh
chmod +x deploy.sh

echo ""
echo -e "${GREEN}🎉 Configuration terminée avec succès!${NC}"
echo ""
echo "Pour démarrer l'application:"
echo "  npm run dev"
echo ""
echo "Comptes de test:"
echo "  Admin: admin@jeudepiste.com / admin123"
echo "  User: user1@example.com / user123"
echo ""
echo "Documentation complète dans README.md"
