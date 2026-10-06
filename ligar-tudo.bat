@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "backend\venv\Scripts\python.exe" (
  echo O ambiente virtual ainda nao existe. Rode primeiro o arquivo 1-primeira-vez.bat
  pause
  exit /b 1
)
start "UFU MIA - Backend (nao feche)" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe manage.py runserver"
start "UFU MIA - Site (nao feche)" cmd /k "cd /d %~dp0frontend && npm run dev"
echo.
echo Abrindo duas janelas: backend e site. Em alguns segundos acesse:
echo   Site:   http://localhost:5173
echo   Painel: http://localhost:8000/admin/
timeout /t 6 >nul
start http://localhost:5173
