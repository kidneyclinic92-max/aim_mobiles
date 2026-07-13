"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteContent } from "@/store/content-context";

const SLIDE_DURATION = 7000;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const { content } = useSiteContent();
  const { hero } = content.home;
  const { tagline } = content.site;

  // Slide 0 is the brand intro (video); the rest are CMS product spotlights.
  const slideCount = 1 + hero.slides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => setActive(((index % slideCount) + slideCount) % slideCount),
    [slideCount]
  );

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => goTo(active + 1), SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, paused, goTo]);

  const productSlide = active > 0 ? hero.slides[active - 1] : null;

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backgrounds — crossfade between video (intro) and product imagery */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            {productSlide ? (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.07 }}
                transition={{ duration: SLIDE_DURATION / 1000 + 1.2, ease: "linear" }}
              >
                <Image
                  src={productSlide.image}
                  alt=""
                  fill
                  priority={active === 1}
                  className="object-cover"
                  sizes="100vw"
                  aria-hidden
                />
              </motion.div>
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={hero.slides[0]?.image}
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              >
                <source src={hero.videoUrl} type="video/mp4" />
              </video>
            )}
            {productSlide?.accent && (
              <div className={`absolute inset-0 bg-gradient-to-br ${productSlide.accent}`} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Cinematic scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-32 pt-28 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {productSlide ? (
            <motion.div
              key={`slide-${active}`}
              className="mx-auto max-w-4xl"
              exit={{ opacity: 0, y: -16, transition: { duration: 0.4, ease: "easeIn" } }}
            >
              <motion.h1
                className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-[5.25rem] lg:leading-[1.02]"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {productSlide.title}
              </motion.h1>

              <motion.p
                className="mx-auto mt-5 max-w-xl text-lg font-light text-zinc-200 sm:text-xl"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                {productSlide.subtitle}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap justify-center gap-4"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <Link href={productSlide.href}>
                  <Button size="lg">
                    {productSlide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={hero.secondaryCtaHref}>
                  <Button variant="secondary" size="lg">
                    {hero.secondaryCta}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="intro"
              className="mx-auto max-w-4xl"
              exit={{ opacity: 0, y: -16, transition: { duration: 0.4, ease: "easeIn" } }}
            >
              <motion.h1
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {hero.headline}{" "}
                <span className="text-gradient">{hero.headlineHighlight}</span>
              </motion.h1>

              <motion.p
                className="mx-auto mt-6 max-w-xl text-lg font-light text-zinc-300"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                {tagline}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap justify-center gap-4"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <Link href="/shop">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={hero.secondaryCtaHref}>
                  <Button variant="secondary" size="lg">
                    {hero.secondaryCta}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative h-6 w-10 overflow-visible"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active === i}
          >
            <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
              {active === i && (
                <motion.span
                  key={`progress-${active}-${paused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-cyan-400"
                  initial={{ width: paused ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: paused ? 0 : SLIDE_DURATION / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-zinc-500"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
