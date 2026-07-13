"use client";

import { Hero } from "@/components/home/Hero";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { TrustSignals } from "@/components/home/TrustSignals";
import { Testimonials } from "@/components/home/Testimonials";
import { getBestSellers, getNewArrivals } from "@/lib/products";
import { useSiteContent } from "@/store/content-context";

export default function HomePage() {
  const { content } = useSiteContent();
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const { bestSellers: bsSection, newArrivals: naSection } = content.home;

  return (
    <>
      <Hero />
      <FeaturedCarousel />
      <CategoriesGrid />
      <ProductSection
        title={bsSection.title}
        highlight={bsSection.highlight ?? ""}
        products={bestSellers}
        viewAllHref={bsSection.viewAllHref}
        viewAllLabel={bsSection.viewAllLabel}
      />
      <TrustSignals />
      <ProductSection
        title={naSection.title}
        highlight={naSection.highlight ?? ""}
        products={newArrivals}
        viewAllHref={naSection.viewAllHref}
        viewAllLabel={naSection.viewAllLabel}
      />
      <Testimonials />
    </>
  );
}
