import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { supabase, getCachedProducts, setCachedProducts, invalidateCache } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const shopFilePath = path.join(__dirname, 'data', 'shop.json');
const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const inquiriesFilePath = path.join(__dirname, 'data', 'inquiries.json');

// Multer storage for product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'products');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = req.body.id || `product-${Date.now()}`;
    cb(null, `${name}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Helper to read JSON
function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

// Helper to write JSON
function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Helper: Synchronize products to frontend/src/data/products.js so UI is always in sync
function syncFrontendProducts(products) {
  try {
    const fePath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'products.js');
    if (!fs.existsSync(fePath)) return;
    const content = fs.readFileSync(fePath, 'utf8');
    const startMarker = 'export const products = ';
    const endMarker = 'export const consumerProjectTypes = ';
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker);
    if (startIdx !== -1 && endIdx !== -1) {
      const before = content.substring(0, startIdx);
      const after = content.substring(endIdx);
      const updatedProductsJs = `${before}export const products = ${JSON.stringify(products, null, 2)};\n\n${after}`;
      fs.writeFileSync(fePath, updatedProductsJs, 'utf8');
      console.log('✅ Synchronized frontend/src/data/products.js');
    }
  } catch (err) {
    console.error('Failed to sync frontend products.js:', err.message);
  }
}

// Local JSON is the ground truth, instantly updated by admin and synced with Supabase
async function getLiveProducts() {
  const local = readJson(productsFilePath);
  return local;
}

// Background / Awaited Dual-Write to Supabase
async function dualWriteToSupabase(action, product) {
  if (!product) return;
  const combinedSizes = product.variants 
    ? (product.sizes ? `${product.sizes} (Variants: ${product.variants})` : product.variants)
    : (product.sizes || '');

  const dbItem = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    sizes: combinedSizes,
    material: product.material || '',
    finish: product.finish || '',
    features: product.features || [],
    suitable_for: product.suitableFor || '',
    in_stock: product.inStock ?? true,
    featured: product.featured ?? false,
    image: product.image || '',
    image_snippet: product.imageSnippet || '',
    hsn_code: product.hsnCode || '',
    mrp: product.mrp || null
  };

  try {
    if (action === 'upsert') {
      const { error } = await supabase.from('products').upsert(dbItem, { onConflict: 'id' });
      if (error && !error.message.includes('Could not find the table')) {
        console.warn('Supabase upsert note:', error.message);
      }
    } else if (action === 'delete') {
      const { error } = await supabase.from('products').delete().eq('id', product.id);
      if (error) {
        console.warn('Supabase delete note:', error.message);
      }
    }
  } catch (err) {
    console.warn('Supabase dualWrite error:', err.message);
  }
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: 'Shantinath Traders API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Shop Details & Contact Info
app.get('/api/shop', (req, res) => {
  const shopData = readJson(shopFilePath);
  res.json(shopData);
});

// 3. Categories List
app.get('/api/categories', (req, res) => {
  const categories = readJson(categoriesFilePath);
  res.json(categories);
});

// 4. Unique Brands List
app.get('/api/brands', (req, res) => {
  const products = readJson(productsFilePath);
  const brandsSet = new Set();
  products.forEach(p => {
    if (p.brand) {
      p.brand.split(' / ').forEach(b => brandsSet.add(b.trim()));
    }
  });
  res.json(Array.from(brandsSet));
});

// 5. Products Catalog with Search & Filtering
app.get('/api/products', async (req, res) => {
  const { category, brand, search, featured } = req.query;
  let products = await getLiveProducts();

  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }

  if (brand && brand !== 'all') {
    products = products.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
  }

  if (featured === 'true') {
    products = products.filter(p => p.featured === true);
  }

  if (search) {
    const q = search.toLowerCase().trim();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.suitableFor && p.suitableFor.toLowerCase().includes(q)) ||
      (p.sizes && p.sizes.toLowerCase().includes(q))
    );
  }

  res.json({
    total: products.length,
    products
  });
});

// 6. Single Product by ID
app.get('/api/products/:id', (req, res) => {
  const products = readJson(productsFilePath);
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

// 7. Submit Home Shopping List / Customer Inquiry
app.post('/api/shopping-list', (req, res) => {
  const { customerName, phone, deliveryOption, deliveryAddress, items } = req.body;

  if (!items || !items.trim()) {
    return res.status(400).json({ error: 'Please provide items list' });
  }

  const inquiries = readJson(inquiriesFilePath);
  const newInquiry = {
    id: `INQ-${Date.now()}`,
    customerName: customerName || 'Retail Customer',
    phone: phone || '',
    deliveryOption: deliveryOption || 'Quick Pickup at Sadar Bazar Store',
    deliveryAddress: deliveryAddress || '',
    items: items.trim(),
    createdAt: new Date().toISOString(),
    status: 'pending_confirmation'
  };

  inquiries.unshift(newInquiry);
  writeJson(inquiriesFilePath, inquiries);

  // Generate WhatsApp message and redirect URL
  const shopData = readJson(shopFilePath);
  const waNumber = shopData.whatsappNumber || '917007561887';
  const waMessage = `*HOME SHOPPING LIST - SHANTINATH TRADERS (JHANSI)*\n*Reference ID:* ${newInquiry.id}\n*Customer:* ${newInquiry.customerName}\n*Preference:* ${newInquiry.deliveryOption}\n${newInquiry.deliveryAddress ? `*Location:* ${newInquiry.deliveryAddress}\n` : ''}\n*Items Needed:*\n${newInquiry.items}\n\n_Please confirm stock and total price._`;
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  res.status(201).json({
    success: true,
    message: 'Shopping list recorded successfully',
    inquiry: newInquiry,
    whatsappUrl
  });
});

// Contact Form Inquiry (Anteena Eximp Style)
app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, city, subject, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Please provide name and message' });
  }

  const inquiries = readJson(inquiriesFilePath);
  const newInquiry = {
    id: `INQ-${Date.now()}`,
    customerName: name.trim(),
    email: email ? email.trim() : '',
    phone: phone ? phone.trim() : '',
    city: city ? city.trim() : '',
    subject: subject || 'Product Inquiry',
    deliveryOption: 'Direct Website Inquiry',
    items: message.trim(),
    createdAt: new Date().toISOString(),
    status: 'pending_confirmation'
  };

  inquiries.unshift(newInquiry);
  writeJson(inquiriesFilePath, inquiries);

  // Background Dual-write to Supabase inquiries table (Non-blocking)
  supabase.from('inquiries').insert([{
    id: newInquiry.id,
    customer_name: newInquiry.customerName,
    phone: newInquiry.phone,
    email: newInquiry.email,
    city: newInquiry.city,
    subject: newInquiry.subject,
    delivery_option: newInquiry.deliveryOption,
    items: newInquiry.items,
    status: newInquiry.status,
    created_at: newInquiry.createdAt
  }]).then(({ error }) => {
    if (error) console.warn('Supabase inquiry dual-write note:', error.message);
  }).catch(() => {});

  const shopData = readJson(shopFilePath);
  const waNumber = shopData.whatsappNumber || '917007561887';
  const waMessage = `*NEW INQUIRY - SHANTINATH TRADERS (SADAR BAZAR)*\n*Reference ID:* ${newInquiry.id}\n*Name:* ${newInquiry.customerName}\n*Phone:* ${newInquiry.phone || 'Not provided'}\n*Email:* ${newInquiry.email || 'Not provided'}${newInquiry.city ? `\n*City:* ${newInquiry.city}` : ''}\n*Subject:* ${newInquiry.subject}\n*Message:*\n${newInquiry.items}\n\n_Please confirm availability and pricing._`;
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully',
    inquiry: newInquiry,
    whatsappUrl
  });
});

// 8. Get Inquiries (Counter View)
app.get('/api/inquiries', (req, res) => {
  const inquiries = readJson(inquiriesFilePath);
  res.json({
    total: inquiries.length,
    inquiries
  });
});

// Serve uploaded images statically
app.use('/images', express.static(path.join(__dirname, '..', 'frontend', 'public', 'images')));

// Helper: Update category counts
function updateCategoryCounts(products) {
  const categories = readJson(categoriesFilePath);
  categories.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = products.length;
    } else {
      cat.count = products.filter(p => p.category === cat.id).length;
    }
  });
  writeJson(categoriesFilePath, categories);
}

// ============================================
// ADMIN API ROUTES
// ============================================

// 9. Admin: Add New Product
app.post('/api/admin/products', upload.single('image'), async (req, res) => {
  try {
    const products = readJson(productsFilePath);
    let { id, name, brand, category, sizes, variants, material, finish, features, suitableFor, inStock, featured, imageSnippet } = req.body;

    if (!name || !brand || !category) {
      return res.status(400).json({ error: 'Missing required fields: name, brand, category' });
    }

    // Auto-generate clean slug ID if not explicitly provided
    if (!id || !id.trim()) {
      let baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
      if (!baseId) baseId = 'product';
      id = baseId;
      let counter = 1;
      while (products.some(p => p.id.toLowerCase() === id.toLowerCase())) {
        id = `${baseId}-${counter}`;
        counter++;
      }
    } else {
      id = id.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
      let baseId = id;
      let counter = 1;
      while (products.some(p => p.id.toLowerCase() === id.toLowerCase())) {
        id = `${baseId}-${counter}`;
        counter++;
      }
    }

    // Check duplicate Product Name under the same brand (case-insensitive & trimmed)
    const normalizedName = name.trim().toLowerCase();
    const duplicateProduct = products.find(p => p.name.trim().toLowerCase() === normalizedName && p.brand.trim().toLowerCase() === brand.trim().toLowerCase());
    if (duplicateProduct) {
      return res.status(409).json({
        error: `Duplicate product error: "${duplicateProduct.name}" already exists under brand "${duplicateProduct.brand}".`
      });
    }

    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        parsedFeatures = typeof features === 'string' ? features.split('\n').filter(f => f.trim()) : [];
      }
    }

    const newProduct = {
      id,
      name,
      brand,
      category,
      sizes: sizes || '',
      variants: variants || '',
      material: material || '',
      finish: finish || '',
      features: parsedFeatures,
      suitableFor: suitableFor || '',
      inStock: inStock === 'true' || inStock === true,
      featured: featured === 'true' || featured === true,
      imageSnippet: imageSnippet || '',
      image: req.file ? `/images/products/${req.file.filename}` : '/images/products/taparia-adj-spanner.jpg'
    };

    products.unshift(newProduct);
    writeJson(productsFilePath, products);
    syncFrontendProducts(products);

    // Update categories count
    updateCategoryCounts(products);
    invalidateCache();

    // Dual-write to Supabase with timeout guard
    try {
      await Promise.race([
        dualWriteToSupabase('upsert', newProduct),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase timeout')), 3500))
      ]);
    } catch (e) {
      console.warn('Supabase dual-write non-blocking note:', e.message);
    }

    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 10. Admin: Update Product
app.put('/api/admin/products/:id', upload.single('image'), async (req, res) => {
  try {
    const products = readJson(productsFilePath);
    const idx = products.findIndex(p => p.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { id: newId, name, brand, category, sizes, variants, material, finish, features, suitableFor, inStock, featured, imageSnippet } = req.body;

    const oldId = req.params.id;
    const requestedId = newId ? newId.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-') : null;
    let idChanged = false;

    if (requestedId && requestedId !== oldId) {
      const conflict = products.find(p => p.id === requestedId);
      if (conflict) {
        return res.status(409).json({
          error: `Product ID conflict: A product with ID "${requestedId}" already exists.`
        });
      }
      products[idx].id = requestedId;
      idChanged = true;

      // If product has a local fallback image named after the old ID, duplicate it for the new ID
      if (!req.file && products[idx].image === `/images/products/${oldId}.jpg`) {
        const oldImgPath = path.join(__dirname, '../frontend/public/images/products', `${oldId}.jpg`);
        const newImgPath = path.join(__dirname, '../frontend/public/images/products', `${requestedId}.jpg`);
        if (fs.existsSync(oldImgPath)) {
          try {
            fs.copyFileSync(oldImgPath, newImgPath);
            products[idx].image = `/images/products/${requestedId}.jpg`;
          } catch (e) {
            console.warn('Could not copy image file for new ID:', e.message);
          }
        }
      }
    }

    if (name) {
      const normalizedName = name.trim().toLowerCase();
      const duplicateProduct = products.find(p => p.id !== (requestedId || oldId) && p.name.trim().toLowerCase() === normalizedName);
      if (duplicateProduct) {
        return res.status(409).json({
          error: `Duplicate product error: Another product named "${duplicateProduct.name}" already exists under brand "${duplicateProduct.brand}".`
        });
      }
      products[idx].name = name;
    }
    if (brand) products[idx].brand = brand;
    if (category) products[idx].category = category;
    if (sizes !== undefined) products[idx].sizes = sizes;
    if (variants !== undefined) products[idx].variants = variants;
    if (material !== undefined) products[idx].material = material;
    if (finish !== undefined) products[idx].finish = finish;
    if (features !== undefined) {
      try {
        products[idx].features = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        products[idx].features = typeof features === 'string' ? features.split('\n').filter(f => f.trim()) : [];
      }
    }
    if (suitableFor !== undefined) products[idx].suitableFor = suitableFor;
    if (inStock !== undefined) products[idx].inStock = inStock === 'true' || inStock === true;
    if (featured !== undefined) products[idx].featured = featured === 'true' || featured === true;
    if (imageSnippet !== undefined) products[idx].imageSnippet = imageSnippet;
    if (req.file) products[idx].image = `/images/products/${req.file.filename}`;

    writeJson(productsFilePath, products);
    syncFrontendProducts(products);
    updateCategoryCounts(products);
    invalidateCache();

    // Dual-write to Supabase safely
    try {
      if (idChanged) {
        await dualWriteToSupabase('delete', { id: oldId });
      }
      await Promise.race([
        dualWriteToSupabase('upsert', products[idx]),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase timeout')), 3500))
      ]);
    } catch (e) {
      console.warn('Supabase dual-write update note:', e.message);
    }

    res.json({ success: true, product: products[idx] });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 11. Admin: Delete Product
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    let products = readJson(productsFilePath);
    const idx = products.findIndex(p => p.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deleted = products.splice(idx, 1)[0];

    writeJson(productsFilePath, products);
    syncFrontendProducts(products);
    updateCategoryCounts(products);
    invalidateCache();
    await dualWriteToSupabase('delete', deleted);

    res.json({ success: true, message: `Product "${deleted.name}" deleted successfully` });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// 12. Admin: Toggle Product Stock / Featured
app.patch('/api/admin/products/:id', async (req, res) => {
  try {
    const products = readJson(productsFilePath);
    const idx = products.findIndex(p => p.id === req.params.id);

    if (idx === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { inStock, featured } = req.body;
    if (inStock !== undefined) products[idx].inStock = inStock;
    if (featured !== undefined) products[idx].featured = featured;

    writeJson(productsFilePath, products);
    syncFrontendProducts(products);
    invalidateCache();
    await dualWriteToSupabase('upsert', products[idx]);

    res.json({ success: true, product: products[idx] });
  } catch (err) {
    console.error('Error patching product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 13. Admin: Dashboard Stats
app.get('/api/admin/stats', (req, res) => {
  const products = readJson(productsFilePath);
  const categories = readJson(categoriesFilePath);
  const inquiries = readJson(inquiriesFilePath);

  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const featuredCount = products.filter(p => p.featured).length;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(i => i.status === 'pending_confirmation').length;

  // Products per category
  const categoryBreakdown = {};
  products.forEach(p => {
    categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
  });

  // Products per brand
  const brandBreakdown = {};
  products.forEach(p => {
    if (p.brand) {
      p.brand.split(' / ').forEach(b => {
        const brandName = b.trim();
        brandBreakdown[brandName] = (brandBreakdown[brandName] || 0) + 1;
      });
    }
  });

  // Recent inquiries (last 10)
  const recentInquiries = inquiries.slice(0, 10);

  res.json({
    totalProducts,
    inStockCount,
    outOfStockCount,
    featuredCount,
    totalInquiries,
    pendingInquiries,
    categoryBreakdown,
    brandBreakdown,
    recentInquiries,
    totalCategories: categories.filter(c => c.id !== 'all').length
  });
});

// 14. Admin: Supabase Health & Free Tier Status
app.get('/api/admin/supabase-status', async (req, res) => {
  try {
    const { count, error } = await supabase.from('products').select('*', { count: 'exact', head: true });
    if (error) {
      return res.json({
        connected: false,
        error: error.message,
        tableCreated: !error.message.includes('Could not find the table'),
        sqlRequired: error.message.includes('Could not find the table'),
        freeTierGuardsActive: true
      });
    }
    res.json({
      connected: true,
      tableCreated: true,
      productCount: count,
      freeTierGuardsActive: true
    });
  } catch (err) {
    res.json({ connected: false, error: err.message, freeTierGuardsActive: true });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Shantinath Traders Backend running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});

