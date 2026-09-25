from django.db import models


class Animal(models.Model):
    STATUS_CHOICES = [
        ("disponivel", "Disponível"),
        ("em_avaliacao", "Em Avaliação"),
        ("adotado", "Adotado"),
    ]

    nome = models.CharField(max_length=100)
    especie = models.CharField(max_length=100, default="Gato")
    idade = models.CharField(max_length=50)
    foto = models.ImageField(upload_to="animais/")
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="disponivel",
    )
    descricao = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animais"
        ordering = ["-criado_em"]

    def __str__(self):
        return f"{self.nome} ({self.especie})"


class HistoriaAdocao(models.Model):
    animal = models.ForeignKey(
        Animal,
        on_delete=models.CASCADE,
        related_name="historias",
    )
    foto_atual = models.ImageField(upload_to="historias/")
    texto = models.TextField()
    data_adocao = models.DateField()

    class Meta:
        verbose_name = "História de Adoção"
        verbose_name_plural = "Histórias de Adoção"
        ordering = ["-data_adocao"]

    def __str__(self):
        return f"História de {self.animal.nome} — {self.data_adocao}"
