import { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let active = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await apiClient.getProductById(id);
        if (active) {
          setProduct(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Product not found');
          setProduct(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      active = false;
    };
  }, [id]);

  return { product, loading, error };
}
