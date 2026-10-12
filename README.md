# UFU MIA

Site oficial do **UFU MIA**, projeto de extensão da Universidade Federal de Uberlândia que cuida da saúde e alimentação dos gatos do Campus Santa Mônica, realiza castrações e promove a adoção responsável.

🌐 **[ufumia.vercel.app](https://ufumia.vercel.app)** · 📸 **[@ufu.mia](https://instagram.com/ufu.mia)**

---

## Tecnologias

| Camada | Stack |
|---|---|
| **Frontend** | React + TypeScript (Vite) · Tailwind CSS v4 · Framer Motion |
| **Backend** | Django 5 · Django REST Framework · django-unfold (admin) |
| **Banco de dados** | PostgreSQL (Neon) em produção · SQLite em desenvolvimento |
| **Imagens** | Cloudinary |
| **Hospedagem** | Vercel (frontend) · Render (backend) |

---

## Estrutura do projeto

```
ufu.mia/
├── frontend/          # Site React (Vite + TypeScript)
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas (Home, Animais, Sobre, etc.)
│   │   ├── content/       # Textos padrão (fallback sem API)
│   │   ├── context/       # ConteudoProvider (textos e listas)
│   │   └── services/      # Chamadas à API do backend
│   └── ...
├── backend/           # API Django + painel da equipe
│   ├── animais/       # App de animais para adoção
│   ├── conteudo/      # App de textos, FAQ, frentes, etc.
│   └── config/        # Settings, URLs, autenticação
├── DEPLOY.md          # Guia completo de deploy e configuração
└── *.bat              # Atalhos para desenvolvimento no Windows
```

---

## Desenvolvimento local

### Pré-requisitos
- Python 3.12+
- Node.js 20+

### Primeira vez
Clique duas vezes em **`1-primeira-vez.bat`** — ele instala tudo e cria sua conta de admin local.

### Todo dia
Clique duas vezes em **`ligar-tudo.bat`** — liga o backend (Django) e o frontend (Vite) ao mesmo tempo.

Ou manualmente:

```bash
# Backend (numa aba do terminal)
cd backend
python -m venv venv && venv\Scripts\activate   # só na primeira vez
pip install -r requirements.txt               # só na primeira vez
python manage.py migrate
python manage.py carregar_conteudo_inicial
python manage.py runserver

# Frontend (em outra aba)
cd frontend
npm install   # só na primeira vez
npm run dev
```

Configure as variáveis de ambiente copiando `backend/.env.example` → `backend/.env` e preenchendo os valores.

---

## Deploy

Consulte o **[DEPLOY.md](DEPLOY.md)** para instruções completas de hospedagem no Render + Vercel, criação de contas, variáveis de ambiente e gerenciamento da equipe.

---

## Testes

```bash
cd backend
python manage.py test
python manage.py check --deploy
```

---

## Licença

Projeto de extensão universitária — [MIT](LICENSE) · UFU MIA © 2025
