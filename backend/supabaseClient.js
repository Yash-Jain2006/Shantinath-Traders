import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://wxjlzlmvofggkpprsyxw.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4amx6bG12b2ZnZ2twcHJzeXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0MjEyNjIsImV4cCI6MjEwODk5NzI2Mn0.aJ2PFrJMuISWPfnV_z-c3HA6CxrCUUsEg5Ckqp2FbNM';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Guard: Memory cache with 5-minute TTL to stay well below Free Tier DB limits
let productsCache = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function invalidateCache() {
  productsCache = null;
  lastCacheTime = 0;
}

export function getCachedProducts() {
  if (productsCache && (Date.now() - lastCacheTime < CACHE_TTL_MS)) {
    return productsCache;
  }
  return null;
}

export function setCachedProducts(data) {
  productsCache = data;
  lastCacheTime = Date.now();
}

