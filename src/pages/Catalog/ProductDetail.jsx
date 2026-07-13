import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useFavorites } from '../../features/favorites/useFavorites';
import { Button } from '../../components/Button/Button';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.statusContainer}>
        <p className={styles.statusText}>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.statusContainer}>
        <p className={`${styles.statusText} ${styles.errorText}`}>
          {error || 'Product not found.'}
        </p>
        <Link to="/catalog">
          <Button variant="primary">Back to Catalog</Button>
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(product.id);

  // Format Nigerian Naira
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  // Prefilled message for Request a Quote (URL Encoded)
  const contactLink = `/contact?product=${encodeURIComponent(product.name)}`;

  return (
    <div className={styles.detailPage}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbBg}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <span className={styles.separator}>/</span>
            <Link to="/catalog">Catalog</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.activeBreadcrumb}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Back Link */}
        <button 
          type="button" 
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.backArrow}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Product Details Layout */}
        <div className={styles.layout}>
          {/* Left Column: Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImageContainer}>
              <img 
                src={product.images[activeImageIndex]} 
                alt={`${product.name} - View ${activeImageIndex + 1}`} 
                className={styles.mainImage}
              />
            </div>
            
            {/* Gallery Thumbnails (Only show if multiple images exist) */}
            {product.images.length > 1 && (
              <div className={styles.thumbnailsGrid}>
                {product.images.map((img, index) => (
                  <button
                    key={img}
                    type="button"
                    className={`${styles.thumbnailBtn} ${activeImageIndex === index ? styles.activeThumbnail : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className={styles.thumbnailImage}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Metadata */}
          <div className={styles.info}>
            <span className={styles.categoryTag}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>{formattedPrice}</p>
            
            <p className={styles.description}>{product.description}</p>

            {/* Specifications Table */}
            <div className={styles.specsContainer}>
              <h3 className={styles.specsHeading}>Specifications</h3>
              <table className={styles.specsTable}>
                <tbody>
                  <tr>
                    <th>Dimensions</th>
                    <td>{product.dimensions}</td>
                  </tr>
                  <tr>
                    <th>Material</th>
                    <td>{product.material}</td>
                  </tr>
                  <tr>
                    <th>Color</th>
                    <td>{product.color}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action CTAs */}
            <div className={styles.actions}>
              <Link to={contactLink} className={styles.quoteLink}>
                <Button variant="primary" className={styles.quoteBtn}>
                  Request a Quote
                </Button>
              </Link>
              
              <Button 
                variant="secondary" 
                className={`${styles.favoriteBtn} ${favorited ? styles.favoritedBtn : ''}`}
                onClick={() => toggleFavorite(product.id)}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className={styles.heartIcon}
                  fill={favorited ? "var(--color-red)" : "none"}
                  stroke={favorited ? "var(--color-red)" : "currentColor"}
                  strokeWidth="2"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {favorited ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
