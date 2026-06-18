"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminField, AdminNumberField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { MultiImageUpload } from "@/components/admin/ImageUpload";
import { useAdminContent } from "@/hooks/useAdminContent";
import type { Category } from "@/lib/types";

const CATEGORIES: Category[] = [
  "smartphones", "earbuds", "cases", "chargers", "smartwatches", "accessories",
];

export default function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const index = content.products.findIndex((p) => p.id === id);
  if (index === -1) {
    return (
      <div>
        <p className="text-red-400">Product not found.</p>
        <Link href="/admin/products" className="mt-4 inline-block text-cyan-400 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const product = content.products[index];

  const setProduct = (patch: Partial<typeof product>) => {
    update((c) => {
      const products = [...c.products];
      products[index] = { ...products[index], ...patch };
      return { ...c, products };
    });
  };

  return (
    <div>
      <Link href="/admin/products" className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Product</h1>
        <p className="mt-1 text-zinc-500">{product.name}</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Basic Info">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Product ID (URL slug)" value={product.id} onChange={(v) => setProduct({ id: v })} />
            <AdminField label="Name" value={product.name} onChange={(v) => setProduct({ name: v })} />
            <AdminField label="Brand" value={product.brand} onChange={(v) => setProduct({ brand: v })} />
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-zinc-300">Category</span>
              <select
                value={product.category}
                onChange={(e) => setProduct({ category: e.target.value as Category })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <AdminNumberField label="Price ($)" value={product.price} step={0.01} onChange={(v) => setProduct({ price: v })} />
            <AdminNumberField label="Original Price ($)" value={product.originalPrice ?? 0} step={0.01} onChange={(v) => setProduct({ originalPrice: v || undefined })} />
            <AdminNumberField label="Rating" value={product.rating} step={0.1} onChange={(v) => setProduct({ rating: v })} />
            <AdminNumberField label="Review Count" value={product.reviewCount} onChange={(v) => setProduct({ reviewCount: v })} />
          </div>
          <AdminTextarea label="Short Description" value={product.shortDescription} onChange={(v) => setProduct({ shortDescription: v })} />
          <AdminTextarea label="Full Description" value={product.description} onChange={(v) => setProduct({ description: v })} rows={6} />
          <AdminField label="Tags (comma-separated)" value={product.tags.join(", ")} onChange={(v) => setProduct({ tags: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
        </AdminSection>

        <AdminSection title="Images">
          <MultiImageUpload
            label="Product Photos"
            value={product.images.filter(Boolean)}
            onChange={(images) => setProduct({ images: images.length ? images : [""] })}
            hint="First image is the main photo shown in the shop. Upload phone or accessory photos directly from your computer."
          />
        </AdminSection>

        <AdminSection title="Flags">
          <div className="flex flex-wrap gap-4">
            {(["isFeatured", "isBestSeller", "isNew"] as const).map((flag) => (
              <label key={flag} className="flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={Boolean(product[flag])}
                  onChange={(e) => setProduct({ [flag]: e.target.checked })}
                  className="rounded border-white/20"
                />
                {flag.replace("is", "")}
              </label>
            ))}
          </div>
        </AdminSection>

        <AdminSection title="Colors">
          {product.colors.map((color, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-3 rounded-lg border border-white/5 p-3">
              <AdminField label="Name" value={color.name} onChange={(v) => {
                const colors = [...product.colors];
                colors[i] = { ...colors[i], name: v };
                setProduct({ colors });
              }} />
              <AdminField label="Hex" value={color.hex} onChange={(v) => {
                const colors = [...product.colors];
                colors[i] = { ...colors[i], hex: v };
                setProduct({ colors });
              }} />
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Specs">
          <AdminTextarea
            label="Specs (key: value, one per line)"
            value={Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join("\n")}
            onChange={(v) => {
              const specs: Record<string, string> = {};
              v.split("\n").forEach((line) => {
                const idx = line.indexOf(":");
                if (idx > 0) specs[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
              });
              setProduct({ specs });
            }}
            rows={6}
          />
        </AdminSection>

        <AdminSection title="Variants">
          {product.variants.map((variant, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-2 rounded-lg border border-white/5 p-3">
              <AdminField label="Variant ID" value={variant.id} onChange={(v) => {
                const variants = [...product.variants];
                variants[i] = { ...variants[i], id: v };
                setProduct({ variants });
              }} />
              <AdminField label="Storage" value={variant.storage} onChange={(v) => {
                const variants = [...product.variants];
                variants[i] = { ...variants[i], storage: v };
                setProduct({ variants });
              }} />
              <AdminField label="RAM" value={variant.ram} onChange={(v) => {
                const variants = [...product.variants];
                variants[i] = { ...variants[i], ram: v };
                setProduct({ variants });
              }} />
              <AdminNumberField label="Price" value={variant.price} onChange={(v) => {
                const variants = [...product.variants];
                variants[i] = { ...variants[i], price: v };
                setProduct({ variants });
              }} />
              <label className="flex items-center gap-2 text-sm text-zinc-300 sm:col-span-2">
                <input type="checkbox" checked={variant.inStock} onChange={(e) => {
                  const variants = [...product.variants];
                  variants[i] = { ...variants[i], inStock: e.target.checked };
                  setProduct({ variants });
                }} />
                In Stock
              </label>
            </div>
          ))}
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
