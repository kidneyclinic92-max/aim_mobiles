"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-sm flex-col border-l border-white/[0.06] bg-zinc-950 lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] p-6">
              <span className="text-lg font-bold text-zinc-100">
                {brandPrefix}{brandSuffix}
              </span>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
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
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all",
                      pathname === link.href
                        ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {link.label}
                    {link.href === "/wishlist" && wishlistItems.length > 0 && (
                      <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-bold text-zinc-950">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {navigation.mobileSecondary.length > 0 && (
                <>
                  <div className="my-6 border-t border-white/[0.06]" />

                  <div className="space-y-1">
                    {navigation.mobileSecondary.map((link) => {
                      const Icon = linkIcons[link.href] ?? Package;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </nav>

            <div className="border-t border-white/[0.06] p-6">
              <p className="text-center text-xs text-zinc-500">{site.tagline}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
