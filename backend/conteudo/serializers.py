from rest_framework import serializers

from .models import (
    AreaContato, ContatoEquipe, Estatistica, FormaDeAjudar, FrenteAtuacao,
    PerguntaFAQ, PontoSobre,
)


class PerguntaFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerguntaFAQ
        fields = ['pergunta', 'resposta']


class FrenteAtuacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrenteAtuacao
        fields = ['titulo', 'descricao', 'link_texto', 'link_url']


class FormaDeAjudarSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaDeAjudar
        fields = ['titulo', 'descricao', 'link_texto', 'link_url']


class PontoSobreSerializer(serializers.ModelSerializer):
    class Meta:
        model = PontoSobre
        fields = ['titulo', 'descricao']


class EstatisticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatistica
        fields = ['numero', 'prefixo', 'sufixo', 'titulo']


class ContatoEquipeSerializer(serializers.ModelSerializer):
    # Só o necessário para o botão do WhatsApp: nada além disso sai pela API
    whatsapp = serializers.CharField(read_only=True)

    class Meta:
        model = ContatoEquipe
        fields = ['nome', 'telefone', 'whatsapp', 'foto']


class AreaContatoSerializer(serializers.ModelSerializer):
    pessoas = serializers.SerializerMethodField()

    class Meta:
        model = AreaContato
        fields = ['funcao', 'pergunta', 'pessoas']

    def get_pessoas(self, obj):
        ativos = [c for c in obj.contatos.all() if c.ativo]
        return ContatoEquipeSerializer(ativos, many=True, context=self.context).data
