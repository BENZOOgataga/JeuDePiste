# 🧪 Guide de Test - Jeu de Piste

Ce guide vous permet de tester toutes les fonctionnalités de l'application.

---

## 🚀 Préparation

### 1. Lancer l'application

```bash
# Option 1 : Développement local
npm run dev

# Option 2 : Docker
docker-compose up -d

# Option 3 : Application déployée
# Accéder directement à l'URL fournie
```

### 2. Comptes de test

| Rôle | Email | Mot de passe | Description |
|------|-------|--------------|-------------|
| Admin | admin@jeudepiste.com | admin123 | Créer et gérer des jeux |
| Participant | user1@example.com | user123 | Jouer aux jeux |
| Participant | user2@example.com | user123 | Second participant |

---

## ✅ Scénarios de test

### Scénario 1 : Inscription d'un nouvel utilisateur

**Objectif :** Vérifier le système d'inscription

**Étapes :**
1. Aller sur http://localhost:3000
2. Cliquer sur "Inscription"
3. Remplir le formulaire :
   - Email : test@example.com
   - Nom d'utilisateur : testuser (min 3 caractères)
   - Mot de passe : test123 (min 6 caractères)
   - Confirmer le mot de passe : test123
4. Cliquer sur "S'inscrire"

**Résultat attendu :**
- ✅ Redirection vers la liste des jeux
- ✅ Badge "PARTICIPANT" visible dans la navigation
- ✅ Token stocké dans localStorage

**Tests de validation :**
- ❌ Email invalide → Message d'erreur
- ❌ Mot de passe < 6 caractères → Message d'erreur
- ❌ Mots de passe différents → Message d'erreur
- ❌ Email déjà utilisé → Message "Email déjà utilisé"

---

### Scénario 2 : Connexion

**Objectif :** Vérifier l'authentification

**Étapes :**
1. Cliquer sur "Connexion"
2. Entrer les identifiants admin :
   - Email : admin@jeudepiste.com
   - Mot de passe : admin123
3. Cliquer sur "Se connecter"

**Résultat attendu :**
- ✅ Redirection vers la liste des jeux
- ✅ Badge "ADMIN" visible
- ✅ Menu "Administration" disponible
- ✅ Menu "Créer un Jeu" disponible

**Tests de validation :**
- ❌ Email incorrect → "Email ou mot de passe incorrect"
- ❌ Mot de passe incorrect → "Email ou mot de passe incorrect"

---

### Scénario 3 : Création d'un jeu (Admin)

**Objectif :** Créer un nouveau jeu de piste

**Prérequis :** Être connecté en tant qu'admin

**Étapes :**
1. Aller dans "Créer un Jeu"
2. Remplir les informations :
   - Titre : "Découverte de [Ville]"
   - Description : "Un parcours découverte..."
3. Ajouter la première énigme :
   - Titre : "Monument historique"
   - Question : "Quelle est la hauteur de la Tour Eiffel ?"
   - Réponse : "330"
   - Indice : "Entre 300 et 350 mètres"
   - Latitude : 48.8584
   - Longitude : 2.2945
   - Rayon : 100 (mètres)
   - Points : 10
4. Cliquer sur "+ Ajouter une énigme" pour une seconde énigme
5. Cliquer sur "Créer le Jeu"

**Résultat attendu :**
- ✅ Message "Jeu créé avec succès !"
- ✅ Redirection vers le tableau de bord admin
- ✅ Nouveau jeu visible dans la liste

**Tests supplémentaires :**
- 🗺️ Cliquer sur "📍 Ma position" → Coordonnées GPS remplies automatiquement
- ✏️ Modifier une énigme avant création
- 🗑️ Supprimer une énigme
- ➕ Ajouter plusieurs énigmes (3-5)

---

### Scénario 4 : Consultation des jeux

**Objectif :** Voir les jeux disponibles

**Étapes :**
1. Aller dans "Jeux"
2. Observer la liste des jeux

**Résultat attendu :**
- ✅ Carte pour chaque jeu affichée
- ✅ Titre et description visibles
- ✅ Badge "Actif" ou "Inactif"
- ✅ Nombre d'énigmes affiché
- ✅ Nombre de participants affiché
- ✅ Créateur du jeu mentionné

**Actions :**
3. Cliquer sur "Voir les détails" d'un jeu

**Résultat attendu :**
- ✅ Page de détail du jeu
- ✅ Carte avec tous les points d'énigmes
- ✅ Cercles de rayon autour des points
- ✅ Liste des énigmes dans l'ordre
- ✅ Bouton "Commencer ce jeu"

