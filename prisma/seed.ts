import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@jsitemuang.xyz" },
    update: {},
    create: {
      email: "admin@jsitemuang.xyz",
      name: "Admin",
      role: "admin",
      password: adminPassword,
    },
  });

  const categories = [
    { name: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80" },
    { name: "Fashion", slug: "fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80" },
    { name: "Home & Kitchen", slug: "home-kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80" },
    { name: "Sports & Outdoors", slug: "sports-outdoors", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80" },
    { name: "Beauty & Health", slug: "beauty-health", image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const products = [
    { name: "Wireless Bluetooth Earbuds", slug: "wireless-bluetooth-earbuds", description: "Premium wireless earbuds with noise cancellation, 24h battery life, and comfortable fit. Perfect for music lovers and professionals.", price: 49.99, salePrice: 29.99, images: JSON.stringify(["https://images.unsplash.com/photo-1590658268037-6bf12f032f75?w=600&q=80", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80"]), categorySlug: "electronics", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Smart Watch Pro", slug: "smart-watch-pro", description: "Advanced smartwatch with heart rate monitor, GPS tracking, sleep analysis, and 7-day battery life. Water resistant IP68.", price: 89.99, salePrice: null, images: JSON.stringify(["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", "https://images.unsplash.com/photo-1546868871-af0de0ae72b9?w=600&q=80"]), categorySlug: "electronics", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker", description: "Compact waterproof speaker with deep bass, 12h playback, and built-in microphone. Perfect for outdoor adventures.", price: 39.99, salePrice: 24.99, images: JSON.stringify(["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80", "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80"]), categorySlug: "electronics", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "USB-C Fast Charger 65W", slug: "usb-c-fast-charger", description: "GaN technology fast charger compatible with laptops, tablets, and phones. Compact design with smart temperature control.", price: 34.99, salePrice: null, images: JSON.stringify(["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80"]), categorySlug: "electronics", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "HD Webcam 4K", slug: "hd-webcam-4k", description: "Ultra HD 4K webcam with autofocus, built-in ring light, and noise-canceling microphone. Ideal for streaming and video calls.", price: 59.99, salePrice: 44.99, images: JSON.stringify(["https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80"]), categorySlug: "electronics", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Men's Slim Fit Casual Shirt", slug: "mens-slim-fit-casual-shirt", description: "Classic slim fit casual shirt in premium cotton blend. Available in multiple colors. Perfect for office or casual outings.", price: 29.99, salePrice: 19.99, images: JSON.stringify(["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80"]), categorySlug: "fashion", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Women's Summer Dress", slug: "womens-summer-dress", description: "Elegant floral summer dress with lightweight fabric. Features adjustable straps and pockets. Perfect for beach or casual wear.", price: 39.99, salePrice: 26.99, images: JSON.stringify(["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"]), categorySlug: "fashion", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Leather Crossbody Bag", slug: "leather-crossbody-bag", description: "Genuine leather crossbody bag with multiple compartments. Adjustable strap fits all. Ideal for everyday use and travel.", price: 54.99, salePrice: null, images: JSON.stringify(["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80"]), categorySlug: "fashion", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Premium Sneakers", slug: "premium-sneakers", description: "Comfortable lightweight sneakers with cushioned sole and breathable mesh upper. Great for running, gym, and daily wear.", price: 69.99, salePrice: 49.99, images: JSON.stringify(["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80"]), categorySlug: "fashion", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Stainless Steel Water Bottle", slug: "stainless-steel-water-bottle", description: "Double-wall vacuum insulated bottle keeps drinks cold 24h or hot 12h. BPA-free, leak-proof, fits most cup holders.", price: 24.99, salePrice: 16.99, images: JSON.stringify(["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80"]), categorySlug: "home-kitchen", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Non-Stick Cooking Pan Set", slug: "non-stick-cooking-pan-set", description: "Premium 3-piece non-stick pan set with ceramic coating. Ergonomic handles, oven safe to 450F, dishwasher safe.", price: 59.99, salePrice: 39.99, images: JSON.stringify(["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80"]), categorySlug: "home-kitchen", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Scented Soy Candle Set", slug: "scented-soy-candle-set", description: "Hand-poured soy candles in 4 relaxing scents. Long-burning (40+ hours each), natural ingredients, elegant glass jars.", price: 32.99, salePrice: null, images: JSON.stringify(["https://images.unsplash.com/photo-1602874801007-b58c03f789d3?w=600&q=80"]), categorySlug: "home-kitchen", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Bamboo Cutting Board", slug: "bamboo-cutting-board", description: "Large organic bamboo cutting board with juice groove. Knife-friendly, antimicrobial, and naturally sustainable.", price: 28.99, salePrice: 19.99, images: JSON.stringify(["https://images.unsplash.com/photo-1594226801341-41427b4c6f6f?w=600&q=80"]), categorySlug: "home-kitchen", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Yoga Mat Premium", slug: "yoga-mat-premium", description: "Extra thick non-slip yoga mat with alignment lines. Eco-friendly TPE material, includes carrying strap. 6mm thickness.", price: 34.99, salePrice: 24.99, images: JSON.stringify(["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80", "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&q=80"]), categorySlug: "sports-outdoors", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Resistance Bands Set", slug: "resistance-bands-set", description: "Set of 5 resistance bands with different tension levels. Includes door anchor, handles, and ankle straps. Portable gym.", price: 19.99, salePrice: null, images: JSON.stringify(["https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80"]), categorySlug: "sports-outdoors", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Camping Tent 4-Person", slug: "camping-tent-4-person", description: "Waterproof 4-person tent with easy setup. Double-layer design, mesh ventilation, and storage pockets. Perfect for family camping.", price: 129.99, salePrice: 89.99, images: JSON.stringify(["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80"]), categorySlug: "sports-outdoors", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Adjustable Dumbbell Set", slug: "adjustable-dumbbell-set", description: "Space-saving adjustable dumbbells from 5-52.5 lbs each. Quick-change weight system with ergonomic grip.", price: 199.99, salePrice: 149.99, images: JSON.stringify(["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"]), categorySlug: "sports-outdoors", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Vitamin C Serum", slug: "vitamin-c-serum", description: "Professional 20% Vitamin C serum with hyaluronic acid and vitamin E. Brightens skin, reduces dark spots, and boosts collagen.", price: 22.99, salePrice: 14.99, images: JSON.stringify(["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80"]), categorySlug: "beauty-health", featured: true, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Electric Toothbrush", slug: "electric-toothbrush", description: "Sonic electric toothbrush with 5 cleaning modes, 2-min smart timer, and USB-C charging. 30-day battery life.", price: 44.99, salePrice: 34.99, images: JSON.stringify(["https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=600&q=80"]), categorySlug: "beauty-health", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
    { name: "Essential Oils Gift Set", slug: "essential-oils-gift-set", description: "Premium 6-piece essential oils set: lavender, peppermint, tea tree, eucalyptus, lemon, and orange. 100% pure therapeutic grade.", price: 28.99, salePrice: null, images: JSON.stringify(["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80"]), categorySlug: "beauty-health", featured: false, aliExpressUrl: "https://www.aliexpress.com" },
  ];

  for (const product of products) {
    const category = await prisma.category.findUnique({ where: { slug: product.categorySlug } });
    if (!category) continue;
    const { categorySlug, ...data } = product;
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: { ...data, categoryId: category.id },
    });
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
