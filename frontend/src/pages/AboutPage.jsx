import React from 'react';
import { ShieldCheck, Award, Users, Clock, MapPin, CheckCircle2, ArrowRight, HeartHandshake } from 'lucide-react';
import {
  shopDetails
} from '../data/shop';

export default function AboutPage({ onGoToProducts, onGoToContact }) {
  return (
    <div className="about-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section style={{ background: '#0F172A', color: '#ffffff', padding: '4rem 0 3.5rem', borderBottom: '3px solid var(--color-accent)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.8rem', 
              color: '#f59e0b', 
              fontWeight: 700, 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase', 
              marginBottom: '0.75rem' 
            }}>
              <Award size={16} /> 70+ Years of Neighborhood Trust · Sadar Bazar, Jhansi
            </span>
            <h1 style={{ fontSize: 'clamp(2.1rem, 3.5vw, 3rem)', fontWeight: 800, marginBottom: '1rem', color: '#ffffff', lineHeight: 1.18 }}>
              Serving Three Generations of Jhansi Families with 100% Genuine Hardware &amp; Paints.
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.08rem', lineHeight: 1.65 }}>
              Founded over 7 decades ago in the historic heart of Sadar Bazar, Shantinath Traders (शान्तिनाथ ट्रेडर्स) 
              has stood as a benchmark for authenticity, honest counter advice, and reliable building materials.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story & Counter Photo */}
      <section className="container" style={{ marginTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Our Heritage &amp; Promise
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0 1.25rem', lineHeight: 1.25 }}>
              From a Small Counter in Sadar Bazar to Jhansi’s Most Trusted Tool &amp; Paint Stockist.
            </h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '1rem' }}>
              When customers walk through our doors in front of Krishna Cloth House, they aren't just buying a box of screws 
              or a tin of enamel — they rely on advice honed over decades. Whether you are a homeowner fixing a dripping pipe 
              on Sunday morning, a carpenter building custom furniture, or a painting contractor finishing a commercial project, 
              we give you the exact right specification without overselling.
            </p>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              In an era where duplicate tools and adulterated chemicals flood online portals and unverified stalls, 
              Shantinath Traders maintains an uncompromising, zero-compromise policy: every single item is factory-sourced 
              directly from authorized distributors.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ background: '#ffffff', padding: '1.15rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', fontFamily: 'var(--font-heading)' }}>70+</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Years in Sadar Bazar</div>
              </div>
              <div style={{ background: '#ffffff', padding: '1.15rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#16a34a', fontFamily: 'var(--font-heading)' }}>100%</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Guaranteed Authentic</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(15,23,42,0.12)', border: '1px solid #e2e8f0' }}>
              <img 
                src="/images/shop/storefront_owner.jpg" 
                alt="Shantinath Traders Store Counter &amp; Owner in Sadar Bazar Jhansi"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0) 100%)', 
                padding: '2rem 1.5rem 1.25rem',
                color: '#ffffff'
              }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Friendly, Honest Counter Service</div>
                <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>Ground Floor, 354, Sadar Bazar (In front of Krishna Cloth House)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Trust */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Why Families &amp; Pros Choose Us
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', marginTop: '0.4rem' }}>
            Our Four Commitments to You
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#ffffff', padding: '1.85rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Zero Fake Policy</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Every spanner, lock, tin of paint, and drill is 100% authentic. No duplicate copies or second-rate imitations, ever.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.85rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Fair Counter Pricing</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Transparent Sadar Bazar market rates. Whether you need one screw or fifty tins of primer, you get honest value.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.85rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <HeartHandshake size={24} />
            </div>
            <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Practical Guidance</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Tell us your home problem or bring a photo. We explain which tool, grit, or paint solves it most affordably.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.85rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>Ready In-Store Stock</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55 }}>
              Over 500+ standard home repair SKUs organized on our shelves for immediate counter pickup — no waiting for delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Racks Photo Gallery Preview */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem', textAlign: 'center' }}>
          Inside Shantinath Traders (Sadar Bazar)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <img 
              src="/images/shop/paints_and_abrasives.jpg" 
              alt="Asian Paints and Abrasives rack at Shantinath Traders" 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
              Paints, Primers &amp; Abrasives Shelf
            </div>
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <img 
              src="/images/shop/powertools_and_lubricants.jpg" 
              alt="Power tools and lubricants at Shantinath Traders" 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
              Power Drills, Sprays &amp; Lubricants
            </div>
          </div>
          <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#ffffff' }}>
            <img 
              src="/images/shop/handtools_and_hardware.jpg" 
              alt="Hand tools and locks counter at Shantinath Traders" 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
              Hand Tools, Spanners &amp; Padlocks
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div style={{ background: '#0F172A', color: '#ffffff', borderRadius: '16px', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.65rem' }}>
            Looking for Genuine Tools &amp; Paints in Jhansi?
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '580px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            Visit our Sadar Bazar store today or explore our digital catalog online.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onGoToProducts}
              className="btn btn--primary"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              Explore Products <ArrowRight size={16} />
            </button>
            <button 
              onClick={onGoToContact}
              className="btn btn--secondary"
              style={{ background: 'transparent', color: '#ffffff', borderColor: '#475569', padding: '0.75rem 1.4rem' }}
            >
              Get Store Location &amp; Hours
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

