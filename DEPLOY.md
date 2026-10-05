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

No terminal do serviço (na Render: aba **Shell**), rode:

```
python manage.py createsuperuser
```

Ele pergunta usuário, e-mail e senha **na hora**. A senha é gravada criptografada no banco e **nunca passa pelo GitHub**. Use uma senha longa (de preferência 4 palavras sem relação entre si) e única.

O painel fica em `https://SEU-BACKEND/ADMIN_URL/` (ex.: `https://ufumia-api.onrender.com/painel-x7k2q/`).

### Dando acesso para a equipe

Só o superusuário (você) cria contas. Cada pessoa deve ter a **sua própria** conta, nunca uma senha compartilhada.

1. No painel: **Usuários → Adicionar**.
2. Marque **Membro da equipe** (sem isso a pessoa não consegue entrar).
3. Em **Grupos**, escolha:
   - **Equipe**: gerencia gatinhos, histórias, textos e listas do site.
   - **Coordenação**: o mesmo da Equipe, mais ver o histórico de ações e destravar contas bloqueadas.
4. **Não** marque "Status de superusuário".

Quando alguém sair do projeto, desmarque **Ativo** na conta dela.

### Proteções que já vêm ligadas

- Depois de **5 senhas erradas**, aquele usuário **naquele IP** fica bloqueado por 30 minutos (outra pessoa, de outro IP, não é afetada).
- A sessão do painel expira em 12 horas e ao fechar o navegador.
- A API pública só **lê**: ninguém consegue alterar nada por ela.
- Links e telefones editados no painel são validados (só `https://` ou caminhos do próprio site).

> **Sobre 2FA (código no celular):** ainda **não** está ativado, pois o painel visual atual não exibe o campo do código. Enquanto isso, a defesa é senha forte + bloqueio por tentativas.

## 4. Frontend (Vercel ou Netlify)

- **Root directory:** `frontend`
- **Build command:** `npm run build` — **Output:** `dist`
- **Variável de ambiente:** `VITE_API_URL` = `https://SEU-BACKEND/api`

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
