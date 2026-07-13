import React, { useState } from 'react';
import styles from './ContactFAQ.module.css';

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we deliver within Nigeria and select neighboring regions. However, for large custom orders, we can coordinate with international freight forwarders. Please mention this in your quote request."
  },
  {
    question: "How long do custom furniture orders take?",
    answer: "Depending on the complexity and wood availability, custom pieces typically take between 4 to 8 weeks from design approval to final delivery. We provide a firm timeline with your quote."
  },
  {
    question: "Can I customize the wood finish on a catalog piece?",
    answer: "Absolutely! Most of our catalog pieces can be customized with different wood stains, hardware, and upholstery options. Select 'Request Custom Quote' on the contact form to tell us what you need."
  },
  {
    question: "What is your warranty policy?",
    answer: "We stand behind the craftsmanship of our furniture. All structural wood elements come with a 5-year warranty against manufacturing defects. Normal wear and tear on finishes or fabrics is excluded."
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <p className={styles.subtitle}>Quick answers to our most common inquiries.</p>
      
      <div className={styles.accordion}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
            >
              <button 
                className={styles.questionBtn} 
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                type="button"
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.icon}>
                  <svg 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={styles.answerContainer}
                style={{ maxHeight: isOpen ? '200px' : '0' }}
              >
                <div className={styles.answerContent}>
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
