import React from 'react';
import styles from './GalleryHero.module.css';

export function GalleryHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <span className={styles.tagline}>Completed Projects</span>
        <h1 className={styles.title}>Project Gallery</h1>
        <p className={styles.subtitle}>
          Explore our portfolio of bespoke furniture installations and custom interior styling projects across Nigeria.
        </p>
      </div>
    </section>
  );
}
