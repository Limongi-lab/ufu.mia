# Como colocar o UFU MIA no ar (e manter seguro)

O site tem duas partes:

| Parte | O que é | Onde hospedar (sugestão) |
|---|---|---|
| **backend** (`/backend`) | Django: API + painel da equipe | Render ou Railway |
| **frontend** (`/frontend`) | React: o site que as pessoas visitam | Vercel ou Netlify |

> **Regra de ouro:** nenhuma senha, chave ou usuário vai para o GitHub.
> Tudo que é secreto fica em **variáveis de ambiente** no painel da hospedagem
> (ou no arquivo `backend/.env`, que o Git ignora).

---

## 1. Antes de publicar

1. **Gere uma `SECRET_KEY` nova.** A antiga (`django-insecure-...`) está no histórico do GitHub e deve ser considerada vazada.
   ```
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
   Guarde o resultado só no painel da hospedagem.
2. **Crie uma conta gratuita no [Cloudinary](https://cloudinary.com).** É onde ficam as fotos dos gatinhos (o disco da hospedagem é apagado a cada deploy). No painel, copie o **API Environment variable**, que tem o formato `cloudinary://CHAVE:SEGREDO@NOME`. Ele será o `CLOUDINARY_URL`.
3. **Crie um banco PostgreSQL** na própria hospedagem. Copie a **Internal/Database URL** (é o `DATABASE_URL`).
4. **Invente o endereço do painel**, algo que ninguém adivinhe, por exemplo `painel-x7k2q`. Será o `ADMIN_URL`.
5. No GitHub, ative **Settings → Code security → Secret scanning** e **Push protection**.

## 2. Backend (Render, Railway ou similar)

Crie um *Web Service* apontando para este repositório com:

- **Root directory:** `backend`
- **Build command:**
  ```
  pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate && python manage.py carregar_conteudo_inicial
  ```
- **Start command:**
  ```
  gunicorn config.wsgi:application
  ```
- **Python:** 3.12 ou mais novo.

### Variáveis de ambiente (cadastre no painel da hospedagem)

| Variável | Valor |
|---|---|
| `SECRET_KEY` | a chave nova do passo 1 |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | o domínio do backend, ex.: `ufumia-api.onrender.com` |
| `DATABASE_URL` | a URL do PostgreSQL |
| `CLOUDINARY_URL` | `cloudinary://...` do Cloudinary |
| `ADMIN_URL` | o endereço secreto do painel, ex.: `painel-x7k2q` |
| `CORS_ALLOWED_ORIGINS` | o endereço do site, ex.: `https://ufumia.vercel.app` |
| `CSRF_TRUSTED_ORIGINS` | o mesmo endereço do site **e** do backend: `https://ufumia.vercel.app,https://ufumia-api.onrender.com` |
| `PROXY_COUNT` | `1` |

O backend **se recusa a iniciar** se faltar `CLOUDINARY_URL` ou se `ADMIN_URL` for `admin/`. Isso é proposital: evita perder fotos e deixar o painel num endereço óbvio.

## 3. Criar a conta de administrador (SEM senha no código)

> As contas que você criou no seu computador (`createsuperuser` local) **não existem** no site publicado: o banco de lá começa vazio. Por isso você cria a conta de administrador de novo, **uma vez**, no servidor.

### Opção A: terminal da hospedagem (se o seu plano tiver)

Alguns planos têm terminal (o Shell da Render, por exemplo, costuma ser só nos planos pagos; na Railway há o terminal pela linha de comando). Se tiver:

```
python manage.py createsuperuser
```

Ele pergunta usuário, e-mail e senha na hora. A senha é gravada criptografada no banco.

### Opção B: plano grátis, sem terminal (por variáveis de ambiente)

1. No painel da hospedagem, cadastre **temporariamente** estas variáveis (elas ficam só ali, nunca no GitHub):

   | Variável | Valor |
   |---|---|
   | `DJANGO_SUPERUSER_USERNAME` | o seu e-mail, ex.: `voce@gmail.com` |
   | `DJANGO_SUPERUSER_EMAIL` | o mesmo e-mail |
   | `DJANGO_SUPERUSER_PASSWORD` | uma senha longa e única |

2. No **Build command**, acrescente no final: ` && (python manage.py createsuperuser --noinput || true)`
3. Faça o deploy. A conta é criada.
4. **Apague a variável `DJANGO_SUPERUSER_PASSWORD`** do painel e tire o trecho do Build command. A conta já existe e a senha não precisa mais ficar guardada em lugar nenhum.

### Como a equipe entra

O painel fica em `https://SEU-BACKEND/ADMIN_URL/` (ex.: `https://ufumia-api.onrender.com/painel-x7k2q/`).

O login é por **e-mail e senha**. Existe também um **cadeadinho discreto no rodapé do site** (ao lado de "Feito por...") que leva direto para essa tela de login. Para ele aparecer, cadastre no site a variável `VITE_ADMIN_URL` (veja o item 4).

> O cadeadinho revela o endereço do painel para quem inspecionar o código do site. Isso é normal (o WordPress também tem endereço público de login). A proteção de verdade é a **senha forte + o bloqueio depois de 5 erros**, e não o segredo do endereço.

