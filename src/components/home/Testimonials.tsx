"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSiteContent } from "@/store/content-context";

export function Testimonials() {
  const { content } = useSiteContent();
  const { testimonials } = content.home;
  const items = testimonials.items;
  const [current, setCurrent] = useState(0);
  const t = items[current];
  if (!t) return null;

  return (
    <section className="section-glow py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <SectionHeader title={testimonials.title} highlight={testimonials.highlight} align="center" />
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-14 text-center backdrop-blur-xl">
              <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <Quote className="mx-auto h-10 w-10 text-cyan-500/25 mb-8" />

              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p key={current} className="text-xl leading-relaxed text-zinc-200 sm:text-2xl font-light animate-fade-in">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-bold text-white backdrop-blur-md">
                  {t.avatar}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-lg">{t.name}</p>
                  <p className="text-sm text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button onClick={() => setCurrent((c) => (c - 1 + items.length) % items.length)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white backdrop-blur-md hover:bg-white/10 hover:border-white/25" aria-label="Previous">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-cyan-400" : "w-3 bg-white/20 hover:bg-white/40"}`} aria-label={`Review ${i + 1}`} />
                ))}
              </div>
              <button onClick={() => setCurrent((c) => (c + 1) % items.length)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white backdrop-blur-md hover:bg-white/10 hover:border-white/25" aria-label="Next">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
