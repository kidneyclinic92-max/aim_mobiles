"use client";

import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: string[];
  name: string;
};

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-2xl bg-white/5 cursor-zoom-in",
          zoomed && "cursor-zoom-out"
        )}
        onClick={() => setZoomed(!zoomed)}
      >
        <Image
          src={images[selected]}
          alt={`${name} - image ${selected + 1}`}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            zoomed ? "scale-150" : "scale-100"
          )}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
          <ZoomIn className="h-3.5 w-3.5" />
          {zoomed ? "Click to zoom out" : "Click to zoom"}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                setZoomed(false);
              }}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                i === selected
                  ? "border-cyan-500 shadow-lg shadow-cyan-500/20"
                  : "border-white/10 opacity-60 hover:opacity-100"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
