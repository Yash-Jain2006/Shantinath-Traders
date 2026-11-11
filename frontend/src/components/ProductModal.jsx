import React from 'react';
import { X, Check, ShieldCheck, Tag, Box, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { shopDetails } from '../data/shop';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  const waMsg = encodeURIComponent(
    `Hello Shantinath Traders, I am interested in buying *${product.name}* (Brand: ${product.brand}) for my home. What is the price and is it currently ready at your counter?`
  );

  const imgSrc = product.image || '/images/products/taparia-adj-spanner.jpg';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Product Image Banner - Fully Visible, Framed & Uncropped */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '1.25rem',
          background: 'radial-gradient(circle, #ffffff 65%, #f8fafc 100%)',
          border: '1.5px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          boxSizing: 'border-box'
        }}>
          {/* Prominent High-Contrast Close Button */}
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 30
            }}
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <img 
            src={imgSrc} 
            alt={product.name} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              width: 'auto', 
              height: 'auto', 
              objectFit: 'contain',
              display: 'block',
              margin: 'auto'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/products/taparia-adj-spanner.jpg';
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge--amber">{product.brand}</span>
          <span className="badge badge--primary" style={{ textTransform: 'capitalize' }}>
            {product.category?.replace('-', ' ')}
          </span>
          {product.inStock && (
            <span className="badge badge--success">Available in Store</span>
          )}
        </div>

        <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
          {product.name}
        </h2>

        {product.imageSnippet && (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderLeft: '4px solid var(--color-accent)',
            padding: '0.65rem 0.9rem',
            borderRadius: '6px',
            fontSize: '0.825rem',
            color: '#475569',
            marginBottom: '1.15rem'
          }}>
            <strong>Visible in Store:</strong> {product.imageSnippet}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
              Sizes & Quantities Available
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              {product.sizes || 'Standard Household Pack'}
            </span>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>
              {product.variants ? 'Variants Available' : 'Material & Finish'}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              {product.variants || product.material || product.finish || 'Genuine High Quality'}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '1.15rem' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.45rem', color: 'var(--color-primary)' }}>
            Why This Is Great for Your Home:
          </h4>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: '#475569' }}>
            {product.features?.map((f, i) => (
              <li key={i} style={{ marginBottom: '0.3rem' }}>{f}</li>
            ))}
          </ul>
        </div>

        {product.suitableFor && (
          <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', background: '#eff6ff', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #dbeafe' }}>
            <strong style={{ color: '#1e40af' }}>Perfect For: </strong>
            <span style={{ color: '#1e3a8a' }}>{product.suitableFor}</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.65rem', paddingTop: '0.85rem', borderTop: '1px solid #e2e8f0' }}>
          <a
            href={`https://wa.me/${shopDetails.whatsappNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--whatsapp"
            style={{ flex: 1, padding: '0.65rem 1rem' }}
          >
            <MessageSquare size={16} /> Check Price on WhatsApp
          </a>
          <a
            href={`tel:${shopDetails.primaryPhone}`}
            className="btn btn--secondary"
            style={{ padding: '0.65rem 1rem' }}
          >
            <Phone size={16} /> Call Counter
          </a>
        </div>
      </div>
    </div>
  );
}
