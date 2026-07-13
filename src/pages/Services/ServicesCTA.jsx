import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './ServicesCTA.module.css';

export function ServicesCTA() {
  return (
    <section className={styles.section}>
      <div className={`${styles.content} container`}>
        <h2 className={styles.title}>Ready to Get Started?</h2>
        <p className={styles.text}>
          Whether you need a custom piece, a full room redesign, or furniture restoration — we are here to help. Reach out and let us bring your idea to life.
        </p>
        <Link to="/contact">
          <Button variant="primary">Contact Us Today</Button>
        </Link>
      </div>
    </section>
  );
}
