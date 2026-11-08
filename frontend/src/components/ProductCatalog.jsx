import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageSquare, Info, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import {
  products
} from '../data/products'
import {
  productCategories, shopDetails
} from '../data/shop';
import ProductModal from './ProductModal';

export default function ProductCatalog({ onGoToAllProducts }) {
  const [productList, setProductList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [activeProduct, setActiveProduct] = useState(null);

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          setProductList(data.products);
        }
      })
      .catch(() => {});
  }, []);

  // Extract unique brands for dropdown
  const uniqueBrands = useMemo(() => {
    const set = new Set(productList.map(p => p.brand.split(' / ')[0]));
    return ['all', ...Array.from(set)];
  }, [productList]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
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
  }, [selectedCategory, selectedBrand, searchQuery]);

  return (
    <section id="products" className="section section--subtle">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge--primary">Ready at Our Sadar Bazar Shop</span>
          <h2>Explore Tools, Paints & Home Hardware</h2>
          <p>
            Whether you are painting an iron gate, hanging frames, fixing plumbing leaks, or watering your garden, 
            browse our genuine branded collection below or ask us for recommendations.
          </p>
        </div>

        {/* Catalog Search & Controls */}
        <div className="catalog-controls">
          <div className="search-and-brand-row">
            <div className="search-box-wrapper">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Search paint, taparia spanner, bosch drill, garden hose, fevicol, padlocks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <select 
              value={selectedBrand} 
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="brand-select"
            >
              <option value="all">All Brands ({products.length} items)</option>
              {uniqueBrands.filter(b => b !== 'all').map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="category-pills">
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Products Page Link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', padding: '0 0.25rem' }}>
          <span style={{ fontSize: '0.825rem', color: '#64748b' }}>
            Showing <strong>{filteredProducts.length}</strong> items in stock
          </span>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); setSearchQuery(''); }}
                style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}
              >
                Reset Filters
              </button>
            )}

            {onGoToAllProducts && (
              <button
                onClick={onGoToAllProducts}
                style={{ fontSize: '0.825rem', color: 'var(--color-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Open Full Products Page <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Products Grid with Product Images */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const waUrl = `https://wa.me/${shopDetails.whatsappNumber}?text=${encodeURIComponent(
              `Hello Shantinath Traders, I want to buy *${product.name}* (Brand: ${product.brand}) for my home. Please tell me the price and if it's available today.`
            )}`;

            return (
              <div key={product.id} className="product-card">
                {/* Product Image Header with Brand Badge */}
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

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '1.05rem', color: '#64748b', marginBottom: '1rem' }}>
              No products found matching your current filter.
            </p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); setSearchQuery(''); }}
              className="btn btn--primary"
            >
              Clear Search & Show All
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <ProductModal 
          product={activeProduct} 
          onClose={() => setActiveProduct(null)} 
        />
      )}
    </section>
  );
}
