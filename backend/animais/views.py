from rest_framework import viewsets

from .models import Animal, GatoMemorial, HistoriaAdocao
from .serializers import (
    AnimalSerializer,
    GatoMemorialSerializer,
    HistoriaAdocaoSerializer,
)

class AnimalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint somente leitura para listagem e detalhe de animais disponíveis para adoção.
    Exibe apenas animais marcados como ativos.
    """

    queryset = Animal.objects.filter(ativo=True).prefetch_related("fotos")
    serializer_class = AnimalSerializer


class HistoriaAdocaoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint somente leitura para listagem e detalhe das histórias de adoção.
    """

    queryset = HistoriaAdocao.objects.select_related("animal").all()
    serializer_class = HistoriaAdocaoSerializer

class GatoMemorialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint somente leitura do memorial dos gatinhos que se foram.
    Exibe apenas os marcados como ativos.
    """

    queryset = GatoMemorial.objects.filter(ativo=True)
    serializer_class = GatoMemorialSerializer