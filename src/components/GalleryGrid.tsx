"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  categoryFromSlug,
  categorySlug,
  galleryCategories,
  photos,
  type GalleryCategory,
} from "@/data/gallery";

/**
 * The URL is the source of truth for the selected category, so a link from
 * the Offer section ("/galeria#kosciol") opens the right filter, the back
 * button works, and the link is shareable. useSyncExternalStore because the
 * URL is an external store - correct SSR handling, no setState in an effect.
 */
function useHash(): string {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    () => window.location.hash.slice(1),
    () => "",
  );
}

const KROK = 24;

export default function GalleryGrid() {
  const hash = useHash();
  const category: GalleryCategory = categoryFromSlug(hash) ?? "Wszystkie";
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Limit per category, not one number: avoids resetting it when the filter
  // changes (which would mean setState in an effect, since the category comes
  // from the URL) and keeps what was already loaded when returning.
  const [limity, setLimity] = useState<Record<string, number>>({});
  const limit = limity[category] ?? KROK;

  const wszystkieZKategorii = useMemo(
    () =>
      category === "Wszystkie"
        ? photos
        : photos.filter((p) => p.category === category),
    [category],
  );

  const visible = wszystkieZKategorii;
  const pokazane = wszystkieZKategorii.slice(0, limit);
  const zostalo = wszystkieZKategorii.length - pokazane.length;

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

  const active =
    lightbox !== null && lightbox < visible.length ? visible[lightbox] : null;

  return (
    <>
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {galleryCategories.map((cat) => {
          const selected = cat === category;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                window.location.hash = categorySlug(cat);
                setLightbox(null);
              }}
              aria-pressed={selected}
              className={`rounded-sm border px-4 py-2.5 text-center text-sm transition-colors duration-200 ${
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
        {wszystkieZKategorii.length}{" "}
        {wszystkieZKategorii.length === 1
          ? "zdjęcie"
          : wszystkieZKategorii.length < 5
            ? "zdjęcia"
            : "zdjęć"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-14 rounded-md border border-line bg-surface px-6 py-14 text-center text-muted">
          W tej kategorii nie ma jeszcze zdjęć. Zajrzyjcie do pozostałych albo
          napiszcie - chętnie pokażę więcej realizacji prywatnie.
        </p>
      ) : (
        <div className="masonry mt-10">
          {pokazane.map((photo, i) => (
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

      {zostalo > 0 && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-faint">
            Pokazano {pokazane.length} z {wszystkieZKategorii.length}
          </p>
          <button
            type="button"
            onClick={() =>
              setLimity((l) => ({ ...l, [category]: limit + KROK }))
            }
            className="rounded-sm border border-ink/25 px-7 py-3.5 text-[0.9375rem] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
          >
            Pokaż kolejne {Math.min(KROK, zostalo)}
          </button>
        </div>
      )}

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
