"use client";

import { AdminField, AdminSection, AdminSaveBar } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminShopPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { shop } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Shop Page</h1>
        <p className="mt-1 text-zinc-500">Page title, search, sort tabs, browse sidebar labels, and empty states.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Page & SEO">
          <AdminField label="Page Title" value={shop.title} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, title: v } }))} />
          <AdminField label="Meta Title" value={shop.metaTitle} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, metaTitle: v } }))} />
          <AdminField label="Meta Description" value={shop.metaDescription} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, metaDescription: v } }))} />
          <AdminField label="Search Placeholder" value={shop.searchPlaceholder} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, searchPlaceholder: v } }))} />
        </AdminSection>

        <AdminSection title="Labels">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Breadcrumb Home" value={shop.breadcrumbHome} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, breadcrumbHome: v } }))} />
            <AdminField label="Products Count Label" value={shop.productsLabel} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, productsLabel: v } }))} />
            <AdminField label="New Arrivals Title" value={shop.newArrivalsTitle} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, newArrivalsTitle: v } }))} />
            <AdminField label="Deals Title" value={shop.dealsTitle} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, dealsTitle: v } }))} />
            <AdminField label="Empty State Title" value={shop.emptyTitle} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, emptyTitle: v } }))} />
            <AdminField label="Empty State Description" value={shop.emptyDescription} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, emptyDescription: v } }))} />
          </div>
        </AdminSection>

        <AdminSection title="Sort Tabs">
          {shop.sortTabs.map((tab, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-2">
              <AdminField label="Value" value={tab.value} onChange={(v) => {
                const sortTabs = [...shop.sortTabs];
                sortTabs[i] = { ...sortTabs[i], value: v };
                update((c) => ({ ...c, shop: { ...c.shop, sortTabs } }));
              }} hint="featured, newest, price-desc, price-asc" />
              <AdminField label="Label" value={tab.label} onChange={(v) => {
                const sortTabs = [...shop.sortTabs];
                sortTabs[i] = { ...sortTabs[i], label: v };
                update((c) => ({ ...c, shop: { ...c.shop, sortTabs } }));
              }} />
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Browse Sidebar">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Tab Label" value={shop.browse.tabLabel} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, browse: { ...c.shop.browse, tabLabel: v } } }))} />
            <AdminField label="Categories Heading" value={shop.browse.categoriesHeading} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, browse: { ...c.shop.browse, categoriesHeading: v } } }))} />
            <AdminField label="Brands Heading" value={shop.browse.brandsHeading} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, browse: { ...c.shop.browse, brandsHeading: v } } }))} />
            <AdminField label="All Products Label" value={shop.browse.allProductsLabel} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, browse: { ...c.shop.browse, allProductsLabel: v } } }))} />
            <AdminField label="Filters Heading" value={shop.browse.filtersHeading} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, browse: { ...c.shop.browse, filtersHeading: v } } }))} />
            <AdminField label="Clear All Label" value={shop.browse.clearAllLabel} onChange={(v) => update((c) => ({ ...c, shop: { ...c.shop, browse: { ...c.shop.browse, clearAllLabel: v } } }))} />
          </div>
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
