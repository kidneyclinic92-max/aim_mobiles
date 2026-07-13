"use client";

import { AdminField, AdminNumberField, AdminSection, AdminSaveBar, AdminTextarea } from "@/components/admin/AdminForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useAdminContent } from "@/hooks/useAdminContent";

function SectionEditor({
  title,
  section,
  onChange,
  showViewAll = false,
}: {
  title: string;
  section: { title: string; highlight?: string; description?: string; viewAllHref?: string; viewAllLabel?: string };
  onChange: (s: typeof section) => void;
  showViewAll?: boolean;
}) {
  return (
    <AdminSection title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Title" value={section.title} onChange={(v) => onChange({ ...section, title: v })} />
        <AdminField label="Highlight" value={section.highlight ?? ""} onChange={(v) => onChange({ ...section, highlight: v })} />
        {showViewAll && (
          <>
            <AdminField label="View All Link" value={section.viewAllHref ?? ""} onChange={(v) => onChange({ ...section, viewAllHref: v })} />
            <AdminField label="View All Button Text" value={section.viewAllLabel ?? ""} onChange={(v) => onChange({ ...section, viewAllLabel: v })} />
          </>
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
        <p className="mt-1 text-zinc-500">Hero carousel, featured products, categories, best sellers, new arrivals, trust signals, and testimonials.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      <div className="space-y-6">
        <AdminSection title="Hero">
          <AdminField label="Background Video URL" value={home.hero.videoUrl} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, videoUrl: v } } }))} hint="/assets/herovideo.mp4 or external URL" />
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Headline" value={home.hero.headline} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, headline: v } } }))} />
            <AdminField label="Headline Highlight" value={home.hero.headlineHighlight} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, headlineHighlight: v } } }))} />
            <AdminField label="Primary CTA" value={home.hero.primaryCta} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, primaryCta: v } } }))} />
            <AdminField label="Primary CTA Link" value={home.hero.primaryCtaHref} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, primaryCtaHref: v } } }))} />
            <AdminField label="Secondary CTA" value={home.hero.secondaryCta} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, secondaryCta: v } } }))} />
            <AdminField label="Secondary CTA Link" value={home.hero.secondaryCtaHref} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, secondaryCtaHref: v } } }))} />
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-300">Product Slides</p>
              <button
                type="button"
                onClick={() => update((c) => ({
                  ...c,
                  home: {
                    ...c.home,
                    hero: {
                      ...c.home.hero,
                      slides: [
                        ...c.home.hero.slides,
                        { image: "", title: "New Product", subtitle: "", cta: "Shop Now", href: "/shop", accent: "from-cyan-500/20 to-blue-600/10" },
                      ],
                    },
                  },
                }))}
                className="rounded-lg border border-dashed border-white/20 px-3 py-1.5 text-xs text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-400"
              >
                + Add Slide
              </button>
            </div>
            {home.hero.slides.map((slide, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Slide {i + 1}</p>
                  {home.hero.slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => update((c) => ({
                        ...c,
                        home: { ...c.home, hero: { ...c.home.hero, slides: c.home.hero.slides.filter((_, j) => j !== i) } },
                      }))}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
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
                  <ImageUpload label="Slide Image" value={slide.image} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], image: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} />
                  <AdminField label="Product Link" value={slide.href} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], href: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} />
                  <AdminField label="Accent Gradient" value={slide.accent} onChange={(v) => {
                    const slides = [...home.hero.slides];
                    slides[i] = { ...slides[i], accent: v };
                    update((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, slides } } }));
                  }} hint="e.g. from-cyan-500/20 to-blue-600/10" className="sm:col-span-2" />
                </div>
              </div>
            ))}
          </div>
        </AdminSection>

        <SectionEditor title="Featured Products" section={home.featured} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, featured: v } }))} showViewAll />
        <SectionEditor title="Categories" section={home.categories} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, categories: v } }))} />
        <SectionEditor title="Best Sellers" section={home.bestSellers} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, bestSellers: { ...c.home.bestSellers, ...v } } }))} showViewAll />
        <SectionEditor title="New Arrivals" section={home.newArrivals} onChange={(v) => update((c) => ({ ...c, home: { ...c.home, newArrivals: { ...c.home.newArrivals, ...v } } }))} showViewAll />

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
                <AdminNumberField label="Star Rating (1–5)" value={t.rating} onChange={(v) => {
                  const items = [...home.testimonials.items];
                  items[i] = { ...items[i], rating: v };
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
      </div>

      <AdminSaveBar onSave={save} saving={saving} saved={saved} />
    </div>
  );
}
