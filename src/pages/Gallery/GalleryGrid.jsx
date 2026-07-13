import React from 'react';
import styles from './GalleryGrid.module.css';

export function GalleryGrid({ projects, onProjectClick }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.masonry}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            onClick={() => onProjectClick(project)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <div className={styles.info}>
                  <span className={styles.category}>{project.category}</span>
                  <h3 className={styles.title}>{project.title}</h3>
                  <span className={styles.location}>{project.location}</span>
                </div>
                <div className={styles.plusIcon}>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
