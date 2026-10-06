@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "backend\venv\Scripts\python.exe" (
  echo O ambiente virtual ainda nao existe. Rode primeiro o arquivo 1-primeira-vez.bat
  pause
  exit /b 1
)
if not exist "frontend\.env" copy "frontend\.env.example" "frontend\.env" >nul
findstr /b /c:"VITE_ADMIN_URL" "frontend\.env" >nul 2>&1
if errorlevel 1 (
  (echo.& echo VITE_ADMIN_URL=http://localhost:8000/admin/)>>"frontend\.env"
  echo Acrescentei VITE_ADMIN_URL no frontend\.env para o cadeadinho aparecer.
)
start "UFU MIA - Backend (nao feche)" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe manage.py runserver"
start "UFU MIA - Site (nao feche)" cmd /k "cd /d %~dp0frontend && npm run dev"
echo.
echo Abrindo duas janelas: backend e site. Em alguns segundos acesse:
echo   Site:   http://localhost:5173
echo   Painel: http://localhost:8000/admin/
timeout /t 6 >nul
start http://localhost:5173
