import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <span className={styles.tagline}>Handcrafted Comfort</span>
        <h1 className={styles.title}>
          Bring Comfort & Elegance into Your Home
        </h1>
        <p className={styles.subtitle}>
          Discover our curated collection of affordable, premium-quality wooden furniture. Crafted locally, designed for everyday living.
        </p>
        <div className={styles.actions}>
          <Link to="/catalog">
            <Button variant="primary">Explore Catalog</Button>
          </Link>
          <Link to="/contact">
            <Button variant="light">Visit Showroom</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
