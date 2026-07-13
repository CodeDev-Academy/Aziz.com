import React from 'react';
import styles from './GalleryFilters.module.css';

export function GalleryFilters({ activeCategory, setActiveCategory, categories }) {
  return (
    <div className={styles.filterContainer}>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
