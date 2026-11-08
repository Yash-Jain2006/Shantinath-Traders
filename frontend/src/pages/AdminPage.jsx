import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Package, Plus, Trash2, Edit3, BarChart3, Search, X, Check, AlertTriangle,
  TrendingUp, ShoppingBag, Star, Archive, Users, Eye, ChevronDown, Upload,
  RefreshCw, ArrowLeft, ToggleLeft, ToggleRight, Image as ImageIcon, Layers,
  CheckCircle2, XCircle, Tag, Filter, BookOpen, ExternalLink, Flame, ShieldAlert,
  HelpCircle, Calendar, Database, ArrowUpDown
} from 'lucide-react';

const API_BASE = '/api';

// ─── ADMIN PAGE ─────────────────────────────────────────────────
export default function AdminPage({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | products | add | inquiries
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchStats()]).then(() => setLoading(false));
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleProductAdded = () => {
    fetchProducts();
    fetchStats();
    setActiveTab('products');
    showNotification('Product added successfully!');
  };

  const handleProductUpdated = () => {
    fetchProducts();
    fetchStats();
    showNotification('Product updated successfully!');
  };

  const handleProductDeleted = (id, name) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    fetchProducts();
    fetchStats();
    showNotification(`"${name}" deleted successfully.`, 'warning');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'All Products', icon: Package },
    { id: 'add', label: 'Add Product', icon: Plus },
    { id: 'insights', label: 'Store Insights & Guides', icon: BookOpen },
    { id: 'inquiries', label: 'Inquiries', icon: Users },
  ];

  return (
    <div className="admin-page" style={{ background: '#f1f5f9', minHeight: '100vh' }}>
      {/* Notification Toast */}
      {notification && (
        <div style={{
          position: 'fixed', top: '1rem', right: '1rem', zIndex: 500,
          padding: '0.85rem 1.25rem', borderRadius: '12px',
          background: notification.type === 'success' ? '#059669' : notification.type === 'warning' ? '#d97706' : '#dc2626',
          color: '#fff', fontWeight: 600, fontSize: '0.9rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          animation: 'slideInRight 0.3s ease'
        }}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          {notification.message}
        </div>
      )}

      {/* Admin Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#fff', padding: '2rem 0 0', borderBottom: '3px solid #d97706'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(217,119,6,0.2)', border: '1px solid rgba(217,119,6,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Layers size={20} color="#f59e0b" />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                    Admin Panel
                  </h1>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Shantinath Traders · Product Management</span>
                </div>
              </div>
            </div>
            <button
              onClick={onBackToHome}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#cbd5e1', padding: '0.5rem 1rem', borderRadius: '8px',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={16} /> Back to Store
            </button>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.75rem 1.25rem', fontSize: '0.88rem', fontWeight: 600,
                    color: activeTab === tab.id ? '#f59e0b' : '#94a3b8',
                    background: activeTab === tab.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: 'none', borderBottom: activeTab === tab.id ? '2px solid #f59e0b' : '2px solid transparent',
                    borderRadius: '8px 8px 0 0', cursor: 'pointer', transition: 'all 0.18s'
                  }}
                >
                  <Icon size={16} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
            <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>Loading admin data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardView stats={stats} onNavigate={setActiveTab} />}
            {activeTab === 'products' && (
              <ProductsListView
                products={products}
                onDelete={handleProductDeleted}
                onUpdate={handleProductUpdated}
                onNavigateAdd={() => setActiveTab('add')}
                showNotification={showNotification}
              />
            )}
            {activeTab === 'add' && <AddProductView existingProducts={products} onSuccess={handleProductAdded} />}
            {activeTab === 'insights' && <InsightsManagementView stats={stats} products={products} onNavigate={setActiveTab} />}
            {activeTab === 'inquiries' && <InquiriesView stats={stats} />}
          </>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD VIEW ─────────────────────────────────────────────
function DashboardView({ stats, onNavigate }) {
  if (!stats) return <p>No stats available.</p>;

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: '#2563eb', bg: '#eff6ff' },
    { label: 'In Stock', value: stats.inStockCount, icon: CheckCircle2, color: '#059669', bg: '#ecfdf5' },
    { label: 'Out of Stock', value: stats.outOfStockCount, icon: XCircle, color: '#dc2626', bg: '#fef2f2' },
    { label: 'Featured', value: stats.featuredCount, icon: Star, color: '#d97706', bg: '#fffbeb' },
    { label: 'Categories', value: stats.totalCategories, icon: Layers, color: '#7c3aed', bg: '#f5f3ff' },
    { label: 'Inquiries', value: stats.totalInquiries, icon: Users, color: '#0891b2', bg: '#ecfeff' },
  ];

  return (
    <div>
      {/* Supabase Free Tier Guard Status Banner */}
      <div style={{
        background: '#ffffff', borderRadius: '14px', padding: '1.25rem 1.5rem',
        border: '1px solid #e2e8f0', marginBottom: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '10px',
            background: '#ecfdf5', border: '1px solid #a7f3d0',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Database size={20} color="#059669" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>
                Cloud Database Architecture: Supabase Active
              </h4>
              <span style={{
                fontSize: '0.72rem', background: '#ecfdf5', color: '#065f46',
                padding: '0.15rem 0.55rem', borderRadius: '6px', fontWeight: 700
              }}>
                Free Tier Protected
              </span>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#64748b' }}>
              Dual-Engine Sync · In-Memory Cache (5m TTL) · Local JSON Failover · Quota Safe
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <span style={{
            fontSize: '0.78rem', color: '#475569', background: '#f8fafc',
            padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0'
          }}>
            Project Ref: <code style={{ fontWeight: 700, color: '#0f172a' }}>wxjlzlmvofggkpprsyxw</code>
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))',
        gap: '1rem', marginBottom: '2rem'
      }}>
        {statCards.map((sc, i) => {
          const Icon = sc.icon;
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: '14px', padding: '1.35rem 1.25rem',
              border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', gap: '1rem'
            }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={22} color={sc.color} />
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                  {sc.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
                  {sc.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category & Brand Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* Category Breakdown */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.5rem',
          border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Layers size={18} color="#7c3aed" /> Products by Category
          </h3>
          {Object.entries(stats.categoryBreakdown).map(([cat, count]) => (
            <div key={cat} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.55rem 0', borderBottom: '1px solid #f1f5f9'
            }}>
              <span style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 500, textTransform: 'capitalize' }}>
                {cat.replace(/-/g, ' ')}
              </span>
              <span style={{
                fontSize: '0.82rem', fontWeight: 700, color: '#7c3aed',
                background: '#f5f3ff', padding: '0.2rem 0.6rem', borderRadius: '6px'
              }}>
                {count}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Breakdown */}
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '1.5rem',
          border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Tag size={18} color="#d97706" /> Products by Brand
          </h3>
          {Object.entries(stats.brandBreakdown).sort((a, b) => b[1] - a[1]).map(([brand, count]) => (
            <div key={brand} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.55rem 0', borderBottom: '1px solid #f1f5f9'
            }}>
              <span style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 500 }}>
                {brand}
              </span>
              <span style={{
                fontSize: '0.82rem', fontWeight: 700, color: '#d97706',
                background: '#fffbeb', padding: '0.2rem 0.6rem', borderRadius: '6px'
              }}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1.5rem',
        border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => onNavigate('add')} className="btn btn--primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
            <Plus size={16} /> Add New Product
          </button>
          <button onClick={() => onNavigate('products')} className="btn btn--secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
            <Package size={16} /> Manage Products
          </button>
          <button onClick={() => onNavigate('inquiries')} className="btn btn--secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
            <Users size={16} /> View Inquiries
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCTS LIST VIEW ─────────────────────────────────────────
function ProductsListView({ products, onDelete, onUpdate, onNavigateAdd, showNotification }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        (p.id && p.id.toLowerCase().includes(search.toLowerCase()));
      const matchCat = filterCat === 'all' || p.category === filterCat;
      return matchSearch && matchCat;
    });

    const sorted = [...result];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'name-desc':
        sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
        break;
      case 'brand-asc':
        sorted.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
        break;
      case 'brand-desc':
        sorted.sort((a, b) => (b.brand || '').localeCompare(a.brand || ''));
        break;
      case 'category-asc':
        sorted.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
        break;
      case 'instock-first':
        sorted.sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));
        break;
      case 'outstock-first':
        sorted.sort((a, b) => (a.inStock ? 1 : 0) - (b.inStock ? 1 : 0));
        break;
      case 'featured-first':
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'id-asc':
        sorted.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, search, filterCat, sortBy]);

  const handleDelete = async (id, name) => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        onDelete(id, name);
        setDeleteConfirm(null);
      } else {
        if (showNotification) showNotification(data.error || 'Failed to delete product', 'error');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      if (showNotification) showNotification('Network error. Failed to delete product.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleToggle = async (id, field, currentValue) => {
    try {
      const res = await fetch(`${API_BASE}/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !currentValue })
      });
      if (res.ok) onUpdate();
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  const toggleSort = (colKey) => {
    if (colKey === 'name') {
      setSortBy(prev => prev === 'name-asc' ? 'name-desc' : 'name-asc');
    } else if (colKey === 'brand') {
      setSortBy(prev => prev === 'brand-asc' ? 'brand-desc' : 'brand-asc');
    } else if (colKey === 'category') {
      setSortBy(prev => prev === 'category-asc' ? 'default' : 'category-asc');
    } else if (colKey === 'stock') {
      setSortBy(prev => prev === 'instock-first' ? 'outstock-first' : 'instock-first');
    } else if (colKey === 'featured') {
      setSortBy(prev => prev === 'featured-first' ? 'default' : 'featured-first');
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem',
        border: '1px solid #e2e8f0', marginBottom: '1.5rem',
        display: 'flex', gap: '0.85rem', alignItems: 'center', flexWrap: 'wrap',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search by name, brand, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.65rem 0.85rem 0.65rem 2.5rem',
              border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.9rem',
              outline: 'none', background: '#f8fafc'
            }}
          />
        </div>

        {/* Category Filter */}
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          style={{
            padding: '0.65rem 1rem', border: '1px solid #e2e8f0', borderRadius: '10px',
            fontSize: '0.88rem', fontWeight: 500, outline: 'none', background: '#f8fafc',
            textTransform: 'capitalize', cursor: 'pointer'
          }}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'All Categories' : c.replace(/-/g, ' ')}</option>
          ))}
        </select>

        {/* Sorting Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort products"
            style={{
              padding: '0.65rem 1rem', border: '1.5px solid #cbd5e1', borderRadius: '10px',
              fontSize: '0.88rem', fontWeight: 600, outline: 'none', background: '#ffffff',
              color: '#0f172a', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <option value="name-asc">Sort: Name (A → Z)</option>
            <option value="name-desc">Sort: Name (Z → A)</option>
            <option value="featured-first">Sort: Featured First</option>
          </select>
        </div>

        {/* Add Product Button */}
        <button onClick={onNavigateAdd} className="btn btn--primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div style={{
        background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0',
        overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={thStyle}>Image</th>
                <th
                  onClick={() => toggleSort('name')}
                  style={{ ...thStyle, textAlign: 'left', cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Product Name"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Product <ArrowUpDown size={13} color={sortBy.startsWith('name') ? '#d97706' : '#94a3b8'} />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('category')}
                  style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Category"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Category <ArrowUpDown size={13} color={sortBy.startsWith('category') ? '#d97706' : '#94a3b8'} />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('brand')}
                  style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Brand"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Brand <ArrowUpDown size={13} color={sortBy.startsWith('brand') ? '#d97706' : '#94a3b8'} />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('stock')}
                  style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Stock Status"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Stock <ArrowUpDown size={13} color={sortBy.includes('stock') ? '#d97706' : '#94a3b8'} />
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('featured')}
                  style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
                  title="Click to sort by Featured"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Featured <ArrowUpDown size={13} color={sortBy === 'featured-first' ? '#d97706' : '#94a3b8'} />
                  </span>
                </th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ ...tdStyle, width: '64px' }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden',
                      border: '1px solid #e2e8f0', background: '#f1f5f9'
                    }}>
                      <img
                        src={p.image || `/images/products/${p.id}.jpg`}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }}
                        onError={e => { e.target.onerror = null; e.target.src = '/images/products/taparia-adj-spanner.jpg'; }}
                      />
                    </div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'left', fontWeight: 600, color: '#0f172a', maxWidth: '280px' }}>
                    <div style={{ lineHeight: 1.35 }}>{p.name}</div>
                    {p.variants && p.variants.trim() && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: '#475569',
                            background: '#f1f5f9',
                            padding: '2px 8px',
                            borderRadius: '5px',
                            border: '1px solid #e2e8f0',
                            fontWeight: 500,
                            maxWidth: '250px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={`Variants: ${p.variants}`}
                        >
                          {p.variants}
                        </span>
                      </div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem',
                      background: '#f1f5f9', borderRadius: '6px', color: '#475569',
                      textTransform: 'capitalize'
                    }}>
                      {p.category.replace(/-/g, ' ')}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: '#475569' }}>{p.brand}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleToggle(p.id, 'inStock', p.inStock)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: p.inStock ? '#059669' : '#dc2626', fontWeight: 600, fontSize: '0.82rem'
                      }}
                    >
                      {p.inStock ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                      {p.inStock ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleToggle(p.id, 'featured', p.featured)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: p.featured ? '#d97706' : '#94a3b8', fontWeight: 600, fontSize: '0.82rem'
                      }}
                    >
                      <Star size={16} fill={p.featured ? '#d97706' : 'none'} />
                      {p.featured ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center' }}>
                      <button
                        onClick={() => setEditingProduct(p)}
                        title="Edit"
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0',
                          background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', color: '#2563eb', transition: 'all 0.15s'
                        }}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p)}
                        title="Delete"
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #fecaca',
                          background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', color: '#dc2626', transition: 'all 0.15s'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-backdrop" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-box" style={{ maxWidth: '420px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
            }}>
              <AlertTriangle size={28} color="#dc2626" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Delete Product?</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Are you sure you want to delete <strong>"{deleteConfirm.name}"</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn--secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id, deleteConfirm.name)}
                disabled={deleting}
                style={{
                  padding: '0.6rem 1.25rem', fontSize: '0.88rem', fontWeight: 600,
                  background: '#dc2626', color: '#fff', border: 'none', borderRadius: '10px',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  opacity: deleting ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', gap: '0.4rem'
                }}
              >
                <Trash2 size={15} /> {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          existingProducts={products}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => { setEditingProduct(null); onUpdate(); }}
        />
      )}
    </div>
  );
}

const thStyle = {
  padding: '0.85rem 1rem', fontSize: '0.78rem', fontWeight: 700,
  color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em',
  textAlign: 'center', whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '0.75rem 1rem', textAlign: 'center', verticalAlign: 'middle'
};

// ─── ADD PRODUCT VIEW ───────────────────────────────────────────
function AddProductView({ existingProducts = [], onSuccess }) {
  return <ProductForm mode="add" existingProducts={existingProducts} onSuccess={onSuccess} />;
}

// ─── EDIT PRODUCT MODAL ─────────────────────────────────────────
function EditProductModal({ product, existingProducts = [], onClose, onSuccess }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '780px', maxHeight: '92vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>
          <Edit3 size={20} style={{ verticalAlign: '-3px', marginRight: '0.5rem' }} />
          Edit Product
        </h2>
        <ProductForm mode="edit" product={product} existingProducts={existingProducts} onSuccess={onSuccess} />
      </div>
    </div>
  );
}

// ─── PRODUCT FORM (Shared by Add & Edit) ────────────────────────
function ProductForm({ mode, product, existingProducts = [], onSuccess }) {
  const [form, setForm] = useState({
    id: product?.id || '',
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || 'hand-tools',
    sizes: product?.sizes || '',
    variants: product?.variants || '',
    material: product?.material || '',
    finish: product?.finish || '',
    features: product?.features?.join('\n') || '',
    suitableFor: product?.suitableFor || '',
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    imageSnippet: product?.imageSnippet || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.image || null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const trimmedName = form.name.trim().toLowerCase();
  const duplicateMatch = useMemo(() => {
    if (!trimmedName || trimmedName.length < 2) return null;
    return existingProducts.find(p =>
      mode === 'add'
        ? p.name.trim().toLowerCase() === trimmedName && p.brand.trim().toLowerCase() === form.brand.trim().toLowerCase()
        : p.id !== product?.id && p.name.trim().toLowerCase() === trimmedName && p.brand.trim().toLowerCase() === form.brand.trim().toLowerCase()
    );
  }, [trimmedName, form.brand, existingProducts, mode, product]);

  const categories = [
    { id: 'hand-tools', name: 'Hand Tools' },
    { id: 'power-tools', name: 'Power Tools' },
    { id: 'paints', name: 'Paints & Enamels' },
    { id: 'locks', name: 'Locks & Security' },
    { id: 'adhesives', name: 'Adhesives & Oils' },
    { id: 'garden', name: 'Garden & Plumbing' },
    { id: 'abrasives', name: 'Cutting & Sanding' },
  ];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generateId = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (duplicateMatch) {
      setError(`Duplicate Product Error: A product named "${duplicateMatch.name}" already exists under brand "${duplicateMatch.brand}".`);
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      const productId = product?.id || generateId(form.name);
      formData.append('id', productId);
      formData.append('name', form.name);
      formData.append('brand', form.brand);
      formData.append('category', form.category);
      formData.append('sizes', form.sizes);
      formData.append('variants', form.variants);
      formData.append('material', form.material);
      formData.append('finish', form.finish);
      formData.append('features', JSON.stringify(form.features.split('\n').filter(f => f.trim())));
      formData.append('suitableFor', form.suitableFor);
      formData.append('inStock', form.inStock);
      formData.append('featured', form.featured);
      formData.append('imageSnippet', form.imageSnippet);
      if (imageFile) formData.append('image', imageFile);

      const url = mode === 'add'
        ? `${API_BASE}/admin/products`
        : `${API_BASE}/admin/products/${product.id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setSubmitting(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.7rem 0.95rem', border: '1px solid #e2e8f0',
    borderRadius: '10px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc',
    transition: 'all 0.2s', fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155',
    marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.03em'
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
          padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#dc2626',
          fontSize: '0.88rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem'
        }}>
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* Product Name */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Product Name *</label>
          <input
            type="text" required value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="e.g. Taparia Circlip Pliers"
            style={inputStyle}
          />
          {duplicateMatch && (
            <div style={{
              marginTop: '0.45rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <AlertTriangle size={14} />
              <span>Duplicate detected: Product already exists under {duplicateMatch.brand}</span>
            </div>
          )}
        </div>

        {/* Brand */}
        <div>
          <label style={labelStyle}>Brand *</label>
          <input
            type="text" required value={form.brand}
            onChange={e => handleChange('brand', e.target.value)}
            placeholder="e.g. Taparia"
            style={inputStyle}
          />
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category *</label>
          <select
            value={form.category}
            onChange={e => handleChange('category', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Sizes */}
        <div>
          <label style={labelStyle}>Sizes</label>
          <input
            type="text" value={form.sizes}
            onChange={e => handleChange('sizes', e.target.value)}
            placeholder="e.g. 120mm - 300mm, 165mm, 210mm"
            style={inputStyle}
          />
        </div>

        {/* Separate Variants Box */}
        <div>
          <label style={labelStyle}>Variants</label>
          <input
            type="text" value={form.variants}
            onChange={e => handleChange('variants', e.target.value)}
            placeholder="e.g. Internal Straight, External Bent, Insulated"
            style={inputStyle}
          />
        </div>

        {/* Material */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Material</label>
          <input
            type="text" value={form.material}
            onChange={e => handleChange('material', e.target.value)}
            placeholder="e.g. Alloy Steel, Drop Forged Carbon Steel"
            style={inputStyle}
          />
        </div>

        {/* Features (textarea) */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Features (one per line)</label>
          <textarea
            value={form.features}
            onChange={e => handleChange('features', e.target.value)}
            placeholder={"Enter each feature on a new line...\ne.g. Laser-marked millimeter scale\nLifetime durability"}
            rows={4}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          />
        </div>

        {/* Image Upload */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Product Image</label>
          <div style={{
            border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '1.5rem',
            textAlign: 'center', cursor: 'pointer', background: '#fafbfc',
            transition: 'all 0.2s'
          }}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', justifyContent: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#ffffff', padding: '4px' }}
                  onError={e => { e.target.onerror = null; e.target.src = '/images/products/taparia-adj-spanner.jpg'; }}
                />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                    {imageFile ? imageFile.name : 'Current image'}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Click to change image</p>
                </div>
              </div>
            ) : (
              <>
                <Upload size={32} color="#94a3b8" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                  Click to upload product image
                </p>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  JPG, PNG up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Image Description */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Image Description</label>
          <input
            type="text" value={form.imageSnippet}
            onChange={e => handleChange('imageSnippet', e.target.value)}
            placeholder="Brief description of the product image"
            style={inputStyle}
          />
        </div>

        {/* Toggles */}
        <div style={{ display: 'flex', gap: '2rem', gridColumn: '1 / -1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox" checked={form.inStock}
              onChange={e => handleChange('inStock', e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#059669' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>In Stock</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox" checked={form.featured}
              onChange={e => handleChange('featured', e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#d97706' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>Featured Product</span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
        <button
          type="submit"
          disabled={submitting || !!duplicateMatch}
          className="btn btn--primary"
          title={duplicateMatch ? 'Cannot add duplicate product' : ''}
          style={{
            padding: '0.75rem 2rem', fontSize: '0.95rem',
            opacity: (submitting || !!duplicateMatch) ? 0.5 : 1,
            cursor: duplicateMatch ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? (
            <><RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</>
          ) : (
            <>{mode === 'add' ? <Plus size={16} /> : <Check size={16} />} {mode === 'add' ? 'Add Product' : 'Save Changes'}</>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── INQUIRIES VIEW ─────────────────────────────────────────────
function InquiriesView({ stats }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/inquiries`)
      .then(res => res.json())
      .then(data => { setInquiries(data.inquiries || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>Loading inquiries...</p>;

  return (
    <div>
      {/* Summary */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem'
      }}>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>{stats?.totalInquiries || 0}</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Total Inquiries</div>
        </div>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>{stats?.pendingInquiries || 0}</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Pending</div>
        </div>
        <div style={summaryCardStyle}>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669' }}>{(stats?.totalInquiries || 0) - (stats?.pendingInquiries || 0)}</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Resolved</div>
        </div>
      </div>

      {/* Inquiries List */}
      {inquiries.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: '14px', padding: '3rem', textAlign: 'center',
          border: '1px solid #e2e8f0', color: '#94a3b8'
        }}>
          <Users size={40} style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
          <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>No inquiries yet</p>
          <p style={{ fontSize: '0.88rem' }}>Customer shopping list inquiries will appear here.</p>
        </div>
      ) : (
        <div style={{
          background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0',
          overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {inquiries.map((inq, i) => (
            <div key={inq.id} style={{
              padding: '1.25rem 1.5rem',
              borderBottom: i < inquiries.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                    {inq.customerName}
                  </span>
                  {inq.phone && (
                    <span style={{ fontSize: '0.82rem', color: '#64748b', marginLeft: '0.75rem' }}>
                      📞 {inq.phone}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '6px',
                    background: inq.status === 'pending_confirmation' ? '#fffbeb' : '#ecfdf5',
                    color: inq.status === 'pending_confirmation' ? '#92400e' : '#065f46',
                    textTransform: 'uppercase'
                  }}>
                    {inq.status === 'pending_confirmation' ? 'Pending' : inq.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.35rem' }}>
                <strong>Delivery:</strong> {inq.deliveryOption}
              </p>
              <p style={{
                fontSize: '0.85rem', color: '#334155', background: '#f8fafc',
                padding: '0.65rem 0.85rem', borderRadius: '8px', borderLeft: '3px solid #d97706',
                whiteSpace: 'pre-wrap', lineHeight: 1.5
              }}>
                {inq.items}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const summaryCardStyle = {
  background: '#fff', borderRadius: '14px', padding: '1.35rem 1.5rem',
  border: '1px solid #e2e8f0', textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
};



// ─── INSIGHTS MANAGEMENT VIEW ───────────────────────────────────
function InsightsManagementView({ stats, products, onNavigate }) {
  const outOfStockProducts = products.filter(p => !p.inStock);
  const featuredProducts = products.filter(p => p.featured);

  const seasonalTrends = [
    {
      season: 'Pre-Monsoon & Rainy Season (June – Sept)',
      status: 'High Demand',
      color: '#0284c7',
      items: 'Anti-Rust Red Oxide Primer, Synthetic Enamel, Harrison Brass Padlocks, WD-40 Rust Remover',
      tip: 'Homeowners in Jhansi prepare iron gates and balcony grills before heavy downpours.'
    },
    {
      season: 'Post-Monsoon & Festive (Oct – Dec)',
      status: 'Peak Demand',
      color: '#d97706',
      items: 'Apcolite Gloss Enamel, Aerosol Spray Paints, Brass Door Aldrops, Tower Bolts',
      tip: 'Festive home renovation and repainting drive maximum retail walk-ins.'
    },
    {
      season: 'Summer Season (March – May)',
      status: 'Specialty Demand',
      color: '#ea580c',
      items: 'PVC Braided Garden Hose Pipes, Water Cooler Paint, Kobmax Blowers, Emery Sandpaper',
      tip: 'Watering garden lawns, porch cooling, and cooler body rust restoration peak.'
    },
    {
      season: 'Year-Round Staples',
      status: 'Consistent Counter Sales',
      color: '#059669',
      items: 'Taparia Adjustable Spanners, Combination Pliers, Screwdriver Sets, Neon Testers, Fevicol & Araldite',
      tip: 'Every household repair in Sadar Bazar requires standard hand tools and instant adhesives.'
    }
  ];

  const guideTopics = [
    { title: 'How to Paint Iron Gates & Balcony Grills Against Monsoon Rust', cat: 'Paints & Finishes', reads: '4 min read', highlight: 'Most Popular in Jhansi' },
    { title: 'Spotting 100% Genuine Taparia Tools in Sadar Bazar', cat: 'Hand Tools', reads: '3 min read', highlight: 'Buyer Advisory' },
    { title: 'Choosing the Right Harrison Locks for Shop Shutters & Main Doors', cat: 'Home Security', reads: '5 min read', highlight: 'Safety First' },
    { title: 'Drill Machine Buying Guide: Impact Drill vs Rotary Hammer', cat: 'Power Tools', reads: '4 min read', highlight: 'Tool Guide' },
    { title: '5 Problem-Solving Uses for WD-40 Around Your Jhansi Home', cat: 'Home Maintenance', reads: '3 min read', highlight: 'Quick Fix' },
    { title: 'Selecting Durable Flexible Garden Hoses & Brass Spray Nozzles', cat: 'Garden & Plumbing', reads: '3 min read', highlight: 'Watering Guide' },
  ];

  return (
    <div>
      {/* Top Banner */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1.5rem',
        border: '1px solid #e2e8f0', marginBottom: '1.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>
            Store Insights &amp; Market Intelligence
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Jhansi hardware buying patterns, inventory alerts, and customer DIY guides.
          </p>
        </div>
        <a
          href="#insights"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
        >
          <ExternalLink size={15} /> Open Live Customer Insights Page
        </a>
      </div>

      {/* Inventory Health & Out of Stock Alerts */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1.5rem',
        border: '1px solid #e2e8f0', marginBottom: '1.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <ShieldAlert size={18} color={outOfStockProducts.length > 0 ? '#dc2626' : '#059669'} />
          Inventory Stock Health ({outOfStockProducts.length} Items Out of Stock)
        </h3>

        {outOfStockProducts.length === 0 ? (
          <div style={{
            background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px',
            padding: '1rem 1.25rem', color: '#065f46', fontSize: '0.88rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <CheckCircle2 size={18} /> All {products.length} catalog items are currently marked In Stock!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {outOfStockProducts.map(p => (
              <div key={p.id} style={{
                background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px',
                padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.88rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>Brand: {p.brand} · {p.category}</div>
                </div>
                <button
                  onClick={() => onNavigate('products')}
                  style={{
                    fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', background: '#fff',
                    border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.3rem 0.6rem', cursor: 'pointer'
                  }}
                >
                  Manage
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seasonal Demand Intelligence */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1.5rem',
        border: '1px solid #e2e8f0', marginBottom: '1.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Calendar size={18} color="#d97706" />
          Seasonal Demand Cycles (Sadar Bazar, Jhansi)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {seasonalTrends.map((st, i) => (
            <div key={i} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px',
              padding: '1.15rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: st.color, textTransform: 'uppercase' }}>
                    {st.status}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.45rem' }}>
                  {st.season}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '0.75rem', lineHeight: 1.45 }}>
                  <strong>Key Products:</strong> {st.items}
                </p>
              </div>
              <div style={{
                fontSize: '0.78rem', color: '#64748b', background: '#fff',
                padding: '0.5rem 0.75rem', borderRadius: '8px', borderLeft: `3px solid ${st.color}`
              }}>
                💡 {st.tip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer DIY Guides in Catalog */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '1.5rem',
        border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.45rem', margin: 0 }}>
            <BookOpen size={18} color="#7c3aed" />
            Live Customer Insights &amp; DIY Guides (6 Articles)
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Distilled from 70+ years of counter guidance</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {guideTopics.map((g, idx) => (
            <div key={idx} style={{
              border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem',
              background: '#fcfcfd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
                    {g.cat}
                  </span>
                  <span style={{ fontSize: '0.7rem', background: '#fef3c7', color: '#92400e', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 600 }}>
                    {g.highlight}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                  {g.title}
                </h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#94a3b8', paddingTop: '0.65rem', borderTop: '1px solid #f1f5f9' }}>
                <span>{g.reads}</span>
                <a href="#insights" style={{ color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  View Guide <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
