from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Lista as contas do painel (nunca mostra senhas, que são criptografadas).'

    def handle(self, *args, **options):
        User = get_user_model()
        contas = User.objects.order_by('username')
        if not contas:
            self.stdout.write('Nenhuma conta. Crie uma com: python manage.py createsuperuser')
            return
        for u in contas:
            papel = 'SUPERUSUÁRIO' if u.is_superuser else ('equipe' if u.is_staff else 'sem acesso ao painel')
            grupos = ', '.join(u.groups.values_list('name', flat=True)) or '-'
            ativo = 'ativo' if u.is_active else 'DESATIVADO'
            self.stdout.write(f'usuário: {u.username} | e-mail: {u.email or "-"} | {papel} | grupos: {grupos} | {ativo}')
