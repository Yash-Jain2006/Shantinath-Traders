import React from 'react';
import { Wrench, Paintbrush, Zap, Droplets, Sparkles, Scissors, Layers, ArrowRight, LockKeyholeIcon, Drill } from 'lucide-react';

const categories = [
  {
    id: 'hand-tools',
    name: 'Hand Tools',
    subtitle: 'Spanners, Pliers, Screwdrivers & Hammers',
    icon: Wrench,
    iconColor: '#d97706',
    iconBg: '#fef3c7',
    tag: '100% Genuine',
    tagColor: '#d97706',
  },
  {
    id: 'paints',
    name: 'Paints & Enamels',
    subtitle: 'Paints, Distamper, Stainer, Sprays & Thinner',
    icon: Paintbrush,
    iconColor: '#dc2626',
    iconBg: '#fee2e2',
    tag: 'Superior Finish',
    tagColor: '#dc2626',
  },
  {
    id: 'locks',
    name: 'Pad Locks',
    subtitle: 'Brass & Steel Padlocks, Door Security',
    icon: LockKeyholeIcon,
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
    tag: 'Reliable Security',
    tagColor: '#2563eb',
  },
  {
    id: 'power-tools',
    name: 'Machine & Power Tools',
    subtitle: 'Drills, Grinders, Saws, Tool Bits & Accessories',
    icon: Drill,
    iconColor: '#ea580c',
    iconBg: '#ffedd5',
    tag: 'Power & Precision',
    tagColor: '#ea580c',
  },
  {
    id: 'garden',
    name: 'Gardening & Pipes',
    subtitle: 'Braided Flexible Water Pipes & Spray Guns',
    icon: Droplets,
    iconColor: '#059669',
    iconBg: '#d1fae5',
    tag: 'All-Weather',
    tagColor: '#059669',
  },
  {
    id: 'adhesives',
    name: 'Adhesives & Sprays',
    subtitle: 'Fevicol HeatX, WD-40 Rust Penetrant & M-Seal',
    icon: Sparkles,
    iconColor: '#7c3aed',
    iconBg: '#ede9fe',
    tag: 'Instant Fix',
    tagColor: '#7c3aed',
  },
  {
    id: 'abrasives',
    name: 'Pipe Fittings',
    subtitle: 'CPVC & UPVC Fittings, Sanding Discs & Cutting',
    icon: Scissors,
    iconColor: '#0891b2',
    iconBg: '#cffafe',
    tag: 'Heavy Use',
    tagColor: '#0891b2',
  },
  {
    id: 'all',
    name: 'All Hardware & Stock',
    subtitle: 'Explore complete 50+ genuine catalog with pricing',
    icon: Layers,
    iconColor: '#4f46e5',
    iconBg: '#e0e7ff',
    tag: 'Full Catalog',
    tagColor: '#4f46e5',
  },
];

export default function CategoryShowcase({ onGoToProducts }) {
  return (
    <section className="category-showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="cat-section-header">
          <div>
            <span className="cat-section-eyebrow">Instant Store Catalog</span>
            <h2 className="cat-section-title">Explore by Category</h2>
          </div>
          <button
            onClick={() => onGoToProducts('all')}
            className="cat-view-all-btn"
          >
            View All Products <ArrowRight size={15} />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="cat-cards-grid">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="cat-card"
                onClick={() => onGoToProducts(c.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onGoToProducts(c.id)}
                aria-label={`Browse ${c.name}`}
              >
                {/* Top row: icon + tag */}
                <div className="cat-card__top">
                  <div
                    className="cat-card__icon-wrap"
                    style={{ background: c.iconBg }}
                  >
                    <Icon size={24} color={c.iconColor} strokeWidth={2} />
                  </div>
                  <span
                    className="cat-card__tag"
                    style={{ color: c.tagColor, background: c.iconBg }}
                  >
                    {c.tag}
                  </span>
                </div>

                {/* Name + subtitle */}
                <div className="cat-card__body">
                  <h3 className="cat-card__name">{c.name}</h3>
                  <p className="cat-card__sub">{c.subtitle}</p>
                </div>

                {/* Footer link */}
                <div className="cat-card__footer" style={{ color: c.iconColor }}>
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
