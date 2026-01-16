@echo off
REM Script de backup pour Windows

set DATE=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set DATE=%DATE: =0%
set BACKUP_DIR=backups
set DB_NAME=jeu_de_piste
set DB_USER=postgres

REM Créer le dossier de backup
if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%

echo Creation du backup de la base de donnees...

REM Backup PostgreSQL
"C:\Program Files\PostgreSQL\14\bin\pg_dump.exe" -U %DB_USER% %DB_NAME% > %BACKUP_DIR%\backup_%DATE%.sql

if %errorlevel% equ 0 (
    echo Backup cree avec succes: backup_%DATE%.sql
) else (
    echo Erreur lors de la creation du backup
    exit /b 1
)

REM Lister les backups
echo.
echo Liste des backups disponibles:
dir /B %BACKUP_DIR%\backup_*.sql

pause
