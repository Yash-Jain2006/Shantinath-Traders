import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { supabase } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Determine environment
const IS_VERCEL = !!process.env.VERCEL || !!process.env.VERCEL_ENV;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths (local dev only)
const shopFilePath = path.join(__dirname, 'data', 'shop.json');
const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');
const productsFilePath = path.join(__dirname, 'data', 'products.json');
const inquiriesFilePath = path.join(__dirname, 'data', 'inquiries.json');

// Multer storage in-memory (works everywhere without read-only filesystem errors)
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Helper to read local JSON (dev fallback)
function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

// Helper to write local JSON (dev only, silently skips on Vercel)
function writeJson(filePath, data) {
  if (IS_VERCEL) return false;
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn(`writeJson skipped (read-only fs): ${filePath}`);
    return false;
  }
}

// ─── Convert Supabase row → product object used by frontend ───────────────────
function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    sizes: row.sizes || '',
    variants: row.variants || '',
    material: row.material || '',
    finish: row.finish || '',
    features: Array.isArray(row.features) ? row.features : [],
    suitableFor: row.suitable_for || '',
    inStock: row.in_stock ?? true,
    featured: row.featured ?? false,
    imageSnippet: row.image_snippet || '',
    image: row.image || '',
    hsnCode: row.hsn_code || '',
    mrp: row.mrp || null
  };
}

// ─── Convert product object → Supabase row ────────────────────────────────────
function productToRow(product) {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    sizes: product.sizes || '',
    variants: product.variants || '',
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
}

// ─── Primary data source: Supabase on Vercel, local JSON in dev ───────────────
async function getLiveProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });

  if (!error && data && data.length > 0) {
    return data.map(rowToProduct);
  }

  // Fallback to local JSON (local dev when Supabase is unreachable)
  console.warn('Supabase read failed, falling back to local JSON:', error?.message);
  return readJson(productsFilePath);
}

// ─── Upsert a product into Supabase ──────────────────────────────────────────
async function supabaseUpsert(product) {
  const row = productToRow(product);
  const { error } = await supabase.from('products').upsert(row, { onConflict: 'id' });
  if (error) console.warn('Supabase upsert error:', error.message);
  return !error;
}

// ─── Delete a product from Supabase ──────────────────────────────────────────
async function supabaseDelete(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.warn('Supabase delete error:', error.message);
  return !error;
}

// ─── Primary inquiries data source: Supabase on Vercel, local JSON fallback ──
async function getLiveInquiries() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map(row => ({
        id: row.id,
        customerName: row.customer_name || 'Retail Customer',
        phone: row.phone || '',
        email: row.email || '',
        city: row.city || '',
        subject: row.subject || 'Product Inquiry',
        deliveryOption: row.delivery_option || 'Quick Pickup at Sadar Bazar Store',
        deliveryAddress: row.delivery_address || '',
        items: row.items || '',
        status: row.status || 'pending_confirmation',
        createdAt: row.created_at
      }));
    }
  } catch (e) {
    console.warn('Error reading inquiries from Supabase:', e.message);
  }
  return readJson(inquiriesFilePath);
}

// ─── Helper: Update category counts in local JSON (dev only) ─────────────────
function updateCategoryCounts(products) {
  if (IS_VERCEL) return;
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

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API ROUTES
// ─────────────────────────────────────────────────────────────────────────────

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: 'Shantinath Traders API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    mode: IS_VERCEL ? 'vercel-supabase' : 'local-json'
  });
});

// 2. Shop Details
app.get('/api/shop', (req, res) => {
  const shopData = readJson(shopFilePath);
  res.json(shopData);
});

// 3. Categories List (Dynamic count matched to live catalog)
app.get('/api/categories', async (req, res) => {
  const categories = readJson(categoriesFilePath);
  const products = await getLiveProducts();
  const withCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length
  }));
  res.json(withCounts);
});

// 4. Unique Brands List
app.get('/api/brands', async (req, res) => {
  const products = await getLiveProducts();
  const brandsSet = new Set();
  products.forEach(p => {
    if (p.brand) {
      p.brand.split(/[,|/]/).forEach(b => brandsSet.add(b.trim()));
    }
  });
  res.json(Array.from(brandsSet).sort());
});

