import React from 'react';
import { AdminModal } from './AdminModal';
import { useAdminDashboard } from './useAdminDashboard';
import { useAuth } from '../../features/auth/useAuth';
import styles from './AdminDashboard.module.css';

// Color swatches for product color column
const COLOR_MAP = {
  'Natural Oak':   '#C4A882',
  'Walnut Brown':  '#7B5230',
  'Espresso Brown':'#4A2C2A',
  'Beige Cream':   '#F0E8D8',
  'Matte Black':   '#2D2D2D',
};

// ── Skeleton row for tables ──────────────────────────
function SkeletonRow({ cols }) {
  return (
    <tr>
      <td>
        <div className={styles.productCell}>
          <div className={`${styles.skeleton} ${styles.skeletonThumb}`} />
          <div className={styles.prodInfo}>
            <div className={styles.skeletonLine} style={{ width: '75%', marginBottom: 6 }} />
            <div className={styles.skeletonLine} style={{ width: '45%', height: 10 }} />
          </div>
        </div>
      </td>
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <td key={i}><div className={styles.skeletonLine} /></td>
      ))}
    </tr>
  );
}

// ── Empty state component ────────────────────────────
function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyDesc}>{description}</p>
      {actionLabel && (
        <button type="button" className={styles.addBtn} onClick={onAction}>
          + {actionLabel}
        </button>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const {
    activeTab, setActiveTab,
    filteredProducts, filteredBlogs, projects,
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
  } = useAdminDashboard();

  // Derive initials for avatar pill
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <div className={styles.adminPage}>

      {/* ── Toast Notification ── */}
      {notification && (
        <div className={`${styles.notification} ${
          notification.type === 'success' ? styles.successNotification : styles.errorNotification
        }`}>
          {notification.type === 'success' ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
          {notification.message}
        </div>
      )}

      <div className="container">
        <div className={styles.layout}>

          {/* ══════════════════════════════
              DARK SIDEBAR
          ══════════════════════════════ */}
          <aside className={styles.sidebar}>
            <div>
              {/* Brand */}
              <div className={styles.sidebarBrand}>
                <svg className={styles.brandIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <div>
                  <span className={styles.brandName}>CozyCraft</span>
                  <span className={styles.brandRole}>Admin Panel</span>
                </div>
              </div>

              {/* User welcome */}
              {user && (
                <div className={styles.userWelcome}>
                  <div className={styles.avatar}>{initials}</div>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </div>
              )}

              {/* Nav */}
              <p className={styles.navLabel}>Navigation</p>
              <nav>
                <ul className={styles.menuList}>
                  {[
                    {
                      key: 'overview',
                      label: 'Overview',
                      icon: <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
                    },
                    {
                      key: 'products',
                      label: `Products (${totalProducts})`,
                      icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
                    },
                    {
                      key: 'blogs',
                      label: `Blog Posts (${totalBlogs})`,
                      icon: <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 8h6v2H7V8zm0 4h6v2H7v-2z" />,
                    },
                    {
                      key: 'gallery',
                      label: `Gallery (${totalProjects})`,
                      icon: <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
                    },
                  ].map((item) => (
                    <li key={item.key}>
                      <button
                        type="button"
                        id={`admin-nav-${item.key}`}
                        className={`${styles.menuItemBtn} ${activeTab === item.key ? styles.activeMenuItemBtn : ''}`}
                        onClick={() => setActiveTab(item.key)}
                      >
                        <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          {item.icon}
                        </svg>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Logout */}
            <button type="button" className={styles.logoutBtn} onClick={logout} id="admin-logout-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              Sign Out
            </button>
          </aside>

          {/* ══════════════════════════════
              MAIN CONTENT
          ══════════════════════════════ */}
          <main className={styles.contentArea}>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Dashboard Overview</h2>
                    <p className={styles.sectionSubtitle}>Manage your furniture showroom from one place</p>
                  </div>
                </div>

                {/* Stat Cards */}
                <div className={styles.statsGrid}>
                  <div className={`${styles.statCard} ${styles.statCardBrown}`}>
                    <div className={styles.statIconContainer}>
                      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{loading ? '—' : totalProducts}</span>
                      <span className={styles.statLabel}>Total Products</span>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.statCardGold}`}>
                    <div className={styles.statIconContainer}>
                      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 8h6v2H7V8zm0 4h6v2H7v-2z" />
                      </svg>
                    </div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{loading ? '—' : totalBlogs}</span>
                      <span className={styles.statLabel}>Blog Articles</span>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.statCardTeal}`}>
                    <div className={styles.statIconContainer}>
                      <svg className={styles.statIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{loading ? '—' : totalProjects}</span>
                      <span className={styles.statLabel}>Gallery Projects</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                  <h3 className={styles.quickActionsTitle}>Quick Actions</h3>
                  <div className={styles.quickActionsGrid}>
                    <button type="button" className={styles.quickBtn} id="quick-add-product"
                      onClick={() => { setActiveTab('products'); openCreateModal('product'); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span>Add Product</span>
                    </button>
                    <button type="button" className={styles.quickBtn} id="quick-add-blog"
                      onClick={() => { setActiveTab('blogs'); openCreateModal('blog'); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>New Blog Post</span>
                    </button>
                    <button type="button" className={styles.quickBtn} id="quick-add-gallery"
                      onClick={() => { setActiveTab('gallery'); openCreateModal('project'); }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Add Gallery Item</span>
                    </button>
                  </div>
                </div>

                {/* Catalog Breakdown */}
                <div className={styles.breakdownSection}>
                  <h3 className={styles.breakdownTitle}>Catalog by Room Type</h3>
                  <div className={styles.breakdownGrid}>
                    {[
                      { label: 'Living Room', count: livingRoomCount },
                      { label: 'Bedroom',     count: bedroomCount },
                      { label: 'Office',      count: officeCount },
                    ].map(({ label, count }) => (
                      <div key={label} className={styles.breakdownCard}>
                        <div className={styles.breakdownHeader}>
                          <span>{label}</span>
                          <strong>{loading ? '—' : count}</strong>
                        </div>
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: totalProducts ? `${(count / totalProducts) * 100}%` : '0%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className={styles.systemActions}>
                  <h3>⚠ Danger Zone</h3>
                  <p>Resetting the database will delete all custom changes and restore the initial showcase data.</p>
                  <button type="button" className={styles.resetBtn} onClick={handleResetDatabase} disabled={actionLoading} id="reset-db-btn">
                    {actionLoading ? 'Resetting…' : 'Reset to Default'}
                  </button>
                </div>
              </div>
            )}

            {/* ── PRODUCTS TAB ── */}
            {activeTab === 'products' && (
              <div>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Manage Products</h2>
                    <p className={styles.sectionSubtitle}>{totalProducts} items in the catalog</p>
                  </div>
                  <button type="button" className={styles.addBtn} onClick={() => openCreateModal('product')} id="add-product-btn">
                    + Add Product
                  </button>
                </div>

                <div className={styles.searchBar}>
                  <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    id="product-search"
                    type="text"
                    placeholder="Search products by name, category or material…"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                  {productSearch && (
                    <button type="button" className={styles.searchClear} onClick={() => setProductSearch('')}>×</button>
                  )}
                </div>

                {loading ? (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead><tr><th>Product</th><th>Category</th><th>Material / Color</th><th>Price</th><th>Actions</th></tr></thead>
                      <tbody>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={5} />)}</tbody>
                    </table>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  productSearch ? (
                    <div className={styles.noResults}>No products match "<strong>{productSearch}</strong>"</div>
                  ) : (
                    <EmptyState icon="📦" title="No products yet"
                      description="Add your first product to the catalog and it will appear here."
                      actionLabel="Add Product" onAction={() => openCreateModal('product')} />
                  )
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Material / Color</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id}>
                            <td className={styles.productCell}>
                              <img
                                src={product.images?.[0] || '/placeholder-product.png'}
                                alt={product.name}
                                className={styles.thumbnail}
                              />
                              <div className={styles.prodInfo}>
                                <span className={styles.prodName}>{product.name}</span>
                                <span className={styles.prodMeta}>{product.dimensions || '—'}</span>
                              </div>
                            </td>
                            <td><span className={styles.categoryBadge}>{product.category}</span></td>
                            <td>
                              {product.material}
                              <span
                                className={styles.colorDot}
                                style={{ background: COLOR_MAP[product.color] || '#ccc' }}
                                title={product.color}
                              />
                              {product.color}
                            </td>
                            <td className={styles.priceCell}>{formatPrice(product.price)}</td>
                            <td className={styles.actionsCell}>
                              <button type="button" className={styles.editActionBtn} onClick={() => openEditModal('product', product)} id={`edit-product-${product.id}`}>Edit</button>
                              <button type="button" className={styles.deleteActionBtn} onClick={() => handleDelete('product', product.id, product.name)} disabled={actionLoading} id={`delete-product-${product.id}`}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── BLOGS TAB ── */}
            {activeTab === 'blogs' && (
              <div>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Manage Blog Articles</h2>
                    <p className={styles.sectionSubtitle}>{totalBlogs} articles published</p>
                  </div>
                  <button type="button" className={styles.addBtn} onClick={() => openCreateModal('blog')} id="add-blog-btn">
                    + New Article
                  </button>
                </div>

                <div className={styles.searchBar}>
                  <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    id="blog-search"
                    type="text"
                    placeholder="Search articles by title, author or category…"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                  {blogSearch && (
                    <button type="button" className={styles.searchClear} onClick={() => setBlogSearch('')}>×</button>
                  )}
                </div>

                {loading ? (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead><tr><th>Article</th><th>Author</th><th>Category</th><th>Date</th><th>Actions</th></tr></thead>
                      <tbody>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={5} />)}</tbody>
                    </table>
                  </div>
                ) : filteredBlogs.length === 0 ? (
                  blogSearch ? (
                    <div className={styles.noResults}>No articles match "<strong>{blogSearch}</strong>"</div>
                  ) : (
                    <EmptyState icon="✍️" title="No articles yet"
                      description="Write your first blog post to share tips, trends, and news with your customers."
                      actionLabel="New Article" onAction={() => openCreateModal('blog')} />
                  )
                ) : (
                  <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Article</th>
                          <th>Author</th>
                          <th>Category</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBlogs.map((blog) => (
                          <tr key={blog.id}>
                            <td className={styles.productCell}>
                              <img
                                src={blog.image || '/placeholder-blog.png'}
                                alt={blog.title}
                                className={styles.thumbnail}
                              />
                              <div className={styles.prodInfo}>
                                <span className={styles.prodName}>{blog.title}</span>
                                <span className={styles.prodMeta}>
                                  {blog.excerpt?.slice(0, 60)}{(blog.excerpt?.length || 0) > 60 ? '…' : ''}
                                </span>
                              </div>
                            </td>
                            <td>{blog.author}</td>
                            <td><span className={styles.categoryBadge}>{blog.category}</span></td>
                            <td>{blog.date || '—'}</td>
                            <td className={styles.actionsCell}>
                              <button type="button" className={styles.editActionBtn} onClick={() => openEditModal('blog', blog)} id={`edit-blog-${blog.id}`}>Edit</button>
                              <button type="button" className={styles.deleteActionBtn} onClick={() => handleDelete('blog', blog.id, blog.title)} disabled={actionLoading} id={`delete-blog-${blog.id}`}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ── GALLERY TAB ── */}
            {activeTab === 'gallery' && (
              <div>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Manage Gallery</h2>
                    <p className={styles.sectionSubtitle}>{totalProjects} projects showcased</p>
                  </div>
                  <button type="button" className={styles.addBtn} onClick={() => openCreateModal('project')} id="add-gallery-btn">
                    + Add Project
                  </button>
                </div>

                {loading ? (
                  <div className={styles.galleryGrid}>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={styles.galleryCard}>
                        <div className={`${styles.skeleton} ${styles.gallerySkeletonImg}`} />
                        <div className={styles.galleryCardContent}>
                          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                          <div className={`${styles.skeleton} ${styles.skeletonMeta}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : projects.length === 0 ? (
                  <EmptyState icon="🖼️" title="No gallery projects yet"
                    description="Add your first completed project to showcase your craftsmanship to clients."
                    actionLabel="Add Project" onAction={() => openCreateModal('project')} />
                ) : (
                  <div className={styles.galleryGrid}>
                    {projects.map((project) => (
                      <div key={project.id} className={styles.galleryCard}>
                        <img
                          src={project.image || '/placeholder-gallery.png'}
                          alt={project.title}
                        />
                        <div className={styles.galleryCardContent}>
                          <h4 className={styles.galleryCardTitle}>{project.title}</h4>
                          <span className={styles.galleryCardMeta}>
                            {project.category} · {project.location} ({project.year})
                          </span>
                        </div>
                        <div className={styles.galleryCardActions}>
                          <button type="button" className={styles.editActionBtn} onClick={() => openEditModal('project', project)} id={`edit-project-${project.id}`}>Edit</button>
                          <button type="button" className={styles.deleteActionBtn} onClick={() => handleDelete('project', project.id, project.title)} disabled={actionLoading} id={`delete-project-${project.id}`}>Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ══════════════════════════════
          CUSTOM DELETE CONFIRMATION MODAL
      ══════════════════════════════ */}
      {deleteConfirm.open && (
        <div className={styles.deleteOverlay} onClick={cancelDelete}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteIconWrap}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>
            <h3 className={styles.deleteTitle}>Confirm Delete</h3>
            <p className={styles.deleteText}>
              Are you sure you want to permanently delete{' '}
              <strong>"{deleteConfirm.name}"</strong>?
              <small>This action cannot be undone.</small>
            </p>
            <div className={styles.deleteActions}>
              <button type="button" className={styles.deleteCancelBtn} onClick={cancelDelete} id="delete-cancel-btn">
                Cancel
              </button>
              <button type="button" className={styles.deleteConfirmBtn} onClick={confirmDelete} disabled={actionLoading} id="delete-confirm-btn">
                {actionLoading ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════
          EDIT / CREATE MODAL
      ══════════════════════════════ */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedItem(null); }}
        title={modalTitle}
        type={modalType}
        initialData={selectedItem}
        onSubmit={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
