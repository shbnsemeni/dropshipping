export interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  image: string;
  quantity: number;
  slug: string;
}

export interface ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  categoryId: string;
  category: { name: string; slug: string };
  aliExpressUrl: string | null;
  stock: number;
  featured: boolean;
  createdAt: Date;
}

export type OrderStatus = "paid" | "processing" | "shipped" | "delivered" | "cancelled";
