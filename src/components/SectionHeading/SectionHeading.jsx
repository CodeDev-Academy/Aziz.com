import React from 'react';
import styles from './SectionHeading.module.css';

export function SectionHeading({ title, subtitle, align = 'center' }) {
  const containerClass = `${styles.container} ${styles[align]}`;

  return (
    <div className={containerClass}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider}></div>
    </div>
  );
}
