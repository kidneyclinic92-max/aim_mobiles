"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminWarrantyPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { warranty } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Warranty Page</h1>
        <p className="mt-1 text-zinc-500">Coverage, claim process, and exclusions.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Hero">
          <AdminField label="Meta Title" value={warranty.metaTitle} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, metaTitle: v } }))} />
          <AdminTextarea label="Meta Description" value={warranty.metaDescription} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, metaDescription: v } }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title" value={warranty.title} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, title: v } }))} />
            <AdminField label="Title Highlight" value={warranty.titleHighlight} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, titleHighlight: v } }))} />
          </div>
          <AdminTextarea label="Intro" value={warranty.intro} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, intro: v } }))} />
        </AdminSection>

        <AdminSection title="Coverage">
          <AdminField label="Section Title" value={warranty.coverageTitle} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, coverageTitle: v } }))} />
          {warranty.coverage.map((item, i) => (
            <AdminField key={i} label={`Item ${i + 1}`} value={item} onChange={(v) => {
              const coverage = [...warranty.coverage];
              coverage[i] = v;
              update((c) => ({ ...c, warranty: { ...c.warranty, coverage } }));
            }} />
          ))}
          <button type="button" onClick={() => update((c) => ({ ...c, warranty: { ...c.warranty, coverage: [...c.warranty.coverage, ""] } }))} className="text-sm text-cyan-400 hover:underline">+ Add Item</button>
        </AdminSection>

        <AdminSection title="Claim Process">
          <AdminField label="Section Title" value={warranty.processTitle} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, processTitle: v } }))} />
          {warranty.steps.map((step, i) => (
            <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <AdminField label="Step Number" value={step.step} onChange={(v) => {
                  const steps = [...warranty.steps];
                  steps[i] = { ...steps[i], step: v };
                  update((c) => ({ ...c, warranty: { ...c.warranty, steps } }));
                }} />
                <AdminField label="Title" value={step.title} onChange={(v) => {
                  const steps = [...warranty.steps];
                  steps[i] = { ...steps[i], title: v };
                  update((c) => ({ ...c, warranty: { ...c.warranty, steps } }));
                }} className="sm:col-span-2" />
                <AdminTextarea label="Description" value={step.description} onChange={(v) => {
                  const steps = [...warranty.steps];
                  steps[i] = { ...steps[i], description: v };
                  update((c) => ({ ...c, warranty: { ...c.warranty, steps } }));
                }} className="sm:col-span-3" />
              </div>
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Not Covered & CTA">
          <AdminField label="Not Covered Title" value={warranty.notCoveredTitle} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, notCoveredTitle: v } }))} />
          {warranty.notCovered.map((item, i) => (
            <AdminField key={i} label={`Exclusion ${i + 1}`} value={item} onChange={(v) => {
              const notCovered = [...warranty.notCovered];
              notCovered[i] = v;
              update((c) => ({ ...c, warranty: { ...c.warranty, notCovered } }));
            }} />
          ))}
          <AdminTextarea label="Note" value={warranty.notCoveredNote} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, notCoveredNote: v } }))} />
          <AdminField label="CTA Title" value={warranty.ctaTitle} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, ctaTitle: v } }))} />
          <AdminTextarea label="CTA Description" value={warranty.ctaDescription} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, ctaDescription: v } }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="CTA Button" value={warranty.ctaButton} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, ctaButton: v } }))} />
            <AdminField label="CTA Link" value={warranty.ctaHref} onChange={(v) => update((c) => ({ ...c, warranty: { ...c.warranty, ctaHref: v } }))} />
          </div>
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
