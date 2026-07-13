from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, BlogPostViewSet, GalleryProjectViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'gallery', GalleryProjectViewSet, basename='gallery')

urlpatterns = [
    path('', include(router.urls)),
]
