# PROGRESSO — Backend + Painel admin (UFU MIA)

Checklist para qualquer pessoa/IA retomar o trabalho sem reler tudo.

## Objetivo 1 — Backend para produção
- [x] requirements.txt com versões fixas
- [x] Segredos em variáveis de ambiente (django-environ) + .env.example
- [x] .gitignore: .env, *.sqlite3, media/, venv/
- [x] PostgreSQL via DATABASE_URL, whitenoise, gunicorn
- [x] pt-br / America/Sao_Paulo, cookies Secure, HSTS, SSL redirect
- [x] Cloudinary para fotos (obrigatório em produção)
- [x] Validação de upload (tipo e 5 MB) e nome seguro
- [x] API pública somente leitura (+ limite de requisições, sem Basic Auth)

## Objetivo 2 — Admin seguro
- [x] ADMIN_URL por variável (recusa "admin/" em produção)
- [x] django-axes: 5 erros = bloqueio 30 min por USUÁRIO+IP, IP real atrás de proxy
- [x] Painel django-unfold em português + admin de todos os models
- [x] Grupos "Equipe" e "Coordenação" criados automaticamente
- [ ] 2FA: NÃO implementado (o painel unfold não exibe o campo do código; ativar deixaria todos sem acesso). Removido django-otp e qrcode. Proteção atual: django-axes + senha forte
- [x] Nenhuma senha/usuário em código, fixture, migration ou seed

## Objetivo 3 — Conteúdo editável
- [x] Gatinhos: ativo + ordem
- [x] Models (app conteudo), dados_iniciais.py com os textos atuais
- [x] admin (unfold), API /api/conteudo/ (cache 60 s), comando carregar_conteudo_inicial, migrações
- [x] Front: ConteudoProvider + useConteudo com padrão (src/content/padrao.ts, gerado do backend)

## Objetivo 4 — Segurança do repositório
- [x] Varredura de segredos no histórico (detect-secrets + padrões): nenhum segredo real. Única exceção: a SECRET_KEY antiga django-insecure no 1º commit (trocar em produção)
- [x] Workflow GitHub Actions (gitleaks) + .gitleaks.toml
- [x] DEPLOY.md

## Revisão final
- [x] manage.py check, check --deploy (simulando produção), 22 testes OK, tsc + eslint + vite build OK
- [ ] A FAZER por você: ver DEPLOY.md (nova SECRET_KEY, Cloudinary, PostgreSQL, createsuperuser no servidor, secret scanning no GitHub)
- [ ] Futuro: 2FA no painel (exige template de login customizado)
