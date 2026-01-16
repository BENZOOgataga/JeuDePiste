-- Backup initial de la structure de la base de données
-- Généré le: 2026-01-16
-- Base de données: jeu_de_piste

-- Pour restaurer ce backup:
-- psql -U postgres -d jeu_de_piste < backup_initial.sql

-- Ce fichier est généré automatiquement après avoir exécuté:
-- pg_dump -U postgres jeu_de_piste > backup_initial.sql

-- Instructions:
-- 1. Créer la base de données: CREATE DATABASE jeu_de_piste;
-- 2. Exécuter les migrations Prisma: npx prisma migrate deploy
-- 3. (Optionnel) Peupler avec des données: npm run db:seed

-- La structure de la base de données est définie dans backend/prisma/schema.prisma
-- et les migrations sont dans backend/prisma/migrations/

-- Tables principales:
-- - users: Utilisateurs de l'application (admin, participants)
-- - games: Jeux de piste
-- - riddles: Énigmes géolocalisées
-- - participations: Participations des utilisateurs aux jeux
-- - answers: Réponses des utilisateurs aux énigmes

-- Pour créer un backup de votre base de données actuelle:
-- pg_dump -U postgres jeu_de_piste > backups/backup_$(date +%Y%m%d).sql

-- Pour restaurer un backup:
-- psql -U postgres jeu_de_piste < backups/backup_20260116.sql
