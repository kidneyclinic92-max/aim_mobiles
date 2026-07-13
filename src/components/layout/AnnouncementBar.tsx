"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSiteContent } from "@/store/content-context";

const DISMISS_KEY = "aim-announcement-dismissed";

export function AnnouncementBar() {
  const { content } = useSiteContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sessionStorage.getItem(DISMISS_KEY) !== "1");
  }, []);

  if (!visible) return null;

  const message = `Free shipping on orders over $${content.commerce.freeShippingThreshold} — ${content.site.tagline}`;

  return (
    <div className="relative border-b border-white/[0.06] bg-zinc-900/90 text-center text-xs text-zinc-300 backdrop-blur-md after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-1/2 after:-translate-x-1/2 after:bg-gradient-to-r after:from-transparent after:via-cyan-400/40 after:to-transparent">
      <p className="px-10 py-2 font-medium tracking-wide">{message}</p>
      <button
        onClick={() => {
          sessionStorage.setItem(DISMISS_KEY, "1");
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 hover:bg-white/10 hover:text-zinc-300"
        aria-label="Dismiss announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