---

### Scénario 5 : Démarrer une participation

**Objectif :** Commencer à jouer à un jeu

**Prérequis :** Connecté en tant que participant

**Étapes :**
1. Sur la page de détail d'un jeu
2. Cliquer sur "Commencer ce jeu"

**Résultat attendu :**
- ✅ Redirection vers l'interface de jeu
- ✅ Score initial à 0
- ✅ Progression "1 / X" énigmes
- ✅ Première énigme affichée
- ✅ Demande d'autorisation de géolocalisation

**Si géolocalisation refusée :**
- ⚠️ Message d'erreur clair
- 🔄 Bouton "Réessayer"

**Si géolocalisation acceptée :**
- ✅ Position actuelle sur la carte
- ✅ Point d'énigme visible
- ✅ Calcul de distance affiché
- ✅ Indication "À portée" ou "Trop loin"

---

### Scénario 6 : Résolution d'énigmes

**Objectif :** Tester la validation des réponses

**Prérequis :** Participation en cours

#### Test 6A : Mauvaise réponse
**Étapes :**
1. Entrer une réponse incorrecte
2. Cliquer sur "Valider"

**Résultat attendu :**
- ❌ Message "Mauvaise réponse" en rouge
- 🎁 Indice affiché (si disponible)
- 📊 Score inchangé
- 🔄 Possibilité de réessayer

#### Test 6B : Trop loin de l'énigme
**Étapes :**
1. Rester éloigné du point (> rayon)
2. Tenter de répondre

**Résultat attendu :**
- ⚠️ Message "Vous êtes trop loin"
- 📏 Distance actuelle affichée
- 🚫 Bouton de validation désactivé

#### Test 6C : Bonne réponse
**Étapes :**
1. Se rapprocher du point (< rayon)
2. Entrer la bonne réponse
3. Cliquer sur "Valider"

**Résultat attendu :**
- ✅ Message "Bonne réponse !" en vert
- 🎯 Points ajoutés au score
- ➡️ Passage automatique à l'énigme suivante (après 2 sec)
- 📈 Progression mise à jour "2 / X"

---

### Scénario 7 : Complétion d'un jeu

**Objectif :** Terminer toutes les énigmes

**Étapes :**
1. Résoudre toutes les énigmes du jeu

**Résultat attendu :**
- 🎉 Message "Félicitations !"
- 🏆 Score total affiché
- ✅ Participation marquée "Terminé"
- 📊 Enregistrement dans "Mes Participations"

---

### Scénario 8 : Consultation des participations

**Objectif :** Voir l'historique des parties

**Prérequis :** Connecté avec des participations existantes

**Étapes :**
1. Aller dans "Mes Participations"

**Résultat attendu :**
- ✅ Liste de toutes les participations
- 📊 Score pour chaque participation
- 🏷️ Statut (En cours / Terminé)
- 📅 Dates de début/fin
- 📈 Nombre de réponses correctes
- 🔄 Bouton "Continuer" pour parties en cours

---

### Scénario 9 : Tableau de bord admin

**Objectif :** Gérer les jeux (Admin uniquement)

**Prérequis :** Connecté en tant qu'admin

**Étapes :**
1. Aller dans "Administration"

**Résultat attendu :**
- 📊 Statistiques globales :
  - Nombre total de jeux
  - Nombre de jeux actifs
  - Nombre total de participations
- 📋 Liste de tous les jeux
- 🎮 Actions disponibles :
  - Activer/Désactiver
  - Supprimer
  - Voir détails

**Tests d'actions :**
1. **Désactiver un jeu :**
   - ✅ Badge passe à "Inactif"
   - ✅ Bouton devient "Activer"
   - ✅ Jeu non jouable par les participants

2. **Supprimer un jeu :**
   - ⚠️ Confirmation demandée
   - ✅ Jeu supprimé de la liste
   - 🗑️ Données liées supprimées (cascade)

---

### Scénario 10 : Tests de sécurité

**Objectif :** Vérifier les protections

#### Test 10A : Routes protégées
**Étapes :**
1. Se déconnecter
2. Tenter d'accéder à "/admin"

**Résultat attendu :**
- ✅ Redirection vers page d'accueil

#### Test 10B : Actions admin sans droits
**Étapes :**
1. Connecté en tant que participant
2. Tenter d'accéder à "/admin/create-game"

**Résultat attendu :**
- ✅ Redirection vers page d'accueil

#### Test 10C : Modification d'autres utilisateurs
**Étapes :**
1. Tenter de modifier les infos d'un autre utilisateur via l'API

