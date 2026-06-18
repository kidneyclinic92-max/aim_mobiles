"use client";

import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { useAdminContent } from "@/hooks/useAdminContent";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

function emptyProduct(): Product {
  return {
    id: `product-${Date.now()}`,
    name: "New Product",
    brand: "Apple",
    category: "smartphones",
    price: 0,
    description: "",
    shortDescription: "",
    images: [""],
    colors: [{ name: "Black", hex: "#000000" }],
    variants: [{ id: "default", storage: "N/A", ram: "N/A", price: 0, inStock: true }],
    specs: {},
    rating: 5,
    reviewCount: 0,
    reviews: [],
    tags: [],
  };
}

export default function AdminProductsPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const addProduct = () => {
    const product = emptyProduct();
    update((c) => ({ ...c, products: [product, ...c.products] }));
  };

  const removeProduct = (id: string) => {
    if (!confirm("Delete this product?")) return;
    update((c) => ({ ...c, products: c.products.filter((p) => p.id !== id) }));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="mt-1 text-zinc-500">{content.products.length} products in catalog</p>
        </div>
        <button
          onClick={addProduct}
          className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-widest text-zinc-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 hidden sm:table-cell">Brand</th>
              <th className="px-4 py-3 hidden md:table-cell">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {content.products.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">{product.name}</td>
                <td className="px-4 py-3 text-zinc-400 hidden sm:table-cell">{product.brand}</td>
                <td className="px-4 py-3 text-zinc-400 hidden md:table-cell capitalize">{product.category}</td>
                <td className="px-4 py-3 text-zinc-300">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {product.isFeatured && <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[10px] text-cyan-400">Featured</span>}
                    {product.isBestSeller && <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-400">Best</span>}
                    {product.isNew && <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-400">New</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-cyan-500/30 hover:text-cyan-400"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Link>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 mt-8 flex justify-end border-t border-white/10 bg-[#0a0a0f]/95 py-4 backdrop-blur-xl">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
