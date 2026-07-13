import React from 'react';
import { Link } from 'react-router-dom';
import { useCatalogFilters } from '../../hooks/useCatalogFilters';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './CatalogListing.module.css';

// Naira formatter — created once, reused across renders
const formatPrice = (value) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

export default function CatalogListing() {
  const {
    products,
    filteredProducts,
    loading,
    error,
    category,
    maxPrice,
    material,
    color,
    filtersOpen,
    categories,
    materials,
    colors,
    maxPriceLimit,
    setMaxPrice,
    setMaterial,
    setColor,
    handleCategoryChange,
    handleResetFilters,
    toggleFilters,
  } = useCatalogFilters();

  return (
    <div className={styles.catalogPage}>
      {/* Page Header / Breadcrumbs */}
      <div className={styles.breadcrumbBg}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.activeBreadcrumb}>Catalog</span>
          </div>
          <h1 className={styles.pageTitle}>Furniture Catalog</h1>
        </div>
      </div>

      <div className="container">
        {/* Controls Bar: Results Count & Filter Toggle */}
        <div className={styles.controlsBar}>
          <p className={styles.resultCount}>
            {!loading && !error && `Showing ${filteredProducts.length} of ${products.length} products`}
          </p>
          <button 
            type="button" 
            className={`${styles.filterToggle} ${filtersOpen ? styles.filterToggleActive : ''}`} 
            onClick={toggleFilters}
            aria-expanded={filtersOpen}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.filterIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {filtersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Collapsible Filter Panel */}
        <div className={`${styles.filtersPanel} ${filtersOpen ? styles.panelOpen : ''}`}>
          <div className={styles.panelHeader}>
            <h3>Filter Options</h3>
            <button 
              type="button" 
              className={styles.resetBtn} 
              onClick={handleResetFilters}
            >
              Reset All
            </button>
          </div>

          <div className={styles.panelGrid}>
            {/* Filter Section: Category */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Category</h4>
              <div className={styles.categoryOptions}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.categoryBtn} ${category === cat ? styles.categoryBtnActive : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Section: Price Range */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Max Price</h4>
              <div className={styles.priceSliderContainer}>
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  step="20000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className={styles.slider}
                  aria-label="Max Price Range"
                />
                <div className={styles.priceLabels}>
                  <span>₦0</span>
                  <span className={styles.currentPrice}>{formatPrice(maxPrice)}</span>
                </div>
              </div>
            </div>

            {/* Filter Section: Material */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Material</h4>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className={styles.selectInput}
                aria-label="Filter by Material"
              >
                {materials.map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Section: Color */}
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>Color</h4>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={styles.selectInput}
                aria-label="Filter by Color"
              >
                {colors.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <main className={styles.mainContent}>
          {loading && (
            <div className={styles.statusMessage}>Loading products...</div>
          )}

          {error && (
            <div className={`${styles.statusMessage} ${styles.errorMessage}`}>
              Error loading catalog: {error}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className={styles.statusMessage}>
              <p>No products found matching your filters.</p>
              <button 
                type="button" 
                className={styles.clearFiltersBtn} 
                onClick={handleResetFilters}
              >
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className={styles.grid}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
