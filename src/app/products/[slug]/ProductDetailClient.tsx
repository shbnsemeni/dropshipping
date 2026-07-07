"use client";

import { useState } from "react";
import { ShoppingCart, ExternalLink, ChevronLeft, ChevronRight, Zap, Shield, Truck } from "lucide-react";
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
    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart!`);
  };

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-blue-600">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                  disabled={selectedImage === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => Math.min(product.images.length - 1, prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
                  disabled={selectedImage === product.images.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-blue-600 font-medium mb-2">{product.category.name}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-bold text-blue-600">{formatPrice(product.salePrice!)}</span>
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.price)}</span>
                <Badge variant="danger">Save {formatPrice(product.price - product.salePrice!)}</Badge>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 text-gray-600">
                -
              </button>
              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50 text-gray-600">
                +
              </button>
            </div>
            <Button size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            In Stock ({product.stock}+)
          </div>

          {product.aliExpressUrl && (
            <a
              href={product.aliExpressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-8"
            >
              <ExternalLink className="w-4 h-4" />
              View on AliExpress
            </a>
          )}

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-500">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-500">Secure Payment</p>
            </div>
            <div className="text-center">
              <Zap className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-500">Fast Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
