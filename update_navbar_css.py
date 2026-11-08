with open(r'd:\Shop\frontend\src\index.css', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = '/* =========================================\n   MAIN STICKY NAVBAR'
end_marker = '/* =========================================\n   HERO SECTION:'

s_idx = text.find(start_marker)
e_idx = text.find(end_marker)

new_navbar_css = '''/* =========================================
   MAIN STICKY NAVBAR (ANTEENA EXIMP ARCHITECTURE)
   ========================================= */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
  transition: var(--transition);
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem;
}

/* 1. Large, Highly Visible Brand Identity */
.brand-identity {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
}
.brand-st-icon {
  height: 48px;
  width: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
  transition: transform 0.2s ease;
}
.brand-identity:hover .brand-st-icon {
  transform: scale(1.04);
}
.brand-text-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.brand-main-name {
  font-family: var(--font-heading);
  font-size: 1.65rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.025em;
  line-height: 1.05;
  white-space: nowrap;
}
.brand-hindi-sub {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.05em;
  margin-top: 3px;
  line-height: 1;
  white-space: nowrap;
}
.brand-sub-dot {
  color: #cbd5e1;
  margin: 0 4px;
}

/* 2. Navigation Tabs (Strictly Home, Products, Insights, About, Contact us) */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
}
.nav-tab-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  transition: color 0.18s ease;
  background: none;
  border: none;
  padding: 0.4rem 0;
  position: relative;
  cursor: pointer;
}
.nav-tab-link:hover {
  color: var(--color-primary);
}
.nav-tab-link.active {
  color: #0f2e23;
  font-weight: 700;
}
.nav-tab-link.active::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2.5px;
  background: var(--color-accent);
  border-radius: 2px;
}

/* 3. Right End Actions (Strictly Admin and Get a Quote) */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.nav-admin-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.935rem;
  font-weight: 600;
  color: #334155;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.18s ease;
  padding: 0.45rem 0.65rem;
}
.nav-admin-link:hover {
  color: var(--color-primary);
}
.btn--quote-cta {
  background: #0f2e23; /* Anteena Eximp iconic dark green/navy quote button */
  color: #ffffff;
  font-size: 0.925rem;
  font-weight: 700;
  padding: 0.65rem 1.45rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 6px rgba(15, 46, 35, 0.2);
  transition: var(--transition);
  cursor: pointer;
}
.btn--quote-cta:hover {
  background: #164032;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(15, 46, 35, 0.3);
}

/* Mobile Dropdown Menu */
.mobile-menu-dropdown {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: var(--shadow-lg);
}
.mobile-menu-dropdown button {
  text-align: left;
  font-size: 1.05rem;
  font-weight: 600;
  color: #334155;
  padding: 0.35rem 0;
  background: none;
  border: none;
  cursor: pointer;
}
.mobile-menu-dropdown button.mobile-active {
  color: var(--color-accent);
}
.mobile-menu-actions {
  padding-top: 0.85rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

'''

updated_text = text[:s_idx] + new_navbar_css + text[e_idx:]

with open(r'd:\Shop\frontend\src\index.css', 'w', encoding='utf-8') as f:
    f.write(updated_text)

print("Successfully updated frontend/src/index.css with new navbar styles!")

