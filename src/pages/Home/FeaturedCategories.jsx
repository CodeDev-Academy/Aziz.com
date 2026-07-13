import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './FeaturedCategories.module.css';

export function FeaturedCategories() {
  const categories = [
    {
      id: 'living',
      name: 'Living Room',
      image: '/images/cat-living.png',
      count: '15+ Items',
      path: '/catalog?category=Living Room'
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      image: '/images/cat-bedroom.png',
      count: '10+ Items',
      path: '/catalog?category=Bedroom'
    },
    {
      id: 'office',
      name: 'Home Office',
      image: '/images/cat-office.png',
      count: '8+ Items',
      path: '/catalog?category=Office'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading 
          title="Shop by Room" 
          subtitle="Featured Categories" 
        />
        
        <div className={styles.grid}>
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className={styles.image} 
                  loading="lazy"
                />
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{cat.name}</h3>
                  <span className={styles.count}>{cat.count}</span>
                  <span className={styles.exploreLink}>
                    Explore Category &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
