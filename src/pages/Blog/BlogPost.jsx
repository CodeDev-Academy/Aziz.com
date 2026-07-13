import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogPost } from '../../hooks/useBlogPost';
import styles from './BlogPost.module.css';
import cardStyles from './BlogListing.module.css'; // Reuse card styles for related posts

export default function BlogPost() {
  const { post, relatedPosts, handleBackClick, loading } = useBlogPost();

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <p>Loading article...</p>
      </div>
    );
  }

  // If post is not found, render a clean error page
  if (!post) {
    return (
      <div className="container">
        <div className={styles.errorContainer}>
          <h1 className={styles.errorTitle}>Article Not Found</h1>
          <p className={styles.errorText}>
            The blog post you are looking for does not exist or has been moved.
          </p>
          <Link to="/blog" className={styles.errorBtn} id="error-back-btn">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to render paragraphs and style numbered sections beautifully
  const renderParagraphs = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, index) => {
      // Matches "1. Title: Description"
      const stepMatch = paragraph.match(/^(\d+)\.\s*([^:]+):\s*(.*)/s);
      if (stepMatch) {
        const [, number, title, desc] = stepMatch;
        return (
          <div key={index} className={styles.sectionPoint}>
            <h3 className={styles.pointTitle}>{number}. {title}</h3>
            <p className={styles.pointText}>{desc}</p>
          </div>
        );
      }
      return (
        <p key={index} className={styles.paragraph}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className={styles.articleContainer}>
      <div className="container">
        {/* Back Button */}
        <button 
          onClick={handleBackClick} 
          className={styles.backButton}
          id="post-back-btn"
          type="button"
        >
          &larr; Back to Blog
        </button>

        <article className={styles.article}>
          {/* Article Header */}
          <header className={styles.header}>
            <span className={styles.category}>{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span className={styles.author}>By {post.author}</span>
              <span className={styles.metaDivider}></span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className={styles.metaDivider}></span>
              <span>5 min read</span>
            </div>
          </header>

          {/* Hero Featured Image */}
          <div className={styles.imageContainer}>
            <img 
              src={post.image} 
              alt={post.title} 
              className={styles.image} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/blog/wood-care.png';
              }}
            />
          </div>

          {/* Article Body Content */}
          <div className={styles.body}>
            {renderParagraphs(post.content)}
          </div>
        </article>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedContainer}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className={cardStyles.blogCard}>
                  <div className={cardStyles.cardImageWrapper}>
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className={cardStyles.cardImage}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/blog/wood-care.png';
                      }}
                    />
                  </div>
                  <div className={cardStyles.cardContent}>
                    <span className={cardStyles.cardCategory}>{relatedPost.category}</span>
                    <h3 className={cardStyles.cardTitle}>{relatedPost.title}</h3>
                    <p className={cardStyles.cardExcerpt}>{relatedPost.excerpt}</p>
                    <div className={cardStyles.cardFooter}>
                      <span className={cardStyles.authorName}>{relatedPost.author}</span>
                      <Link 
                        to={`/blog/${relatedPost.id}`} 
                        className={cardStyles.readMoreLink}
                        id={`related-read-more-${relatedPost.id}`}
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
