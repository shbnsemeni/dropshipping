"use client";

import { useState } from "react";
import { ShoppingCart, Check, ChevronLeft, ChevronRight, Star, Shield, Truck, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  category: { name: string; slug: string };
  aliExpressUrl: string | null;
  stock: number;
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const hasDiscount = product.salePrice !== null && product.salePrice < product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.salePrice! / product.price) * 100) : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images[0],
        slug: product.slug,
      });
    }
    setAddedToCart(true);
    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div>
      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {hasDiscount && (
              <div className="absolute top-4 left-4">
                <Badge variant="danger">-{discountPercent}% OFF</Badge>
              </div>
            )}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => Math.max(0, prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors flex items-center justify-center"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft className="w-5 h-5 text-stone-700" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => Math.min(product.images.length - 1, prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors flex items-center justify-center"
                  disabled={selectedImage === product.images.length - 1}
                >
                  <ChevronRight className="w-5 h-5 text-stone-700" />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? "border-stone-900 ring-2 ring-stone-900/20" : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Link href={`/products?category=${product.category.slug}`} className="text-xs uppercase tracking-wider text-rose-500 font-medium hover:text-rose-600 transition-colors">
              {product.category.name}
            </Link>
            <span className="text-stone-300">·</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs text-stone-500">4.8 (124 reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-900 mb-4 leading-tight">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-rose-600">{formatPrice(product.salePrice!)}</span>
                <span className="text-lg text-stone-400 line-through">{formatPrice(product.price)}</span>
                <Badge variant="danger">Save {formatPrice(product.price - product.salePrice!)}</Badge>
              </>
            ) : (
              <span className="text-3xl font-bold text-stone-900">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-2 text-sm text-emerald-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            In Stock ({product.stock}+ available)
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-11 h-11 flex items-center justify-center hover:bg-stone-50 text-stone-600 transition-colors"
              >
                -
              </button>
              <span className="w-14 text-center font-medium text-stone-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-11 h-11 flex items-center justify-center hover:bg-stone-50 text-stone-600 transition-colors"
              >
                +
              </button>
            </div>
            <Button
              size="lg"
              variant={addedToCart ? "secondary" : "accent"}
              onClick={handleAddToCart}
              className="flex-1"
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 mt-auto">
            <div className="flex flex-col items-center text-center p-3 bg-stone-50 rounded-xl">
              <Truck className="w-5 h-5 text-stone-700 mb-1" />
              <p className="text-[11px] text-stone-500 font-medium">Free Shipping</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-stone-50 rounded-xl">
              <Shield className="w-5 h-5 text-stone-700 mb-1" />
              <p className="text-[11px] text-stone-500 font-medium">Secure Payment</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-stone-50 rounded-xl">
              <svg className="w-5 h-5 text-stone-700 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <p className="text-[11px] text-stone-500 font-medium">30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
