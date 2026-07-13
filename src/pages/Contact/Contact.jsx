import React from 'react';
import { useContactForm } from '../../hooks/useContactForm';
import ContactFAQ from './ContactFAQ';
import ContactMap from './ContactMap';
import styles from './Contact.module.css';

export default function Contact() {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    handleReset
  } = useContactForm();

  return (
    <div className={styles.contactPage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.tagline}>Get In Touch</span>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have questions about our pieces or want to discuss a custom build? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container">
        <div className={styles.grid}>
          
          {/* Left Column: Showroom Information */}
          <aside className={styles.sidebar}>
            {/* Contact Info Card */}
            <div className={styles.infoCard}>
              <div className={styles.iconContainer}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Call or Email</h3>
                <p className={styles.cardText}>
                  Tel: +234 812 345 6789<br />
                  Email: info@cozycraft.com
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className={styles.infoCard}>
              <div className={styles.iconContainer}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Visit Showroom</h3>
                <p className={styles.cardText}>
                  123 Showroom Way,<br />
                  Victoria Island, Lagos,<br />
                  Nigeria
                </p>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className={styles.infoCard}>
              <div className={styles.iconContainer}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div style={{ width: '100%' }}>
                <h3 className={styles.cardTitle}>Showroom Hours</h3>
                <div className={styles.hoursList}>
                  <div className={styles.hoursRow}>
                    <span className={styles.hoursDay}>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className={styles.hoursRow}>
                    <span className={styles.hoursDay}>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className={styles.hoursRow}>
                    <span className={styles.hoursDay}>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Contact Form */}
          <main className={styles.formCard}>
            {isSuccess ? (
              /* Success Screen */
              <div className={styles.successCard}>
                <div className={styles.successIconContainer}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className={styles.successTitle}>Message Sent!</h2>
                <p className={styles.successText}>
                  Thank you for reaching out. We have received your message and our team will get back to you within 24 hours.
                </p>
                <button 
                  onClick={handleReset} 
                  className={styles.successBtn}
                  id="success-send-another-btn"
                  type="button"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Contact Form */
              <div>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSubtitle}>Fill out the form below and we will contact you shortly.</p>
                
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {/* Name and Email Row */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="name-input" className={styles.label}>Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        id="name-input"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email-input" className={styles.label}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        id="email-input"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Phone and Inquiry Type Row */}
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="phone-input" className={styles.label}>Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone-input"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+234..."
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="inquiry-select" className={styles.label}>What can we help with? *</label>
                      <select
                        name="inquiryType"
                        id="inquiry-select"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="quote">Request Custom Quote</option>
                        <option value="design">Interior Design Consultation</option>
                        <option value="restoration">Furniture Restoration</option>
                      </select>
                    </div>
                  </div>

                  {/* DYNAMIC CUSTOM QUOTE FIELDS */}
                  {formData.inquiryType === 'quote' && (
                    <div className={styles.dynamicSection}>
                      <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                          <label htmlFor="furniture-select" className={styles.label}>Furniture Type *</label>
                          <select
                            name="furnitureType"
                            id="furniture-select"
                            value={formData.furnitureType}
                            onChange={handleChange}
                            className={`${styles.select} ${errors.furnitureType ? styles.errorInput : ''}`}
                          >
                            <option value="">-- Select Type --</option>
                            <option value="dining">Dining Table / Chairs</option>
                            <option value="bed">Bed Frame / Headboard</option>
                            <option value="bookshelf">Bookshelf / Cabinet</option>
                            <option value="desk">Office Desk</option>
                            <option value="sofa">Sofa / Armchair</option>
                            <option value="other">Other / Custom</option>
                          </select>
                          {errors.furnitureType && <span className={styles.errorMessage}>{errors.furnitureType}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                          <label htmlFor="wood-select" className={styles.label}>Preferred Wood Type *</label>
                          <select
                            name="woodType"
                            id="wood-select"
                            value={formData.woodType}
                            onChange={handleChange}
                            className={`${styles.select} ${errors.woodType ? styles.errorInput : ''}`}
                          >
                            <option value="">-- Select Wood --</option>
                            <option value="mahogany">Mahogany (Rich, dark reddish-brown)</option>
                            <option value="walnut">Walnut (Warm, elegant dark brown)</option>
                            <option value="oak">Oak (Strong, prominent light grain)</option>
                            <option value="teak">Teak (Premium, weather-resistant)</option>
                            <option value="iroko">Iroko (Local African hardwood)</option>
                            <option value="not-sure">I'm not sure / Open to advice</option>
                          </select>
                          {errors.woodType && <span className={styles.errorMessage}>{errors.woodType}</span>}
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label htmlFor="dimensions-input" className={styles.label}>Approximate Dimensions or Size Requirements</label>
                        <input
                          type="text"
                          name="dimensions"
                          id="dimensions-input"
                          value={formData.dimensions}
                          onChange={handleChange}
                          className={styles.input}
                          placeholder="e.g. 200cm x 100cm, or 6-seater size"
                        />
                      </div>
                    </div>
                  )}

                  {/* Message Field */}
                  <div className={styles.inputGroup}>
                    <label htmlFor="message-textarea" className={styles.label}>Message / Details *</label>
                    <textarea
                      name="message"
                      id="message-textarea"
                      value={formData.message}
                      onChange={handleChange}
                      className={`${styles.textarea} ${errors.message ? styles.errorInput : ''}`}
                      placeholder={
                        formData.inquiryType === 'quote'
                          ? "Please describe your vision (e.g. style preferences, special carvings, custom hardware, or budget details)..."
                          : "Describe your question or request..."
                      }
                    />
                    {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className={styles.spinner}></div>
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            )}
          </main>

        </div>

        {/* Phase 2: Map & FAQ Section */}
        <section className={styles.secondaryGrid}>
          <ContactFAQ />
          <ContactMap />
        </section>
      </div>
    </div>
  );
}
