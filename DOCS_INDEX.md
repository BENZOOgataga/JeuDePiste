# 📖 Index de la Documentation

Guide de navigation dans la documentation du projet Jeu de Piste.

---

## 🚀 Pour commencer

| Document | Description | Temps estimé |
|----------|-------------|--------------|
| [QUICKSTART.md](QUICKSTART.md) | Démarrage rapide en 5 minutes | ⏱️ 5 min |
| [README.md](README.md) | Documentation complète du projet | ⏱️ 15 min |

---

## 📚 Documentation principale

### Configuration et installation

| Document | Contenu |
|----------|---------|
| [README.md](README.md) | Guide complet d'installation et utilisation |
| [QUICKSTART.md](QUICKSTART.md) | Guide de démarrage rapide |
| Backend [.env.example](backend/.env.example) | Template de configuration backend |
| [.env.docker.example](.env.docker.example) | Template pour Docker |

### Déploiement

| Document | Plateforme |
|----------|-----------|
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guide complet - Toutes plateformes |
| [DOCKER.md](DOCKER.md) | Guide Docker et Docker Compose |
| [Procfile](Procfile) | Configuration Heroku |
| [netlify.toml](netlify.toml) | Configuration Netlify |
| [vercel.json](vercel.json) | Configuration Vercel |

### Scripts

| Fichier | Plateforme | Usage |
|---------|-----------|--------|
| [setup.sh](setup.sh) | Linux/Mac | Configuration initiale |
| setup.bat | Windows | Configuration initiale |
| [deploy.sh](deploy.sh) | Linux/Mac | Déploiement automatique |
| [deploy.bat](deploy.bat) | Windows | Déploiement automatique |
| [backup.sh](backup.sh) | Linux/Mac | Backup base de données |
| [backup.bat](backup.bat) | Windows | Backup base de données |

---

## 🎯 Par cas d'usage

### Je veux démarrer rapidement

1. Lire [QUICKSTART.md](QUICKSTART.md)
2. Exécuter les commandes
3. Commencer à tester

### Je veux déployer en production

1. Lire [DEPLOYMENT.md](DEPLOYMENT.md)
2. Choisir une plateforme
3. Suivre les instructions spécifiques

### Je veux utiliser Docker

1. Lire [DOCKER.md](DOCKER.md)
2. Configurer `.env`
3. Lancer `docker-compose up`

### Je veux comprendre l'architecture

1. Lire [README.md](README.md) - Section "Structure du projet"
2. Consulter [README.md](README.md) - Section "Technologies utilisées"
3. Explorer le code source

### Je veux tester l'application

1. Lire [TESTING.md](TESTING.md)
2. Utiliser les comptes de test
3. Suivre les scénarios

### Je veux contribuer

1. Lire [README.md](README.md) - Section "Contribution"
2. Consulter [PROJECT_MANAGEMENT.md](PROJECT_MANAGEMENT.md)
3. Créer une branche et commencer

---

## 🎓 Pour l'évaluation

### Livrables du projet

| Document | Contenu |
|----------|---------|
| [LIVRABLE.md](LIVRABLE.md) | Résumé complet pour le professeur |
| [TESTING.md](TESTING.md) | Guide de test de toutes les fonctionnalités |
| [CHANGELOG.md](CHANGELOG.md) | Historique des versions |

### Gestion de projet

| Document | Contenu |
|----------|---------|
| [PROJECT_MANAGEMENT.md](PROJECT_MANAGEMENT.md) | Guide Trello et gestion Agile |
| [CHANGELOG.md](CHANGELOG.md) | Suivi des versions |

### Base de données

| Document | Contenu |
|----------|---------|
| [backups/README.md](backups/README.md) | Instructions backup/restore |
| [backend/prisma/schema.prisma](backend/prisma/schema.prisma) | Schéma de base de données |

---

## 🛠️ Par technologie

### Backend (Node.js)

| Fichier | Description |
|---------|-------------|
| [backend/src/index.ts](backend/src/index.ts) | Point d'entrée |
| [backend/src/controllers/](backend/src/controllers/) | Logique métier |
| [backend/src/routes/](backend/src/routes/) | Routes API |
| [backend/src/middleware/](backend/src/middleware/) | Middleware |
| [backend/prisma/schema.prisma](backend/prisma/schema.prisma) | Schéma BDD |

### Frontend (React)

| Fichier | Description |
|---------|-------------|
| [frontend/src/App.tsx](frontend/src/App.tsx) | Composant principal |
| [frontend/src/pages/](frontend/src/pages/) | Pages de l'application |
| [frontend/src/components/](frontend/src/components/) | Composants réutilisables |
| [frontend/src/services/](frontend/src/services/) | Services API |

