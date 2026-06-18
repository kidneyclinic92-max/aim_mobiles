"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/store/content-context";

export function Hero() {
  const { content } = useSiteContent();
  const { hero } = content.home;
  const { tagline } = content.site;
  const primaryCta = hero.slides[0];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        >
          <source src={hero.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto mt-32 max-w-2xl sm:mt-36 lg:mt-68">
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up">
            <Link href={primaryCta?.href ?? "/shop"}>
              <Button size="md">
                {primaryCta?.cta ?? "Shop Now"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={hero.secondaryCtaHref}>
              <Button size="md">
                {hero.secondaryCta}
              </Button>
            </Link>
          </div>

          <div className="mt-16 border-t border-white/5 pt-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              {tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
