import React, { useState } from 'react';
import { ShoppingBag, Send, Plus, Copy, Check, MessageSquare } from 'lucide-react';
import {
  shopDetails
} from '../data/shop';

const popularHomeItems = [
  "Taparia 10\" Spanner (for plumbing & taps)",
  "Taparia Combination Pliers (for electrical work)",
  "Taparia Neon Line Tester (for plug sockets)",
  "Asian Paints Apcolite 1L Gloss White (for doors)",
  "Super Synthetic Enamel Black 1L (for iron gates)",
  "Red Oxide Anti-Rust Primer 1L",
  "WD-40 Multi-Spray (for squeaky door hinges)",
  "Fevicol HeatX (for fixing furniture)",
  "M-Seal (for emergency water pipe leaks)",
  "Harrison 75mm Shutter Lock",
  "Solid Brass Padlock (50mm with keys)",
  "Braided Garden Hose 1/2\" (15 meters)",
  "Bosch Impact Drill for concrete walls",
  "Spray Paint Can (Matte Black / Gold)"
];

export default function RFQBuilder() {
  const [listText, setListText] = useState(
    "1. Asian Paints Apcolite 1L Gloss White\n2. Paint Brush 3 inch & Thinner 500ml\n3. WD-40 Spray Can (for squeaky door)\n4. Taparia Line Tester"
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Quick Pickup at Sadar Bazar Store');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickAdd = (item) => {
    setListText((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}\n- ${item}` : `- ${item}`;
    });
  };

  const handleCopy = () => {
    const fullDraft = `*HOME SHOPPING LIST - SHANTINATH TRADERS (JHANSI)*\nName: ${customerName || 'Customer'}\nPreference: ${deliveryOption}\n${deliveryAddress ? `Area: ${deliveryAddress}\n` : ''}\n*Items Needed:*\n${listText}\n\nPlease share total price and confirm availability.`;
    navigator.clipboard.writeText(fullDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let redirectUrl = `https://wa.me/${shopDetails.whatsappNumber}?text=${encodeURIComponent(
      `*HOME SHOPPING LIST - SHANTINATH TRADERS (JHANSI)*\n\n*Name:* ${customerName || 'Customer'}\n*Order Type:* ${deliveryOption}\n${deliveryAddress ? `*Delivery Location:* ${deliveryAddress}\n` : ''}\n*Items Needed for My Home:*\n${listText}\n\n_Please tell me the total amount and when I can pick it up or have it delivered._`
    )}`;

    try {
      // Send to backend API
      const res = await fetch('/api/shopping-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          deliveryOption,
          deliveryAddress,
          items: listText
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.whatsappUrl) {
          redirectUrl = data.whatsappUrl;
        }
      }
    } catch (err) {
      console.log('Backend sync skipped or offline, proceeding to WhatsApp directly:', err);
    } finally {
      setIsSubmitting(false);
      window.open(redirectUrl, '_blank');
    }
  };

  return (
    <section id="shopping-list" className="section section--white">
      <div className="container">
        <div className="section-header">
          <span className="badge badge--amber">Easy Shopping Helper</span>
          <h2>Create Your Home Shopping List</h2>
          <p>
            Planning a home painting touch-up, fixing a plumbing leak, or upgrading door locks? 
            Tap the items below or write down whatever you need. We will check stock, calculate your price, 
            and keep your order packed and ready at the counter!
          </p>
        </div>

        <div className="rfq-container">
          <form onSubmit={handleSendWhatsApp} className="rfq-grid">
            {/* Left: Input Textarea & Quick Add Buttons */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                Your Hardware, Tools & Paint Items:
              </label>
              <textarea 
                className="rfq-textarea"
                value={listText}
                onChange={(e) => setListText(e.target.value)}
                placeholder="Type anything you need for your home (e.g. 1 can white paint, 2 paint brushes, 1 taparia spanner, 1 garden pipe...)"
                required
              />

              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                  Tap to add everyday home essentials:
                </span>
                <div className="quick-add-pills">
                  {popularHomeItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      className="quick-add-btn"
                    >
                      <Plus size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '3px' }} />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact & Pickup/Delivery Preference */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                  Pickup or Delivery Preference
                </h4>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.35rem', color: '#475569' }}>
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Amit Sharma"
                    className="search-input"
                    style={{ padding: '0.65rem 0.9rem', background: '#f8fafc' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.35rem', color: '#475569' }}>
                    Mobile Number (Optional)
                  </label>
                  <input 
                    type="tel" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="search-input"
                    style={{ padding: '0.65rem 0.9rem', background: '#f8fafc' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.35rem', color: '#475569' }}>
                    How would you like to receive it?
                  </label>
                  <select 
                    value={deliveryOption} 
                    onChange={(e) => setDeliveryOption(e.target.value)}
                    className="brand-select"
                    style={{ width: '100%', padding: '0.65rem 0.9rem' }}
                  >
                    <option value="Quick Pickup at Sadar Bazar Store">Self Pickup at Sadar Bazar Shop (Ready in 10 mins)</option>
                    <option value="Home Delivery in Jhansi City">Doorstep Home Delivery across Jhansi</option>
                  </select>
                </div>

                {deliveryOption.includes('Delivery') && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.35rem', color: '#475569' }}>
                      Your Colony / Area in Jhansi
                    </label>
                    <input 
                      type="text" 
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. Civil Lines, Sipri Bazar, Cantt, Elite Chauraha..."
                      className="search-input"
                      style={{ padding: '0.65rem 0.9rem', background: '#f8fafc' }}
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn--whatsapp"
                  style={{ width: '100%', padding: '0.85rem 1.25rem', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  <MessageSquare size={18} /> {isSubmitting ? 'Processing...' : 'Send List on WhatsApp'}
                </button>

                <button 
                  type="button" 
                  onClick={handleCopy}
                  className="btn btn--secondary"
                  style={{ width: '100%', fontSize: '0.875rem' }}
                >
                  {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
                  <span>{copied ? 'List Copied to Clipboard!' : 'Copy My List'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
