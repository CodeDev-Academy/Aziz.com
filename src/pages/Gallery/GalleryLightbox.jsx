import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './GalleryLightbox.module.css';

export function GalleryLightbox({ project, onClose }) {
  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  const contactLink = `/contact?project=${encodeURIComponent(project.title)}`;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.layout}>
          {/* Left side: Image */}
          <div className={styles.imageColumn}>
            <img src={project.image} alt={project.title} className={styles.projectImage} />
          </div>

          {/* Right side: Details */}
          <div className={styles.detailsColumn}>
            <span className={styles.category}>{project.category}</span>
            <h2 className={styles.title}>{project.title}</h2>
            
            <p className={styles.description}>{project.description}</p>

            <table className={styles.metaTable}>
              <tbody>
                <tr>
                  <th>Location</th>
                  <td>{project.location}</td>
                </tr>
                <tr>
                  <th>Year</th>
                  <td>{project.year}</td>
                </tr>
                <tr>
                  <th>Materials Used</th>
                  <td>{project.materials}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.actions}>
              <Link to={contactLink} className={styles.ctaLink}>
                <Button variant="primary" className={styles.ctaBtn}>
                  Request Similar Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
