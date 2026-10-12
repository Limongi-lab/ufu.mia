from django.apps import AppConfig
from django.db.models.signals import post_migrate


class ConteudoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'conteudo'
    verbose_name = 'Conteúdo do site'

    def ready(self):
        from .grupos import criar_grupos

        post_migrate.connect(criar_grupos, sender=self)
