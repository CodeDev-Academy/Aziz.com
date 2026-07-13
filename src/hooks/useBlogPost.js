import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../api/apiClient';

export function useBlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function loadBlogPost() {
      try {
        setLoading(true);
        const fetchedPost = await apiClient.getBlogPostById(id);
        setPost(fetchedPost);
        
        // Fetch all blog posts to calculate related posts
        const allPosts = await apiClient.getBlogPosts();
        const related = allPosts.filter((p) => p.id !== fetchedPost.id).slice(0, 2);
        setRelatedPosts(related);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      loadBlogPost();
    }
  }, [id]);

  // Handle back button click
  const handleBackClick = () => {
    navigate('/blog');
  };

  return {
    post,
    relatedPosts,
    handleBackClick,
    loading,
    error
  };
}
