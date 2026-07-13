import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.text}>
        The page you are looking for does not exist, has been removed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}
