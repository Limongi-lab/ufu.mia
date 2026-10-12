import os
import re
import uuid

from django.db import models

from animais.models import validar_imagem

from .validators import validar_link, validar_telefone


def upload_equipe(instance, filename):
    ext = os.path.splitext(filename)[1].lower()
    return f'equipe/{uuid.uuid4().hex}{ext}'


class TextoSite(models.Model):
    """
    Um texto solto do site (título, parágrafo, botão...).
    As chaves são criadas pelo comando `carregar_conteudo_inicial` e o site
    sabe onde usar cada uma; por isso a equipe só EDITA o valor.
    """

    chave = models.CharField(max_length=100, unique=True)
    pagina = models.CharField('Onde aparece', max_length=80)
    descricao = models.CharField('O que é este texto', max_length=200)
    valor = models.TextField(
        'Texto',
        blank=True,
        help_text=(
            'Deixe em branco para voltar ao texto padrão do site. '
            'Dica: **assim** deixa em negrito e Enter quebra a linha.'
        ),
    )
    ordem = models.PositiveIntegerField(default=0)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Texto do site'
        verbose_name_plural = 'Textos do site'
        ordering = ['pagina', 'ordem', 'chave']

    def __str__(self):
        return self.descricao


class PerguntaFAQ(models.Model):
    pergunta = models.CharField(max_length=200)
    resposta = models.TextField(
        help_text='Para separar parágrafos, deixe uma linha em branco. **assim** deixa em negrito.',
    )
    ordem = models.PositiveIntegerField(default=0, help_text='Menor número aparece primeiro.')
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Pergunta frequente'
        verbose_name_plural = 'Perguntas frequentes'
        ordering = ['ordem', 'id']

    def __str__(self):
        return self.pergunta


class FrenteAtuacao(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    link_texto = models.CharField('Texto do botão', max_length=60, blank=True)
    link_url = models.CharField(
        'Endereço do botão', max_length=300, blank=True, validators=[validar_link],
        help_text='Ex.: /fale-conosco ou https://...',
    )
    ordem = models.PositiveIntegerField(default=0, help_text='Menor número aparece primeiro.')
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Frente de atuação'
        verbose_name_plural = 'Frentes de atuação'
        ordering = ['ordem', 'id']

    def __str__(self):
        return self.titulo


class FormaDeAjudar(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    link_texto = models.CharField('Texto do botão', max_length=60, blank=True)
    link_url = models.CharField(
        'Endereço do botão', max_length=300, blank=True, validators=[validar_link],
        help_text='Ex.: /animais ou https://...',
    )
    ordem = models.PositiveIntegerField(default=0, help_text='Menor número aparece primeiro.')
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Forma de ajudar'
        verbose_name_plural = 'Formas de ajudar'
        ordering = ['ordem', 'id']

    def __str__(self):
        return self.titulo


class PontoSobre(models.Model):
    titulo = models.CharField(max_length=120)
    descricao = models.TextField()
    ordem = models.PositiveIntegerField(default=0, help_text='Menor número aparece primeiro.')
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Ponto da seção Sobre'
        verbose_name_plural = 'Pontos da seção Sobre'
        ordering = ['ordem', 'id']

    def __str__(self):
        return self.titulo


class Estatistica(models.Model):
    numero = models.PositiveIntegerField(help_text='O número que aparece contando.')
    prefixo = models.CharField(max_length=5, blank=True, help_text='Ex.: +')
    sufixo = models.CharField(max_length=5, blank=True, help_text='Ex.: %')
    titulo = models.CharField(max_length=200)
    ordem = models.PositiveIntegerField(default=0, help_text='Menor número aparece primeiro.')
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Número de destaque'
        verbose_name_plural = 'Números de destaque'
        ordering = ['ordem', 'id']

    def __str__(self):
        return f'{self.prefixo}{self.numero}{self.sufixo} {self.titulo}'


class AreaContato(models.Model):
    """Um grupo da página Fale Conosco (ex.: Resgates), com uma ou mais pessoas."""

    funcao = models.CharField('Área', max_length=80, help_text='Ex.: Resgates, Marketing.')
    pergunta = models.CharField(
        'Pergunta que aparece acima', max_length=150,
        help_text='Ex.: Dúvidas sobre Resgates?',
    )
    ordem = models.PositiveIntegerField(default=0, help_text='Menor número aparece primeiro.')
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Área do Fale Conosco'
        verbose_name_plural = 'Áreas do Fale Conosco'
        ordering = ['ordem', 'id']

    def __str__(self):
        return self.funcao


class ContatoEquipe(models.Model):
    area = models.ForeignKey(AreaContato, on_delete=models.CASCADE, related_name='contatos')
    nome = models.CharField(max_length=80)
    telefone = models.CharField(
        max_length=30, validators=[validar_telefone],
        help_text='Com +55 e DDD. Ex.: +55 34 99999-9999. É o número do WhatsApp.',
    )
    foto = models.ImageField(
        upload_to=upload_equipe, validators=[validar_imagem], blank=True,
        help_text='Opcional (máx. 5 MB). Sem foto, o site mostra as iniciais.',
    )
    ordem = models.PositiveIntegerField(default=0)
    ativo = models.BooleanField(default=True, help_text='Desmarque para esconder do site sem apagar.')

    class Meta:
        verbose_name = 'Pessoa da equipe'
        verbose_name_plural = 'Pessoas da equipe'
        ordering = ['ordem', 'id']

    def __str__(self):
        return self.nome

    @property
    def whatsapp(self):
        return re.sub(r'\D', '', self.telefone)
