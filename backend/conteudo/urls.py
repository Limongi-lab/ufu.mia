from django.urls import path

from .views import ConteudoView

urlpatterns = [
    path('conteudo/', ConteudoView.as_view(), name='conteudo'),
]
