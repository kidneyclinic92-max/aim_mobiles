"use client";

import { AdminField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAdminContent } from "@/hooks/useAdminContent";

function SectionCopyEditor({
  title,
  section,
  onChange,
  showViewAll = false,
}: {
  title: string;
  section: { eyebrow: string; title: string; highlight?: string; description?: string; viewAllHref?: string };
  onChange: (s: { eyebrow: string; title: string; highlight?: string; description?: string; viewAllHref?: string }) => void;
  showViewAll?: boolean;
}) {
  return (
    <AdminSection title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Eyebrow" value={section.eyebrow} onChange={(v) => onChange({ ...section, eyebrow: v })} />
        <AdminField label="Title" value={section.title} onChange={(v) => onChange({ ...section, title: v })} />
        <AdminField label="Highlight" value={section.highlight ?? ""} onChange={(v) => onChange({ ...section, highlight: v })} />
        {showViewAll && (
          <AdminField label="View All Link" value={section.viewAllHref ?? ""} onChange={(v) => onChange({ ...section, viewAllHref: v })} />
        )}
        {section.description !== undefined && (
          <AdminTextarea label="Description" value={section.description} onChange={(v) => onChange({ ...section, description: v })} className="sm:col-span-2" />
        )}
      </div>
    </AdminSection>
  );
}

export default function AdminHomePage() {
  const { content, update, loading, saving, saved, error, save } = useAdminContent();

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const { home } = content;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Home Page</h1>
        <p className="mt-1 text-zinc-500">Hero, sections, testimonials, and newsletter.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Hero">
          <AdminField label="Background Video URL" value={home.hero.videoUrl} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, videoUrl: v } } }))} hint="/assets/herovideo.mp4 or external URL" />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Eyebrow" value={home.hero.eyebrow} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, eyebrow: v } } }))} />
            <AdminField label="Headline" value={home.hero.headline} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, headline: v } } }))} />
            <AdminField label="Headline Highlight" value={home.hero.headlineHighlight} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, headlineHighlight: v } } }))} />
            <AdminField label="Secondary CTA" value={home.hero.secondaryCta} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, secondaryCta: v } } }))} />
            <AdminField label="Secondary CTA Link" value={home.hero.secondaryCtaHref} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, secondaryCtaHref: v } } }))} />
            <AdminField label="Brand Marquee (comma-separated)" value={home.hero.brandMarquee.join(", ")} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, brandMarquee: v.split(",").map((s) => s.trim()).filter(Boolean) } } }))} className="sm:col-span-2" />
          </div>

          <div className="mt-4 space-y-4">
            <p className="text-sm font-medium text-zinc-300">Hero Slides</p>
            {home.hero.slides.map((slide, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Slide {i + 1}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <AdminField label="Title" value={slide.title} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], title: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} />
                  <AdminField label="CTA" value={slide.cta} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], cta: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} />
                  <AdminTextarea label="Subtitle" value={slide.subtitle} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], subtitle: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} className="sm:col-span-2" />
                  <ImageUpload
                    label="Slide Image"
                    value={slide.image}
                    onChange={(v) => {
                      const slides = [...home.hero.slides];
                      slides[i] = { ...slides[i], image: v };
                      update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                    }}
                  />
                  <AdminField label="Product Link" value={slide.href} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], href: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>

        <SectionCopyEditor title="Featured Products Section" section={home.featured} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, featured: v } }))} />
        <SectionCopyEditor title="Categories Section" section={home.categories} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, categories: v } }))} />
        <SectionCopyEditor title="Best Sellers Section" section={home.bestSellers} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, bestSellers: { ...c.home.bestSellers, ...v } } }))} showViewAll />
        <SectionCopyEditor title="New Arrivals Section" section={home.newArrivals} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newArrivals: { ...c.home.newArrivals, ...v } } }))} showViewAll />

        <AdminSection title="Trust Signals">
          {home.trustSignals.map((signal, i) => (
            <div key={i} className="grid gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 sm:grid-cols-2">
              <AdminField label="Icon (truck, shield, refresh, headphones)" value={signal.icon} onChange={(v) => {
                const trustSignals = [...home.trustSignals];
                trustSignals[i] = { ...trustSignals[i], icon: v };
                update((c) => ({ ...c, home: { ...c.home, trustSignals } }));
              }} />
              <AdminField label="Stat" value={signal.stat} onChange={(v) => {
                const trustSignals = [...home.trustSignals];
                trustSignals[i] = { ...trustSignals[i], stat: v };
                update((c) => ({ ...c, home: { ...c.home, trustSignals } }));
              }} />
              <AdminField label="Title" value={signal.title} onChange={(v) => {
                const trustSignals = [...home.trustSignals];
                trustSignals[i] = { ...trustSignals[i], title: v };
                update((c) => ({ ...c, home: { ...c.home, trustSignals } }));
              }} />
              <AdminField label="Description" value={signal.description} onChange={(v) => {
                const trustSignals = [...home.trustSignals];
                trustSignals[i] = { ...trustSignals[i], description: v };
                update((c) => ({ ...c, home: { ...c.home, trustSignals } }));
              }} />
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Testimonials">
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <AdminField label="Eyebrow" value={home.testimonials.eyebrow} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, eyebrow: v } } }))} />
            <AdminField label="Title" value={home.testimonials.title} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, title: v } } }))} />
            <AdminField label="Highlight" value={home.testimonials.highlight ?? ""} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, highlight: v } } }))} />
          </div>
          {home.testimonials.items.map((t, i) => (
            <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
              <p className="text-xs font-semibold text-zinc-500">Testimonial {i + 1}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <AdminField label="Name" value={t.name} onChange={(v) => {
                  const items = [...home.testimonials.items];
                  items[i] = { ...items[i], name: v };
                  update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, items } } }));
                }} />
                <AdminField label="Role" value={t.role} onChange={(v) => {
                  const items = [...home.testimonials.items];
                  items[i] = { ...items[i], role: v };
                  update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, items } } }));
                }} />
                <AdminField label="Avatar Initials" value={t.avatar} onChange={(v) => {
                  const items = [...home.testimonials.items];
                  items[i] = { ...items[i], avatar: v };
                  update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, items } } }));
                }} />
                <AdminTextarea label="Quote" value={t.text} onChange={(v) => {
                  const items = [...home.testimonials.items];
                  items[i] = { ...items[i], text: v };
                  update((c) => ({ ...c, home: { ...c.home, testimonials: { ...c.home.testimonials, items } } }));
                }} className="sm:col-span-2" />
              </div>
            </div>
          ))}
        </AdminSection>

        <AdminSection title="Newsletter">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Eyebrow" value={home.newsletter.eyebrow} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, eyebrow: v } } }))} />
            <AdminField label="Title" value={home.newsletter.title} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, title: v } } }))} />
            <AdminField label="Highlight" value={home.newsletter.highlight} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, highlight: v } } }))} />
            <AdminField label="Button Text" value={home.newsletter.buttonText} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, buttonText: v } } }))} />
            <AdminTextarea label="Description" value={home.newsletter.description} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, description: v } } }))} className="sm:col-span-2" />
            <AdminField label="Placeholder" value={home.newsletter.placeholder} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, placeholder: v } } }))} />
            <AdminField label="Disclaimer" value={home.newsletter.disclaimer} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, disclaimer: v } } }))} />
            <AdminField label="Success Message" value={home.newsletter.successMessage} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newsletter: { ...c.home.newsletter, successMessage: v } } }))} className="sm:col-span-2" />
          </div>
        </AdminSection>
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
