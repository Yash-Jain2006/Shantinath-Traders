import React from 'react';
import {
  b2cShoppingSteps, consumerProjectTypes
} from '../data/shop';
import { CheckCircle2, Home, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Workflow() {
  return (
    <section id="how-it-works" className="section section--subtle">
      <div className="container">
        {/* Shopping Process Header */}
        <div className="section-header">
          <span className="badge badge--primary">Simple & Reliable</span>
          <h2>How Shopping at Shantinath Traders Works</h2>
          <p>
            No confusion, no running from shop to shop. We make getting the right tools and home supplies 
            straightforward, friendly, and fast.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="workflow-grid" style={{ marginBottom: '4.5rem' }}>
          {b2cShoppingSteps.map((step) => (
            <div key={step.step} className="workflow-card">
              <div className="workflow-step-num">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Home Solutions We Help You Solve */}
        <div id="home-projects" style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
            <span className="badge badge--amber">Popular Home Solutions</span>
            <h3 style={{ fontSize: '1.85rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              Everything You Need for Your Living Space
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              From seasonal painting to everyday DIY fixes, here is how we help families across Jhansi.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {consumerProjectTypes.map((project, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--color-accent-soft)', color: 'var(--color-accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Sparkles size={18} />
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.45rem', color: 'var(--color-primary)' }}>
                  {project.title}
                </h4>
                <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.55 }}>
                  {project.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
