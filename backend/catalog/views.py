from rest_framework import viewsets, filters
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Product, BlogPost, GalleryProject
from .serializers import ProductSerializer, BlogPostSerializer, GalleryProjectSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    Public: list, retrieve (GET)
    Admin only: create, update, delete (POST, PUT, PATCH, DELETE)
    Supports filtering by: category, material, color
    Supports search by: name, description
    """
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'category', 'material', 'color']
    ordering_fields = ['price', 'name', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True)
        category = self.request.query_params.get('category')
        material = self.request.query_params.get('material')
        color = self.request.query_params.get('color')
        if category:
            queryset = queryset.filter(category__iexact=category)
        if material:
            queryset = queryset.filter(material__iexact=material)
        if color:
            queryset = queryset.filter(color__iexact=color)
        return queryset

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]


class BlogPostViewSet(viewsets.ModelViewSet):
    """
    Public: list published posts, retrieve single post
    Admin only: create, update, delete (all posts including drafts)
    """
    serializer_class = BlogPostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'excerpt', 'content', 'category', 'author']
    ordering_fields = ['published_at', 'title']
    ordering = ['-published_at']

    def get_queryset(self):
        # Admin sees all (including drafts), public sees published only
        if self.request.user and self.request.user.is_staff:
            return BlogPost.objects.all()
        return BlogPost.objects.filter(is_published=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]


class GalleryProjectViewSet(viewsets.ModelViewSet):
    """
    Public: list, retrieve
    Admin only: create, update, delete
    """
    serializer_class = GalleryProjectSerializer
    queryset = GalleryProject.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'category', 'location', 'materials']
    ordering_fields = ['year', 'created_at']
    ordering = ['-year', '-created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]
