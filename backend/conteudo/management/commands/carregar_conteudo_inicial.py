from django.core.management.base import BaseCommand
from django.db import transaction

from conteudo import dados_iniciais as d
from conteudo.models import (
    AreaContato, ContatoEquipe, Estatistica, FormaDeAjudar, FrenteAtuacao,
    PerguntaFAQ, PontoSobre, TextoSite,
)


class Command(BaseCommand):
    help = (
        'Carrega os textos iniciais do site. Pode ser rodado várias vezes: '
        'NUNCA sobrescreve o que a equipe já editou e NÃO cria usuários nem senhas.'
    )

    @transaction.atomic
    def handle(self, *args, **options):
        novos = 0

        # Textos soltos: cria só as chaves que ainda não existem.
        for ordem, (chave, pagina, descricao, valor) in enumerate(d.TEXTOS):
            obj, criado = TextoSite.objects.get_or_create(
                chave=chave,
                defaults={'pagina': pagina, 'descricao': descricao, 'valor': valor, 'ordem': ordem},
            )
            if criado:
                novos += 1
            elif (obj.pagina, obj.descricao, obj.ordem) != (pagina, descricao, ordem):
                # só atualiza os rótulos do painel, nunca o texto da equipe
                TextoSite.objects.filter(pk=obj.pk).update(
                    pagina=pagina, descricao=descricao, ordem=ordem
                )

        # Listas: só preenche se estiver vazia, para respeitar o que a equipe apagou.
        def popular(model, linhas, campos):
            if model.objects.exists():
                return 0
            for ordem, linha in enumerate(linhas):
                model.objects.create(ordem=ordem, **dict(zip(campos, linha)))
            return len(linhas)

        novos += popular(PontoSobre, d.PONTOS_SOBRE, ['titulo', 'descricao'])
        novos += popular(FrenteAtuacao, d.FRENTES, ['titulo', 'descricao', 'link_texto', 'link_url'])
        novos += popular(FormaDeAjudar, d.FORMAS_DE_AJUDAR, ['titulo', 'descricao', 'link_texto', 'link_url'])
        novos += popular(PerguntaFAQ, d.FAQ, ['pergunta', 'resposta'])
        novos += popular(Estatistica, d.ESTATISTICAS, ['numero', 'prefixo', 'sufixo', 'titulo'])

        if not AreaContato.objects.exists():
            for ordem, (funcao, pergunta, pessoas) in enumerate(d.CONTATOS):
                area = AreaContato.objects.create(funcao=funcao, pergunta=pergunta, ordem=ordem)
                for o, (nome, telefone) in enumerate(pessoas):
                    ContatoEquipe.objects.create(area=area, nome=nome, telefone=telefone, ordem=o)
                    novos += 1
                novos += 1

        self.stdout.write(self.style.SUCCESS(f'Conteúdo inicial carregado ({novos} itens novos).'))
