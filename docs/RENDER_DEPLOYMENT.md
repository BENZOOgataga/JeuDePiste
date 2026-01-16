# Déploiement sur Render.com

## Backend (API)

### 1. Prérequis
- Compte Render.com (gratuit, pas de CB requise)
- Repository GitHub public

### 2. Créer le Web Service Backend

1. **Aller sur [Render.com](https://render.com)**
2. **Connecter votre compte GitHub**
3. **Cliquer sur "New +" → "Web Service"**
4. **Sélectionner le repository:** BENZOOgataga/JeuDePiste
5. **Configurer:**
   - **Name:** `jeu-de-piste-backend`
   - **Region:** Frankfurt (EU Central)
   - **Branch:** main
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### 3. Variables d'environnement

Ajouter dans Render Dashboard → Environment:

```
DATABASE_URL=<sera fourni par Render PostgreSQL>
JWT_SECRET=votre_secret_jwt_super_securise_ici
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=10000
```

### 4. Créer la base PostgreSQL

1. **Cliquer sur "New +" → "PostgreSQL"**
2. **Configurer:**
   - **Name:** `jeu-de-piste-db`
   - **Database:** jeu_de_piste
   - **User:** (auto-généré)
   - **Region:** Frankfurt (EU Central) - **MÊME RÉGION QUE LE BACKEND**
   - **Instance Type:** Free
3. **Copier l'URL de connexion (Internal Database URL)**
4. **Retourner au Web Service → Environment**
5. **Mettre à jour `DATABASE_URL` avec l'URL copiée**

### 5. Déployer et migrer

1. Le déploiement démarre automatiquement
2. Une fois déployé, ouvrir le **Shell** dans Render Dashboard:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

### 6. URL du Backend

L'URL sera: `https://jeu-de-piste-backend.onrender.com`

---

## Frontend (React)

### Mettre à jour l'URL de l'API

Éditer `frontend/src/config/api.ts`:
```typescript
export const API_BASE_URL = 'https://jeu-de-piste-backend.onrender.com/api';
```

Puis:
```bash
cd frontend
npm run build
```

### Déployer sur Netlify

1. Connecter le repo GitHub sur Netlify
2. Configurer:
   - **Base directory:** `frontend`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `frontend/build`

---

## Alternative rapide: Render pour le frontend aussi

1. **New + → Static Site**
2. **Repository:** BENZOOgataga/JeuDePiste
3. **Configuration:**
   - **Name:** jeu-de-piste-frontend
   - **Branch:** main
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`

---

## Avantages de Render vs Heroku

✅ Gratuit sans carte bancaire
✅ PostgreSQL inclus gratuitement
✅ Déploiement automatique depuis Git
✅ SSL/HTTPS automatique
✅ Région EU disponible
✅ 750h/mois gratuit (suffisant pour un projet étudiant)

⚠️ **Note:** Le tier gratuit s'endort après 15 minutes d'inactivité. Premier démarrage peut prendre 30-50 secondes.
