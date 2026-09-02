@echo off
cd /d "%~dp0"
echo CardioDesk Desktop preview: http://localhost:4173
npx.cmd --yes serve public -l 4173
