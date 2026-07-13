"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, LayoutGrid, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/store/content-context";
import { getProductsList, getCategoriesList, getAllBrands } from "@/lib/products";

function SidebarLink({
  href,
  label,
  count,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  count?: number;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-cyan-400/10 font-semibold text-cyan-300"
          : "text-zinc-300 hover:bg-white/5 hover:text-white"
      )}
    >
      <span className="flex items-center gap-1.5">
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 transition-all",
            active
              ? "text-cyan-400"
              : "-ml-1 w-0 opacity-0 group-hover:ml-0 group-hover:w-3.5 group-hover:opacity-100"
          )}
        />
        {label}
      </span>
      {count !== undefined && (
        <span className={cn("text-xs", active ? "text-cyan-400/80" : "text-zinc-500")}>
          {count}
        </span>
      )}
    </Link>
  );
}

export function BrowseSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { content } = useSiteContent();
  const { browse } = content.shop;
  const [open, setOpen] = useState(false);

  const products = getProductsList();
  const brands = getAllBrands();
  const categoryData = getCategoriesList();

  const activeCategory = pathname === "/shop" ? searchParams.get("category") : null;
  const activeBrand = pathname === "/shop" ? searchParams.get("brand") : null;

  const categoryCounts = new Map<string, number>();
  const brandCounts = new Map<string, number>();
  for (const p of products) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
    brandCounts.set(p.brand, (brandCounts.get(p.brand) ?? 0) + 1);
  }

  const close = () => setOpen(false);

  return (
    <div
      className="fixed inset-y-0 left-0 z-[55] hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
    >
      {/* Edge tab — always visible */}
      <button
        onClick={() => setOpen(!open)}
        onFocus={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Browse categories and brands"
        className={cn(
          "absolute left-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-2 rounded-r-xl border border-l-0 border-white/10 bg-zinc-900/90 px-1.5 py-4 text-zinc-400 backdrop-blur-md transition-all hover:text-cyan-300",
          open && "opacity-0 pointer-events-none"
        )}
      >
        <LayoutGrid className="h-4 w-4" />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ writingMode: "vertical-rl" }}
        >
          {browse.tabLabel}
        </span>
      </button>

      {/* Flyout panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="absolute inset-y-0 left-0 flex w-72 flex-col overflow-y-auto border-r border-white/10 bg-zinc-950/95 px-4 pb-8 pt-[8.5rem] shadow-[20px_0_60px_rgba(0,0,0,0.55)] backdrop-blur-xl scrollbar-hide"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
          >
            <div className="mb-2 flex items-center gap-2 px-3">
              <LayoutGrid className="h-4 w-4 text-cyan-400" />
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                {browse.categoriesHeading}
              </h2>
            </div>
            <nav className="space-y-0.5" aria-label="Product categories">
              <SidebarLink
                href="/shop"
                label={browse.allProductsLabel}
                count={products.length}
                active={pathname === "/shop" && !activeCategory && !activeBrand}
                onNavigate={close}
              />
              {categoryData.map((cat) => (
                <SidebarLink
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  label={cat.name}
                  count={categoryCounts.get(cat.id) ?? 0}
                  active={activeCategory === cat.id}
                  onNavigate={close}
                />
              ))}
            </nav>

            <div className="mb-2 mt-7 flex items-center gap-2 border-t border-white/[0.06] px-3 pt-6">
              <Tag className="h-4 w-4 text-cyan-400" />
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                {browse.brandsHeading}
              </h2>
            </div>
            <nav className="space-y-0.5" aria-label="Brands">
              {brands.map((brand) => (
                <SidebarLink
                  key={brand}
                  href={`/shop?brand=${encodeURIComponent(brand)}`}
                  label={brand}
                  count={brandCounts.get(brand) ?? 0}
                  active={activeBrand === brand}
                  onNavigate={close}
                />
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
