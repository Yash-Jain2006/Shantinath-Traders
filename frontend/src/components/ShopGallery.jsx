import React, { useState } from 'react';
import {
  shopPhotos, shopDetails
} from '../data/shop';
import { Camera, MapPin, Eye, CheckCircle2, X } from 'lucide-react';

export default function ShopGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="store-tour" className="section section--white">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--success">
            <Camera size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
            Visual Transparency & Verified Premises
          </span>
          <h2>Inside Shantinath Traders: Our Storefront & Counters</h2>
          <p>
            Experience the real inventory behind our name. Browse our organized tool counters, 
            paint stock racks, and heavy-duty hardware shelves located in Sadar Bazar, Jhansi.
          </p>
        </div>

        <div className="gallery-grid">
          {shopPhotos.map((photo, idx) => (
            <div key={idx} className="gallery-card" onClick={() => setSelectedPhoto(photo)}>
              <div className="gallery-img-box">
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}>
                  <Eye size={13} /> View Photo
                </div>
              </div>
              <div className="gallery-info">
                <h4>{photo.title}</h4>
                <p>{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Strip */}
        <div style={{
          marginTop: '2.5rem',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>100% Physical Shop & Live Inventory</h4>
              <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
                All photos are captured on-site at Ground Floor, 354, Sadar Bazar, Jhansi.
              </p>
            </div>
          </div>

          <a 
            href={shopDetails.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <MapPin size={15} color="#d97706" /> Open Google Maps Directions
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="modal-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div 
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '95%',
              background: '#0f172a',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedPhoto(null)}
              style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
            >
              <X size={20} />
            </button>
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.title} 
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', display: 'block', background: '#000' }}
            />
            <div style={{ padding: '1.25rem 1.5rem', background: '#0f172a', color: '#ffffff' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '0.35rem' }}>{selectedPhoto.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

