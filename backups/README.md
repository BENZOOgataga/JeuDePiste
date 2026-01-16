# Backup de la Base de Données

Ce dossier contient le backup complet de la base de données PostgreSQL du projet Jeu de Piste.

## Fichier de backup

- **jeu_de_piste_backup.sql** - Backup complet (structure + données)
  - Date: 16 janvier 2026
  - Contient: tables, contraintes, index, et toutes les données
  - Utilisateurs: admin + 2 participants
  - Jeux: 2 jeux avec énigmes
  - Participations et réponses

## Restauration

### Créer une nouvelle base et restaurer

```bash
# 1. Créer la base de données
psql -U postgres -c "CREATE DATABASE jeu_de_piste;"

# 2. Restaurer le backup complet
psql -U postgres -d jeu_de_piste -f backups/jeu_de_piste_backup.sql
```

### Restaurer avec mot de passe

```bash
PGPASSWORD=postgres psql -U postgres -d jeu_de_piste -f backups/jeu_de_piste_backup.sql
```

## Données de test incluses

Le backup contient les données suivantes:

### Utilisateurs
- **Admin:** `admin@jeudepiste.com` / `admin123`
- **Participant 1:** `user1@example.com` / `user123`
- **Participant 2:** `user2@example.com` / `user123`

### Jeux
1. **Découverte de Paris** - 3 énigmes géolocalisées
   - La Dame de Fer (Tour Eiffel)
   - Le Musée le plus visité (Louvre)
   - La Cathédrale (Notre-Dame)

2. **Jeu de test** - Créé par l'admin

### Participations
- Participations en cours et terminées
- Réponses données avec scores

## Structure de la Base de Données

### Tables

- **users** - Utilisateurs (admin, participants)
- **games** - Jeux de piste
- **riddles** - Énigmes géolocalisées
- **participations** - Participations des joueurs
- **answers** - Réponses données

### Relations

- User → Game (créateur)
- Game → Riddle (1:N)
- User + Game → Participation
- Participation → Answer (1:N)

## Créer un nouveau backup

```bash
# Avec pg_dump
PGPASSWORD=postgres pg_dump -U postgres -d jeu_de_piste --inserts --column-inserts -f backups/jeu_de_piste_backup_$(date +%Y%m%d).sql

# Ou avec les scripts fournis
./backup.sh    # Linux/Mac
backup.bat     # Windows
```