// 5. Products Catalog with Search & Filtering
app.get('/api/products', async (req, res) => {
  const { category, brand, search, featured } = req.query;
  let products = await getLiveProducts();

  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  if (brand && brand !== 'all') {
    products = products.filter(p => p.brand && p.brand.toLowerCase().includes(brand.toLowerCase()));
  }
  if (featured === 'true') {
    products = products.filter(p => p.featured === true);
  }
  if (search) {
    const q = search.toLowerCase().trim();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      (p.suitableFor && p.suitableFor.toLowerCase().includes(q)) ||
      (p.sizes && p.sizes.toLowerCase().includes(q))
    );
  }

  res.json({ total: products.length, products });
});

// 6. Single Product by ID
app.get('/api/products/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error || !data) {
    // Fallback to local JSON
    const products = readJson(productsFilePath);
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    return res.json(product);
  }

  res.json(rowToProduct(data));
});

// 7. Submit Home Shopping List
app.post('/api/shopping-list', async (req, res) => {
  const { customerName, phone, deliveryOption, deliveryAddress, items } = req.body;

  if (!items || !items.trim()) {
    return res.status(400).json({ error: 'Please provide items list' });
  }

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

  // Sync to Supabase
  try {
    await supabase.from('inquiries').insert([{
      id: newInquiry.id,
      customer_name: newInquiry.customerName,
      phone: newInquiry.phone,
      delivery_option: newInquiry.deliveryOption,
      delivery_address: newInquiry.deliveryAddress,
      items: newInquiry.items,
      status: newInquiry.status,
      created_at: newInquiry.createdAt
    }]);
  } catch (err) {
    console.warn('Supabase shopping-list write note:', err.message);
  }

  // Try to persist locally (dev only)
  const inquiries = readJson(inquiriesFilePath);
  inquiries.unshift(newInquiry);
  writeJson(inquiriesFilePath, inquiries);

  const shopData = readJson(shopFilePath);
  const waNumber = shopData.whatsappNumber || '917007561887';
  const waMessage = `*HOME SHOPPING LIST - SHANTINATH TRADERS (JHANSI)*\n*Reference ID:* ${newInquiry.id}\n*Customer:* ${newInquiry.customerName}\n*Preference:* ${newInquiry.deliveryOption}\n${newInquiry.deliveryAddress ? `*Location:* ${newInquiry.deliveryAddress}\n` : ''}\n*Items Needed:*\n${newInquiry.items}\n\n_Please confirm stock and total price._`;
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  res.status(201).json({ success: true, message: 'Shopping list recorded successfully', inquiry: newInquiry, whatsappUrl });
});

// 8. Contact Form Inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, email, phone, city, subject, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Please provide name and message' });
  }

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

  // Sync to Supabase
  try {
    await supabase.from('inquiries').insert([{
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
    }]);
  } catch (err) {
    console.warn('Supabase inquiry write note:', err.message);
  }

  const inquiries = readJson(inquiriesFilePath);
  inquiries.unshift(newInquiry);
  writeJson(inquiriesFilePath, inquiries);

  const shopData = readJson(shopFilePath);
  const waNumber = shopData.whatsappNumber || '917007561887';
  const waMessage = `*NEW INQUIRY - SHANTINATH TRADERS (SADAR BAZAR)*\n*Reference ID:* ${newInquiry.id}\n*Name:* ${newInquiry.customerName}\n*Phone:* ${newInquiry.phone || 'Not provided'}\n*Email:* ${newInquiry.email || 'Not provided'}${newInquiry.city ? `\n*City:* ${newInquiry.city}` : ''}\n*Subject:* ${newInquiry.subject}\n*Message:*\n${newInquiry.items}\n\n_Please confirm availability and pricing._`;
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  res.status(201).json({ success: true, message: 'Inquiry submitted successfully', inquiry: newInquiry, whatsappUrl });
});

// 9. Get Inquiries (Reads from live Supabase)
app.get('/api/inquiries', async (req, res) => {
  const inquiries = await getLiveInquiries();
  res.json({ total: inquiries.length, inquiries });
});

