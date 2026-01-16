# 🚀 Guide de Démarrage Rapide

Ce guide vous permettra de lancer l'application en quelques minutes.

## ⚡ Installation Express (5 minutes)

### 1. Prérequis
- Node.js 24+ installé
- PostgreSQL installé et en cours d'exécution
- Git installé

### 2. Cloner et installer

```bash
git clone https://github.com/votre-username/JeuDePiste.git
cd JeuDePiste
npm install
```

### 3. Configuration Base de Données

```bash
# Créer la base de données
psql -U postgres
CREATE DATABASE jeu_de_piste;
\q

# Configurer l'environnement
cd backend
cp .env.example .env
```

Modifier `backend/.env` :
```env
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/jeu_de_piste?schema=public"
JWT_SECRET=changez_ceci_par_une_cle_secrete
```

### 4. Setup Backend

```bash
# Depuis backend/
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

### 5. Setup Frontend

```bash
# Depuis frontend/
cd ../frontend
npm install
```

### 6. Lancer l'application

```bash
# Depuis la racine
cd ..
npm run dev
```

🎉 **C'est fait !** L'application est disponible sur http://localhost:3000

## 👤 Comptes de test

**Admin :**
- Email: `admin@jeudepiste.com`
- Mot de passe: `admin123`

**Utilisateur :**
- Email: `user1@example.com`
- Mot de passe: `user123`

## 🎮 Premier test

1. Ouvrir http://localhost:3000
2. Se connecter avec le compte admin
3. Aller dans "Administration" → "Créer un Jeu"
4. Créer un jeu avec quelques énigmes
5. Se déconnecter et se reconnecter avec le compte utilisateur
6. Parcourir les jeux et démarrer une participation

## 🐛 Résolution de problèmes

### Erreur de connexion PostgreSQL
```bash
# Vérifier que PostgreSQL est démarré
# Windows
services.msc → PostgreSQL

# Linux/Mac
sudo systemctl status postgresql
```

### Port déjà utilisé
Modifier les ports dans :
- `backend/.env` → PORT=3001
- `frontend/package.json` → proxy: "http://localhost:3001"

### Erreur Prisma
```bash
cd backend
rm -rf node_modules
npm install
npx prisma generate
```

## 📱 Tester sur mobile

1. Trouver votre IP locale :
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   ```

2. Modifier `frontend/src/services/api.ts` :
   ```typescript
   const API_URL = 'http://VOTRE_IP:3001/api';
   ```

3. Sur mobile, accéder à `http://VOTRE_IP:3000`

## 📚 Documentation complète

- [README.md](README.md) - Documentation complète
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guide de déploiement
- [PROJECT_MANAGEMENT.md](PROJECT_MANAGEMENT.md) - Gestion de projet

## 🆘 Support

En cas de problème :
1. Vérifier les logs dans le terminal
2. Consulter la documentation complète
3. Ouvrir une issue sur GitHub

---

**Prêt à créer des jeux de piste incroyables ! 🗺️🎮**
