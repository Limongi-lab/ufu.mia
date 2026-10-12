@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === UFU MIA - configuracao da PRIMEIRA vez ===
if not exist "backend\venv\Scripts\python.exe" (
  echo Criando o ambiente virtual do Python...
  py -m venv backend\venv
)
cd backend
echo Instalando dependencias...
venv\Scripts\python.exe -m pip install -r requirements.txt
if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Criei o arquivo backend\.env a partir do .env.example
)
venv\Scripts\python.exe manage.py migrate
venv\Scripts\python.exe manage.py carregar_conteudo_inicial
cd ..\frontend
if not exist "node_modules" (
  echo Instalando dependencias do site...
  call npm install
)
if not exist ".env" copy ".env.example" ".env" >nul
cd ..
echo.
echo Agora crie a SUA conta de administrador (a senha NAO aparece enquanto voce digita):
cd backend
venv\Scripts\python.exe manage.py createsuperuser
cd ..
echo.
echo Pronto! Agora use o arquivo ligar-tudo.bat
pause
