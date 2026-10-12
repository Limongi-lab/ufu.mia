"""
Grupos de permissão do painel. Criados automaticamente após `migrate`.
Não criam nenhum usuário e não contêm senhas: quem entra no painel é
cadastrado por um superusuário (ou por `createsuperuser` no servidor).
"""
from django.apps import apps
from django.contrib.auth.management import create_permissions
from django.contrib.auth.models import Group, Permission

# Textos soltos: a equipe só edita o valor (as chaves são do código do site)
SO_EDITAR = {'textosite'}


def criar_grupos(sender, **kwargs):
    for label in ('animais', 'conteudo'):
        create_permissions(apps.get_app_config(label), verbosity=0)

    permissoes = []
    for label in ('animais', 'conteudo'):
        for model in apps.get_app_config(label).get_models():
            nome = model._meta.model_name
            acoes = ('view', 'change') if nome in SO_EDITAR else ('view', 'add', 'change', 'delete')
            permissoes += [f'{a}_{nome}' for a in acoes]

    equipe = Permission.objects.filter(
        content_type__app_label__in=('animais', 'conteudo'), codename__in=permissoes
    )

    # Equipe: gerencia gatinhos, histórias, textos e listas do site
    grupo, _ = Group.objects.get_or_create(name='Equipe')
    grupo.permissions.set(equipe)

    # Coordenação: o mesmo da Equipe + ver o histórico de ações e destravar
    # contas bloqueadas por tentativas de login erradas.
    extras = Permission.objects.filter(
        codename__in=['view_logentry', 'view_accessattempt', 'delete_accessattempt']
    )
    coord, _ = Group.objects.get_or_create(name='Coordenação')
    coord.permissions.set(list(equipe) + list(extras))
