"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Package, Shield, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/store/wishlist-context";
import { useSiteContent } from "@/store/content-context";

const linkIcons: Record<string, typeof Heart> = {
  "/wishlist": Heart,
  "/warranty": Shield,
  "/track-order": Package,
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { items: wishlistItems } = useWishlist();
  const { content } = useSiteContent();
  const { site, navigation } = content;

  const brandParts = site.name.match(/^(.+?)(Mobiles?)$/i);
  const brandPrefix = brandParts?.[1] ?? site.name.slice(0, 3);
  const brandSuffix = brandParts?.[2] ?? site.name.slice(3);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col border-l border-white/[0.06] bg-zinc-950 transition-transform duration-500 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] p-6">
          <span className="text-lg font-bold text-zinc-500">
            {brandPrefix}{brandSuffix}
          </span>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6" aria-label="Mobile navigation">
          <div className="space-y-1">
            {navigation.mobileMain.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between rounded-none px-4 py-3.5 text-base font-medium transition-all",
                  pathname === link.href
                    ? "border border-white/20 bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
                {link.href === "/wishlist" && wishlistItems.length > 0 && (
                  <span className="rounded-none border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-white">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="my-6 border-t border-white/[0.06]" />

          <div className="space-y-1">
            {navigation.mobileSecondary.map((link) => {
              const Icon = linkIcons[link.href] ?? Package;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/[0.06] p-6">
          <p className="text-center text-xs text-gray-500">{site.tagline}</p>
        </div>
      </div>
    </>
  );
}
