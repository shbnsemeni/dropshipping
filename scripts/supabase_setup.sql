-- Run this in Supabase Dashboard -> SQL Editor
-- This creates all tables matching the Prisma schema

CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  "emailVerified" TIMESTAMP,
  image TEXT,
  role TEXT DEFAULT 'customer',
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Customer" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  "sessionToken" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Address" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id),
  label TEXT DEFAULT 'Home',
  "fullName" TEXT NOT NULL,
  phone TEXT,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT DEFAULT 'US',
  "isDefault" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Category" (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Product" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  "salePrice" REAL,
  images TEXT NOT NULL,
  "categoryId" TEXT NOT NULL REFERENCES "Category"(id),
  "aliExpressUrl" TEXT,
  stock INTEGER DEFAULT 999,
  featured BOOLEAN DEFAULT FALSE,
  rating REAL DEFAULT 4.5,
  "reviewCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Order" (
  id TEXT PRIMARY KEY,
  "userId" TEXT REFERENCES "User"(id),
  "customerEmail" TEXT NOT NULL,
  "customerName" TEXT NOT NULL,
  phone TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT NOT NULL,
  total REAL NOT NULL,
  "shippingCost" REAL DEFAULT 4.99,
  status TEXT DEFAULT 'paid',
  "stripeSessionId" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OrderItem" (
  id TEXT PRIMARY KEY,
  "orderId" TEXT NOT NULL REFERENCES "Order"(id),
  "productId" TEXT NOT NULL REFERENCES "Product"(id),
  quantity INTEGER NOT NULL,
  price REAL NOT NULL
);
