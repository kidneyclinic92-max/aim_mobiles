"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminCategoriesPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { categories, brands } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Categories & Brands</h1>
        <p className="mt-1 text-zinc-500">Manage shop categories and brand list.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Brands">
          <AdminField
            label="Brands (comma-separated)"
            value={brands.join(", ")}
            onChange={(v) =>
              update((c) => ({
                ...c,
                brands: v.split(",").map((s) => s.trim()).filter(Boolean),
              }))
            }
          />
        </AdminSection>

        <AdminSection title="Categories">
          {categories.map((cat, i) => (
            <div key={cat.id} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
              <p className="text-sm font-semibold text-white">{cat.name}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <AdminField label="ID" value={cat.id} onChange={(v) => {
                  const next = [...categories];
                  next[i] = { ...next[i], id: v as typeof cat.id };
                  update((c) => ({ ...c, categories: next }));
                }} />
                <AdminField label="Name" value={cat.name} onChange={(v) => {
                  const next = [...categories];
                  next[i] = { ...next[i], name: v };
                  update((c) => ({ ...c, categories: next }));
                }} />
                <AdminField label="Icon" value={cat.icon} onChange={(v) => {
                  const next = [...categories];
                  next[i] = { ...next[i], icon: v };
                  update((c) => ({ ...c, categories: next }));
                }} hint="smartphone, headphones, shield, zap, watch, package" />
                <ImageUpload
                  label="Category Image"
                  value={cat.image}
                  onChange={(v) => {
                    const next = [...categories];
                    next[i] = { ...next[i], image: v };
                    update((c) => ({ ...c, categories: next }));
                  }}
                />
                <AdminTextarea label="Description" value={cat.description} onChange={(v) => {
                  const next = [...categories];
                  next[i] = { ...next[i], description: v };
                  update((c) => ({ ...c, categories: next }));
                }} className="sm:col-span-2" />
              </div>
            </div>
          ))}
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
