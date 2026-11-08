import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Hero({ onGoToProducts }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Consumer-Centric Headline & Value Prop */}
          <div className="hero-copy">
            <span className="badge badge--amber" style={{ width: 'fit-content' }}>
              <ShieldCheck size={14} /> Jhansi's Trusted Neighborhood Retail Store · Sadar Bazar
            </span>

            <h1>
              Everything for Your Home, Garden &amp; DIY Repairs. <br />
              <span style={{ color: 'var(--color-accent)' }}>Genuine Tools &amp; Paints in Jhansi.</span>
            </h1>

            <p>
              Looking for a reliable drill to hang picture frames, fresh Asian Paints to brighten your iron gates, 
              a sturdy Harrison lock for your family's safety, or a flexible garden hose? 
              Get 100% authentic brands, honest retail prices, and friendly advice at our Sadar Bazar counter.
            </p>

            <div className="hero-actions">
              <button 
                onClick={onGoToProducts} 
                className="btn btn--primary"
                style={{ fontSize: '0.95rem', padding: '0.8rem 1.45rem' }}
              >
                Browse Products <ArrowRight size={16} />
              </button>
            </div>

            {/* Credibility Stats for Homeowners */}
            <div className="hero-stats">
              <div className="hero-stat-card">
                <span className="number">70+</span>
                <span className="label">Years of trust &amp; service in Jhansi</span>
              </div>
              <div className="hero-stat-card">
                <span className="number">500+</span>
                <span className="label">Genuine branded home &amp; tool items ready in store</span>
              </div>
              <div className="hero-stat-card">
                <span className="number">100%</span>
                <span className="label">Guaranteed authentic (No duplicate copies)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Storefront Card */}
          <div className="hero-visual">
            <div className="hero-card-preview">
              <div className="hero-card-image">
                <img 
                  src="/images/shop/storefront_owner.jpg" 
                  alt="Shantinath Traders Retail Counter and Storefront in Sadar Bazar Jhansi" 
                />
                <div className="hero-card-overlay-badge">
                  <HeartHandshake size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px', color: '#4ade80' }} />
                  Friendly Counter Service
                </div>
              </div>
              <div className="hero-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>
                    Sadar Bazar Retail Counter
                  </span>
                  <span style={{ fontSize: '0.775rem', color: '#16a34a', fontWeight: 600 }}>
                    ● Open for Walk-ins Today
                  </span>
                </div>
                <h3>Shantinath Traders (शान्तिनाथ ट्रेडर्स)</h3>
                <p>
                  Visit us in front of Krishna Cloth House. Tell us what you want to fix or paint, 
                  and we will guide you with the exact right tool, brush, or screw.
                </p>
                <div className="hero-card-pill-tags">
                  <span>Wall &amp; Gate Paints</span>
                  <span>Safety Door Locks</span>
                  <span>Garden Hoses</span>
                  <span>DIY Adhesives</span>
                  <span>Power Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
