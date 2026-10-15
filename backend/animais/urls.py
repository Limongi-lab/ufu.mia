from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AnimalViewSet, GatoMemorialViewSet, HistoriaAdocaoViewSet

router = DefaultRouter()
router.register(r"animais", AnimalViewSet, basename="animal")
router.register(r"memorial", GatoMemorialViewSet, basename="memorial")
router.register(r"historias", HistoriaAdocaoViewSet, basename="historiaadocao")

urlpatterns = [
    path("", include(router.urls)),
]
