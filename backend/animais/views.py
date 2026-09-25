from rest_framework import viewsets

from .models import Animal, HistoriaAdocao
from .serializers import AnimalSerializer, HistoriaAdocaoSerializer


class AnimalViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint somente leitura para listagem e detalhe de animais disponíveis para adoção.
    """

    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer


class HistoriaAdocaoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint somente leitura para listagem e detalhe das histórias de adoção.
    """

    queryset = HistoriaAdocao.objects.select_related("animal").all()
    serializer_class = HistoriaAdocaoSerializer
