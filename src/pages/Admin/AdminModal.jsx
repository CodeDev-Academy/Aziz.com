import React, { useState, useEffect } from 'react';
import styles from './AdminModal.module.css';

export function AdminModal({ isOpen, onClose, title, type, initialData, onSubmit, isSaving }) {
  const [formData, setFormData] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    if (initialData) {
      if (type === 'product' && Array.isArray(initialData.images)) {
        const firstImg = initialData.images[0] || '';
        setFormData({
          ...initialData,
          images: initialData.images.join('\n')
        });
        setPreviewUrl(firstImg);
      } else {
        setFormData(initialData);
        setPreviewUrl(initialData.image || initialData.image_url || '');
      }
    } else {
      if (type === 'product') {
        const defaultImg = '/images/products/oslo-sofa.png';
        setFormData({
          name: '',
          price: '',
          category: 'Living Room',
          material: 'Oak Wood',
          color: 'Natural Oak',
          images: defaultImg,
          description: '',
          dimensions: ''
        });
        setPreviewUrl(defaultImg);
      } else if (type === 'blog') {
        const defaultImg = '/images/blog/wood-care.png';
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          image: defaultImg,
          author: 'Admin User',
          category: 'Tips'
        });
        setPreviewUrl(defaultImg);
      } else if (type === 'project') {
        const defaultImg = '/images/gallery/living-1.png';
        setFormData({
          title: '',
          category: 'Living Room',
          image: defaultImg,
          description: '',
          location: 'Lekki, Lagos',
          year: new Date().getFullYear().toString(),
          materials: 'Solid Oak Wood'
        });
        setPreviewUrl(defaultImg);
      }
    }
  }, [initialData, type, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'image') {
      setPreviewUrl(value);
      setImageError(false);
    } else if (name === 'images') {
      const firstLine = value.split('\n')[0]?.trim() || '';
      setPreviewUrl(firstLine);
      setImageError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedData = { ...formData };
    
    if (type === 'product') {
      if (typeof submittedData.images === 'string') {
        submittedData.images = submittedData.images
          .split('\n')
          .map((img) => img.trim())
          .filter((img) => img.length > 0);
      }
      submittedData.price = Number(submittedData.price) || 0;
    }
    
    onSubmit(submittedData);
  };

  const getResolvedPreview = (url) => {
    if (!url) return '';
    if (url.startsWith('/')) {
      return `${window.location.protocol}//${window.location.hostname}:5173${url}`;
    }
    return url;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {type === 'product' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Oslo 3-Seater Sofa"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="price">Price (₦) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 450000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category || 'Living Room'}
                    onChange={handleChange}
                    required
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Office">Office</option>
                    <option value="Dining">Dining</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="material">Material *</label>
                  <select
                    id="material"
                    name="material"
                    value={formData.material || 'Oak Wood'}
                    onChange={handleChange}
                    required
                  >
                    <option value="Oak Wood">Oak Wood</option>
                    <option value="Walnut Wood">Walnut Wood</option>
                    <option value="Beech Wood">Beech Wood</option>
                    <option value="Mahogany">Mahogany</option>
                    <option value="Teak Wood">Teak Wood</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="color">Color *</label>
                  <select
                    id="color"
                    name="color"
                    value={formData.color || 'Natural Oak'}
                    onChange={handleChange}
                    required
                  >
                    <option value="Natural Oak">Natural Oak</option>
                    <option value="Walnut Brown">Walnut Brown</option>
                    <option value="Espresso Brown">Espresso Brown</option>
                    <option value="Beige Cream">Beige Cream</option>
                    <option value="Matte Black">Matte Black</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dimensions">Dimensions *</label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions || ''}
                  onChange={handleChange}
                  placeholder="e.g. 210 x 90 x 80 cm"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="images">Image URLs (one per line) *</label>
                <textarea
                  id="images"
                  name="images"
                  rows="3"
                  value={formData.images || ''}
                  onChange={handleChange}
                  placeholder="/images/products/oslo-sofa.png"
                  required
                />
                <span className={styles.fieldHint}>Paste image URLs or local asset paths (e.g. /images/products/...)</span>
              </div>

              {/* Live Image Preview */}
              {previewUrl && (
                <div className={styles.previewWrap}>
                  <span className={styles.previewLabel}>Live Image Preview</span>
                  {!imageError ? (
                    <img
                      src={getResolvedPreview(previewUrl)}
                      alt="Preview"
                      className={styles.previewImg}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className={styles.previewError}>⚠️ Unable to load image preview from URL</div>
                  )}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  placeholder="Describe craftsmanship, features, and seating comfort..."
                />
              </div>
            </>
          )}

          {type === 'blog' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="title">Post Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 5 Tips to Care for Your Wooden Furniture"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="author">Author *</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category">Category *</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    placeholder="e.g. Tips, Trends, Design Guide"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Featured Image URL *</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  placeholder="/images/blog/wood-care.png"
                  required
                />
                <span className={styles.fieldHint}>Paste relative asset path or full HTTPS image link</span>
              </div>

              {/* Live Image Preview */}
              {previewUrl && (
                <div className={styles.previewWrap}>
                  <span className={styles.previewLabel}>Live Image Preview</span>
                  {!imageError ? (
                    <img
                      src={getResolvedPreview(previewUrl)}
                      alt="Preview"
                      className={styles.previewImg}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className={styles.previewError}>⚠️ Unable to load image preview from URL</div>
                  )}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="excerpt">Excerpt / Summary *</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="2"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  required
                  placeholder="Short article summary for the blog listing page..."
                />
                <div className={styles.charCount}>{(formData.excerpt || '').length} characters</div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="content">Full Post Content *</label>
                <textarea
                  id="content"
                  name="content"
                  rows="6"
                  value={formData.content || ''}
                  onChange={handleChange}
                  required
                  placeholder="Write full article body..."
                />
              </div>
            </>
          )}

          {type === 'project' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="title">Project Name *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Lekki Penthouse Living Room"
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="category">Category (Room Type) *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category || 'Living Room'}
                    onChange={handleChange}
                    required
                  >
                    <option value="Living Room">Living Room</option>
                    <option value="Bedroom">Bedroom</option>
                    <option value="Office">Office</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="year">Year *</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={formData.year || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleChange}
                    placeholder="e.g. Lekki, Lagos"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="materials">Materials Used *</label>
                  <input
                    type="text"
                    id="materials"
                    name="materials"
                    value={formData.materials || ''}
                    onChange={handleChange}
                    placeholder="e.g. Solid Oak Wood, Leather"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="image">Project Image URL *</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  placeholder="/images/gallery/living-1.png"
                  required
                />
              </div>

              {/* Live Image Preview */}
              {previewUrl && (
                <div className={styles.previewWrap}>
                  <span className={styles.previewLabel}>Live Image Preview</span>
                  {!imageError ? (
                    <img
                      src={getResolvedPreview(previewUrl)}
                      alt="Preview"
                      className={styles.previewImg}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className={styles.previewError}>⚠️ Unable to load image preview from URL</div>
                  )}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  placeholder="Describe project scope and materials used..."
                />
              </div>
            </>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className={styles.spinner}></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
