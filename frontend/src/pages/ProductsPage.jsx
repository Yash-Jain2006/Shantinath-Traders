import React, { useState, useMemo, useEffect } from 'react';
import { Search, MessageSquare, Info, ShieldCheck, ShoppingBag, SlidersHorizontal, CheckCircle2, X } from 'lucide-react';
import {
  products
} from '../data/products'
import {
  productCategories, shopDetails
} from '../data/shop';
import ProductModal from '../components/ProductModal';

export default function ProductsPage({ onBackToHome, initialCategory = 'all' }) {
  const [productList, setProductList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setProductList(data.products);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Extract unique brands
  const uniqueBrands = useMemo(() => {
    const set = new Set(productList.map(p => p.brand.split(' / ')[0]));
    return ['all', ...Array.from(set)];
  }, [productList]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = productList.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchBrand = selectedBrand === 'all' || p.brand.toLowerCase().includes(selectedBrand.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.sizes && p.sizes.toLowerCase().includes(query)) ||
        (p.suitableFor && p.suitableFor.toLowerCase().includes(query));

      return matchCat && matchBrand && matchSearch;
    });

    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'brand-asc') {
      result.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="products-page-wrapper">
      {/* Header Banner - Compact, Clean & Well Aligned per Sketch */}
      <section className="products-page-header">
        <div className="container">
          {/* Title Row: High-Visibility Eyebrow + Radiant Title on Left, Trust Badge on Right */}
          <div className="products-header-title-row">
            <div className="products-header-title-group">
              <span className="products-header-eyebrow">
                ✦ Sadar Bazar Verified Store Inventory
              </span>
              <h1 className="products-header-title">
                Products <span className="products-header-highlight">Catalog</span>
              </h1>
            </div>
            <div className="products-stock-badge">
              <CheckCircle2 size={15} className="products-stock-badge-icon" />
              <span>100% Genuine Branded Stock • Sadar Bazar Counter</span>
            </div>
          </div>

          <p className="products-header-sub">
            Explore our complete range of authentic Taparia hand tools, Asian Paints enamels,
            Bosch drills, Harrison locks, and household repair essentials. Instant WhatsApp quotes available.
          </p>

          {/* Full-Width Search Bar per Sketch */}
          <div className="products-header-search">
            <Search size={18} className="products-search-icon" />
            <input
              type="text"
              placeholder="Search across 50+ genuine products (e.g. Apcolite, Taparia Spanner, Bosch Drill, Hose Pipe, Link Lock)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="products-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="products-search-clear"
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '1.25rem', paddingBottom: '0.5rem' }}>
        {/* Controls Bar: Category Pills + Filters Box */}
        <div className="catalog-controls">
          <div className="catalog-controls__inner">
            {/* Category Pills Group */}
            <div className="category-pills-wrap">
              <div className="category-pills">
                {productCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    title={cat.name}
                  >
                    {cat.shortName || cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Filters Box (Cleanly separated & boxed per sketch) */}
            <div className="catalog-filters-box">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="brand-select"
                aria-label="Filter by brand"
              >
                <option value="all">All Brands</option>
                {uniqueBrands.filter(b => b !== 'all').map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="brand-select"
                aria-label="Sort products"
              >
                <option value="featured">Featured First</option>
                <option value="name-asc">Name (A – Z)</option>
                <option value="brand-asc">By Brand</option>
              </select>
            </div>
          </div>
        </div>

        {/* Counter Info Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 1.5rem', padding: '0 0.25rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Showing <strong>{filteredProducts.length}</strong> verified products with photos
          </span>

          {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); setSearchQuery(''); }}
              style={{ fontSize: '0.825rem', color: 'var(--color-accent)', fontWeight: 600 }}
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const waUrl = `https://wa.me/${shopDetails.whatsappNumber}?text=${encodeURIComponent(
              `Hello Shantinath Traders, I want to check price & buy *${product.name}* (Brand: ${product.brand}) for my home. Is it ready at your Sadar Bazar shop?`
            )}`;

            return (
              <div key={product.id} className="product-card">
                {/* Product Card Image */}
                <div className="product-card__img-box">
                  <img
                    src={product.image || `/images/products/${product.id}.jpg`}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/products/taparia-adj-spanner.jpg';
                    }}
                  />
                  <span className="product-card__img-badge-brand">{product.brand}</span>
                  <span className="product-card__img-badge-stock">● In Shop</span>
                </div>

                <div className="product-card__body">
                  <h3>{product.name}</h3>

                  <div className="specs-snippet">
                    {product.sizes && (
                      <div className="spec-row">
                        <span className="spec-label">Sizes:</span>
                        <span>{product.sizes}</span>
                      </div>
                    )}
                  </div>

                  <div className="product-card__actions">
                    <button
                      onClick={() => setActiveProduct(product)}
                      className="btn btn--secondary"
                      style={{ fontSize: '0.8rem', padding: '0.45rem 0.65rem', width: '100%', justifyContent: 'center' }}
                    >
                      <Info size={13} /> View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helper WhatsApp Banner if item not found */}
        <div style={{
          marginTop: '2rem',
          marginBottom: '0.75rem',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>
              Looking for a specific screw size, paint shade, or tool?
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              We have over 500+ items in stock at our Sadar Bazar store. Send us a photo or message on WhatsApp!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20am%20looking%20for%20a%20product%20not%20listed%20on%20the%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem' }}
            >
              <MessageSquare size={16} /> WhatsApp Assistance
            </a>

            <a
              href={`https://wa.me/${shopDetails.whatsappNumber2}?text=Hello%20Shantinath%20Traders,%20I%20am%20looking%20for%20a%20product%20not%20listed%20on%20the%20website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp"
              style={{ padding: '0.65rem 1.15rem', fontSize: '0.85rem', background: '#15803d' }}
            >
              <MessageSquare size={16} /> WhatsApp Assistance (Alt.)
            </a>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}

