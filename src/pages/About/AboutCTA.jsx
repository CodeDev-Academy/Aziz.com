import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './AboutCTA.module.css';

export function AboutCTA() {
  return (
    <section className={styles.section}>
      <div className={`${styles.content} container`}>
        <h2 className={styles.title}>Visit Our Showroom</h2>
        <p className={styles.text}>
          Come experience CozyCraft furniture in person. Touch the wood, feel the comfort, and let our team help you find the perfect pieces for your home.
        </p>
        <div className={styles.actions}>
          <Link to="/contact">
            <Button variant="primary">Get in Touch</Button>
          </Link>
          <Link to="/catalog">
            <Button variant="secondary">Browse Catalog</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
