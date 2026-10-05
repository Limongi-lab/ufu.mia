"""
Django settings for config project (UFU MIA).

Todas as configurações sensíveis são lidas de variáveis de ambiente.
Em desenvolvimento, crie um arquivo backend/.env (nunca commite esse arquivo).
Veja backend/.env.example para referência.
"""

import sys
from datetime import timedelta
from pathlib import Path

import environ
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Variáveis de ambiente ------------------------------------------------
env = environ.Env(
    DEBUG=(bool, False),
    ALLOWED_HOSTS=(list, []),
    CORS_ALLOWED_ORIGINS=(list, []),
    CSRF_TRUSTED_ORIGINS=(list, []),
    ADMIN_URL=(str, 'admin/'),
    CLOUDINARY_URL=(str, ''),
    PROXY_COUNT=(int, 1),
)

def _erro_config(mensagem):
    """Mostra o motivo de forma clara (o Django às vezes esconde esta exceção) e para."""
    sys.stderr.write(f'\n*** ERRO DE CONFIGURAÇÃO: {mensagem}\n\n')
    raise ImproperlyConfigured(mensagem)


# True quando rodando `python manage.py test`
TESTING = len(sys.argv) > 1 and sys.argv[1] == 'test'

# Lê o arquivo .env se existir (não falha se não existir)
environ.Env.read_env(BASE_DIR / '.env', overwrite=False)

# --- Segurança ------------------------------------------------------------
# A SECRET_KEY original foi comprometida no histórico do Git.
# Em produção, gere uma nova:
#   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
SECRET_KEY = env('SECRET_KEY')

DEBUG = env('DEBUG')

ALLOWED_HOSTS = env('ALLOWED_HOSTS')


# --- Aplicações instaladas ------------------------------------------------
INSTALLED_APPS = [
    # Painel visual do admin (deve vir antes de django.contrib.admin)
    'unfold',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',
    'axes',

    # Local
    'animais',
    'conteudo',
]


# --- Middleware ------------------------------------------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',       # estáticos em produção
    'corsheaders.middleware.CorsMiddleware',            # deve vir antes de CommonMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'axes.middleware.AxesMiddleware',                   # proteção anti-brute-force
]


ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# --- Banco de dados -------------------------------------------------------
# Em dev: sqlite:///db.sqlite3  (default)
# Em produção: postgres://usuario:senha@host:5432/banco
DATABASES = {
    'default': env.db('DATABASE_URL', default=f'sqlite:///{BASE_DIR / "db.sqlite3"}'),
}


# --- Autenticação e senhas ------------------------------------------------
AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',
    'django.contrib.auth.backends.ModelBackend',
]

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# --- django-axes (proteção anti força bruta) -------------------------------
# Bloqueia a COMBINAÇÃO usuário + IP. Assim, quem erra a senha de longe não
# consegue trancar a conta da equipe para todo mundo.
AXES_FAILURE_LIMIT = 5
AXES_COOLOFF_TIME = timedelta(minutes=30)
AXES_LOCKOUT_PARAMETERS = [['username', 'ip_address']]
AXES_RESET_ON_SUCCESS = True

# Atrás do proxy da hospedagem (Render, Railway...), o IP real do visitante vem
# no cabeçalho X-Forwarded-For. PROXY_COUNT = quantos proxies ficam na frente
# do Django (1 na maioria das hospedagens). Em desenvolvimento não há proxy.
if not DEBUG:
    AXES_IPWARE_PROXY_COUNT = env('PROXY_COUNT')
    AXES_IPWARE_META_PRECEDENCE_ORDER = ['HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR']


# --- Internacionalização --------------------------------------------------
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True


# --- Arquivos estáticos ---------------------------------------------------
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'staticfiles': {
        # Em produção: arquivos comprimidos e com hash (precisa de `collectstatic`
        # no build). Em desenvolvimento e testes: armazenamento simples.
        'BACKEND': (
            'django.contrib.staticfiles.storage.StaticFilesStorage'
            if (DEBUG or TESTING)
            else 'whitenoise.storage.CompressedManifestStaticFilesStorage'
        ),
    },
}


# --- Arquivos de mídia (uploads) ------------------------------------------
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Armazenamento de imagens em produção (Cloudinary)
_cloudinary_url = env('CLOUDINARY_URL')
if _cloudinary_url:
    import cloudinary  # noqa: E402
    cloudinary.config(
        cloudinary_url=_cloudinary_url,
        secure=True,
    )
    STORAGES['default'] = {
        'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage',
    }
else:
    # Sem Cloudinary as fotos ficam no disco do servidor, que é APAGADO a cada
    # novo deploy na maioria das hospedagens. Por isso é obrigatório em produção.
    if not DEBUG and not TESTING:
        _erro_config(
            'Defina CLOUDINARY_URL: sem ele as fotos dos gatinhos seriam perdidas '
            'a cada deploy.'
        )
    STORAGES['default'] = {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    }


# --- Default primary key field type ----------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- CORS ------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = env('CORS_ALLOWED_ORIGINS')
CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS')


# --- Django REST Framework -------------------------------------------------
# A API pública é SOMENTE LEITURA. Nenhuma escrita acontece por ela: tudo que
# a equipe edita passa pelo painel admin (com login).
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    # Só sessão (sem Basic Auth, que seria um caminho alternativo de login)
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.AnonRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'anon': '300/min'},
    'DEFAULT_RENDERER_CLASSES': (
        ['rest_framework.renderers.JSONRenderer']
        if not DEBUG
        else [
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ]
    ),
}


# --- Segurança em produção -------------------------------------------------
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31_536_000          # 1 ano
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

    CSRF_COOKIE_SECURE = True
    CSRF_COOKIE_HTTPONLY = True
    CSRF_COOKIE_SAMESITE = 'Lax'

    X_FRAME_OPTIONS = 'DENY'
    SECURE_REFERRER_POLICY = 'same-origin'

if TESTING:
    # o cliente de testes não usa HTTPS
    SECURE_SSL_REDIRECT = False


# --- Painel admin ----------------------------------------------------------
# Em produção, use um endereço difícil de adivinhar (ex.: painel-x7k2q/).
ADMIN_URL = env('ADMIN_URL').strip('/') + '/'
if not DEBUG and not TESTING and ADMIN_URL == 'admin/':
    _erro_config('Em produção, defina ADMIN_URL com um endereço não óbvio (não use "admin/").')

# Sessão do painel: expira em 12 horas e ao fechar o navegador
SESSION_COOKIE_AGE = 60 * 60 * 12
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

UNFOLD = {
    'SITE_TITLE': 'UFU MIA',
    'SITE_HEADER': 'UFU MIA · Painel da equipe',
    'SITE_SYMBOL': 'pets',
    'SHOW_HISTORY': True,
    'COLORS': {
        'primary': {
            '50': '#f8f0fc', '100': '#f0dcf8', '200': '#e2bcf0', '300': '#cd92e3',
            '400': '#b565d3', '500': '#9a3dbd', '600': '#7b1fa2', '700': '#681a88',
            '800': '#561670', '900': '#46135a', '950': '#2c0a3a',
        },
    },
}
