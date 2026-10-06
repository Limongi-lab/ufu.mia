from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, TabularInline

from .models import (
    AreaContato, ContatoEquipe, Estatistica, FormaDeAjudar, FrenteAtuacao,
    PerguntaFAQ, PontoSobre, TextoSite,
)


@admin.register(TextoSite)
class TextoSiteAdmin(ModelAdmin):
    """Textos soltos: a equipe só edita o texto (não cria nem apaga)."""

    list_display = ('descricao', 'pagina', 'resumo', 'atualizado_em')
    list_filter = ('pagina',)
    search_fields = ('descricao', 'valor')
    fields = ('pagina', 'descricao', 'valor')
    readonly_fields = ('pagina', 'descricao')
    list_per_page = 50

    @admin.display(description='Texto atual')
    def resumo(self, obj):
        return (obj.valor[:80] + '…') if len(obj.valor) > 80 else obj.valor

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class _ListaAdmin(ModelAdmin):
    list_editable = ('ordem', 'ativo')
    list_per_page = 50


@admin.register(PerguntaFAQ)
class PerguntaFAQAdmin(_ListaAdmin):
    list_display = ('pergunta', 'ordem', 'ativo')
    search_fields = ('pergunta', 'resposta')


@admin.register(FrenteAtuacao)
class FrenteAtuacaoAdmin(_ListaAdmin):
    list_display = ('titulo', 'ordem', 'ativo')


@admin.register(FormaDeAjudar)
class FormaDeAjudarAdmin(_ListaAdmin):
    list_display = ('titulo', 'ordem', 'ativo')


@admin.register(PontoSobre)
class PontoSobreAdmin(_ListaAdmin):
    list_display = ('titulo', 'ordem', 'ativo')


@admin.register(Estatistica)
class EstatisticaAdmin(_ListaAdmin):
    list_display = ('__str__', 'ordem', 'ativo')


class ContatoInline(TabularInline):
    model = ContatoEquipe
    extra = 1
    fields = ('nome', 'telefone', 'foto', 'ordem', 'ativo')


@admin.register(AreaContato)
class AreaContatoAdmin(_ListaAdmin):
    list_display = ('funcao', 'pergunta', 'pessoas', 'ordem', 'ativo')
    inlines = [ContatoInline]

    @admin.display(description='Pessoas')
    def pessoas(self, obj):
        return ', '.join(c.nome for c in obj.contatos.all()) or '—'
