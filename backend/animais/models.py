import os
import uuid

from django.core.exceptions import ValidationError
from django.db import models


def validar_imagem(arquivo):
    """Valida que o upload é uma imagem com tamanho máximo de 5 MB."""
    max_tamanho = 5 * 1024 * 1024  # 5 MB
    if arquivo.size > max_tamanho:
        raise ValidationError(
            f'O arquivo é muito grande ({arquivo.size / 1024 / 1024:.1f} MB). '
            f'O tamanho máximo é 5 MB.'
        )

    extensoes_permitidas = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    ext = os.path.splitext(arquivo.name)[1].lower()
    if ext not in extensoes_permitidas:
        raise ValidationError(
            f'Tipo de arquivo não permitido ({ext}). '
            f'Use: {", ".join(extensoes_permitidas)}.'
        )


def upload_animais(instance, filename):
    """Gera um nome seguro e único para o arquivo de upload."""
    ext = os.path.splitext(filename)[1].lower()
    nome_seguro = f'{uuid.uuid4().hex}{ext}'
    return f'animais/{nome_seguro}'


def upload_historias(instance, filename):
    """Gera um nome seguro e único para o arquivo de upload."""
    ext = os.path.splitext(filename)[1].lower()
    nome_seguro = f'{uuid.uuid4().hex}{ext}'
    return f'historias/{nome_seguro}'


class Animal(models.Model):
    STATUS_CHOICES = [
        ("disponivel", "Disponível"),
        ("em_avaliacao", "Em Avaliação"),
        ("adotado", "Adotado"),
    ]

    nome = models.CharField(
        max_length=100,
        help_text='Nome do animal (ex: "Mingau", "Pipoca").',
    )
    especie = models.CharField(
        max_length=100,
        default="Gato",
        help_text='Espécie do animal.',
    )
    idade = models.CharField(
        max_length=50,
        help_text='Idade estimada (ex: "3 meses", "2 anos").',
    )
    foto = models.ImageField(
        upload_to=upload_animais,
        validators=[validar_imagem],
        help_text='Foto do animal (máx. 5 MB, formatos: JPG, PNG, GIF, WebP).',
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="disponivel",
        help_text='Status atual do animal.',
    )
    descricao = models.TextField(
        help_text='Descrição do animal: personalidade, histórico, etc.',
    )
    ativo = models.BooleanField(
        default=True,
        help_text='Desmarque para esconder do site sem apagar.',
    )
    ordem = models.PositiveIntegerField(
        default=0,
        help_text='Ordem de exibição no site. Menor número aparece primeiro.',
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animais"
        ordering = ["ordem", "-criado_em"]

    def __str__(self):
        return f"{self.nome} ({self.especie})"


class HistoriaAdocao(models.Model):
    animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="historias",
        help_text='Animal ao qual esta história pertence.',
    )
    foto_atual = models.ImageField(
        upload_to=upload_historias,
        validators=[validar_imagem],
        help_text='Foto atual do animal no novo lar (máx. 5 MB).',
    )
    texto = models.TextField(
        help_text='Texto da história de adoção.',
    )
    data_adocao = models.DateField(
        help_text='Data em que a adoção foi realizada.',
    )

    class Meta:
        verbose_name = "História de Adoção"
        verbose_name_plural = "Histórias de Adoção"
        ordering = ["-data_adocao"]

    def __str__(self):
        return f"História de {self.animal.nome} — {self.data_adocao}"
