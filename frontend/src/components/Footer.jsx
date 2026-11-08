import React from 'react';
import {
  shopDetails
} from '../data/shop';
import { Phone, MapPin, MessageSquare, ArrowUp } from 'lucide-react';

export default function Footer({ currentView, setCurrentView }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navTo = (view, hash) => {
    if (setCurrentView) setCurrentView(view);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const unusedNavTo = (view) => {
    if (setCurrentView) setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-compact">
      <div className="container">
        {/* Main 3-Column Compact Grid */}
        <div className="footer-compact__grid">
          {/* Brand & Legacy */}
          <div className="footer-compact__brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <img
                src="/images/logo/shantinath_icon.svg"
                alt="Shantinath Traders Icon"
                style={{ width: '38px', height: '38px', borderRadius: '8px' }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  {shopDetails.name}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
                  {shopDetails.hindiName} · 70+ Years of Trust
                </span>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.55, margin: 0, maxWidth: '380px' }}>
              Jhansi’s authorized neighborhood stockist for 100% Genuine Tools, Asian Paints,
              Drills, Padlocks, Abrasives, and Garden Hoses.
            </p>
          </div>

          {/* Quick Pages Navigation */}
          <div className="footer-compact__nav">
            <h4 style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
              Pages
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <li>
                <button
                  onClick={() => navTo('home')}
                  className={`footer-nav-btn ${currentView === 'home' ? 'footer-nav-active' : ''}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('products')}
                  className={`footer-nav-btn ${currentView === 'products' ? 'footer-nav-active' : ''}`}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('about')}
                  className={`footer-nav-btn ${currentView === 'about' ? 'footer-nav-active' : ''}`}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navTo('contact')}
                  className={`footer-nav-btn ${currentView === 'contact' ? 'footer-nav-active' : ''}`}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Direct Desk */}
          <div className="footer-compact__contact">
            <h4 style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
              Sadar Bazar Counter
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', color: '#cbd5e1' }}>
                <MapPin size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Ground Floor, 354, In front of Krishna's, Sadar Bazar, Jhansi, UP (284001)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={15} color="#f59e0b" style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 0.65rem', alignItems: 'center' }}>
                  <a href={`tel:${shopDetails.primaryPhone}`} style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'none' }}>
                    {shopDetails.primaryPhone}
                  </a>
                  <span style={{ color: '#64748b' }}>·</span>
                  <a href={`tel:${shopDetails.secondaryPhone}`} style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'none' }}>
                    {shopDetails.secondaryPhone}
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.2rem' }}>
                <MessageSquare size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: '3px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-start' }}>
                  <a
                    href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20have%20an%20inquiry.`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#86efac', textDecoration: 'none', fontWeight: 600, fontSize: '0.84rem' }}
                  >
                    WhatsApp Assistance Desk <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 400 }}>(+91 70075 61887)</span>
                  </a>
                  <a
                    href={`https://wa.me/${shopDetails.whatsappNumber2}?text=Hello%20Shantinath%20Traders,%20I%20have%20an%20inquiry.`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#86efac', textDecoration: 'none', fontWeight: 600, fontSize: '0.84rem' }}
                  >
                    WhatsApp Desk (Alt) <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 400 }}>(+91 72689 30705)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean, well spaced away from WhatsApp button */}
        <div className="footer-compact__bottom">
          <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Shantinath Traders (शान्तिनाथ ट्रेडर्स) · Sadar Bazar, Jhansi, UP
          </div>


        </div>
      </div>
    </footer>
  );
}
