import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Wrench, Sparkles, HelpCircle, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import {
  shopDetails
} from '../data/shop';

const articles = [
  {
    id: 1,
    category: "Paints & Finishes",
    title: "How to Paint Iron Gates & Balcony Grills Against Monsoon Rust",
    summary: "A step-by-step guide on surface preparation, applying anti-rust red oxide primer, and double-coating with Asian Paints synthetic enamel for 3+ years of shine.",
    readTime: "4 min read",
    badge: "Most Popular in Jhansi",
    tips: [
      "Scrape all loose flakes with Apollo emery paper (grit 80 or 120).",
      "Apply 1 coat of Master Red Oxide Primer on bare metal before enamel.",
      "Use Apcolite Premium Gloss Enamel with 10-15% mineral turpentine for smooth brush flow."
    ]
  },
  {
    id: 2,
    category: "Hand Tools",
    title: "Spotting 100% Genuine Taparia Tools in Sadar Bazar",
    summary: "Jhansi's hardware market has duplicate tools. Learn how to identify authentic Taparia spanners, cutting pliers, and screwdrivers by stamping, finish, and weight.",
    readTime: "3 min read",
    badge: "Buyer Advisory",
    tips: [
      "Genuine Taparia tools carry a deep, crisp embossed logo and 'MADE IN INDIA'.",
      "Look for smooth phosphate or nickel-chrome finish without sharp flashing lines.",
      "Always buy from authorized stockists like Shantinath Traders with verified counter bills."
    ]
  },
  {
    id: 3,
    category: "Home Security",
    title: "Choosing the Right Harrison Locks for Shop Shutters & Main Doors",
    summary: "Understand the security difference between brass disc padlocks, round shutter locks, and double-locking rim locks for maximum burglary prevention.",
    readTime: "5 min read",
    badge: "Safety First",
    tips: [
      "For rolling shutters: Use Harrison heavy-duty circular shutter locks with hardened steel shackles.",
      "For iron gates: 65mm or 70mm double-locking brass padlocks resist hacksaw and pry-bar attacks.",
      "Never lubricate locks with cooking oil — use WD-40 or graphite powder."
    ]
  },
  {
    id: 4,
    category: "Power Tools",
    title: "Drill Machine Buying Guide: Impact Drill vs Rotary Hammer for Brick Walls",
    summary: "Need to hang heavy photo frames, mount AC brackets, or install curtain rods? Here is how to choose between 10mm, 13mm, and rotary hammer drills.",
    readTime: "4 min read",
    badge: "Tool Guide",
    tips: [
      "For everyday household DIY (up to 10mm screws in brick): A 550W-650W impact drill is lightweight and sufficient.",
      "For RCC columns and lintels: Use SDS-Plus rotary hammer drill to prevent bit slippage.",
      "Always match the masonry drill bit diameter strictly to the wall plug (gitti) size."
    ]
  },
  {
    id: 5,
    category: "Home Maintenance",
    title: "5 Problem-Solving Uses for WD-40 Around Your Jhansi Home",
    summary: "From squeaky door hinges in humid weather to jammed car locks, rusted bolts, and water-displaced spark plugs, discover the power of WD-40 spray.",
    readTime: "3 min read",
    badge: "Quick Fix",
    tips: [
      "Spray on balcony door sliding tracks to dissolve accumulated dust and grime.",
      "Loosen seized bicycle chains and iron padlock mechanisms instantly.",
      "Prevents flash rust on garden shears, spanners, and pliers stored during winter."
    ]
  },
  {
    id: 6,
    category: "Garden & Plumbing",
    title: "Selecting Durable Flexible Garden Hoses & Brass Spray Nozzles",
    summary: "How to avoid kinked, cracked PVC pipes under harsh Jhansi summer heat by choosing braided reinforced 3-layer water pipes.",
    readTime: "3 min read",
    badge: "Watering Guide",
    tips: [
      "Select 1/2-inch or 3/4-inch braided yarn hoses that resist kink collapse.",
      "Use brass adjustable spray guns instead of brittle plastic nozzles.",
      "Store garden hoses looped under shade when not in use to extend life by 3 years."
    ]
  }
];

export default function InsightsPage({ onGoToProducts }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Paints & Finishes', 'Hand Tools', 'Home Security', 'Power Tools', 'Home Maintenance', 'Garden & Plumbing'];

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="insights-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Banner */}
      <section style={{ background: '#0F172A', color: '#ffffff', padding: '3.5rem 0 3rem', borderBottom: '3px solid var(--color-accent)' }}>
        <div className="container">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.78rem',
            color: '#f59e0b',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.65rem'
          }}>
            <BookOpen size={15} /> Practical DIY & Hardware Insights
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', fontWeight: 800, marginBottom: '0.75rem', color: '#ffffff' }}>
            Expert Hardware, Paint &amp; Tool Guides
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', lineHeight: 1.6 }}>
            70+ years of counter experience distilled into practical advice for Jhansi homeowners, contractors, mechanics
            and DIY enthusiasts. Learn what to buy, how to apply it, and how to spot authentic brands.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className="btn"
              style={{
                fontSize: '0.85rem',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                background: activeCategory === c ? '#0F172A' : '#ffffff',
                color: activeCategory === c ? '#ffffff' : '#334155',
                border: activeCategory === c ? '1px solid #0F172A' : '1px solid #e2e8f0',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.18s ease'
              }}
            >
              {c === 'all' ? 'All Guides' : c}
            </button>
          ))}
        </div>

        {/* Grid of articles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
          {filtered.map((item) => (
            <article
              key={item.id}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '1.65rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 600 }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {item.summary}
                </p>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #d97706', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.45rem' }}>
                    KEY COUNTER TIPS:
                  </span>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                    {item.tips.map((t, idx) => (
                      <li key={idx} style={{ marginBottom: '0.35rem' }}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.readTime}</span>
                <a
                  href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20read%20your%20guide%20on%20"${encodeURIComponent(item.title)}"%20and%20need%20product%20recommendations.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}
                >
                  <MessageSquare size={14} /> Ask Counter Staff
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Counter Consultation Box */}
        <div style={{ marginTop: '3.5rem', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '2.5rem', textAlign: 'center', boxShadow: '0 4px 14px rgba(15,23,42,0.06)' }}>
          <Wrench size={36} color="var(--color-accent)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.6rem', color: '#0F172A', fontWeight: 800, marginBottom: '0.65rem' }}>
            Have a Specific Home Repair or Painting Question?
          </h2>
          <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
            You do not need to guess. Walk into our Sadar Bazar shop with a photo of the damaged area or broken part,
            and our counter team will hand you the exact screw, primer, tool, or adhesive you need.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onGoToProducts}
              className="btn btn--primary"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              Browse Catalog <ArrowRight size={16} />
            </button>
            <a
              href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20have%20a%20home%20repair%20question.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--whatsapp"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              <MessageSquare size={16} /> WhatsApp Counter Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

