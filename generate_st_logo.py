import os

logo_dir = r'd:\Shop\frontend\public\images\logo'
os.makedirs(logo_dir, exist_ok=True)

# 1. Full Horizontal Logo with ST Monogram
full_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 110" width="540" height="110">
  <defs>
    <linearGradient id="stGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="35%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="stNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="stMetallic" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#FDE68A" />
    </linearGradient>
    <filter id="stShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Left Emblem: Hexagonal Shield with Bold 'ST' Monogram -->
  <g transform="translate(14, 10)" filter="url(#stShadow)">
    <!-- Outer Hexagon Badge -->
    <polygon points="45,2 84,23 84,67 45,88 6,67 6,23" fill="url(#stNavy)" stroke="url(#stGold)" stroke-width="3.5" stroke-linejoin="round"/>
    
    <!-- Subtle Inner Hexagon Ring -->
    <polygon points="45,8 78,26 78,64 45,82 12,64 12,26" fill="none" stroke="url(#stGold)" stroke-width="1" stroke-dasharray="6 4" opacity="0.4"/>
    
    <!-- Interlocking ST Monogram Graphic -->
    <g transform="translate(45, 45)">
      <!-- Gear accents on hexagon border (mini notches) -->
      <circle cx="0" cy="-38" r="3.5" fill="#F59E0B" />
      <circle cx="0" cy="38" r="3.5" fill="#F59E0B" />
      <circle cx="-34" cy="0" r="3.5" fill="#F59E0B" />
      <circle cx="34" cy="0" r="3.5" fill="#F59E0B" />
      
      <!-- ST Monogram Text (Bold, Custom Crafted Geometry) -->
      <!-- 'S' Letter -->
      <path d="M-5,-21 C-15,-21 -22,-14 -22,-5 C-22,6 -13,10 -3,14 C7,18 10,21 10,26 C10,31 4,35 -5,35 C-14,35 -21,30 -23,23 L-13,21 C-12,25 -8,28 -4,28 C1,28 3,25 3,22 C3,18 -3,14 -12,10 C-21,6 -28,1 -28,-7 C-28,-17 -19,-26 -5,-26 C3,-26 12,-22 15,-16 L6,-11 C4,-16 -1,-21 -5,-21 Z" fill="url(#stGold)"/>

      <!-- 'T' Letter (Interlaced Behind/Over S in High Contrast) -->
      <!-- Top Crossbar of T -->
      <path d="M-8,-26 L26,-26 L26,-18 L13,-18 L13,34 L4,34 L4,-18 L-8,-18 Z" fill="url(#stMetallic)" opacity="0.95"/>
      
      <!-- Monogram Accent Rivet -->
      <circle cx="10" cy="-22" r="2.5" fill="#0F172A" />
    </g>
  </g>

  <!-- Brand Typography -->
  <!-- Main English Brand Name -->
  <text x="120" y="42" font-family="'Outfit', 'Inter', -apple-system, sans-serif" font-size="28" font-weight="800" fill="#0F172A" letter-spacing="-0.5">
    SHANTINATH <tspan fill="#D97706">TRADERS</tspan>
  </text>

  <!-- Hindi Brand Name in Devanagari -->
  <text x="120" y="68" font-family="'Noto Sans Devanagari', 'Inter', sans-serif" font-size="19" font-weight="700" fill="#D97706" letter-spacing="0.3">
    शान्तिनाथ ट्रेडर्स
  </text>

  <!-- Tagline & Core Specializations -->
  <text x="120" y="88" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#64748B" letter-spacing="1.2">
    TOOLS • HARDWARE • PAINTS • SADAR BAZAR, JHANSI
  </text>

  <!-- Golden Accent Baseline -->
  <line x1="120" y1="96" x2="510" y2="96" stroke="url(#stGold)" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
</svg>'''

with open(os.path.join(logo_dir, 'shantinath_logo.svg'), 'w', encoding='utf-8') as f:
    f.write(full_svg)

# 2. Standalone ST Monogram Badge (Icon & Favicon)
icon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="stIconGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="35%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="stIconNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
  </defs>

  <!-- Rounded Hexagon Base -->
  <rect width="100" height="100" rx="24" fill="url(#stIconNavy)"/>
  <rect x="3.5" y="3.5" width="93" height="93" rx="20.5" fill="none" stroke="url(#stIconGold)" stroke-width="2.5" opacity="0.85"/>

  <!-- Geometric ST Monogram -->
  <g transform="translate(50, 50)">
    <!-- 'S' Letter -->
    <path d="M-6,-24 C-17,-24 -25,-16 -25,-6 C-25,6 -15,11 -4,15 C7,19 11,23 11,29 C11,35 4,39 -6,39 C-16,39 -24,33 -26,25 L-15,23 C-14,28 -9,31 -5,31 C1,31 4,28 4,24 C4,20 -2,16 -12,12 C-22,8 -30,2 -30,-7 C-30,-18 -20,-28 -5,-28 C4,-28 14,-24 17,-17 L7,-12 C5,-18 0,-24 -6,-24 Z" fill="url(#stIconGold)"/>

    <!-- 'T' Letter (Interlaced) -->
    <path d="M-9,-29 L28,-29 L28,-20 L14,-20 L14,37 L4,37 L4,-20 L-9,-20 Z" fill="#FDE68A"/>

    <!-- Accent Rivets -->
    <circle cx="11" cy="-24.5" r="3" fill="#0F172A"/>
  </g>
</svg>'''

with open(os.path.join(logo_dir, 'shantinath_icon.svg'), 'w', encoding='utf-8') as f:
    f.write(icon_svg)

print("Generated new ST Monogram Logo and Icon successfully!")

