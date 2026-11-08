import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, User, Sparkles, ArrowRight } from 'lucide-react';
import {
  shopDetails
} from '../data/shop';

export default function ContactPage({ onGoToHome }) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    subject: 'Product Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMessage('Please provide your name and message.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        if (data.whatsappUrl) {
          setWhatsappRedirectUrl(data.whatsappUrl);
        }
      } else {
        fallbackSubmit();
      }
    } catch (err) {
      fallbackSubmit();
    } finally {
      setSubmitting(false);
    }
  };

  const fallbackSubmit = () => {
    const waText = `*NEW INQUIRY - SHANTINATH TRADERS*\n*Name:* ${formData.name}\n${formData.phone ? `*Phone:* ${formData.phone}\n` : ''}${formData.email ? `*Email:* ${formData.email}\n` : ''}${formData.city ? `*City:* ${formData.city}\n` : ''}*Subject:* ${formData.subject}\n*Requirement:*\n${formData.message}\n\n_Please confirm stock and pricing._`;
    const fallbackUrl = `https://wa.me/${shopDetails.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    setWhatsappRedirectUrl(fallbackUrl);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setWhatsappRedirectUrl('');
    setFormData({
      name: '', city: '', email: '', phone: '',
      subject: 'Product Inquiry', message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* Decorative Background Elements */}
      <div className="contact-bg-accent" aria-hidden="true">
        <div className="contact-bg-circle contact-bg-circle--1" />
        <div className="contact-bg-circle contact-bg-circle--2" />
        <div className="contact-bg-grid-pattern" />
      </div>

      <div className="container">
        {/* Compact Hero Section */}
        <div className="contact-hero">
          <div className="contact-hero-badge">
            <Sparkles size={13} />
            <span>We'd love to hear from you</span>
          </div>
          <h1 className="contact-hero-title">
            Start with a clear requirement.
          </h1>
          <p className="contact-hero-subtitle">
            Share your product, quantity, and timing. Our trade desk will review the information and respond promptly.
          </p>
        </div>

        {/* Two-Column Equal-Height Compact Grid */}
        <div className="contact-editorial-grid">

          {/* ─── Left Card: Get in Touch ─── */}
          <div className="contact-info-card">
            <div>
              <h2 className="contact-serif-h2">Get in touch</h2>
              <p className="contact-info-desc">
                For pricing, quotes, or product inquiries, reach out directly or send us a message.
              </p>

              <div className="contact-info-list">
                {/* Business Email */}
                <div className="contact-info-row">
                  <div className="contact-info-icon-wrap">
                    <Mail size={16} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Business Email</span>
                    <a href={`mailto:${shopDetails.email}`} className="contact-info-val">
                      {shopDetails.email}
                    </a>
                  </div>
                </div>

                {/* Primary Contact & WhatsApp */}
                <div className="contact-info-row">
                  <div className="contact-info-icon-wrap">
                    <Phone size={16} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Primary Contact & WhatsApp</span>
                    <a href={`tel:${shopDetails.primaryPhone}`} className="contact-info-val">
                      {shopDetails.primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Alt Contact & WhatsApp */}
                <div className="contact-info-row">
                  <div className="contact-info-icon-wrap">
                    <Phone size={16} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Alt. Contact & WhatsApp</span>
                    <a href={`tel:${shopDetails.secondaryPhone}`} className="contact-info-val">
                      {shopDetails.secondaryPhone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-info-row">
                  <div className="contact-info-icon-wrap contact-info-icon-wrap--loc">
                    <MapPin size={16} />
                  </div>
                  <div className="contact-info-meta">
                    <span className="contact-info-label">Location</span>
                    <span className="contact-info-val">
                      Sadar Bazar, Jhansi, UP (India)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTAs inside info card (Primary + Alt Number) */}
            <div className="contact-wa-cta">
              <a
                href={`https://wa.me/${shopDetails.whatsappNumber}?text=Hello%20Shantinath%20Traders,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa-btn"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp ({shopDetails.primaryPhone})</span>
                <ArrowRight size={14} />
              </a>
              <a
                href={`https://wa.me/${shopDetails.whatsappNumber2}?text=Hello%20Shantinath%20Traders,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa-btn contact-wa-btn--alt"
              >
                <MessageSquare size={16} />
                <span>WhatsApp (Alt: {shopDetails.secondaryPhone})</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* ─── Right Card: Inquiry Form ─── */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-banner">
                <div className="contact-success-icon-wrap">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="contact-success-title">Inquiry Received!</h3>
                <p className="contact-success-text">
                  Thank you! Our trade desk will review your requirement and connect with you promptly.
                </p>

                {whatsappRedirectUrl && (
                  <a
                    href={whatsappRedirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-wa-redirect-btn"
                  >
                    <MessageSquare size={16} /> Open in WhatsApp for Instant Quote
                  </a>
                )}

                <button
                  type="button"
                  onClick={resetForm}
                  className="contact-reset-btn"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-inner">
                <div>
                  <div className="contact-form-header">
                    <h3 className="contact-form-title">Send us a message</h3>
                    <p className="contact-form-subtitle">Fill in the details and we'll get back to you promptly.</p>
                  </div>

                  <div className="contact-form-grid">
                    {/* Row 1: Name* | City */}
                    <div className={`contact-form-field ${focusedField === 'name' ? 'focused' : ''}`}>
                      <label className="contact-form-label" htmlFor="c-name">Name *</label>
                      <input
                        id="c-name" name="name" type="text" required
                        placeholder="Your name or business"
                        value={formData.name} onChange={handleChange}
                        className="contact-input"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className={`contact-form-field ${focusedField === 'city' ? 'focused' : ''}`}>
                      <label className="contact-form-label" htmlFor="c-city">City</label>
                      <input
                        id="c-city" name="city" type="text"
                        placeholder="e.g. Jhansi"
                        value={formData.city} onChange={handleChange}
                        className="contact-input"
                        onFocus={() => setFocusedField('city')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Row 2: Email | Phone/WhatsApp* */}
                    <div className={`contact-form-field ${focusedField === 'email' ? 'focused' : ''}`}>
                      <label className="contact-form-label" htmlFor="c-email">Email</label>
                      <input
                        id="c-email" name="email" type="email"
                        placeholder="name@example.com"
                        value={formData.email} onChange={handleChange}
                        className="contact-input"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className={`contact-form-field ${focusedField === 'phone' ? 'focused' : ''}`}>
                      <label className="contact-form-label" htmlFor="c-phone">Phone / WhatsApp *</label>
                      <input
                        id="c-phone" name="phone" type="tel" required
                        placeholder="+91 98765 43210"
                        value={formData.phone} onChange={handleChange}
                        className="contact-input"
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* Row 3: Subject* (full width) */}
                    <div className={`contact-form-field full-width ${focusedField === 'subject' ? 'focused' : ''}`}>
                      <label className="contact-form-label" htmlFor="c-subject">Subject *</label>
                      <select
                        id="c-subject" name="subject" required
                        value={formData.subject} onChange={handleChange}
                        className="contact-select"
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Bulk Wholesale Order">Bulk / Wholesale Order</option>
                        <option value="Asian Paints Quotation">Asian Paints &amp; Enamels</option>
                        <option value="Taparia Hand Tools">Taparia Hand Tools</option>
                        <option value="Bosch & Power Tools">Bosch &amp; Power Tools</option>
                        <option value="Padlocks & Hardware">Padlocks &amp; Hardware Fittings</option>
                        <option value="Store Visit & Pickup">Store Visit &amp; Counter Pickup</option>
                      </select>
                    </div>

                    {/* Row 4: Message* (full width) */}
                    <div className={`contact-form-field full-width ${focusedField === 'message' ? 'focused' : ''}`}>
                      <label className="contact-form-label" htmlFor="c-message">Message *</label>
                      <textarea
                        id="c-message" name="message" required rows={3}
                        placeholder="Tell us the product, quantity, and any specification requirements."
                        value={formData.message} onChange={handleChange}
                        className="contact-textarea"
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="contact-error-msg">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" disabled={submitting} className="btn--anteena-submit">
                  <Send size={15} />
                  <span>{submitting ? 'Submitting...' : 'Send inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
