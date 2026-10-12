from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = (
        'APAGA TODAS as contas do painel do banco atual (só para o seu computador, '
        'em desenvolvimento). Depois crie uma nova com createsuperuser.'
    )

    def add_arguments(self, parser):
        parser.add_argument('--sim', action='store_true', help='Confirma que quer apagar todas as contas.')

    def handle(self, *args, **options):
        # Trava de segurança: nunca roda em produção (DEBUG=False)
        if not settings.DEBUG:
            raise CommandError('Recusado: este comando só funciona em desenvolvimento (DEBUG=True).')
        if not options['sim']:
            raise CommandError('Para confirmar, rode de novo com --sim')
        total, _ = get_user_model().objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f'{total} registro(s) apagado(s). Crie uma conta nova com: python manage.py createsuperuser'))
