"""
Django settings for config project (UFU MIA).

Todas as configurações sensíveis são lidas de variáveis de ambiente.
Em desenvolvimento, crie um arquivo backend/.env (nunca commite esse arquivo).
Veja backend/.env.example para referência.
"""

import environ
from pathlib import Path

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
)

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
    # Admin customizado (deve vir antes de django.contrib.admin)
    # 'unfold' será adicionado no Objetivo 2

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
from datetime import timedelta  # noqa: E402

AXES_FAILURE_LIMIT = 5
AXES_COOLOFF_TIME = timedelta(minutes=30)
AXES_LOCKOUT_PARAMETERS = ['username', 'ip_address']
AXES_RESET_ON_SUCCESS = True


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
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
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
    STORAGES['default'] = {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    }


# --- Default primary key field type ----------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- CORS ------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = env('CORS_ALLOWED_ORIGINS')
CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS')


# --- Django REST Framework -------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
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


# --- URL customizada do admin ----------------------------------------------
ADMIN_URL = env('ADMIN_URL')
