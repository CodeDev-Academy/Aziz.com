import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from './useProducts';

// Static filter options (update these when new product variants are added)
const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Office'];
const MATERIALS = ['All', 'Oak Wood', 'Walnut Wood', 'Beech Wood'];
const COLORS = ['All', 'Walnut Brown', 'Natural Oak', 'Espresso Brown', 'Beige Cream'];
const MAX_PRICE_LIMIT = 800000;

export function useCatalogFilters() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE_LIMIT);
  const [material, setMaterial] = useState('All');
  const [color, setColor] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync category filter from URL search params (e.g., /catalog?category=Bedroom)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      if (categoryParam === 'Home Office' || categoryParam === 'Office') {
        setCategory('Office');
      } else {
        setCategory(categoryParam);
      }
      setFiltersOpen(true);
    }
  }, [searchParams]);

  // Filtered product list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = category === 'All' || product.category === category;
      const matchPrice = product.price <= maxPrice;
      const matchMaterial = material === 'All' || product.material === material;
      const matchColor = color === 'All' || product.color === color;
      return matchCategory && matchPrice && matchMaterial && matchColor;
    });
  }, [products, category, maxPrice, material, color]);

  // Actions
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  const handleResetFilters = () => {
    setCategory('All');
    setMaxPrice(MAX_PRICE_LIMIT);
    setMaterial('All');
    setColor('All');
    setSearchParams({});
  };

  const toggleFilters = () => setFiltersOpen((prev) => !prev);

  return {
    // Data
    products,
    filteredProducts,
    loading,
    error,

    // Filter state
    category,
    maxPrice,
    material,
    color,
    filtersOpen,

    // Filter options
    categories: CATEGORIES,
    materials: MATERIALS,
    colors: COLORS,
    maxPriceLimit: MAX_PRICE_LIMIT,

    // Actions
    setMaxPrice,
    setMaterial,
    setColor,
    handleCategoryChange,
    handleResetFilters,
    toggleFilters,
  };
}
