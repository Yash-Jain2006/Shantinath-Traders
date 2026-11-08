import React, { useState } from 'react';
import {
  Phone, MapPin, Clock, MessageSquare, X, User, Lock,
  Eye, EyeOff, ShieldCheck, ArrowRight, KeyRound
} from 'lucide-react';
import {
  shopDetails
} from '../data/shop';

export default function Header({ currentView, setCurrentView }) {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminId, setAdminId] = useState('7007561887');
  const [passcode, setPasscode] = useState('admin1968');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleNav = (viewName, hash) => {
    if (setCurrentView) setCurrentView(viewName);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminId.trim() || !passcode.trim()) {
      setLoginError('Please enter Admin ID and passcode');
      return;
    }

    setLoginError('');
    setLoginLoading(true);

    setTimeout(() => {
      setLoginLoading(false);
      setAdminModalOpen(false);
      if (setCurrentView) setCurrentView('admin');
      window.location.hash = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  };

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="top-announcement">
        <div className="container">
          <div className="top-announcement__content">
            <div className="top-announcement__left">
              <span className="badge badge--success" style={{ fontSize: '0.7rem', padding: '0.15rem 0.55rem' }}>
                Open Today
              </span>
              <span>
                <MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                Sadar Bazar, Jhansi (In front of Krishna Cloth House)
              </span>
              <span>
                <Clock size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                9:30 AM – 9:00 PM
              </span>
            </div>
            <div className="top-announcement__right">
              <a href={`tel:${shopDetails.primaryPhone}`}>
                <Phone size={13} />
                Call: {shopDetails.primaryPhone}
              </a>
              <a 
                href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#86efac' }}
              >
                <MessageSquare size={13} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="navbar">
        <div className="container">
          <div className="navbar__inner">
            
            {/* 1. Large, Highly Visible Brand Identity */}
            <div 
              onClick={() => handleNav('home')} 
              className="brand-identity" 
              style={{ cursor: 'pointer' }}
              title="Shantinath Traders"
            >
              <img 
                src="/images/logo/shantinath_icon.svg" 
                alt="ST Monogram" 
                className="brand-st-icon"
              />
              <div className="brand-text-block">
                <span className="brand-main-name">SHANTINATH TRADERS</span>
                <span className="brand-hindi-sub">शान्तिनाथ ट्रेडर्स</span>
                <span className="brand-tagline">Tools · Paints · Hardware · Plumbing</span>
              </div>
            </div>

            {/* 2. Navigation Panel: Strictly Home, Products, About, Contact us */}
            <nav className="nav-links">
              <button 
                onClick={() => handleNav('home')} 
                className={`nav-tab-link ${currentView === 'home' ? 'active' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNav('products')} 
                className={`nav-tab-link ${currentView === 'products' ? 'active' : ''}`}
              >
                Products
              </button>
              <button 
                onClick={() => handleNav('about')} 
                className={`nav-tab-link ${currentView === 'about' ? 'active' : ''}`}
              >
                About
              </button>
              <button 
                onClick={() => handleNav('contact')} 
                className={`nav-tab-link ${currentView === 'contact' ? 'active' : ''}`}
              >
                Contact
              </button>
            </nav>

            {/* 3. Right End Actions: Strictly Admin and Get a Quote */}
            <div className="nav-actions">
              {/* Admin Link */}
              <button 
                onClick={() => setAdminModalOpen(true)}
                className="nav-admin-link"
                title="Admin Desk"
              >
                <User size={17} />
                <span>Admin</span>
              </button>

              {/* Get a Quote Button */}
              <button 
                onClick={() => handleNav('contact')}
                className="btn btn--quote-cta"
                title="Request / Create a Quote"
              >
                Get a Quote
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Admin Quick Portal Modal (Clean & Focused) ─── */}
      {adminModalOpen && (
        <div className="modal-backdrop" onClick={() => setAdminModalOpen(false)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Top Decorative Gold/Amber Accent Line */}
            <div className="admin-modal-top-accent" />

            {/* Close Button */}
            <button
              className="admin-modal-close-btn"
              onClick={() => setAdminModalOpen(false)}
              title="Close"
              type="button"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="admin-modal-header">
              <div className="admin-modal-icon-wrap">
                <img
                  src="/images/logo/shantinath_icon.svg"
                  alt="ST Logo"
                  className="admin-modal-st-icon"
                />
                <span className="admin-modal-lock-badge">
                  <ShieldCheck size={13} />
                </span>
              </div>

              <div className="admin-modal-title-group">
                <h3 className="admin-modal-title">Admin Desk</h3>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAdminLogin} className="admin-modal-form">
              {/* Field 1: Admin ID / Mobile */}
              <div className="admin-field-group">
                <label className="admin-field-label" htmlFor="admin-id">
                  Admin ID / Mobile
                </label>
                <div className="admin-input-wrapper">
                  <User size={18} className="admin-input-icon" />
                  <input
                    id="admin-id"
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="e.g. 7007561887"
                    className="admin-field-input"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Field 2: Passcode */}
              <div className="admin-field-group">
                <label className="admin-field-label" htmlFor="admin-passcode">
                  Passcode
                </label>
                <div className="admin-input-wrapper">
                  <KeyRound size={18} className="admin-input-icon" />
                  <input
                    id="admin-passcode"
                    type={showPassword ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode"
                    className="admin-field-input"
                    required
                  />
                  <button
                    type="button"
                    className="admin-pwd-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide passcode' : 'Show passcode'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="admin-error-banner">
                  {loginError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="btn--admin-submit"
                style={{ marginTop: '0.75rem' }}
              >
                {loginLoading ? (
                  <span>Signing into counter...</span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Footer Trust & Security Note */}
            <div className="admin-modal-footer">
              <ShieldCheck size={14} className="admin-footer-shield" />
              <span>Authorized Staff Only · Sadar Bazar, Jhansi Counter</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
