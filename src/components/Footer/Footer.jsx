import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerGrid} container`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoCraft}>Cozy</span>
            <span className={styles.logoText}>Craft</span>
          </Link>
          <p className={styles.description}>
            Exquisite hand-crafted wooden furniture and interior designs built to stand the test of time. Beautiful, practical, and everyday accessible.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              Facebook
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Pinterest">
              Pinterest
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className={styles.linksCol}>
          <h3 className={styles.heading}>Explore</h3>
          <ul className={styles.list}>
            <li><Link to="/catalog">Furniture Catalog</Link></li>
            <li><Link to="/about">Our Brand Story</Link></li>
            <li><Link to="/services">Interior Services</Link></li>
            <li><Link to="/gallery">Completed Projects</Link></li>
            <li><Link to="/blog">Design Blog</Link></li>
          </ul>
        </div>

        {/* Showroom Info Column */}
        <div className={styles.infoCol}>
          <h3 className={styles.heading}>Visit Showroom</h3>
          <p className={styles.address}>
            123 Showroom Way,<br />
            Victoria Island, Lagos,<br />
            Nigeria
          </p>
          <p className={styles.contact}>
            <strong>Tel:</strong> +234 812 345 6789<br />
            <strong>Email:</strong> info@cozycraft.com
          </p>
        </div>

        {/* Business Hours Column */}
        <div className={styles.hoursCol}>
          <h3 className={styles.heading}>Showroom Hours</h3>
          <ul className={styles.hoursList}>
            <li>
              <span className={styles.day}>Monday - Friday:</span>
              <span className={styles.time}>9:00 AM - 6:00 PM</span>
            </li>
            <li>
              <span className={styles.day}>Saturday:</span>
              <span className={styles.time}>10:00 AM - 4:00 PM</span>
            </li>
            <li>
              <span className={styles.day}>Sunday:</span>
              <span className={styles.time}>Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={`${styles.copyrightContainer} container`}>
          <p>&copy; {currentYear} CozyCraft Furniture. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link to="/signin">Admin Login</Link>
            <span className={styles.separator}>|</span>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
