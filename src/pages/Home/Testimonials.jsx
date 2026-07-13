import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './Testimonials.module.css';

export function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote: "The Oslo sofa exceeded our expectations! Extremely comfortable, solid wood legs, and the cream upholstery fits perfectly in our living room. Bn and the team were super helpful.",
      name: 'Amara K.',
      location: 'Victoria Island, Lagos',
      stars: 5
    },
    {
      id: 2,
      quote: "We ordered the custom Kyoto desk for my home office. Beautiful walnut finish, smooth drawers, and extremely solid build. Highly recommend their bespoke carpentry services.",
      name: 'Tunde O.',
      location: 'Wuse, Abuja',
      stars: 5
    },
    {
      id: 3,
      quote: "Exceptional quality furniture at very honest prices. Delivery was quick, and they set it up directly in my master bedroom. I absolutely love my Stockholm oak bed!",
      name: 'Chioma N.',
      location: 'GRA, Port Harcourt',
      stars: 5
    }
  ];

  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, i) => (
      <svg 
        key={i} 
        viewBox="0 0 24 24" 
        className={styles.star} 
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading 
          title="What Our Clients Say" 
          subtitle="Testimonials" 
        />
        
        <div className={styles.grid}>
          {reviews.map((rev) => (
            <div key={rev.id} className={styles.card}>
              <div className={styles.starsRow}>
                {renderStars(rev.stars)}
              </div>
              <blockquote className={styles.quote}>
                "{rev.quote}"
              </blockquote>
              <div className={styles.clientInfo}>
                <span className={styles.name}>{rev.name}</span>
                <span className={styles.location}>{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
