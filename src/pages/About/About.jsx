import React from 'react';
import { AboutHero } from './AboutHero';
import { BrandStory } from './BrandStory';
import { StatsCounter } from './StatsCounter';
import { OurValues } from './OurValues';
import { AboutCTA } from './AboutCTA';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.about}>
      <AboutHero />
      <BrandStory />
      <StatsCounter />
      <OurValues />
      <AboutCTA />
    </div>
  );
}
