from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AnimalViewSet, HistoriaAdocaoViewSet

router = DefaultRouter()
router.register(r"animais", AnimalViewSet, basename="animal")
router.register(r"historias", HistoriaAdocaoViewSet, basename="historiaadocao")

urlpatterns = [
    path("", include(router.urls)),
]
