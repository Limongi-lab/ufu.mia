from rest_framework import serializers

from .models import Animal, FotoAnimal, GatoMemorial, HistoriaAdocao


class FotoAnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FotoAnimal
        fields = ["id", "imagem"]


class AnimalSerializer(serializers.ModelSerializer):
    fotos = FotoAnimalSerializer(many=True, read_only=True)
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
            "fotos",
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

class GatoMemorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = GatoMemorial
        fields = [
            "id",
            "nome",
            "foto",
            "periodo",
            "descricao",
            "texto_ex_donos",
            "autor_texto",
        ]