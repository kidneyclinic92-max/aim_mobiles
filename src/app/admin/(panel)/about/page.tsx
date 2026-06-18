"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminAboutPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { about } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">About Page</h1>
        <p className="mt-1 text-zinc-500">Story, stats, and company values.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="SEO & Hero">
          <AdminField label="Meta Title" value={about.metaTitle} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, metaTitle: v } }))} />
          <AdminTextarea label="Meta Description" value={about.metaDescription} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, metaDescription: v } }))} />
          <AdminField label="Eyebrow" value={about.eyebrow} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, eyebrow: v } }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title" value={about.title} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, title: v } }))} />
            <AdminField label="Title Highlight" value={about.titleHighlight} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, titleHighlight: v } }))} />
          </div>
          <AdminTextarea label="Intro Paragraph" value={about.intro} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, intro: v } }))} />
        </AdminSection>

        <AdminSection title="Stats">
          {about.stats.map((stat, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-2 rounded-lg border border-white/5 bg-white/[0.02] p-4">
              <AdminField label="Value" value={stat.value} onChange={(v) => {
                const stats = [...about.stats];
                stats[i] = { ...stats[i], value: v };
                update((c) => ({ ...c, about: { ...c.about, stats } }));
              }} />
              <AdminField label="Label" value={stat.label} onChange={(v) => {
                const stats = [...about.stats];
                stats[i] = { ...stats[i], label: v };
                update((c) => ({ ...c, about: { ...c.about, stats } }));
              }} />
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Story Section">
          <ImageUpload
            label="Story Image"
            value={about.storyImage}
            onChange={(v) => update((c) => ({ ...c, about: { ...c.about, storyImage: v } }))}
          />
          <AdminField label="Story Title" value={about.storyTitle} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, storyTitle: v } }))} />
          {about.storyParagraphs.map((p, i) => (
            <AdminTextarea key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => {
              const storyParagraphs = [...about.storyParagraphs];
              storyParagraphs[i] = v;
              update((c) => ({ ...c, about: { ...c.about, storyParagraphs } }));
            }} />
          ))}
          <button
            type="button"
            onClick={() => update((c) => ({ ...c, about: { ...c.about, storyParagraphs: [...c.about.storyParagraphs, ""] } }))}
            className="text-sm text-cyan-400 hover:underline"
          >
            + Add Paragraph
          </button>
        </AdminSection>

        <AdminSection title="Values">
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <AdminField label="Section Title" value={about.valuesTitle} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, valuesTitle: v } }))} />
            <AdminField label="Highlight" value={about.valuesHighlight} onChange={(v) => update((c) => ({ ...c, about: { ...c.about, valuesHighlight: v } }))} />
          </div>
          {about.values.map((value, i) => (
            <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
              <AdminField label="Icon (target, award, users, globe)" value={value.icon} onChange={(v) => {
                const values = [...about.values];
                values[i] = { ...values[i], icon: v };
                update((c) => ({ ...c, about: { ...c.about, values } }));
              }} />
              <AdminField label="Title" value={value.title} onChange={(v) => {
                const values = [...about.values];
                values[i] = { ...values[i], title: v };
                update((c) => ({ ...c, about: { ...c.about, values } }));
              }} />
              <AdminTextarea label="Description" value={value.description} onChange={(v) => {
                const values = [...about.values];
                values[i] = { ...values[i], description: v };
                update((c) => ({ ...c, about: { ...c.about, values } }));
              }} />
            </div>
          ))}
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
