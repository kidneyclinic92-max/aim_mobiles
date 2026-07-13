"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { useAdminContent } from "@/hooks/useAdminContent";

export default function AdminContactPage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { contact } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Contact Page</h1>
        <p className="mt-1 text-zinc-500">Contact information and form copy.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Page Header">
          <AdminField label="Meta Title" value={contact.metaTitle} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, metaTitle: v } }))} />
          <AdminTextarea label="Meta Description" value={contact.metaDescription} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, metaDescription: v } }))} />
          <AdminField label="Eyebrow" value={contact.eyebrow} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, eyebrow: v } }))} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title" value={contact.title} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, title: v } }))} />
            <AdminField label="Title Highlight" value={contact.titleHighlight} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, titleHighlight: v } }))} />
          </div>
          <AdminTextarea label="Intro" value={contact.intro} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, intro: v } }))} />
          <AdminField label="Form Title" value={contact.formTitle} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, formTitle: v } }))} />
          <AdminField label="Success Message" value={contact.successMessage} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, successMessage: v } }))} />
        </AdminSection>

        <AdminSection title="Contact Form">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name Label" value={contact.form.nameLabel} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, form: { ...c.contact.form, nameLabel: v } } }))} />
            <AdminField label="Email Label" value={contact.form.emailLabel} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, form: { ...c.contact.form, emailLabel: v } } }))} />
            <AdminField label="Subject Label" value={contact.form.subjectLabel} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, form: { ...c.contact.form, subjectLabel: v } } }))} />
            <AdminField label="Message Label" value={contact.form.messageLabel} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, form: { ...c.contact.form, messageLabel: v } } }))} />
            <AdminField label="Message Placeholder" value={contact.form.messagePlaceholder} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, form: { ...c.contact.form, messagePlaceholder: v } } }))} />
            <AdminField label="Submit Button" value={contact.form.submitLabel} onChange={(v) => update((c) => ({ ...c, contact: { ...c.contact, form: { ...c.contact.form, submitLabel: v } } }))} />
          </div>
        </AdminSection>

        <AdminSection title="Contact Info Cards">
          {contact.info.map((info, i) => (
            <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
              <p className="text-xs font-semibold text-zinc-500">Card {i + 1}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <AdminField label="Icon (phone, mail, map-pin, clock)" value={info.icon} onChange={(v) => {
                  const items = [...contact.info];
                  items[i] = { ...items[i], icon: v };
                  update((c) => ({ ...c, contact: { ...c.contact, info: items } }));
                }} />
                <AdminField label="Title" value={info.title} onChange={(v) => {
                  const items = [...contact.info];
                  items[i] = { ...items[i], title: v };
                  update((c) => ({ ...c, contact: { ...c.contact, info: items } }));
                }} />
                <AdminField label="Value" value={info.value} onChange={(v) => {
                  const items = [...contact.info];
                  items[i] = { ...items[i], value: v };
                  update((c) => ({ ...c, contact: { ...c.contact, info: items } }));
                }} />
                <AdminField label="Description" value={info.description} onChange={(v) => {
                  const items = [...contact.info];
                  items[i] = { ...items[i], description: v };
                  update((c) => ({ ...c, contact: { ...c.contact, info: items } }));
                }} />
              </div>
            </div>
          ))}
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
