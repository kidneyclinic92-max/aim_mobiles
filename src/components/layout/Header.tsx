"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart-context";
import { useWishlist } from "@/store/wishlist-context";
import { useSiteContent } from "@/store/content-context";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "@/components/shop/SearchBar";
import { AnnouncementBar } from "./AnnouncementBar";

export function Header() {
  const pathname = usePathname();
  const { content } = useSiteContent();
  const { site, navigation } = content;
  const { itemCount, toggleCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const brandParts = site.name.match(/^(.+?)(Mobiles?)$/i);
  const brandPrefix = brandParts?.[1] ?? site.name.slice(0, 3);
  const brandSuffix = brandParts?.[2] ?? site.name.slice(3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("?")[0];
    return pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] transition-all duration-300",
          scrolled
            ? "bg-zinc-950/95 shadow-lg shadow-black/40 backdrop-blur-xl"
            : "bg-zinc-950/80 backdrop-blur-md"
        )}
      >
        <AnnouncementBar />

        <div className="relative flex h-[4.25rem] w-full items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group relative z-10 flex shrink-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-zinc-600/40">
              <Image
                src="/assets/icon.jpg"
                alt={site.name}
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="hidden leading-tight sm:block">
              <span className="block text-base font-bold text-zinc-100">
                {brandPrefix}{brandSuffix}
              </span>
              <span className="block text-[11px] text-zinc-400">Premium Mobile Store</span>
            </div>
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-x-5 xl:gap-x-6 lg:flex"
            aria-label="Main navigation"
          >
            {navigation.main.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium whitespace-nowrap transition-colors",
                  isActive(link.href)
                    ? "text-white after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-cyan-400"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-white/5 hover:text-white sm:flex"
              aria-label={`Wishlist (${wishlistItems.length})`}
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistItems.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-zinc-950">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label={`Cart (${itemCount})`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-zinc-950">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Menu"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/[0.06] bg-zinc-950/95 px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <SearchBar autoFocus onClose={() => setSearchOpen(false)} className="flex-1" />
              <button onClick={() => setSearchOpen(false)} className="rounded-full p-2 text-zinc-500 hover:text-white" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