### Dando acesso para a equipe

Só o superusuário (você) cria contas. Cada pessoa deve ter a **sua própria** conta, nunca uma senha compartilhada.

1. No painel: **Usuários → Adicionar**. Em "Nome de usuário" ponha o **e-mail da pessoa** e depois preencha o campo **Endereço de e-mail** com o mesmo.
2. Marque **Membro da equipe** (sem isso a pessoa não consegue entrar).
3. Em **Grupos**, escolha:
   - **Equipe**: gerencia gatinhos, histórias, textos e listas do site.
   - **Coordenação**: o mesmo da Equipe, mais ver o histórico de ações e destravar contas bloqueadas.
4. **Não** marque "Status de superusuário".

Use um e-mail diferente para cada pessoa (e-mail repetido em duas contas impede o login por e-mail).

Quando alguém sair do projeto, desmarque **Ativo** na conta dela.

### Esqueci a senha / alguém esqueceu

- **Senha de um membro da equipe:** você entra no painel, abre **Usuários**, clica na pessoa e usa o link **"redefinir a senha usando este formulário"**. Passe a senha nova por um canal seguro e peça para ela guardar num gerenciador de senhas.
- **Conta bloqueada por erros de senha:** espera 30 minutos, ou alguém da **Coordenação** apaga o registro em **Tentativas de acesso**.
- **Você esqueceu a sua senha de superusuário:** se tiver terminal, `python manage.py changepassword SEU-USUARIO`. Sem terminal, use a Opção B acima com outro e-mail, entre e redefina a senha da conta antiga (ou desative-a).

> Redefinição de senha por e-mail ("esqueci minha senha" automático) exige configurar um serviço de envio de e-mail (SMTP). Não está ativada; por enquanto quem redefine é o superusuário.

### No seu computador (desenvolvimento)

Na pasta do projeto há atalhos para clicar duas vezes:

| Arquivo | Para quê |
|---|---|
| `1-primeira-vez.bat` | instala tudo e cria a sua conta (só uma vez) |
| `ligar-tudo.bat` | liga o backend e o site (todo dia) |
| `ver-usuarios.bat` | lista as contas que existem (nunca mostra senhas) |
| `esqueci-a-senha.bat` | redefine a senha de uma conta |
| `limpar-usuarios.bat` | apaga TODAS as contas do seu PC e cria uma nova (nunca roda em produção) |

### Proteções que já vêm ligadas

- Depois de **5 senhas erradas**, aquele usuário **naquele IP** fica bloqueado por 30 minutos (outra pessoa, de outro IP, não é afetada).
- A sessão do painel expira em 12 horas e ao fechar o navegador.
- A API pública só **lê**: ninguém consegue alterar nada por ela.
- Links e telefones editados no painel são validados (só `https://` ou caminhos do próprio site).

> **Sobre 2FA (código no celular):** ainda **não** está ativado, pois o painel visual atual não exibe o campo do código. Enquanto isso, a defesa é senha forte + bloqueio por tentativas.

## 4. Frontend (Vercel ou Netlify)

- **Root directory:** `frontend`
- **Build command:** `npm run build` — **Output:** `dist`
- **Variáveis de ambiente:**
  - `VITE_API_URL` = `https://SEU-BACKEND/api`
  - `VITE_ADMIN_URL` = `https://SEU-BACKEND/ADMIN_URL/` (faz o cadeadinho do rodapé aparecer; sem ela, ele fica escondido)

> ⚠️ Tudo que começa com `VITE_` fica **público** no navegador. Ali vai só o endereço da API, **nunca** senhas ou chaves.

Os arquivos `frontend/vercel.json` e `frontend/public/_redirects` já fazem o endereço direto (ex.: `/animais`) funcionar.

## 5. Como a equipe edita o site

No painel, em **Conteúdo do site**:

| Quero mudar... | Onde |
|---|---|
| Títulos e parágrafos soltos (Início, rodapé, doações, links do edital...) | **Textos do site** |
| Perguntas frequentes | **Perguntas frequentes** |
| Frentes de atuação, formas de ajudar, pontos da seção Sobre, números de destaque | respectivas listas |
| Telefones e fotos do Fale Conosco | **Áreas do Fale Conosco** (pessoas dentro de cada área) |
| Gatinhos e histórias de adoção | **Animais** / **Histórias de Adoção** |

Dicas: `**assim**` deixa em negrito; Enter quebra a linha; deixar um texto em branco volta ao texto padrão do site; desmarcar **Ativo** esconde sem apagar. As mudanças aparecem no site em até **1 minuto**.

## 6. Se uma senha ou chave vazar

1. **Troque na hora** (nova `SECRET_KEY`, nova senha, ou gere de novo no Cloudinary).
2. Apagar o arquivo do GitHub **não basta**: o valor continua no histórico. Considere sempre o segredo comprometido.
3. Peça para a pessoa trocar a senha e confira o histórico de ações no painel (**Coordenação**).

## 7. Conferir tudo (para quem desenvolve)

```
cd backend
python manage.py test
python manage.py check --deploy
```

O workflow `.github/workflows/gitleaks.yml` varre o repositório a cada envio ao GitHub em busca de segredos.
