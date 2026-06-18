"use client";

import Link from "next/link";
import { CheckCircle, FileText, RefreshCw, Shield } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/store/content-context";

export function WarrantyPageContent() {
  const { content } = useSiteContent();
  const { warranty } = content;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedSection className="text-center mb-16">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
          <Shield className="h-8 w-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl font-bold text-white">
          {warranty.title} <span className="text-gradient">{warranty.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">{warranty.intro}</p>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <div className="glass-card p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            <span className="inline-flex items-center justify-center gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              {warranty.coverageTitle}
            </span>
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {warranty.coverage.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">{warranty.processTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {warranty.steps.map((s) => (
            <div key={s.step} className="glass-card p-6 text-center">
              <span className="text-3xl font-bold text-gradient">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
          <h2 className="mb-4 text-center text-xl font-bold text-white">
            <span className="inline-flex items-center justify-center gap-3">
              <FileText className="h-5 w-5 text-gray-400" />
              {warranty.notCoveredTitle}
            </span>
          </h2>
          <ul className="space-y-2 text-sm text-gray-400">
            {warranty.notCovered.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">{warranty.notCoveredNote}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="text-center">
        <div className="glass-card p-8 inline-block">
          <RefreshCw className="mx-auto h-8 w-8 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold text-white">{warranty.ctaTitle}</h3>
          <p className="mt-2 text-gray-400 text-sm">{warranty.ctaDescription}</p>
          <Link href={warranty.ctaHref} className="mt-6 inline-block">
            <Button>{warranty.ctaButton}</Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
