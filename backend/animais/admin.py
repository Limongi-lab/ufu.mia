from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin

from .models import Animal, HistoriaAdocao


@admin.register(Animal)
class AnimalAdmin(ModelAdmin):
    list_display = (
        "nome",
        "especie",
        "idade",
        "status",
        "ativo",
        "ordem",
        "foto_preview",
    )
    list_editable = ("status", "ativo", "ordem")
    list_filter = ("status", "ativo", "especie")
    list_per_page = 30
    search_fields = ("nome", "descricao")
    readonly_fields = ("criado_em", "foto_preview")

    @admin.display(description="Foto")
    def foto_preview(self, obj):
        if obj.foto:
            return format_html(
                '<img src="{}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;" />',
                obj.foto.url,
            )
        return "—"


@admin.register(HistoriaAdocao)
class HistoriaAdocaoAdmin(ModelAdmin):
    list_display = (
        "animal",
        "data_adocao",
        "foto_atual_preview",
    )
    search_fields = ("animal__nome", "texto")
    readonly_fields = ("foto_atual_preview",)

    @admin.display(description="Foto Atual")
    def foto_atual_preview(self, obj):
        if obj.foto_atual:
            return format_html(
                '<img src="{}" style="width:60px; height:60px; object-fit:cover; border-radius:6px;" />',
                obj.foto_atual.url,
            )
        return "—"
