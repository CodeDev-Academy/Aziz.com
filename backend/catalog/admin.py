from django.contrib import admin
from .models import Product, ProductImage, BlogPost, GalleryProject


# ─────────────────────────────────────────
# PRODUCT ADMIN
# ─────────────────────────────────────────

class ProductImageInline(admin.TabularInline):
    """Allows editing product images directly on the Product page."""
    model = ProductImage
    extra = 1
    fields = ['image_url', 'order']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'material', 'color', 'is_active', 'created_at']
    list_filter = ['category', 'material', 'color', 'is_active']
    search_fields = ['name', 'description', 'material', 'color']
    list_editable = ['is_active', 'price']
    inlines = [ProductImageInline]
    ordering = ['-created_at']
    list_per_page = 20
    readonly_fields = ['created_at', 'updated_at']


# ─────────────────────────────────────────
# BLOG POST ADMIN
# ─────────────────────────────────────────

@admin.action(description='Mark selected posts as Published')
def make_published(modeladmin, request, queryset):
    """Bulk action: publish multiple blog posts at once."""
    from django.utils import timezone
    queryset.update(is_published=True, published_at=timezone.now())


@admin.action(description='Mark selected posts as Draft (unpublish)')
def make_draft(modeladmin, request, queryset):
    """Bulk action: unpublish multiple blog posts at once."""
    queryset.update(is_published=False)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'author', 'is_published', 'published_at', 'created_at']
    list_filter = ['is_published', 'category']
    search_fields = ['title', 'content', 'author', 'excerpt']
    list_editable = ['is_published']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['-published_at']
    list_per_page = 20
    actions = [make_published, make_draft]
    readonly_fields = ['created_at', 'updated_at']


# ─────────────────────────────────────────
# GALLERY PROJECT ADMIN
# ─────────────────────────────────────────

@admin.register(GalleryProject)
class GalleryProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'location', 'year', 'created_at']
    list_filter = ['category', 'year']
    search_fields = ['title', 'description', 'location', 'materials']
    ordering = ['-year', '-created_at']
    list_per_page = 20
    readonly_fields = ['created_at']

