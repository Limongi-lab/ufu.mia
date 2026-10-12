"""
Management command: criar_superusuario

Cria um superusuário lendo as credenciais EXCLUSIVAMENTE de variáveis de
ambiente. Projetado para o primeiro acesso em hospedagens sem terminal
(ex.: Render plano grátis).

Uso temporário no Build Command do Render:
    ... && python manage.py criar_superusuario

REMOVA esse trecho do Build Command após o primeiro deploy bem-sucedido.
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        'Cria um superusuário a partir de variáveis de ambiente '
        '(DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, '
        'DJANGO_SUPERUSER_PASSWORD). Não faz nada se as variáveis não '
        'estiverem definidas ou se o usuário já existir.'
    )

    def handle(self, *args, **options):
        User = get_user_model()

        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', '').strip()
        email    = os.environ.get('DJANGO_SUPERUSER_EMAIL', '').strip()
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', '').strip()

        # Se alguma variável estiver ausente, encerra sem fazer nada.
        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    '[criar_superusuario] Variáveis de ambiente não definidas '
                    '— nenhum usuário criado.'
                )
            )
            return

        # Verifica se o usuário já existe pelo campo USERNAME_FIELD do modelo.
        lookup = {User.USERNAME_FIELD: username}
        if User.objects.filter(**lookup).exists():
            self.stdout.write(
                self.style.WARNING(
                    f'[criar_superusuario] Usuário "{username}" já existe — '
                    'nenhuma alteração feita.'
                )
            )
            return

        # Cria o superusuário. A senha nunca é impressa nos logs.
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )

        self.stdout.write(
            self.style.SUCCESS(
                f'[criar_superusuario] Superusuário "{username}" criado com sucesso.'
            )
        )
