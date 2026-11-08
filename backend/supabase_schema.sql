-- ==============================================================
-- SHANTINATH TRADERS - COMPLETE SUPABASE POSTGRESQL SCHEMA (UPDATED)
-- Optimized for Free Tier: Zero overhead, indexed queries, RLS enabled
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/wxjlzlmvofggkpprsyxw/sql
-- ==============================================================

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  count INTEGER DEFAULT 0
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  sizes TEXT,
  material TEXT,
  finish TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  suitable_for TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  image TEXT,
  image_snippet TEXT,
  hsn_code TEXT,
  mrp NUMERIC(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index frequently queried columns for high speed and minimal compute
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products (brand);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products (in_stock);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured);

-- 3. Customer & Contact Inquiries Table (Updated with email, city, subject)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  city TEXT,
  subject TEXT,
  delivery_option TEXT,
  delivery_address TEXT,
  items TEXT NOT NULL,
  status TEXT DEFAULT 'pending_confirmation',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure new columns exist if inquiries table was already created
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.inquiries ADD COLUMN IF NOT EXISTS subject TEXT;

-- 4. Enable Row Level Security (RLS) on all public tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. Drop any existing conflicting policies so they can be freshly created
DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;
DROP POLICY IF EXISTS "Allow Insert Categories" ON public.categories;
DROP POLICY IF EXISTS "Allow Update Categories" ON public.categories;
DROP POLICY IF EXISTS "Allow Delete Categories" ON public.categories;

DROP POLICY IF EXISTS "Public Read Products" ON public.products;
DROP POLICY IF EXISTS "Allow Insert Products" ON public.products;
DROP POLICY IF EXISTS "Allow Update Products" ON public.products;
DROP POLICY IF EXISTS "Allow Delete Products" ON public.products;

DROP POLICY IF EXISTS "Public Read Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public Insert Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow Update Inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow Delete Inquiries" ON public.inquiries;

-- 6. Create Comprehensive RLS Policies (Anon & Authenticated)
-- Categories: Public read, insert, update, delete
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow Insert Categories" ON public.categories FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow Update Categories" ON public.categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow Delete Categories" ON public.categories FOR DELETE TO anon, authenticated USING (true);

-- Products: Public read, insert, update, delete
CREATE POLICY "Public Read Products" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow Insert Products" ON public.products FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow Update Products" ON public.products FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow Delete Products" ON public.products FOR DELETE TO anon, authenticated USING (true);

-- Inquiries: Public insert and read
CREATE POLICY "Public Insert Inquiries" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public Read Inquiries" ON public.inquiries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow Update Inquiries" ON public.inquiries FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow Delete Inquiries" ON public.inquiries FOR DELETE TO anon, authenticated USING (true);

-- 7. Seed Updated Categories Data
INSERT INTO public.categories (id, name, count) VALUES
  ('all', 'All Products', 50),
  ('hand-tools', 'Hand Tools', 29),
  ('power-tools', 'Machine & Power Tools', 5),
  ('paints', 'Paints & Enamels', 5),
  ('locks', 'Pad Locks', 3),
  ('adhesives', 'Adhesives & Sprays', 4),
  ('garden', 'Gardening & Pipes', 2),
  ('abrasives', 'Pipe Fittings', 2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  count = EXCLUDED.count;
