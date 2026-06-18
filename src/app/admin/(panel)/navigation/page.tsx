"use client";

import { AdminField, AdminSection, AdminSaveBar } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";
import type { NavLink } from "@/lib/cms/types";

function LinkListEditor({
  title,
  links,
  onChange,
}: {
  title: string;
  links: NavLink[];
  onChange: (links: NavLink[]) => void;
}) {
  return (
    <AdminSection title={title}>
      <div className="space-y-3">
        {links.map((link, i) => (
          <div key={i} className="grid gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-[1fr_1fr_auto]">
            <AdminField label="Label" value={link.label} onChange={(v) => {
              const next = [...links];
              next[i] = { ...next[i], label: v };
              onChange(next);
            }} />
            <AdminField label="URL" value={link.href} onChange={(v) => {
              const next = [...links];
              next[i] = { ...next[i], href: v };
              onChange(next);
            }} />
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => onChange(links.filter((_, j) => j !== i))}
                className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...links, { label: "New Link", href: "/" }])}
          className="rounded-lg border border-dashed border-white/20 px-4 py-2 text-sm text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-400"
        >
          + Add Link
        </button>
      </div>
    </AdminSection>
  );
}

export default function AdminNavigationPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { navigation } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Navigation</h1>
        <p className="mt-1 text-zinc-500">Edit header, mobile menu, and footer links.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <LinkListEditor title="Header Navigation" links={navigation.main} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, main: v } }))} />
        <LinkListEditor title="Mobile Main Links" links={navigation.mobileMain} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, mobileMain: v } }))} />
        <LinkListEditor title="Mobile Secondary Links" links={navigation.mobileSecondary} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, mobileSecondary: v } }))} />
        <LinkListEditor title="Footer Shop Links" links={navigation.footerShop} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, footerShop: v } }))} />
        <LinkListEditor title="Footer Support Links" links={navigation.footerSupport} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, footerSupport: v } }))} />
        <LinkListEditor title="Social Links" links={navigation.social} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, social: v } }))} />
        <LinkListEditor title="Legal Links" links={navigation.legal} onChange={(v) => update((c) => ({ ...c, navigation: { ...c.navigation, legal: v } }))} />
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
