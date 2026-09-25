from rest_framework import serializers

from .models import Animal, HistoriaAdocao


class AnimalSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(
        source="get_status_display", read_only=True
    )

    class Meta:
        model = Animal
        fields = [
            "id",
            "nome",
            "especie",
            "idade",
            "foto",
            "status",
            "status_display",
            "descricao",
            "criado_em",
        ]


class HistoriaAdocaoSerializer(serializers.ModelSerializer):
    animal_nome = serializers.CharField(source="animal.nome", read_only=True)

    class Meta:
        model = HistoriaAdocao
        fields = [
            "id",
            "animal",
            "animal_nome",
            "foto_atual",
            "texto",
            "data_adocao",
        ]
