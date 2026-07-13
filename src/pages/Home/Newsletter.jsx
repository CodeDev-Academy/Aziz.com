import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './Newsletter.module.css';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Simulate successful newsletter subscription
    setError('');
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.newsletterInner} container`}>
        <div className={styles.content}>
          <h2 className={styles.title}>Join Our Design Newsletter</h2>
          <p className={styles.subtitle}>
            Subscribe to receive expert home styling tips, first look at new furniture collections, and exclusive showroom events.
          </p>
        </div>

        <div className={styles.formContainer}>
          {submitted ? (
            <div className={styles.successMessage}>
              <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className={styles.successTitle}>Thank you for subscribing!</p>
                <p className={styles.successText}>You've been successfully added to our mailing list.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className={styles.input}
                  aria-label="Email Address"
                />
                {error && <span className={styles.errorText}>{error}</span>}
              </div>
              <Button type="submit" variant="accent" className={styles.submitBtn}>
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
