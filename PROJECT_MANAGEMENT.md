# Guide de Gestion de Projet - Trello

Ce document explique comment organiser le projet sur Trello ou tout autre système de gestion de projet.

## Configuration Trello

### 1. Créer un Board

Créer un board Trello nommé "Jeu de Piste - Développement"

### 2. Listes recommandées

- **Backlog** : Fonctionnalités futures
- **À faire** : Tâches à réaliser
- **En cours** : Tâches en développement
- **Tests** : Fonctionnalités à tester
- **Terminé** : Fonctionnalités complétées
- **Bugs** : Problèmes à résoudre

## Cartes Principales

### Sprint 1 : Configuration initiale

#### Backend
- [x] Setup Node.js + Express + TypeScript
- [x] Configuration Prisma + PostgreSQL
- [x] Schéma de base de données
- [x] Migrations initiales

#### Authentification
- [x] Inscription utilisateur
- [x] Connexion (JWT)
- [x] Middleware d'authentification
- [x] Gestion des rôles (Admin/Participant)

### Sprint 2 : Gestion des jeux

#### Jeux de piste
- [x] API CRUD jeux
- [x] Création de jeux (admin)
- [x] Liste des jeux disponibles
- [x] Détails d'un jeu

#### Énigmes
- [x] API CRUD énigmes
- [x] Création d'énigmes avec coordonnées GPS
- [x] Validation de réponses
- [x] Système de points

### Sprint 3 : Géolocalisation

#### Fonctionnalités
- [x] Service de géolocalisation
- [x] Calcul de distance (Haversine)
- [x] Validation de proximité
- [x] Intégration carte Leaflet

### Sprint 4 : Interface utilisateur

#### Pages principales
- [x] Page d'accueil
- [x] Inscription/Connexion
- [x] Liste des jeux
- [x] Détails d'un jeu
- [x] Interface de jeu
- [x] Mes participations

#### Pages admin
- [x] Tableau de bord
- [x] Création de jeux
- [x] Gestion des jeux

### Sprint 5 : Participations

#### Fonctionnalités
- [x] Démarrer une participation
- [x] Suivi de progression
- [x] Calcul du score
- [x] Historique des réponses
- [x] Complétion d'un jeu

### Sprint 6 : Déploiement

#### Préparation
- [x] Documentation README
- [x] Scripts de déploiement
- [x] Configuration environnements
- [x] Guides de déploiement

#### Déploiement
- [ ] Déploiement backend (Heroku/VPS)
- [ ] Déploiement frontend (Netlify/Vercel)
- [ ] Configuration DNS
- [ ] SSL/HTTPS
- [ ] Tests en production

### Sprint 7 : Tests et optimisation

#### Tests
- [ ] Tests unitaires backend
- [ ] Tests d'intégration
- [ ] Tests E2E frontend
- [ ] Tests de performance

#### Optimisation
- [ ] Optimisation requêtes BDD
- [ ] Cache
- [ ] Compression assets
- [ ] SEO

## Labels recommandés

- 🔴 **Urgent** : Tâche prioritaire
- 🟡 **Important** : À faire bientôt
- 🟢 **Nice to have** : Amélioration future
- 🔵 **Backend** : Tâche backend
- 🟣 **Frontend** : Tâche frontend
- ⚫ **Bug** : Correction de bug
- 🟠 **Documentation** : Documentation

## Checklist par carte

### Template de carte

```markdown
## Description
[Description de la fonctionnalité]

## Critères d'acceptation
- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3

## Tâches techniques
- [ ] Tâche 1
- [ ] Tâche 2
- [ ] Tests
- [ ] Documentation

## Estimation
Temps estimé: X heures

## Notes
[Notes additionnelles]
```

## Exemple : Carte "Création de jeu de piste"

```markdown
## Description
En tant qu'administrateur, je veux créer un nouveau jeu de piste avec plusieurs énigmes géolocalisées.

## Critères d'acceptation
- [x] Formulaire de création avec titre et description
- [x] Ajout dynamique d'énigmes
- [x] Saisie des coordonnées GPS
- [x] Bouton pour obtenir ma position actuelle
- [x] Validation des données
- [x] Sauvegarde en base de données

## Tâches techniques
- [x] API POST /api/games
- [x] API POST /api/riddles
- [x] Composant CreateGame.tsx
- [x] Intégration géolocalisation
- [x] Gestion des erreurs
- [x] Tests

## Estimation
Temps estimé: 8 heures
Temps réel: 6 heures

## Notes
- Utiliser react-hook-form pour la validation
- Prévoir un système d'ordre pour les énigmes
```

## Suivi des progrès

### Métriques à suivre

1. **Vélocité** : Points/Sprint
2. **Bugs ouverts** : Nombre de bugs actifs
3. **Couverture de tests** : % de code testé
4. **Temps de cycle** : Temps moyen par tâche

### Rituels Agile

#### Daily Standup (optionnel)
- Qu'ai-je fait hier ?
- Que vais-je faire aujourd'hui ?
- Y a-t-il des blocages ?

#### Sprint Review
- Démonstration des fonctionnalités
- Feedback
- Mise à jour du backlog

#### Rétrospective
- Ce qui a bien fonctionné
- Ce qui peut être amélioré
- Actions pour le prochain sprint

## Outils alternatifs

### GitHub Projects
- Intégration native avec GitHub
- Automation avec les issues et PR
- Gratuit pour projets publics

### Jira
- Plus complet pour grandes équipes
- Reporting avancé
- Intégrations multiples

### Notion
- Flexible et personnalisable
- Base de données relationnelle
- Documentation intégrée

### Asana
- Interface intuitive
- Timeline view
- Collaboration équipe

## Template GitHub Project

### Colonnes
1. 📋 Backlog
2. 🎯 To Do
3. 🔄 In Progress
4. 👀 Review
5. ✅ Done

### Automation
- Nouvelle issue → Backlog
- Issue assignée → To Do
- PR créée → In Progress
- PR merged → Done

## Exemple de structure Notion

```
Database: Tâches
├── Nom
├── Statut (Backlog/To Do/In Progress/Done)
├── Priorité (Haute/Moyenne/Basse)
├── Type (Feature/Bug/Documentation)
├── Sprint
├── Assigné à
├── Temps estimé
├── Temps réel
└── Date d'échéance
```

## Conclusion

L'organisation du projet est cruciale pour maintenir un développement structuré et efficace. Choisissez l'outil qui convient le mieux à votre workflow et adaptez-le à vos besoins.

Pour plus d'informations sur la gestion de projet Agile, consultez:
- [Scrum Guide](https://scrumguides.org/)
- [Kanban Guide](https://www.atlassian.com/agile/kanban)
