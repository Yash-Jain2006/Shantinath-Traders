# Shantinath Traders (शान्तिनाथ ट्रेडर्स) — Fullstack Web Application

A modern, high-performance web platform for **Shantinath Traders**, the trusted hardware, tools, paint and pluming retail store located in Sadar Bazar, Jhansi, Uttar Pradesh.

Designed specifically for retail consumers, homeowners, and DIYers.

---

## 📁 Project Architecture (2 Folders)

```
d:\Shop\
├── frontend\                  # React 19 + Vite + Lucide Icons + B2C UI
│   ├── public\images\shop\    # Authentic verified shop photos & images
│   ├── src\
│   │   ├── components\        # Header, Hero, Catalog, ShoppingList, Gallery, etc.
│   │   ├── data\              # Product catalog & shop details
│   │   ├── App.jsx            # Main app assembly
│   │   ├── index.css          # Design system & responsive styles
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js         # Configured with proxy to backend (/api -> :5000)
│
└── backend\                   # Node.js + Express REST API Server
    ├── data\
    │   ├── products.json      # Product catalog database
    │   ├── categories.json    # Category definitions & counts
    │   ├── shop.json          # Store metadata, location, hours, contacts
    │   └── inquiries.json     # Saved customer shopping lists & inquiries
    ├── server.js              # Express REST API
    ├── package.json
    └── .env.example
```

---

## 🚀 How to Run

### 1. Start the Backend API (Port 5000)

```bash
cd backend
npm install
npm run dev
```

* API Health Check: `http://localhost:5000/api/health`
* Products Endpoint: `http://localhost:5000/api/products`

### 2. Start the Frontend Application (Port 3000)

```bash
cd frontend
npm install
npm run dev
```

* Open in browser: `http://localhost:3000/`

---

## 🛠️ Key Capabilities & Features

* **B2C Catalog**: 28+ items extracted from genuine shop photos across 7 categories (Hand Tools, Home Power Tools, Paints & Enamels, Door Locks & Security, Adhesives & Lubricants, Garden Hoses & Wire Mesh).
* **Create Your Home Shopping List**: Interactive checklist with quick-add pills (+ 1L Apcolite White, + WD-40, + Taparia Spanner, + M-Seal), order persistence on backend (`POST /api/shopping-list`), and automated 1-click WhatsApp checkout to `+91 70075 61887`.
* **Instant WhatsApp Price Buttons**: On every single product card with pre-formatted product specifications.
* **Store Tour & Gallery**: Lightbox showcasing real shop photos with the proprietor at the Sadar Bazar counter.
* **Location & Map**: Landmark directions (*in front of Krishna Cloth House, Sadar Bazar, Jhansi*), opening hours, and Justdial verification.
