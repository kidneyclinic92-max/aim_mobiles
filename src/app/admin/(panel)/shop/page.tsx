"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminShopPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { shop } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Shop Page</h1>
        <p className="mt-1 text-zinc-500">Customize the shop page header and search.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <AdminSection title="Shop Header">
        <AdminField label="Eyebrow" value={shop.eyebrow} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, eyebrow: v } }))} />
        <AdminField label="Title" value={shop.title} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, title: v } }))} />
        <AdminTextarea label="Subtitle" value={shop.subtitle} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, subtitle: v } }))} />
        <AdminField label="Search Placeholder" value={shop.searchPlaceholder} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, searchPlaceholder: v } }))} />
      </AdminSection>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
