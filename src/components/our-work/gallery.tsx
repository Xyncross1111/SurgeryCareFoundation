"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/ui/icons";

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const SWIPE_THRESHOLD_PX = 50;

export function Gallery({ photos, alt }: { photos: GalleryPhoto[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4 [&>*]:mb-3 md:[&>*]:mb-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl bg-surface-page shadow-card outline-none transition-shadow duration-200 hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </button>
        ))}
      </div>

      {isOpen && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),1rem)] md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-medium tabular-nums text-white/80">
              {openIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 active:bg-white/30 focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-3 py-3 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="100vw"
              className="max-h-full max-w-full object-contain"
              priority
            />

            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white md:inline-flex"
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white md:inline-flex"
              aria-label="Next photo"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div
            className="flex items-center justify-center gap-6 px-4 pb-[max(env(safe-area-inset-bottom),1.25rem)] md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prev}
              className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/30"
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white active:bg-white/30"
              aria-label="Next photo"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
