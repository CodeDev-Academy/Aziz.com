import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../features/favorites/useFavorites';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  // Format Nigerian Naira
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className={styles.image} 
          loading="lazy"
        />
        <button 
          type="button"
          className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
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
        </button>
        <span className={styles.categoryTag}>{product.category}</span>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link to={`/catalog/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.price}>{formattedPrice}</p>
        <div className={styles.actions}>
          <Link to={`/catalog/${product.id}`} className={styles.viewBtn}>
            View Details
            <svg 
              className={styles.arrowIcon} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
