import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shippingAddress: '',
    billingAddress: '',
    preferredStyle: 'Scandinavian Minimalist'
  });
  
  const [notification, setNotification] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        shippingAddress: user.shippingAddress || '',
        billingAddress: user.billingAddress || '',
        preferredStyle: user.preferredStyle || 'Scandinavian Minimalist'
      });
    }
  }, [user]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      
      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      updateUser({
        name: formData.name,
        phone: formData.phone,
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.billingAddress
      });
      
      showNotification('success', 'Profile details updated successfully.');
    } catch (err) {
      showNotification('error', 'Failed to update profile details.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      updateUser({
        preferredStyle: formData.preferredStyle
      });
      
      showNotification('success', 'Design preferences updated successfully.');
    } catch (err) {
      showNotification('error', 'Failed to update design preferences.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out from CozyCraft?')) {
      logout();
      navigate('/');
    }
  };

  if (!user) return null;

  return (
    <div className={styles.profilePage}>
      <div className="container">
        
        {/* Toast Notification */}
        {notification && (
          <div className={`${styles.notification} ${notification.type === 'success' ? styles.successNotification : styles.errorNotification}`}>
            {notification.message}
          </div>
        )}

        <div className={styles.layout}>
          {/* Left Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{user.name}</h2>
                <span className={styles.userRole}>Customer Account</span>
              </div>
            </div>

            <nav>
              <ul className={styles.menuList}>
                <li>
                  <button 
                    type="button" 
                    className={`${styles.menuItemBtn} ${activeTab === 'personal' ? styles.activeMenuItemBtn : ''}`}
                    onClick={() => setActiveTab('personal')}
                  >
                    <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Details
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    className={`${styles.menuItemBtn} ${activeTab === 'preferences' ? styles.activeMenuItemBtn : ''}`}
                    onClick={() => setActiveTab('preferences')}
                  >
                    <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Style Preferences
                  </button>
                </li>
              </ul>
            </nav>

            <button 
              type="button" 
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout Account
            </button>
          </aside>

          {/* Right Main Content Pane */}
          <main className={styles.contentArea}>
            
            {/* PERSONAL DETAILS TAB */}
            {activeTab === 'personal' && (
              <div>
                <h1 className={styles.sectionTitle}>Personal Details</h1>
                <p className={styles.sectionSubtitle}>Manage your name, contact phone, and showroom delivery addresses.</p>

                <form onSubmit={handleSaveProfile} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address (Read-only)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className={styles.disabledInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +234 80 1234 5678"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="shippingAddress">Default Shipping Address</label>
                    <textarea
                      id="shippingAddress"
                      name="shippingAddress"
                      rows="3"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      placeholder="Enter street, city, state and country details"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="billingAddress">Default Billing Address</label>
                    <textarea
                      id="billingAddress"
                      name="billingAddress"
                      rows="3"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      placeholder="Same as shipping address, or custom billing details"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving Changes...' : 'Save Profile Details'}
                  </button>
                </form>
              </div>
            )}

            {/* STYLE PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div>
                <h1 className={styles.sectionTitle}>Showroom Preferences</h1>
                <p className={styles.sectionSubtitle}>Configure your design theme preferences to get custom curated catalogs.</p>

                <form onSubmit={handleSavePreferences} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="preferredStyle">Preferred Design Theme</label>
                    <select
                      id="preferredStyle"
                      name="preferredStyle"
                      value={formData.preferredStyle}
                      onChange={handleChange}
                    >
                      <option value="Scandinavian Minimalist">Scandinavian Minimalist (Clean lines, light woods, functional)</option>
                      <option value="Mid-Century Modern">Mid-Century Modern (Tapered legs, organic curves, bold tones)</option>
                      <option value="Industrial Chic">Industrial Chic (Raw metals, exposed brick, dark textured wood)</option>
                      <option value="Contemporary Luxury">Contemporary Luxury (Plush fabrics, gold/brass accents, sleek finishes)</option>
                    </select>
                  </div>

                  <div className={styles.preferenceCard}>
                    <h3>Why choose a style?</h3>
                    <p>Selecting your style preference allows our consultants to prepare matching catalogs for your showroom tours and speeds up quotes for custom fabrications.</p>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving Preferences...' : 'Save Theme Preferences'}
                  </button>
                </form>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
