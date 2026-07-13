import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthForm } from '../../hooks/useAuthForm';
import styles from './Auth.module.css';

export default function SignUp() {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useAuthForm({ name: '', email: '', password: '', confirmPassword: '' }, 'signup');

  return (
    <div className={styles.authPage}>
      <div className={styles.splitContainer}>
        
        {/* Left Side: Image Panel */}
        <div className={styles.imagePanel}>
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Premium Furniture Setting" 
          />
          <
          div className={styles.imageOverlay}>
            <div className={styles.quoteContainer}>
              <div className={styles.quoteText}>
                "Design is not just what it looks like and feels like. Design is how it works."
              </div>
              <div className={styles.quoteAuthor}>— CozyCraft Philosophy</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel */}
        <div className={styles.formPanel}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <Link to="/" className={styles.logo}>
                <span className={styles.logoCraft}>Cozy</span>
                <span className={styles.logoText}>Craft</span>
              </Link>
              <h1 className={styles.title}>Create an Account</h1>
              <p className={styles.subtitle}>Join CozyCraft for exclusive access and offers.</p>
            </div>

            <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
              
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
                />
                {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ''}`}
                />
                {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
              </div>

              {errors.general && <span className={styles.errorMessage}>{errors.general}</span>}

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? <div className={styles.spinner}></div> : 'Create Account'}
              </button>

              <div className={styles.divider}>
                <span>or register with</span>
              </div>

              <div className={styles.socialBtns}>
                <button type="button" className={styles.socialBtn}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className={styles.socialBtn}>
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              <div className={styles.footerText}>
                Already have an account? 
                <Link to="/signin" className={styles.footerLink}>Sign In</Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
