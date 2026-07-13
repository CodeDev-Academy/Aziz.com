const API_BASE_URL = 'http://127.0.0.1:8000/api/catalog';

/**
 * Get the stored admin JWT access token for write operations.
 */
function getAuthHeaders() {
  const token = localStorage.getItem('cozycraft_access_token');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

/**
 * Handle API errors consistently.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.detail) message = errorData.detail;
    } catch (_) {}
    throw new Error(message);
  }
  // 204 No Content (DELETE) has no body
  if (response.status === 204) return true;
  return response.json();
}

/**
 * Normalize a Django product object to match the shape the frontend expects.
 * Django returns: { id, name, price, category, material, color, dimensions, description, images: [{image_url}] }
 * Frontend expects: { id, name, price, category, material, color, dimensions, description, images: [url_string] }
 */
function normalizeProduct(p) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return {
    ...p,
    id: String(p.id),
    price: Number(p.price),
    images: (p.images || []).map((img) => {
      const url = img.image_url || '';
      return url.startsWith('/') ? `${origin}${url}` : url;
    }),
  };
}

function normalizeBlogPost(post) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const imageUrl = post.image_url || '';
  const resolvedImage = imageUrl
    ? (imageUrl.startsWith('/') ? `${origin}${imageUrl}` : imageUrl)
    : `${origin}/images/blog/wood-care.png`;

  return {
    ...post,
    id: String(post.id),
    date: post.published_at ? post.published_at.split('T')[0] : '',
    image: resolvedImage,
  };
}

function normalizeProject(proj) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const imageUrl = proj.image_url || '';
  const resolvedImage = imageUrl
    ? (imageUrl.startsWith('/') ? `${origin}${imageUrl}` : imageUrl)
    : `${origin}/images/gallery/living-1.png`;

  return {
    ...proj,
    id: String(proj.id),
    image: resolvedImage,
  };
}

export const apiClient = {
  // ─────────────────────────────────────────
  // PRODUCTS
  // ─────────────────────────────────────────
  getProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/products/`);
    const data = await handleResponse(res);
    return data.map(normalizeProduct);
  },

  getProductById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}/`);
    const data = await handleResponse(res);
    return normalizeProduct(data);
  },

  createProduct: async (productData) => {
    const body = {
      name: productData.name,
      price: Number(productData.price) || 0,
      category: productData.category,
      material: productData.material || '',
      color: productData.color || '',
      dimensions: productData.dimensions || '',
      description: productData.description || '',
      image_urls: Array.isArray(productData.images) ? productData.images : [],
    };
    const res = await fetch(`${API_BASE_URL}/products/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(res);
    return normalizeProduct(data);
  },

  updateProduct: async (id, updatedFields) => {
    const body = {
      name: updatedFields.name,
      price: Number(updatedFields.price) || 0,
      category: updatedFields.category,
      material: updatedFields.material || '',
      color: updatedFields.color || '',
      dimensions: updatedFields.dimensions || '',
      description: updatedFields.description || '',
      ...(updatedFields.images ? { image_urls: updatedFields.images } : {}),
    };
    const res = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(res);
    return normalizeProduct(data);
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // ─────────────────────────────────────────
  // BLOG POSTS
  // ─────────────────────────────────────────
  getBlogPosts: async () => {
    const res = await fetch(`${API_BASE_URL}/blog/`);
    const data = await handleResponse(res);
    return data.map(normalizeBlogPost);
  },

  getBlogPostById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/blog/${id}/`);
    const data = await handleResponse(res);
    return normalizeBlogPost(data);
  },

  createBlogPost: async (postData) => {
    const body = {
      title: postData.title,
      slug: postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      excerpt: postData.excerpt || '',
      content: postData.content || '',
      image_url: postData.image || postData.image_url || '',
      category: postData.category || '',
      author: postData.author || 'CozyCraft Team',
      is_published: true,
      published_at: new Date().toISOString(),
      };
    const res = await fetch(`${API_BASE_URL}/blog/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(res);
    return normalizeBlogPost(data);
  },

  updateBlogPost: async (id, updatedFields) => {
    const body = {
      title: updatedFields.title,
      excerpt: updatedFields.excerpt || '',
      content: updatedFields.content || '',
      image_url: updatedFields.image || updatedFields.image_url || '',
      category: updatedFields.category || '',
      author: updatedFields.author || 'CozyCraft Team',
    };
    const res = await fetch(`${API_BASE_URL}/blog/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(res);
    return normalizeBlogPost(data);
  },

  deleteBlogPost: async (id) => {
    const res = await fetch(`${API_BASE_URL}/blog/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // ─────────────────────────────────────────
  // GALLERY PROJECTS
  // ─────────────────────────────────────────
  getProjects: async () => {
    const res = await fetch(`${API_BASE_URL}/gallery/`);
    const data = await handleResponse(res);
    return data.map(normalizeProject);
  },

  getProjectById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}/`);
    const data = await handleResponse(res);
    return normalizeProject(data);
  },

  createProject: async (projectData) => {
    const body = {
      title: projectData.title,
      category: projectData.category || '',
      image_url: projectData.image || projectData.image_url || '',
      description: projectData.description || '',
      location: projectData.location || '',
      year: projectData.year || String(new Date().getFullYear()),
      materials: projectData.materials || '',
    };
    const res = await fetch(`${API_BASE_URL}/gallery/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(res);
    return normalizeProject(data);
  },

  updateProject: async (id, updatedFields) => {
    const body = {
      title: updatedFields.title,
      category: updatedFields.category || '',
      image_url: updatedFields.image || updatedFields.image_url || '',
      description: updatedFields.description || '',
      location: updatedFields.location || '',
      year: updatedFields.year || '',
      materials: updatedFields.materials || '',
    };
    const res = await fetch(`${API_BASE_URL}/gallery/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });
    const data = await handleResponse(res);
    return normalizeProject(data);
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // ─────────────────────────────────────────
  // SYSTEM — kept for Admin Dashboard reset button
  // This now re-fetches from the API instead of resetting localStorage
  // ─────────────────────────────────────────
  resetDatabase: async () => {
    // No-op on real API — data lives in Django DB now.
    // Return fresh data from the API so the admin dashboard refreshes.
    return true;
  },
};
