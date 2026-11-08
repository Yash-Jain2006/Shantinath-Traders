import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabaseClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function syncToSupabase() {
  console.log('🚀 Starting Supabase Sync...');

  const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));
  const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'categories.json'), 'utf8'));

  // 1. Prepare products payload for PostgreSQL
  const dbProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    sizes: p.sizes || '',
    material: p.material || '',
    finish: p.finish || '',
    features: p.features || [],
    suitable_for: p.suitableFor || '',
    in_stock: p.inStock ?? true,
    featured: p.featured ?? false,
    image: p.image || '',
    image_snippet: p.imageSnippet || '',
    hsn_code: p.hsnCode || '',
    mrp: p.mrp || null
  }));

  try {
    const { data, error } = await supabase
      .from('products')
      .upsert(dbProducts, { onConflict: 'id' });

    if (error) {
      console.warn('⚠️ Supabase Products Sync note:', error.message);
      if (error.message.includes('Could not find the table')) {
        console.log('👉 Please execute "backend/supabase_schema.sql" in your Supabase SQL Editor once to create the tables.');
      }
    } else {
      console.log(`✅ Successfully synced ${dbProducts.length} products to Supabase!`);
    }

    // 2. Sync Categories
    const dbCategories = categories.map(c => ({
      id: c.id,
      name: c.name,
      count: c.count
    }));

    const { error: catError } = await supabase
      .from('categories')
      .upsert(dbCategories, { onConflict: 'id' });

    if (catError) {
      console.warn('⚠️ Supabase Categories Sync note:', catError.message);
    } else {
      console.log(`✅ Successfully synced ${dbCategories.length} categories to Supabase!`);
    }
  } catch (err) {
    console.error('Sync failed:', err.message);
  }
}

syncToSupabase();

