import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './BrandStory.module.css';

export function BrandStory() {
  const stories = [
    {
      id: 1,
      image: '/images/about-story-1.png',
      title: 'Where It All Started',
      text: 'CozyCraft began in 2018 as a small woodworking workshop in Lagos, driven by a simple belief: every Nigerian home deserves beautiful, well-made furniture — without the luxury price tag. Our founder, Bn Mustapha, started with a single workbench, a handful of hand tools, and a passion for honest craftsmanship that puts quality and affordability on equal footing.'
    },
    {
      id: 2,
      image: '/images/about-story-2.png',
      title: 'Built to Last, Designed to Inspire',
      text: 'Today, CozyCraft operates from a full-scale showroom and production studio in Victoria Island, Lagos. Every piece in our collection is designed in-house and built by a team of skilled local artisans using sustainably sourced hardwood. From concept sketches to the final polish, we control every step — ensuring the furniture you bring home is something we are proud to stand behind.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          title="The CozyCraft Journey"
          subtitle="Brand Story"
        />

        <div className={styles.storiesContainer}>
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`${styles.storyBlock} ${index % 2 !== 0 ? styles.reversed : ''}`}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={story.image}
                  alt={story.title}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div className={styles.textContent}>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyText}>{story.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
