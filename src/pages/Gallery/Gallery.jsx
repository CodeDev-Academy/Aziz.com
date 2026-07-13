import React, { useState, useEffect } from 'react';
import { GalleryHero } from './GalleryHero';
import { GalleryFilters } from './GalleryFilters';
import { GalleryGrid } from './GalleryGrid';
import { GalleryLightbox } from './GalleryLightbox';
import { apiClient } from '../../api/apiClient';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Living Room', 'Bedroom', 'Office'];

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await apiClient.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to load gallery projects.');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className={styles.galleryPage}>
      <GalleryHero />
      
      <div className="container">
        <GalleryFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
        />
        
        {loading && <div style={{ textAlign: 'center', padding: '3rem' }}>Loading gallery...</div>}
        {error && <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-red)' }}>{error}</div>}
        
        {!loading && !error && (
          <GalleryGrid
            projects={filteredProjects}
            onProjectClick={setSelectedProject}
          />
        )}
      </div>

      {selectedProject && (
        <GalleryLightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
