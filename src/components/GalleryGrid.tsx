"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  galleryCategories,
  photos,
  type GalleryCategory,
} from "@/data/gallery";

export default function GalleryGrid() {
  const [category, setCategory] = useState<GalleryCategory>("Wszystkie");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      category === "Wszystkie"
        ? photos
        : photos.filter((p) => p.category === category),
    [category],
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) =>
        i === null ? null : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  const active = lightbox === null ? null : visible[lightbox];

  return (
    <>
      {/* Filtry */}
      <div className="flex flex-wrap justify-center gap-2">
        {galleryCategories.map((cat) => {
          const selected = cat === category;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setLightbox(null);
              }}
              aria-pressed={selected}
              className={`rounded-sm border px-5 py-2.5 text-sm transition-colors duration-200 ${
                selected
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-center text-sm text-faint">
        {visible.length}{" "}
        {visible.length === 1 ? "zdjęcie" : visible.length < 5 ? "zdjęcia" : "zdjęć"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-14 rounded-md border border-line bg-surface px-6 py-14 text-center text-muted">
          W tej kategorii nie ma jeszcze zdjęć. Zajrzyjcie do pozostałych albo
          napiszcie - chętnie pokażę więcej realizacji prywatnie.
        </p>
      ) : (
        <div className="masonry mt-10">
          {visible.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightbox(i)}
              className="group block w-full overflow-hidden rounded-sm bg-surface text-left"
              aria-label={`Powiększ: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                className="h-auto w-full transition-opacity duration-200 group-hover:opacity-85"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-canvas-dark/95 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zamknij"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-sm text-ink-invert transition-colors hover:bg-white/10"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-sm text-ink-invert transition-colors hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft size={26} />
          </button>

          <figure
            className="max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="90vw"
              className="max-h-[80svh] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-invert">
              {active.alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Następne zdjęcie"
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-sm text-ink-invert transition-colors hover:bg-white/10 sm:right-6"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </>
  );
}
