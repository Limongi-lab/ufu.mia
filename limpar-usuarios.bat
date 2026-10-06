@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist "backend\venv\Scripts\python.exe" (
  echo O ambiente virtual ainda nao existe. Rode primeiro o arquivo 1-primeira-vez.bat
  pause
  exit /b 1
)
echo ATENCAO: isto APAGA TODAS as contas do painel do seu computador.
echo (So funciona no seu PC. Nao afeta o site publicado.)
set /p CONF=Digite SIM para continuar: 
if /I not "%CONF%"=="SIM" (
  echo Cancelado.
  pause
  exit /b 0
)
cd backend
venv\Scripts\python.exe manage.py limpar_usuarios --sim
echo.
echo Agora crie uma conta nova:
venv\Scripts\python.exe manage.py createsuperuser
pause
