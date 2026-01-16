# Déploiement sur Vercel

## ✨ Solution la plus simple !

Vercel déploie automatiquement backend + frontend + base de données.

## 📋 Étapes

### 1️⃣ Créer le projet sur Vercel
- Va sur https://vercel.com
- Connecte ton GitHub
- Importe le repo **BENZOOgataga/JeuDePiste**
- Framework: **Create React App**
- Node.js Version: **20.x**
- Clique **Deploy**

### 2️⃣ Installer Vercel CLI (optionnel)
```bash
npm install -g vercel
vercel login
```

### 3️⃣ Configurer la base de données

**Vercel Postgres** (gratuit, recommandé)
- Dashboard Vercel → Storage → Create Database → Postgres
- Copier `DATABASE_URL` automatiquement lié au projet

### 4️⃣ Ajouter les secrets
```bash
vercel env add JWT_SECRET production
# Entrer une clé secrète forte
```

### 5️⃣ Exécuter les migrations

Localement avec `DATABASE_URL` de production:
```bash
vercel env pull .env.production
cd backend
DATABASE_URL="<url-from-env>" npx prisma migrate deploy
DATABASE_URL="<url-from-env>" npm run db:seed
```

## 🎯 Configuration automatique

Le fichier `vercel.json` est déjà configuré pour:
- ✅ Backend API serverless (`/api/*`)
- ✅ Frontend React statique
- ✅ Variables d'environnement
- ✅ Routes automatiques

## 🚀 Résultat

URL finale: `https://jeu-de-piste.vercel.app`
- Frontend: `https://jeu-de-piste.vercel.app`
- API: `https://jeu-de-piste.vercel.app/api/*`

## 🔄 Déploiement continu

Vercel redéploie automatiquement à chaque push sur GitHub !
