from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AreaContato, Estatistica, FormaDeAjudar, FrenteAtuacao, PerguntaFAQ,
    PontoSobre, TextoSite,
)
from .serializers import (
    AreaContatoSerializer, EstatisticaSerializer, FormaDeAjudarSerializer,
    FrenteAtuacaoSerializer, PerguntaFAQSerializer, PontoSobreSerializer,
)


@method_decorator(cache_control(public=True, max_age=60), name='get')
class ConteudoView(APIView):
    """
    Todo o conteúdo editável do site em um JSON só. SOMENTE LEITURA.
    Cache de 60 segundos (navegador/CDN): uma edição no painel aparece em até 1 minuto.
    Textos em branco ficam de fora: o site usa o texto padrão do código.
    """

    authentication_classes = []
    permission_classes = []

    def get(self, request):
        ctx = {'request': request}
        textos = {
            t.chave: t.valor
            for t in TextoSite.objects.all()
            if t.valor.strip()
        }
        areas = AreaContato.objects.filter(ativo=True).prefetch_related('contatos')

        def lista(model, serializer):
            return serializer(model.objects.filter(ativo=True), many=True, context=ctx).data

        return Response({
            'textos': textos,
            'pontos_sobre': lista(PontoSobre, PontoSobreSerializer),
            'frentes': lista(FrenteAtuacao, FrenteAtuacaoSerializer),
            'formas_de_ajudar': lista(FormaDeAjudar, FormaDeAjudarSerializer),
            'faq': lista(PerguntaFAQ, PerguntaFAQSerializer),
            'estatisticas': lista(Estatistica, EstatisticaSerializer),
            'contatos': AreaContatoSerializer(areas, many=True, context=ctx).data,
        })
