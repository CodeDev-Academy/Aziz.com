import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './HowItWorks.module.css';

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Consult',
    description: 'Share your ideas, space dimensions, and style preferences with us — in person or online.'
  },
  {
    id: 2,
    number: '02',
    title: 'Design',
    description: 'Our designers create detailed sketches and material options tailored to your brief.'
  },
  {
    id: 3,
    number: '03',
    title: 'Build',
    description: 'Skilled artisans handcraft your piece from sustainably sourced hardwood in our Lagos workshop.'
  },
  {
    id: 4,
    number: '04',
    title: 'Deliver',
    description: 'We deliver your finished furniture to your doorstep and set it up exactly where you need it.'
  }
];

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          title="From Idea to Your Living Room"
          subtitle="How It Works"
        />

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {index < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
