@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "backend\venv\Scripts\python.exe" (
  echo O ambiente virtual ainda nao existe. Rode primeiro o arquivo 1-primeira-vez.bat
  pause
  exit /b 1
)
cd backend
venv\Scripts\python.exe manage.py listar_usuarios
echo.
pause
