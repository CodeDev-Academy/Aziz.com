import React from 'react';
import styles from './StatsCounter.module.css';

export function StatsCounter() {
  const stats = [
    { id: 1, value: '8+', label: 'Years in Business' },
    { id: 2, value: '500+', label: 'Projects Delivered' },
    { id: 3, value: '15', label: 'Skilled Artisans' },
    { id: 4, value: '98%', label: 'Happy Clients' }
  ];

  return (
    <section className={styles.section}>
      <div className={`${styles.grid} container`}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.item}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
