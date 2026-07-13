import React from 'react';
import { Hero } from './Hero';
import { FeaturedCategories } from './FeaturedCategories';
import { WhyChooseUs } from './WhyChooseUs';
import { Testimonials } from './Testimonials';
import { Newsletter } from './Newsletter';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './Home.module.css';

export default function Home() {
  const { products, loading, error } = useProducts();

  // Get first 4 products for featured listing
  const featuredProducts = products.slice(0, 4);

  return (
    <div className={styles.home}>
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Featured Categories */}
      <FeaturedCategories />

      {/* 3. Featured Products */}
      <section className={styles.productsSection}>
        <div className="container">
          <SectionHeading 
            title="Popular Collections" 
            subtitle="Featured Furniture" 
          />

          {loading && (
            <div className={styles.statusText}>Loading featured products...</div>
          )}

          {error && (
            <div className={`${styles.statusText} ${styles.errorText}`}>
              Error loading products: {error}
            </div>
          )}

          {!loading && !error && featuredProducts.length === 0 && (
            <div className={styles.statusText}>No products found</div>
          )}

          {!loading && !error && featuredProducts.length > 0 && (
            <div className={styles.grid}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Newsletter Signup */}
      <Newsletter />
    </div>
  );
}
