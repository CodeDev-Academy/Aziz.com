"""
Seed script — run with: python manage.py shell < seed_catalog.py
Populates the database with initial products, blog posts, and gallery projects.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from catalog.models import Product, ProductImage, BlogPost, GalleryProject
from django.utils import timezone
from django.utils.text import slugify

# ─────────────────────────────────────────────
# 1. PRODUCTS
# ─────────────────────────────────────────────
PRODUCTS = [
    {
        "name": "Oslo 3-Seater Sofa",
        "price": 450000,
        "category": "Living Room",
        "material": "Oak Wood",
        "color": "Walnut Brown",
        "dimensions": "210 x 90 x 80 cm",
        "description": "A comfortable, spacious 3-seater sofa designed with soft fabric upholstery and supported by sturdy walnut wooden legs. Perfect for modern living rooms.",
        "images": ["/images/products/oslo-sofa.png", "/images/cat-living.png"],
    },
    {
        "name": "Stockholm Oak Bed",
        "price": 620000,
        "category": "Bedroom",
        "material": "Oak Wood",
        "color": "Natural Oak",
        "dimensions": "200 x 180 x 100 cm",
        "description": "Crafted from solid oak, this minimalist bed frame brings clean Scandinavian design and long-lasting durability to your bedroom sanctuary.",
        "images": ["/images/products/stockholm-bed.png", "/images/cat-bedroom.png"],
    },
    {
        "name": "Kyoto Wooden Desk",
        "price": 280000,
        "category": "Office",
        "material": "Walnut Wood",
        "color": "Espresso Brown",
        "dimensions": "120 x 60 x 75 cm",
        "description": "A Japanese-inspired writing desk featuring clean lines, two slim storage drawers, and a premium matte wood finish. Ideal for working from home.",
        "images": ["/images/products/kyoto-desk.png", "/images/cat-office.png"],
    },
    {
        "name": "Bergen Armchair",
        "price": 180000,
        "category": "Living Room",
        "material": "Beech Wood",
        "color": "Beige Cream",
        "dimensions": "80 x 85 x 90 cm",
        "description": "A classic mid-century lounge chair with supportive foam-filled cushions upholstered in an easy-clean cream fabric. Complements any seating area.",
        "images": ["/images/products/bergen-armchair.png", "/images/cat-living.png"],
    },
]

print("Seeding Products...")
for p_data in PRODUCTS:
    images = p_data.pop("images")
    product, created = Product.objects.get_or_create(name=p_data["name"], defaults=p_data)
    if created:
        for i, url in enumerate(images):
            ProductImage.objects.create(product=product, image_url=url, order=i)
        print(f"  ✓ Created: {product.name}")
    else:
        print(f"  - Skipped (exists): {product.name}")

# ─────────────────────────────────────────────
# 2. GALLERY PROJECTS
# ─────────────────────────────────────────────
PROJECTS = [
    {
        "title": "Lekki Penthouse Living Room",
        "category": "Living Room",
        "image_url": "/images/gallery/living-1.png",
        "description": "A complete custom entertainment center, credenza, and custom-sized solid oak coffee table designed to elevate a modern penthouse apartment overlooking Lekki Phase 1.",
        "location": "Lekki, Lagos",
        "year": "2025",
        "materials": "Solid Oak Wood, Matte Black Steel, Warm LED accents",
    },
    {
        "title": "Ikoyi Minimalist Master Suite",
        "category": "Bedroom",
        "image_url": "/images/gallery/bedroom-1.png",
        "description": "An elegant, floating-effect walnut platform bed with integrated headboard, built-in bedside nightstands, and matching floating dresser to maximize floor space.",
        "location": "Ikoyi, Lagos",
        "year": "2025",
        "materials": "Premium Walnut, Natural Linens, Solid Brass hardware",
    },
    {
        "title": "Victoria Island Executive Study",
        "category": "Office",
        "image_url": "/images/gallery/office-1.png",
        "description": "A commanding floor-to-ceiling mahogany bookshelf system, integrated study desk with built-in cable management, and matching filing cabinets for a home office.",
        "location": "Victoria Island, Lagos",
        "year": "2024",
        "materials": "Solid Mahogany, Premium Dark Leather inserts",
    },
    {
        "title": "Banana Island Dining Room",
        "category": "Living Room",
        "image_url": "/images/gallery/living-2.png",
        "description": "A massive 8-seater custom teak dining table paired with ergonomically contoured wooden chairs to serve as a stunning dining area focal point.",
        "location": "Banana Island, Lagos",
        "year": "2025",
        "materials": "High-grade Teakwood, Linen upholstery cushion covers",
    },
    {
        "title": "Minimalist Loft Guest Room",
        "category": "Bedroom",
        "image_url": "/images/gallery/bedroom-2.png",
        "description": "A light and airy custom white oak low-profile bedframe with soft, integrated headboard cushion straps designed for a compact loft apartment room.",
        "location": "Surulere, Lagos",
        "year": "2024",
        "materials": "White Oak Wood, Organic Canvas backing straps",
    },
]

print("\nSeeding Gallery Projects...")
for proj_data in PROJECTS:
    project, created = GalleryProject.objects.get_or_create(
        title=proj_data["title"], defaults=proj_data
    )
    if created:
        print(f"  ✓ Created: {project.title}")
    else:
        print(f"  - Skipped (exists): {project.title}")

# ─────────────────────────────────────────────
# 3. BLOG POSTS
# ─────────────────────────────────────────────
BLOG_POSTS = [
    {
        "title": "5 Ways to Style a Scandinavian Living Room",
        "excerpt": "Discover the art of minimalist design with natural wood tones, clean lines, and functional décor to create a tranquil Scandinavian living space.",
        "content": "Scandinavian design is defined by its simplicity, functionality, and connection to nature...",
        "image_url": "/images/blog/scandi-living.png",
        "category": "Design Tips",
        "author": "CozyCraft Team",
        "is_published": True,
        "published_at": timezone.now(),
    },
    {
        "title": "Choosing the Right Wood for Your Furniture",
        "excerpt": "Oak, Walnut, Mahogany — each wood species brings a unique character to furniture. Here is how to choose the right one for your home.",
        "content": "When selecting wood for custom furniture, several factors come into play...",
        "image_url": "/images/blog/wood-types.png",
        "category": "Material Guide",
        "author": "CozyCraft Team",
        "is_published": True,
        "published_at": timezone.now(),
    },
    {
        "title": "CozyCraft Opens New Flagship Showroom in Lekki",
        "excerpt": "We are thrilled to announce the opening of our newest 5,000 sq ft showroom on the Lekki-Epe Expressway — a full immersive furniture experience.",
        "content": "After months of preparation, CozyCraft is proud to open its doors...",
        "image_url": "/images/blog/showroom-opening.png",
        "category": "News",
        "author": "CozyCraft Team",
        "is_published": True,
        "published_at": timezone.now(),
    },
]

print("\nSeeding Blog Posts...")
for post_data in BLOG_POSTS:
    title = post_data["title"]
    slug = slugify(title)
    post, created = BlogPost.objects.get_or_create(slug=slug, defaults={**post_data, "slug": slug})
    if created:
        print(f"  ✓ Created: {post.title}")
    else:
        print(f"  - Skipped (exists): {post.title}")

print("\n✅ Seeding complete!")