// 9b. Update Inquiry Status (Pending -> Resolved)
app.patch('/api/inquiries/:id', async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  try {
    await supabase.from('inquiries').update({ status }).eq('id', id);
  } catch (err) {}

  const inquiries = readJson(inquiriesFilePath);
  const found = inquiries.find(i => i.id === id);
  if (found) {
    found.status = status;
    writeJson(inquiriesFilePath, inquiries);
  }
  res.json({ success: true, status });
});

// Serve uploaded images statically (local dev)
app.use('/images', express.static(path.join(__dirname, '..', 'frontend', 'public', 'images')));

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN API ROUTES — All writes go directly to Supabase
// ─────────────────────────────────────────────────────────────────────────────

// 10. Admin: Add New Product
app.post('/api/admin/products', upload.single('image'), async (req, res) => {
  try {
    let { id, name, brand, category, sizes, variants, material, finish, features, suitableFor, inStock, featured, imageSnippet } = req.body;

    if (!name || !brand || !category) {
      return res.status(400).json({ error: 'Missing required fields: name, brand, category' });
    }

    // Auto-generate or sanitize ID
    if (!id || !id.trim()) {
      let baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
      if (!baseId) baseId = 'product';
      id = baseId;
    } else {
      id = id.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-');
    }

    // Check for duplicate ID in Supabase
    const { data: existing } = await supabase.from('products').select('id').eq('id', id).single();
    if (existing) {
      let counter = 1;
      const baseId = id;
      while (true) {
        const testId = `${baseId}-${counter}`;
        const { data: conflict } = await supabase.from('products').select('id').eq('id', testId).single();
        if (!conflict) { id = testId; break; }
        counter++;
      }
    }

    let parsedFeatures = [];
    if (features) {
      try {
        parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
      } catch (e) {
        parsedFeatures = typeof features === 'string' ? features.split('\n').filter(f => f.trim()) : [];
      }
    }

    let resolvedImage = req.body.image || '/images/products/taparia-adj-spanner.jpg';
    if (req.file && req.file.buffer) {
      resolvedImage = `data:${req.file.mimetype || 'image/jpeg'};base64,${req.file.buffer.toString('base64')}`;
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
      image: resolvedImage
    };

    // Write to Supabase (primary)
    const ok = await supabaseUpsert(newProduct);
    if (!ok) {
      return res.status(500).json({ error: 'Failed to save product to database' });
    }

    // Also write to local JSON (dev fallback)
    const products = readJson(productsFilePath);
    products.unshift(newProduct);
    writeJson(productsFilePath, products);
    updateCategoryCounts(products);

    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 11. Admin: Update Product
// Accepts JSON (no image) or multipart/form-data (with image upload)
// Using a middleware that runs multer only when Content-Type is multipart
const conditionalUpload = (req, res, next) => {
  const ct = req.headers['content-type'] || '';
  if (ct.includes('multipart/form-data')) {
    upload.single('image')(req, res, next);
  } else {
    next();
  }
};

app.put('/api/admin/products/:id', conditionalUpload, async (req, res) => {
  try {
    const oldId = req.params.id;

    // Fetch current product from Supabase
    const { data: current, error: fetchErr } = await supabase.from('products').select('*').eq('id', oldId).single();
    if (fetchErr || !current) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { id: newId, name, brand, category, sizes, variants, material, finish, features, suitableFor, inStock, featured, imageSnippet } = req.body;

    const requestedId = newId ? newId.trim().toLowerCase().replace(/[^a-z0-9-_]+/g, '-') : oldId;
    const idChanged = requestedId !== oldId;

    // Check ID conflict if changing ID
    if (idChanged) {
      const { data: conflict } = await supabase.from('products').select('id').eq('id', requestedId).single();
      if (conflict) {
        return res.status(409).json({ error: `Product ID conflict: "${requestedId}" already exists.` });
      }
    }

    let parsedFeatures = current.features;
    if (features !== undefined) {
      try {
        parsedFeatures = Array.isArray(features) ? features : (typeof features === 'string' ? JSON.parse(features) : features);
      } catch (e) {
        parsedFeatures = typeof features === 'string' ? features.split('\n').filter(f => f.trim()) : [];
      }
    }

    let resolvedImage = current.image || '';
    if (req.file && req.file.buffer) {
      resolvedImage = `data:${req.file.mimetype || 'image/jpeg'};base64,${req.file.buffer.toString('base64')}`;
    } else if (req.body.image && typeof req.body.image === 'string' && req.body.image.trim()) {
      resolvedImage = req.body.image.trim();
    }

    const updatedProduct = {
      id: requestedId,
      name: name || current.name,
      brand: brand || current.brand,
      category: category || current.category,
      sizes: sizes !== undefined ? sizes : (current.sizes || ''),
      variants: variants !== undefined ? variants : (current.variants || ''),
      material: material !== undefined ? material : (current.material || ''),
      finish: finish !== undefined ? finish : (current.finish || ''),
      features: parsedFeatures,
      suitableFor: suitableFor !== undefined ? suitableFor : (current.suitable_for || ''),
      inStock: inStock !== undefined ? (inStock === 'true' || inStock === true) : current.in_stock,
      featured: featured !== undefined ? (featured === 'true' || featured === true) : current.featured,
      imageSnippet: imageSnippet !== undefined ? imageSnippet : (current.image_snippet || ''),
      image: resolvedImage,
      hsnCode: current.hsn_code || '',
      mrp: current.mrp || null
    };

    if (idChanged) {
      await supabaseDelete(oldId);
    }
    const ok = await supabaseUpsert(updatedProduct);
    if (!ok) {
      return res.status(500).json({ error: 'Failed to update product in database' });
    }

    // Sync to local JSON (dev only)
    const products = readJson(productsFilePath);
    const idx = products.findIndex(p => p.id === oldId);
    if (idx !== -1) {
      products[idx] = updatedProduct;
      writeJson(productsFilePath, products);
      updateCategoryCounts(products);
    }

    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 12. Admin: Delete Product
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Check product exists
    const { data: existing, error: fetchErr } = await supabase.from('products').select('id, name').eq('id', id).single();
    if (fetchErr || !existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const ok = await supabaseDelete(id);
    if (!ok) {
      return res.status(500).json({ error: 'Failed to delete product from database' });
    }

    // Sync to local JSON
    const products = readJson(productsFilePath);
    const filtered = products.filter(p => p.id !== id);
    writeJson(productsFilePath, filtered);
    updateCategoryCounts(filtered);

    res.json({ success: true, message: `Product "${existing.name}" deleted successfully` });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// 13. Admin: Toggle Product Stock / Featured
app.patch('/api/admin/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { inStock, featured } = req.body;

    const updatePayload = {};
    if (inStock !== undefined) updatePayload.in_stock = inStock;
    if (featured !== undefined) updatePayload.featured = featured;

    const { data, error } = await supabase.from('products').update(updatePayload).eq('id', id).select().single();
    if (error || !data) {
      return res.status(404).json({ error: 'Product not found or update failed' });
    }

    // Sync to local JSON
    const products = readJson(productsFilePath);
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
      if (inStock !== undefined) products[idx].inStock = inStock;
      if (featured !== undefined) products[idx].featured = featured;
      writeJson(productsFilePath, products);
    }

    res.json({ success: true, product: rowToProduct(data) });
  } catch (err) {
    console.error('Error patching product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 14. Admin: Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  const products = await getLiveProducts();
  const categories = readJson(categoriesFilePath);
  const inquiries = await getLiveInquiries();

  const totalProducts = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;
  const featuredCount = products.filter(p => p.featured).length;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(i => i.status === 'pending_confirmation').length;

  const categoryBreakdown = {};
  products.forEach(p => {
    categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
  });

  const brandBreakdown = {};
  products.forEach(p => {
    if (p.brand) {
      p.brand.split(/[,|/]/).forEach(b => {
        const bn = b.trim();
        if (bn) brandBreakdown[bn] = (brandBreakdown[bn] || 0) + 1;
      });
    }
  });

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

// 15. Admin: Supabase Status
app.get('/api/admin/supabase-status', async (req, res) => {
  try {
    const { count, error } = await supabase.from('products').select('*', { count: 'exact', head: true });
    if (error) {
      return res.json({ connected: false, error: error.message });
    }
    res.json({ connected: true, tableCreated: true, productCount: count });
  } catch (err) {
    res.json({ connected: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Shantinath Traders Backend running on http://localhost:${PORT}`);
  console.log(`📡 Mode: ${IS_VERCEL ? 'Vercel + Supabase (primary)' : 'Local + JSON fallback'}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});

export default app;
