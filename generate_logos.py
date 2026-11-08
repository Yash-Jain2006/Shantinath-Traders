import os

logo_dir = r'd:\Shop\frontend\public\images\logo'
os.makedirs(logo_dir, exist_ok=True)

# 1. Full Horizontal Logo (SVG)
full_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 110" width="520" height="110">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="darkNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Left Icon Emblem: Hexagon Shield with Gear, Wrench & Paintbrush -->
  <g transform="translate(15, 12)" filter="url(#shadow)">
    <!-- Hexagonal Shield -->
    <polygon points="42,2 78,22 78,64 42,84 6,64 6,22" fill="url(#darkNavy)" stroke="url(#goldGrad)" stroke-width="3.5"/>
    
    <!-- Outer Gear Wheel -->
    <g transform="translate(42,43)">
      <circle r="26" fill="none" stroke="url(#goldGrad)" stroke-width="5" stroke-dasharray="10 6"/>
      <circle r="18" fill="#0F172A" stroke="#F59E0B" stroke-width="2"/>
      
      <!-- Crossed Wrench & Paintbrush -->
      <path d="M-9,-13 L-4,-8 L4,0 L8,8 L13,13 M-9,-13 L-12,-10 L-9,-7 M9,9 L12,12 L9,15" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9,-13 L-6,2 L-9,9 L-3,6 L11,-9 Z" fill="url(#goldGrad)" opacity="0.95"/>
      
      <!-- Center Nut/Rivet -->
      <circle r="4.5" fill="#F59E0B" stroke="#0F172A" stroke-width="1.5"/>
    </g>
  </g>

  <!-- Brand Typography -->
  <!-- Main English Brand Name -->
  <text x="115" y="42" font-family="'Outfit', 'Inter', -apple-system, sans-serif" font-size="28" font-weight="800" fill="#0F172A" letter-spacing="-0.5">
    SHANTINATH <tspan fill="#D97706">TRADERS</tspan>
  </text>

  <!-- Hindi Brand Name in Devanagari -->
  <text x="115" y="68" font-family="'Noto Sans Devanagari', 'Inter', sans-serif" font-size="19" font-weight="700" fill="#D97706" letter-spacing="0.3">
    शान्तिनाथ ट्रेडर्स
  </text>

  <!-- Tagline & Core Specializations -->
  <text x="115" y="88" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#64748B" letter-spacing="1.2">
    TOOLS • HARDWARE • PAINTS • SADAR BAZAR, JHANSI
  </text>

  <!-- Golden Accent Baseline -->
  <line x1="115" y1="96" x2="495" y2="96" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
</svg>'''

with open(os.path.join(logo_dir, 'shantinath_logo.svg'), 'w', encoding='utf-8') as f:
    f.write(full_svg)

# 2. Square Emblem Icon (for Favicon & Badges)
icon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="darkNavy2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
  </defs>

  <rect width="100" height="100" rx="22" fill="url(#darkNavy2)"/>
  <rect x="3.5" y="3.5" width="93" height="93" rx="18.5" fill="none" stroke="url(#goldGrad2)" stroke-width="2.5" opacity="0.8"/>

  <g transform="translate(50,50)">
    <!-- Gear Ring -->
    <circle r="31" fill="none" stroke="url(#goldGrad2)" stroke-width="6" stroke-dasharray="13 7"/>
    <circle r="22" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5"/>
    
    <!-- Crossed Wrench & Paintbrush -->
    <path d="M-11,-15 L-5,-9 L5,1 L11,11 M-13,-13 L-16,-10 L-13,-7 M9,9 L13,13 L9,17" stroke="#FBBF24" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11,-15 L-7,3 L-11,11 L-3,7 L13,-9 Z" fill="url(#goldGrad2)"/>
    
    <!-- Center Bolt -->
    <circle r="5" fill="#F59E0B" stroke="#0F172A" stroke-width="1.5"/>
  </g>
</svg>'''

with open(os.path.join(logo_dir, 'shantinath_icon.svg'), 'w', encoding='utf-8') as f:
    f.write(icon_svg)

print('Successfully generated SVG logos!')

