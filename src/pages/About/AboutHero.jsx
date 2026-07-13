import React from 'react';
import styles from './AboutHero.module.css';

export function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <span className={styles.tagline}>Our Story</span>
        <h1 className={styles.title}>Crafting Comfort, One Piece at a Time</h1>
        <p className={styles.subtitle}>
          From a small Kaduna workshop to a trusted furniture brand — discover the heart and hands behind every CozyCraft creation.
        </p>
      </div>
    </section>
  );
}
