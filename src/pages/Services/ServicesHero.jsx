import React from 'react';
import styles from './ServicesHero.module.css';

export function ServicesHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <span className={styles.tagline}>What We Do</span>
        <h1 className={styles.title}>Our Services</h1>
        <p className={styles.subtitle}>
          From custom builds to full interior design — we bring your vision to life with expert craftsmanship and personal attention.
        </p>
      </div>
    </section>
  );
}