### Infrastructure

| Fichier | Description |
|---------|-------------|
| [docker-compose.yml](docker-compose.yml) | Configuration Docker |
| [backend/Dockerfile](backend/Dockerfile) | Image Docker backend |
| [frontend/Dockerfile](frontend/Dockerfile) | Image Docker frontend |

---

## 📊 API Documentation

Consultez [README.md](README.md) - Section "API Documentation" pour :
- Routes d'authentification
- Routes des jeux
- Routes des énigmes
- Routes des participations
- Exemples de requêtes

---

## 🔍 Recherche rapide

### Je cherche...

**...comment installer PostgreSQL**
→ [README.md](README.md) - "Configuration de la base de données"

**...les comptes de test**
→ [QUICKSTART.md](QUICKSTART.md) ou [TESTING.md](TESTING.md)

**...comment déployer sur Heroku**
→ [DEPLOYMENT.md](DEPLOYMENT.md) - "Option 1: Heroku + Netlify"

**...comment créer un backup**
→ [README.md](README.md) - "Backup de la base de données"

**...comment tester la géolocalisation**
→ [TESTING.md](TESTING.md) - "Scénario 12"

**...les fonctionnalités implémentées**
→ [LIVRABLE.md](LIVRABLE.md) - "Fonctionnalités implémentées"

**...comment contribuer**
→ [README.md](README.md) - "Contribution"

**...les bugs connus**
→ [TESTING.md](TESTING.md) - "Bugs connus et limitations"

---

## 📱 Liens utiles

### Externes
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Docker Documentation](https://docs.docker.com/)

### GitHub
- [Repository](https://github.com/votre-username/JeuDePiste)
- [Issues](https://github.com/votre-username/JeuDePiste/issues)
- [Pull Requests](https://github.com/votre-username/JeuDePiste/pulls)

---

## 🆘 Aide

### Problèmes courants

**L'application ne démarre pas**
→ [QUICKSTART.md](QUICKSTART.md) - "Résolution de problèmes"

**Erreur PostgreSQL**
→ [README.md](README.md) - "Configuration de la base de données"

**Erreur Prisma**
→ [README.md](README.md) - "Commandes utiles"

**Problème Docker**
→ [DOCKER.md](DOCKER.md) - "Dépannage"

**Géolocalisation ne fonctionne pas**
→ [TESTING.md](TESTING.md) - "Scénario 12"

### Support

Pour obtenir de l'aide :
1. Consulter la documentation appropriée
2. Vérifier les logs d'erreur
3. Consulter [TESTING.md](TESTING.md)
4. Ouvrir une issue sur GitHub

---

## 📋 Checklist projet

Avant de rendre le projet, vérifier que tous ces fichiers existent :

### Documentation
- [x] README.md
- [x] QUICKSTART.md
- [x] DEPLOYMENT.md
- [x] DOCKER.md
- [x] PROJECT_MANAGEMENT.md
- [x] TESTING.md
- [x] LIVRABLE.md
- [x] CHANGELOG.md
- [x] LICENSE
- [x] DOCS_INDEX.md (ce fichier)

### Configuration
- [x] .gitignore
- [x] .env.example (backend)
- [x] .env.docker.example
- [x] package.json (root, backend, frontend)
- [x] tsconfig.json (backend, frontend)
- [x] docker-compose.yml
- [x] Dockerfile (backend, frontend)

### Scripts
- [x] setup.sh / setup.bat
- [x] deploy.sh / deploy.bat
- [x] backup.sh / backup.bat

### Code source
- [x] Backend complet
- [x] Frontend complet
- [x] Schéma Prisma
- [x] Migrations
- [x] Seed data

---

## 🎯 Prochaines étapes recommandées

1. **Premier lancement**
   - Lire [QUICKSTART.md](QUICKSTART.md)
   - Lancer l'application localement
   - Tester les fonctionnalités de base

2. **Compréhension approfondie**
   - Lire [README.md](README.md)
   - Explorer le code source
   - Consulter [TESTING.md](TESTING.md)

3. **Déploiement**
   - Lire [DEPLOYMENT.md](DEPLOYMENT.md)
   - Choisir une plateforme
   - Déployer l'application

4. **Finalisation**
   - Créer les tâches Trello (voir [PROJECT_MANAGEMENT.md](PROJECT_MANAGEMENT.md))
   - Faire un backup de la BDD
   - Préparer la présentation

---

**Navigation réussie ! 🧭**

Pour toute question, consultez d'abord cette documentation ou ouvrez une issue sur GitHub.
