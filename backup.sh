#!/bin/bash

# Script de backup automatique de la base de données
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_NAME="jeu_de_piste"
DB_USER="postgres"

# Créer le dossier de backup s'il n'existe pas
mkdir -p $BACKUP_DIR

echo "🗄️ Création du backup de la base de données..."

# Backup PostgreSQL
pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

if [ $? -eq 0 ]; then
    echo "✅ Backup créé avec succès: backup_$DATE.sql"
    
    # Compresser le backup
    gzip $BACKUP_DIR/backup_$DATE.sql
    echo "✅ Backup compressé: backup_$DATE.sql.gz"
    
    # Garder seulement les 7 derniers backups
    ls -t $BACKUP_DIR/backup_*.sql.gz | tail -n +8 | xargs rm -f
    echo "🧹 Anciens backups nettoyés (conservation des 7 derniers)"
else
    echo "❌ Erreur lors de la création du backup"
    exit 1
fi

# Afficher la taille du backup
BACKUP_SIZE=$(du -h $BACKUP_DIR/backup_$DATE.sql.gz | cut -f1)
echo "📊 Taille du backup: $BACKUP_SIZE"

# Lister tous les backups
echo ""
echo "📋 Liste des backups disponibles:"
ls -lh $BACKUP_DIR/backup_*.sql.gz
