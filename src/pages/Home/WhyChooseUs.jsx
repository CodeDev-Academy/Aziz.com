import React from 'react';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import styles from './WhyChooseUs.module.css';

export function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: 'Premium Craftsmanship',
      description: 'Each piece is hand-crafted by skilled local artisans using solid, durable hardwood selected to stand the test of time.',
      // Hammer/Craft Icon
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Transparent Pricing',
      description: 'We believe premium furniture shouldn\'t carry luxury markups. We keep pricing fair, clear, and affordable for everyday homes.',
      // PriceTag/Shield Icon
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.59 0l4.318-4.317a1.125 1.125 0 000-1.59L9.568 3.659A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Direct Showroom Delivery',
      description: 'Our specialized transport team delivers and places each furniture piece directly inside your home, ensuring safe handling.',
      // Truck Icon
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.29-4.874a2.25 2.25 0 00-2.224-2.126h-2.25M11.25 18.75V11.25M8.25 5.25h4.875c.621 0 1.125.504 1.125 1.125v3.02m-7.5 10.375H18.75m-15-10.375h14.25M3.375 11.25v-.375a3.375 3.375 0 013.375-3.375h1.5" />
        </svg>
      )
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading 
          title="Why Furnish With CozyCraft" 
          subtitle="Our Brand Values" 
        />
        
        <div className={styles.grid}>
          {features.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconContainer}>
                {item.icon}
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
