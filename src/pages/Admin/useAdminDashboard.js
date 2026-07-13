import { useState, useEffect } from 'react';
import { apiClient } from '../../api/apiClient';

export function useAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Per-tab search
  const [productSearch, setProductSearch] = useState('');
  const [blogSearch, setBlogSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('product');
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Custom delete confirmation (replaces window.confirm)
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    type: '',
    id: '',
    name: '',
  });

  // ── Data Loading ──────────────────────────────────
  const loadData = async () => {
    try {
      setLoading(true);
      const [prodData, blogData, projData] = await Promise.all([
        apiClient.getProducts(),
        apiClient.getBlogPosts(),
        apiClient.getProjects(),
      ]);
      setProducts(prodData);
      setBlogs(blogData);
      setProjects(projData);
    } catch {
      showNotification('error', 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // ── CRUD Actions ──────────────────────────────────

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset the database to default mock records? This will overwrite all custom changes.')) return;
    try {
      setActionLoading(true);
      await apiClient.resetDatabase();
      showNotification('success', 'Database successfully reset to initial state.');
      await loadData();
    } catch {
      showNotification('error', 'Failed to reset database.');
    } finally {
      setActionLoading(false);
    }
  };

  // Opens custom delete confirmation instead of window.confirm
  const handleDelete = (type, id, name) => {
    setDeleteConfirm({ open: true, type, id, name });
  };

  const confirmDelete = async () => {
    const { type, id, name } = deleteConfirm;
    setDeleteConfirm({ open: false, type: '', id: '', name: '' });
    try {
      setActionLoading(true);
      if (type === 'product') await apiClient.deleteProduct(id);
      else if (type === 'blog') await apiClient.deleteBlogPost(id);
      else if (type === 'project') await apiClient.deleteProject(id);
      showNotification('success', `"${name}" deleted successfully.`);
      await loadData();
    } catch {
      showNotification('error', `Failed to delete "${name}".`);
    } finally {
      setActionLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ open: false, type: '', id: '', name: '' });
  };

  const handleSave = async (formData) => {
    try {
      setIsSaving(true);
      setModalOpen(false);

      const isEdit = !!formData.id;

      if (modalType === 'product') {
        if (isEdit) {
          await apiClient.updateProduct(formData.id, formData);
          showNotification('success', `Product "${formData.name}" updated successfully.`);
        } else {
          await apiClient.createProduct(formData);
          showNotification('success', `Product "${formData.name}" created successfully.`);
        }
      } else if (modalType === 'blog') {
        if (isEdit) {
          await apiClient.updateBlogPost(formData.id, formData);
          showNotification('success', `Blog post "${formData.title}" updated successfully.`);
        } else {
          await apiClient.createBlogPost(formData);
          showNotification('success', `Blog post "${formData.title}" created successfully.`);
        }
      } else if (modalType === 'project') {
        if (isEdit) {
          await apiClient.updateProject(formData.id, formData);
          showNotification('success', `Project "${formData.title}" updated successfully.`);
        } else {
          await apiClient.createProject(formData);
          showNotification('success', `Project "${formData.title}" created successfully.`);
        }
      }
      await loadData();
    } catch {
      showNotification('error', 'Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
      setSelectedItem(null);
    }
  };

  const openCreateModal = (type) => {
    setModalType(type);
    setModalTitle(`Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setSelectedItem(null);
    setModalOpen(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setModalTitle(`Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setSelectedItem(item);
    setModalOpen(true);
  };

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  // ── Filtered / Derived State ──────────────────────
  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.material?.toLowerCase().includes(q)
    );
  });

  const filteredBlogs = blogs.filter((b) => {
    if (!blogSearch) return true;
    const q = blogSearch.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    );
  });

  const totalProducts = products.length;
  const totalBlogs = blogs.length;
  const totalProjects = projects.length;
  const livingRoomCount = products.filter((p) => p.category === 'Living Room').length;
  const bedroomCount = products.filter((p) => p.category === 'Bedroom').length;
  const officeCount = products.filter((p) => p.category === 'Office').length;

  return {
    activeTab, setActiveTab,
    products, blogs, projects,
    filteredProducts, filteredBlogs,
    productSearch, setProductSearch,
    blogSearch, setBlogSearch,
    loading, actionLoading, isSaving,
    notification,
    modalOpen, setModalOpen,
    modalType, modalTitle,
    selectedItem, setSelectedItem,
    deleteConfirm, confirmDelete, cancelDelete,
    handleResetDatabase, handleDelete, handleSave,
    openCreateModal, openEditModal,
    formatPrice,
    totalProducts, totalBlogs, totalProjects,
    livingRoomCount, bedroomCount, officeCount,
  };
}