**Résultat attendu :**
- ✅ Erreur 403 "Accès refusé"

---

### Scénario 11 : Responsive Design

**Objectif :** Vérifier l'adaptation mobile

**Étapes :**
1. Ouvrir les outils de développement (F12)
2. Activer le mode responsive
3. Tester différentes tailles :
   - 📱 Mobile (375px)
   - 📱 Tablet (768px)
   - 💻 Desktop (1920px)

**Résultat attendu :**
- ✅ Navigation adaptée
- ✅ Cartes empilées verticalement sur mobile
- ✅ Formulaires lisibles
- ✅ Carte interactive fonctionnelle
- ✅ Boutons accessibles

---

### Scénario 12 : Géolocalisation avancée

**Objectif :** Tester les cas limites de géolocalisation

#### Test 12A : Géolocalisation désactivée
**Résultat attendu :**
- ⚠️ Message d'erreur clair
- 🔄 Bouton pour réactiver

#### Test 12B : Sur le bord du rayon
**Tester à exactement X mètres du point**
**Résultat attendu :**
- ✅ Validation si distance ≤ rayon
- ❌ Refus si distance > rayon

#### Test 12C : Changement de position
**Bouger pendant le jeu**
**Résultat attendu :**
- 🔄 Distance mise à jour en temps réel
- ✅ Indicateurs mis à jour

---

## 🔍 Checklist de validation complète

### Authentification
- [ ] Inscription fonctionnelle
- [ ] Connexion fonctionnelle
- [ ] Déconnexion fonctionnelle
- [ ] Token JWT valide
- [ ] Sessions persistantes

### Autorisation
- [ ] Admin peut créer des jeux
- [ ] Admin peut modifier des jeux
- [ ] Admin peut supprimer des jeux
- [ ] Participant ne peut pas accéder à l'admin
- [ ] Routes protégées correctement

### Jeux de piste
- [ ] Création de jeux
- [ ] Liste des jeux
- [ ] Détails d'un jeu
- [ ] Carte interactive
- [ ] Activation/Désactivation

### Énigmes
- [ ] Création d'énigmes
- [ ] Validation de réponses
- [ ] Système d'indices
- [ ] Attribution de points
- [ ] Ordre respecté

### Géolocalisation
- [ ] Position GPS obtenue
- [ ] Distance calculée correctement
- [ ] Validation du rayon
- [ ] Affichage sur carte
- [ ] Mise à jour en temps réel

### Participations
- [ ] Démarrage d'une participation
- [ ] Suivi de progression
- [ ] Calcul de score
- [ ] Complétion
- [ ] Historique

### Interface utilisateur
- [ ] Design responsive
- [ ] Navigation intuitive
- [ ] Messages d'erreur clairs
- [ ] Feedback utilisateur
- [ ] Cartes interactives

### Performance
- [ ] Chargement rapide
- [ ] Pas de lag sur la carte
- [ ] Requêtes API optimisées

---

## 🐛 Bugs connus et limitations

### Connus
1. **Géolocalisation en HTTP :** Nécessite HTTPS en production
2. **Navigateurs anciens :** Géolocalisation peut ne pas fonctionner
3. **Précision GPS :** Varie selon l'appareil (5-50m)

### Limitations
1. **Offline :** Application nécessite une connexion
2. **Batterie :** Géolocalisation continue consomme de la batterie
3. **Intérieur :** GPS moins précis en intérieur

---

## 📊 Critères d'acceptation

Pour valider le projet, tous ces critères doivent être ✅ :

### Fonctionnalités obligatoires
- [ ] Inscription
- [ ] Connexion  
- [ ] Rôle Admin
- [ ] Rôle Participant
- [ ] Géolocalisation
- [ ] Système d'énigmes
- [ ] Création de jeux

### Livrables
- [ ] Repository GitHub
- [ ] Application déployée
- [ ] Documentation de déploiement
- [ ] Backup base de données
- [ ] Gestion de projet (Trello/doc)

### Qualité
- [ ] Code propre et commenté
- [ ] Documentation complète
- [ ] Application fonctionnelle
- [ ] Pas de bugs bloquants
- [ ] Design professionnel

---

## 🎓 Rapport de test

**Date du test :** ___________  
**Testeur :** ___________  
**Version :** 1.0.0

### Résumé
- Tests réussis : _____ / _____
- Bugs trouvés : _____
- Sévérité : Critique / Majeur / Mineur

### Notes
_________________________________
_________________________________
_________________________________

### Recommandations
_________________________________
_________________________________
_________________________________

---

**Bon test ! 🧪**
