#!/bin/sh
set -e

echo "🔄 Waiting for database..."
sleep 5

echo "🔧 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database (if needed)..."
npm run db:seed || echo "Seed already done or failed"

echo "🚀 Starting application..."
exec "$@"
