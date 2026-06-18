"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategoriesList } from "@/lib/products";
import { getIcon } from "@/lib/cms/icons";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSiteContent } from "@/store/content-context";

export function CategoriesGrid() {
  const { content } = useSiteContent();
  const categories = getCategoriesList();
  const section = content.home.categories;

  return (
    <section className="section-glow py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <SectionHeader
            eyebrow={section.eyebrow}
            title={section.title}
            highlight={section.highlight}
            description={section.description}
            align="center"
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = getIcon(cat.icon);
            const isFeatured = i === 0;
            return (
              <AnimatedSection key={cat.id} delay={i * 70} className={isFeatured ? "col-span-2 lg:col-span-1 lg:row-span-1" : ""}>
                <Link
                  href={`/shop?category=${cat.id}`}
                  className={`group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_20px_60px_rgba(0,212,255,0.08)] ${isFeatured ? "aspect-[2/1] lg:aspect-auto" : ""}`}
                >
                  <div className={`relative overflow-hidden ${isFeatured ? "h-full min-h-[200px]" : "aspect-[4/3]"}`}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 backdrop-blur-md border border-cyan-500/20 transition-all group-hover:bg-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{cat.name}</h3>
                          <p className="text-sm text-zinc-400">{cat.description}</p>
                        </div>
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
