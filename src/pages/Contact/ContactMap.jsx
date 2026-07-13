import React from 'react';
import styles from './ContactMap.module.css';

export default function ContactMap() {
  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.title}>Locate Us</h2>
      <p className={styles.subtitle}>Find our premium showroom in the heart of Abuja.</p>
      
      <div className={styles.iframeWrapper}>
        <iframe 
          title="CozyCraft Abuja Showroom Map"
          src="https://maps.google.com/maps?q=Abuja,%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
