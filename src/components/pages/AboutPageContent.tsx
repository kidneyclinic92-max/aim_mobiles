"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getIcon } from "@/lib/cms/icons";
import { useSiteContent } from "@/store/content-context";

export function AboutPageContent() {
  const { content } = useSiteContent();
  const { about } = content;

  return (
    <div>
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="eyebrow mb-4 mx-auto w-fit">
              {about.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              {about.title} <span className="text-gradient">{about.titleHighlight}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">{about.intro}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-y border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {about.stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100} className="text-center">
                <p className="text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-2 text-sm text-zinc-400">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={about.storyImage}
                  alt="Aim Mobiles team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100} className="text-center">
              <h2 className="text-3xl font-bold text-white">{about.storyTitle}</h2>
              {about.storyParagraphs.map((p, i) => (
                <p key={i} className="mt-4 text-zinc-400 leading-relaxed">{p}</p>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              {about.valuesTitle} <span className="text-gradient">{about.valuesHighlight}</span>
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2">
            {about.values.map((value, i) => {
              const Icon = getIcon(value.icon);
              return (
                <AnimatedSection key={value.title} delay={i * 100}>
                  <div className="glass-card p-8 h-full text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{value.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
