# Déploiement sur Vercel

## ✨ Solution la plus simple !

Vercel déploie automatiquement backend + frontend + base de données.

## 📋 Étapes

### 1️⃣ Installer Vercel CLI
```bash
npm install -g vercel
```

### 2️⃣ Se connecter
```bash
vercel login
```

### 3️⃣ Déployer
```bash
cd JeuDePiste
vercel
```

### 4️⃣ Configurer la base de données

Option A: **Vercel Postgres** (gratuit, recommandé)
- Dashboard Vercel → Storage → Create Database → Postgres
- Copier `DATABASE_URL` automatiquement lié au projet

Option B: **Base externe** (Supabase, Neon, etc.)
```bash
vercel env add DATABASE_URL production
# Coller: postgresql://user:password@host:5432/database
```

### 5️⃣ Ajouter les secrets
```bash
vercel env add JWT_SECRET production
# Entrer une clé secrète forte
```

### 6️⃣ Exécuter les migrations

Une fois déployé, via Vercel Dashboard → Settings → Functions:
```bash
npx prisma migrate deploy
npx prisma db seed
```

Ou localement avec `DATABASE_URL` de production:
```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
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
