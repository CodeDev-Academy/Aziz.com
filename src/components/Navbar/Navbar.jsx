import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../../features/favorites/useFavorites';
import { useAuth } from '../../features/auth/useAuth';
import styles from './Navbar.module.css';

export function Navbar() { 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const location = useLocation();

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Disable page scrolling when mobile menu overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/catalog', label: 'Catalog' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={styles.header}>
      <div className={`${styles.navInner} container`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoCraft}>Cozy</span>
          <span className={styles.logoText}>Craft</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Action Icons */}
        <div className={styles.actions}>
          {/* Wishlist/Favorites */}
          <Link to="/catalog" className={styles.iconLink} aria-label="Favorites">
            <svg 
              viewBox="0 0 24 24" 
              className={styles.icon} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>

          {/* User Profile / Admin */}
          <Link 
            to={user ? (user.role === 'admin' ? '/admin' : '/profile') : '/signin'} 
            className={styles.iconLink} 
            aria-label={user ? "Profile" : "Sign In"}
          >
            <svg 
              viewBox="0 0 24 24" 
              className={styles.icon} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            {user && <span className={styles.dot}></span>}
          </Link>

          {/* Mobile Hamburger Button */}
          <button 
            type="button" 
            className={styles.hamburger} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen1 : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen2 : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen3 : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.overlayOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    isActive ? `${styles.mobileNavLink} ${styles.mobileActiveLink}` : styles.mobileNavLink
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className={styles.mobileAuthLink}>
              <NavLink 
                to={user ? (user.role === 'admin' ? '/admin' : '/profile') : '/signin'} 
                className={styles.mobileNavLink}
              >
                {user ? `Account (${user.name})` : 'Sign In'}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
