"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminSitePage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { site, footer } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="mt-1 text-zinc-500">Brand identity, contact info, and SEO metadata.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Branding">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Site Name" value={site.name} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, name: v } }))} />
            <AdminField label="Logo Letter" value={site.logoLetter} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, logoLetter: v } }))} />
            <AdminField label="Tagline" value={site.tagline} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, tagline: v } }))} className="sm:col-span-2" />
            <AdminTextarea label="Site Description" value={site.description} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, description: v } }))} className="sm:col-span-2" />
          </div>
        </AdminSection>

        <AdminSection title="SEO">
          <AdminField label="Meta Title" value={site.metaTitle} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, metaTitle: v } }))} />
          <AdminTextarea label="Meta Description" value={site.metaDescription} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, metaDescription: v } }))} />
        </AdminSection>

        <AdminSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Phone" value={site.phone} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, phone: v } }))} />
            <AdminField label="Email" value={site.email} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, email: v } }))} />
            <AdminField label="Full Address" value={site.address} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, address: v } }))} className="sm:col-span-2" />
            <AdminField label="Short Location" value={site.location} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, location: v } }))} />
            <AdminField label="Business Hours" value={site.hours} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, hours: v } }))} />
            <AdminField label="Copyright Text" value={site.copyright} onChange={(v) => update((c) => ({ ...c, site: { ...c.site, copyright: v } }))} className="sm:col-span-2" />
          </div>
        </AdminSection>

        <AdminSection title="Footer Newsletter">
          <AdminField label="Section Title" value={footer.newsletterTitle} onChange={(v) => update((c) => ({ ...c, footer: { ...c.footer, newsletterTitle: v } }))} />
          <AdminTextarea label="Description" value={footer.newsletterDescription} onChange={(v) => update((c) => ({ ...c, footer: { ...c.footer, newsletterDescription: v } }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Email Placeholder" value={footer.newsletterPlaceholder} onChange={(v) => update((c) => ({ ...c, footer: { ...c.footer, newsletterPlaceholder: v } }))} />
            <AdminField label="Button Text" value={footer.newsletterButton} onChange={(v) => update((c) => ({ ...c, footer: { ...c.footer, newsletterButton: v } }))} />
          </div>
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
