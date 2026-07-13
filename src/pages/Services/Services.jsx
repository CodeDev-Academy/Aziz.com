import React from 'react';
import { ServicesHero } from './ServicesHero.jsx';
import { ServiceCards } from './ServiceCards.jsx';
import { HowItWorks } from './HowItWorks';
import { ServicesCTA } from './ServicesCTA.jsx';
import styles from './Services.module.css';

export default function Services() {
  return (
    <div className={styles.servicesPage}>
      <ServicesHero />
      <ServiceCards />
      <HowItWorks />
      <ServicesCTA />
    </div>
  );
}
