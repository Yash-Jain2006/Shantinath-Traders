import React from 'react';
import {
  shopDetails
} from '../data/shop';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

export default function StoreVisit() {
  return (
    <section id="store-visit" className="store-visit-section">
      <div className="container">
        <div className="store-visit-header">
          <h2>Visit Our Sadar Bazar Store</h2>
          <p>
            Conveniently located in the primary commercial heart of Jhansi.
            Drop in for counter consultations, wholesale pickups, and sample review.
          </p>
        </div>

        <div className="visit-grid">
          {/* Left: Contact Info & Hours */}
          <div className="visit-details-box">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              Store Information & Counter Desk
            </h3>

            {/* Address */}
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={20} />
              </div>
              <div>
                <h4>Address & Landmark</h4>
                <p style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {shopDetails.address}
                </p>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-accent)', marginTop: '2px' }}>
                  Landmark: Exactly in front of Krishna Cloth House
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={20} />
              </div>
              <div>
                <h4>Direct Phone Numbers</h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {shopDetails.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone}`}
                      className="btn btn--secondary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="contact-item">
              <div className="contact-icon">
                <Clock size={20} />
              </div>
              <div>
                <h4>Operating Hours</h4>
                <p><strong>Mon, Wed – Sun:</strong> 9:30 AM – 9:00 PM</p>
                <p><strong>Tuesday:</strong> 9:30 AM – 1:30 PM (Half Day)</p>
              </div>
            </div>

            {/* Verification Links - Single Line 3-Column Layout */}
            <div className="store-visit-action-row">
              <a
                href={shopDetails.justdialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary store-visit-action-btn"
                title="Verified on Justdial"
              >
                <ExternalLink size={13} /> Verified on Justdial
              </a>

              <a
                href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20am%20near%20Sadar%20Bazar%20and%20looking%20for%20your%20shop.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp store-visit-action-btn"
                title="WhatsApp Assistance (+91 70075 61887)"
              >
                <MessageSquare size={13} /> WhatsApp Assistance
              </a>

              <a
                href={`https://wa.me/${shopDetails.whatsappNumber2}?text=Hello%20Shantinath%20Traders,%20I%20am%20near%20Sadar%20Bazar%20and%20looking%20for%20your%20shop.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--whatsapp store-visit-action-btn"
                style={{ background: '#15803d' }}
                title="Alternative WhatsApp Desk (+91 72689 30705)"
              >
                <MessageSquare size={13} /> WhatsApp Assistance (Alt.)
              </a>
            </div>
          </div>

          {/* Right: Interactive Map Card */}
          <div className="map-embed-box">
            <iframe
              title="Shantinath Traders Sadar Bazar Jhansi Map"
              src="https://maps.google.com/maps?q=Sadar+Bazar,+Jhansi,+Uttar+Pradesh+284001&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

