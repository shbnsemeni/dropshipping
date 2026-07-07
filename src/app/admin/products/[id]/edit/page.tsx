"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    images: "",
    categoryId: "",
    aliExpressUrl: "",
    stock: "999",
    featured: false,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/products?slug=" + params.id).then((r) => r.json()),
    ])
      .then(([cats, product]) => {
        setCategories(cats);
        if (product.id) {
          setForm({
            name: product.name,
            description: product.description,
            price: String(product.price),
            salePrice: product.salePrice ? String(product.salePrice) : "",
            images: (product.images || []).join("\n"),
            categoryId: product.categoryId,
            aliExpressUrl: product.aliExpressUrl || "",
            stock: String(product.stock),
            featured: product.featured,
          });
        }
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setFetching(false));
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      toast.error("Please fill in required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: form.images ? form.images.split("\n").map((s) => s.trim()).filter(Boolean) : [],
        }),
      });

      if (res.ok) {
        toast.success("Product updated");
        router.push("/admin/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Product Name *" name="name" value={form.name} onChange={handleChange} required />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Price *" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
          <Input label="Sale Price" name="salePrice" type="number" step="0.01" value={form.salePrice} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            required
          >
            <option value="">Select category...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (one per line)</label>
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
          />
        </div>

        <Input label="AliExpress URL" name="aliExpressUrl" value={form.aliExpressUrl} onChange={handleChange} />
        <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-gray-300" />
          <span className="text-sm font-medium text-gray-700">Featured product</span>
        </label>

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading}>Update Product</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
