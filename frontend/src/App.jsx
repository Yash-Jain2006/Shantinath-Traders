import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandsStrip from './components/BrandsStrip';
import CategoryShowcase from './components/CategoryShowcase';
import StoreVisit from './components/StoreVisit';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'products' | 'about' | 'contact' | 'admin'
  const [initialCategory, setInitialCategory] = useState('all');

  const goToStoreVisit = () => {
    setCurrentView('home');
    window.location.hash = 'store-visit';
    setTimeout(() => {
      const el = document.getElementById('store-visit');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const goToContact = () => {
    setCurrentView('contact');
    window.location.hash = 'contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Deep linking via URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#products-page' || hash === '#products' || hash === '#all-products') {
        setCurrentView('products');
      } else if (hash === '#about' || hash === '#legacy') {
        setCurrentView('about');
      } else if (hash === '#contact' || hash === '#contact-us') {
        setCurrentView('contact');
      } else if (hash === '#visit' || hash === '#store-visit') {
        goToStoreVisit();
      } else if (hash === '#admin') {
        setCurrentView('admin');
      } else if (hash === '#home' || !hash) {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const goToProducts = (category = 'all') => {
    setInitialCategory(category);
    setCurrentView('products');
    window.location.hash = 'products';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (view, hash) => {
    if (view === 'products') {
      setInitialCategory('all');
    }
    setCurrentView(view);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {currentView !== 'admin' && (
        <Header currentView={currentView} setCurrentView={handleViewChange} />
      )}

      <main>
        {currentView === 'admin' && (
          <AdminPage onBackToHome={goToHome} />
        )}

        {currentView === 'products' && (
          <ProductsPage onBackToHome={goToHome} initialCategory={initialCategory} />
        )}

        {currentView === 'about' && (
          <AboutPage
            onGoToProducts={goToProducts}
            onGoToContact={goToContact}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onGoToHome={goToHome}
            onGoToProducts={goToProducts}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* 1. Concise, high-converting Hero */}
            <Hero onGoToProducts={goToProducts} />

            {/* 2. Authorized Stockist: strictly in a single clean row */}
            <BrandsStrip />

            {/* 3. Clean Category Shortcuts */}
            <CategoryShowcase onGoToProducts={goToProducts} />

            {/* 4. Quick Sadar Bazar Store Directions & Map */}
            <StoreVisit />
          </>
        )}
      </main>

      {currentView !== 'admin' && (
        <>
          <Footer currentView={currentView} setCurrentView={handleViewChange} />
          <FloatingActions />
        </>
      )}
    </div>
  );
}
