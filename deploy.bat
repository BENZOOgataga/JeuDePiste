@echo off
REM Script de déploiement pour Windows

echo Demarrage du deploiement...

REM Verifier Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Erreur: Node.js n'est pas installe
    exit /b 1
)

echo Node.js detecte

REM Installation backend
echo Installation des dependances backend...
cd backend
call npm install

REM Configuration environnement
if not exist .env (
    echo Creation du fichier .env...
    copy .env.example .env
    echo Veuillez configurer le fichier backend\.env avant de continuer
    pause
    exit /b 1
)

REM Prisma
echo Generation du client Prisma...
call npx prisma generate

echo Execution des migrations...
call npx prisma migrate deploy

REM Seed
set /p seed="Voulez-vous peupler la base de donnees avec des donnees de test? (o/n): "
if /i "%seed%"=="o" (
    echo Peuplement de la base de donnees...
    call npm run db:seed
)

REM Build backend
echo Build du backend...
call npm run build

REM Installation frontend
echo Installation des dependances frontend...
cd ..\frontend
call npm install

REM Build frontend
echo Build du frontend...
call npm run build

cd ..

echo.
echo Deploiement termine avec succes!
echo.
echo Pour demarrer l'application:
echo   - Backend: cd backend ^&^& npm start
echo   - Frontend: cd frontend ^&^& npm start
echo.
echo Ou depuis la racine: npm run dev
pause
