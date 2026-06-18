"use client";

import { getIcon } from "@/lib/cms/icons";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useSiteContent } from "@/store/content-context";

export function TrustSignals() {
  const { content } = useSiteContent();
  const signals = content.home.trustSignals;

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal, i) => {
            const Icon = getIcon(signal.icon);
            return (
              <AnimatedSection key={signal.title} delay={i * 90}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-500 hover:border-cyan-500/20 hover:bg-white/[0.04]">
                  <div className="absolute -right-4 -top-4 text-6xl font-black text-white/[0.03] transition-colors group-hover:text-cyan-500/10">
                    {signal.stat}
                  </div>
                  <div className="relative text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-600/10 text-cyan-400 ring-1 ring-cyan-500/20 transition-all group-hover:shadow-[0_0_24px_rgba(0,212,255,0.2)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-white">{signal.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{signal.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
