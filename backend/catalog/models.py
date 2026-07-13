from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Living Room', 'Living Room'),
        ('Bedroom', 'Bedroom'),
        ('Office', 'Office'),
        ('Dining', 'Dining'),
        ('Outdoor', 'Outdoor'),
    ]

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    material = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=100, blank=True)
    dimensions = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name='images', on_delete=models.CASCADE
    )
    image_url = models.CharField(max_length=500)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image {self.order} for {self.product.name}"


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    category = models.CharField(max_length=100, blank=True)
    author = models.CharField(max_length=150, default='CozyCraft Team')
    published_at = models.DateTimeField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class GalleryProject(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    year = models.CharField(max_length=4, blank=True)
    materials = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year', '-created_at']

    def __str__(self):
        return self.title
