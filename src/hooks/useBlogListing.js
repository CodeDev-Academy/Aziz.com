import { useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

export function useBlogListing() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await apiClient.getBlogPosts();
        setBlogPosts(data);
      } catch (err) {
        setError('Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Category Change
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter blog posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Tips', 'Trends'];

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    handleSearchChange,
    handleCategoryClick,
    filteredPosts,
    categories,
    loading,
    error
  };
}
