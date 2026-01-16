# 🐳 Guide Docker

Ce guide explique comment utiliser Docker pour déployer l'application Jeu de Piste.

## Prérequis

- Docker Desktop installé (Windows/Mac) ou Docker Engine (Linux)
- Docker Compose installé

## Installation Docker

### Windows / Mac
Télécharger et installer Docker Desktop :
https://www.docker.com/products/docker-desktop

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## 🚀 Démarrage Rapide

### 1. Configuration

Créer le fichier `.env` depuis l'exemple :
```bash
cp .env.docker.example .env
```

Modifier les valeurs dans `.env` :
```env
DB_PASSWORD=votre_mot_de_passe_securise
JWT_SECRET=votre_cle_secrete_jwt
```

### 2. Build et démarrage

```bash
# Build des images
docker-compose build

# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f
```

### 3. Accéder à l'application

- Frontend : http://localhost
- Backend API : http://localhost:3001
- Base de données : localhost:5432

## 📋 Commandes utiles

### Gestion des conteneurs

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Redémarrer
docker-compose restart

# Voir les logs
docker-compose logs -f [service]

# Voir les conteneurs en cours
docker-compose ps

# Arrêter et supprimer les volumes
docker-compose down -v
```

### Accès aux conteneurs

```bash
# Shell dans le backend
docker-compose exec backend sh

# Shell dans la base de données
docker-compose exec postgres psql -U postgres -d jeu_de_piste

# Exécuter une commande
docker-compose exec backend npm run prisma:studio
```

### Migrations et seed

```bash
# Exécuter les migrations
docker-compose exec backend npx prisma migrate deploy

# Seed de la base de données
docker-compose exec backend npm run db:seed

# Ouvrir Prisma Studio
docker-compose exec backend npx prisma studio
```

### Backup de la base de données

```bash
# Créer un backup
docker-compose exec postgres pg_dump -U postgres jeu_de_piste > backup.sql

# Restaurer un backup
docker-compose exec -T postgres psql -U postgres jeu_de_piste < backup.sql
```

## 🔧 Configuration avancée

### Modifier les ports

Dans `docker-compose.yml`, changer :
```yaml
ports:
  - "8080:80"      # Frontend
  - "3002:3001"    # Backend
```

### Variables d'environnement personnalisées

Backend (`docker-compose.yml`) :
```yaml
environment:
  - CUSTOM_VAR=value
```

Frontend : Reconstruire l'image avec les variables dans le Dockerfile

### Volumes persistants

Les données PostgreSQL sont stockées dans un volume Docker :
```bash
# Lister les volumes
docker volume ls

# Inspecter le volume
docker volume inspect jeu-de-piste_postgres_data

# Supprimer le volume (⚠️ perte de données)
docker volume rm jeu-de-piste_postgres_data
```

## 🌐 Déploiement en production

### Option 1 : Docker Swarm

```bash
# Initialiser Swarm
docker swarm init

# Déployer la stack
docker stack deploy -c docker-compose.yml jeu-de-piste

# Voir les services
docker stack services jeu-de-piste

# Supprimer la stack
docker stack rm jeu-de-piste
```

### Option 2 : Docker sur VPS

```bash
# Sur le serveur
git clone https://github.com/votre-username/JeuDePiste.git
cd JeuDePiste

# Configuration
cp .env.docker.example .env
nano .env

# Démarrer
docker-compose up -d

# Configuration Nginx reverse proxy
sudo nano /etc/nginx/sites-available/jeu-de-piste
```

Configuration Nginx :
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

## 🐛 Dépannage

### Le conteneur ne démarre pas

```bash
# Voir les logs détaillés
docker-compose logs backend

# Vérifier la santé des conteneurs
docker-compose ps
```

### Erreur de connexion à la base de données

```bash
# Vérifier que PostgreSQL est prêt
docker-compose exec postgres pg_isready

# Redémarrer les services
docker-compose restart
```

### Problème de port déjà utilisé

```bash
# Voir quel processus utilise le port
# Windows
netstat -ano | findstr :3001

# Linux/Mac
lsof -i :3001

# Arrêter le processus ou changer le port
```

### Réinitialiser complètement

```bash
# Arrêter et supprimer tout
docker-compose down -v

# Supprimer les images
docker-compose down --rmi all

# Rebuild depuis zéro
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Monitoring

### Logs en temps réel

```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f backend
```

### Statistiques des conteneurs

```bash
docker stats
```

### Portainer (Interface Web)

```bash
docker volume create portainer_data

docker run -d \
  -p 9000:9000 \
  --name portainer \
  --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce

# Accéder à http://localhost:9000
```

## 🔐 Sécurité

### Bonnes pratiques

1. **Mots de passe forts** : Utilisez des mots de passe complexes dans `.env`
2. **Secrets** : Ne committez jamais le fichier `.env`
3. **Mise à jour** : Gardez Docker et les images à jour
4. **Réseau** : Utilisez des réseaux Docker isolés
5. **Volumes** : Sauvegardez régulièrement les volumes

### Backup automatique

Créer un script `docker-backup.sh` :
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T postgres pg_dump -U postgres jeu_de_piste > backups/backup_$DATE.sql
gzip backups/backup_$DATE.sql
```

Ajouter à cron :
```bash
chmod +x docker-backup.sh
crontab -e
# Ajouter : 0 2 * * * /path/to/docker-backup.sh
```

## 📚 Ressources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 🆘 Support

En cas de problème avec Docker :
1. Vérifier les logs : `docker-compose logs`
2. Consulter la documentation Docker
3. Ouvrir une issue sur GitHub
