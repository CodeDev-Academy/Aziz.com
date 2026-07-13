import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogListing } from '../../hooks/useBlogListing';
import styles from './BlogListing.module.css';

export default function BlogListing() {
  const {
    searchQuery,
    selectedCategory,
    handleSearchChange,
    handleCategoryClick,
    filteredPosts,
    categories,
    loading
  } = useBlogListing();

  return (
    <div className={styles.blogContainer}>
      {/* Blog Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>CozyCraft Journal</h1>
          <p className={styles.heroSubtitle}>
            Ideas, inspiration, and expert tips for crafting your dream home and caring for premium wooden furniture.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container">
        {/* Search & Category Filter Section */}
        <div className={styles.controlsSection}>
          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <svg 
              className={styles.searchIcon} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
              id="blog-search-input"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className={styles.filterWrapper}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`${styles.filterBtn} ${selectedCategory === category ? styles.activeFilterBtn : ''}`}
                id={`filter-btn-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
            Loading articles...
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className={styles.blogGrid}>
            {filteredPosts.map((post) => (
              <article key={post.id} className={styles.blogCard}>
                <div className={styles.cardImageWrapper}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className={styles.cardImage} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/blog/wood-care.png';
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardCategory}>{post.category}</span>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{post.author}</span>
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</time>
                    </div>
                    <Link to={`/blog/${post.id}`} className={styles.readMoreLink} id={`read-more-${post.id}`}>
                      Read Article &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className={styles.noResults}>
            <h2 className={styles.noResultsTitle}>No Articles Found</h2>
            <p className={styles.noResultsText}>
              We couldn't find any articles matching your search term. Try checking your spelling or adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
