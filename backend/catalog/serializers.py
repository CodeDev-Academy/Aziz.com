from rest_framework import serializers
from .models import Product, ProductImage, BlogPost, GalleryProject


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image_url', 'order']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    # Accept a list of image URLs when creating/updating via write
    image_urls = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'category', 'material',
            'color', 'dimensions', 'description', 'is_active',
            'images', 'image_urls', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        image_urls = validated_data.pop('image_urls', [])
        product = Product.objects.create(**validated_data)
        for i, url in enumerate(image_urls):
            ProductImage.objects.create(product=product, image_url=url, order=i)
        return product

    def update(self, instance, validated_data):
        image_urls = validated_data.pop('image_urls', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # If image_urls provided, replace existing images
        if image_urls is not None:
            instance.images.all().delete()
            for i, url in enumerate(image_urls):
                ProductImage.objects.create(product=instance, image_url=url, order=i)
        return instance


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content',
            'image_url', 'category', 'author',
            'published_at', 'is_published', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class GalleryProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryProject
        fields = [
            'id', 'title', 'category', 'image_url',
            'description', 'location', 'year', 'materials', 'created_at'
        ]
        read_only_fields = ['created_at']
