export const galleryCategories = [
  "Wszystkie",
  "Wesela",
  "Kościół",
  "Eventy",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

/**
 * Kategoria w adresie: /galeria#kosciol
 *
 * Hash, a nie parametr zapytania - działa przy eksporcie statycznym
 * i nie wymusza renderowania dynamicznego strony galerii.
 */
export function categorySlug(cat: GalleryCategory): string {
  return cat
    .toLowerCase()
    .replaceAll("\u0142", "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function categoryFromSlug(slug: string): GalleryCategory | null {
  return galleryCategories.find((c) => categorySlug(c) === slug) ?? null;
}

export type Photo = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "Wszystkie">;
  /** Wymiary źródłowe - wymagane przez next/image, żeby nie było skoku layoutu. */
  width: number;
  height: number;
};

/*
  TODO(opisy): pole `alt` jest na razie ogólne - generowałem je bez
  oglądania zdjęć. Dla dostępności i SEO warto je kiedyś podmienić na
  opisy tego, co faktycznie jest w kadrze ("łuk kwiatowy z gipsówką",
  "dekoracja ław kościelnych"). To samo dotyczy nazw plików.
*/
export const photos: readonly Photo[] = [
  // ── Wesela ──────────────────────────────────────────
  { src: "/images/galeria/wesela/wesela-01.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (1)", category: "Wesela", width: 1066, height: 1600 },
  { src: "/images/galeria/wesela/wesela-03.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (3)", category: "Wesela", width: 1064, height: 1600 },
  { src: "/images/galeria/wesela/wesela-04.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (4)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-05.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (5)", category: "Wesela", width: 1170, height: 1755 },
  { src: "/images/galeria/wesela/wesela-06.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (6)", category: "Wesela", width: 1067, height: 1600 },
  { src: "/images/galeria/wesela/wesela-07.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (7)", category: "Wesela", width: 1206, height: 1809 },
  { src: "/images/galeria/wesela/wesela-08.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (8)", category: "Wesela", width: 640, height: 960 },
  { src: "/images/galeria/wesela/wesela-09.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (9)", category: "Wesela", width: 1284, height: 1926 },
  { src: "/images/galeria/wesela/wesela-10.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (10)", category: "Wesela", width: 1284, height: 856 },
  { src: "/images/galeria/wesela/wesela-11.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (11)", category: "Wesela", width: 1290, height: 860 },
  { src: "/images/galeria/wesela/wesela-12.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (12)", category: "Wesela", width: 1440, height: 960 },
  { src: "/images/galeria/wesela/wesela-13.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (13)", category: "Wesela", width: 1440, height: 960 },
  { src: "/images/galeria/wesela/wesela-14.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (14)", category: "Wesela", width: 1206, height: 804 },
  { src: "/images/galeria/wesela/wesela-15.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (15)", category: "Wesela", width: 2016, height: 1341 },
  { src: "/images/galeria/wesela/wesela-16.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (16)", category: "Wesela", width: 1341, height: 2016 },
  { src: "/images/galeria/wesela/wesela-17.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (17)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-18.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (18)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-19.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (19)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-20.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (20)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-21.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (21)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-22.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (22)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-23.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (23)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-24.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (24)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-25.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (25)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-26.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (26)", category: "Wesela", width: 2048, height: 1363 },
  { src: "/images/galeria/wesela/wesela-27.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (27)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-28.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (28)", category: "Wesela", width: 2048, height: 1363 },
  { src: "/images/galeria/wesela/wesela-29.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (29)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-30.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (30)", category: "Wesela", width: 2000, height: 1331 },
  { src: "/images/galeria/wesela/wesela-31.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (31)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-32.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (32)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-33.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (33)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-34.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (34)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-35.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (35)", category: "Wesela", width: 1500, height: 1000 },
  { src: "/images/galeria/wesela/wesela-36.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (36)", category: "Wesela", width: 1500, height: 1000 },
  { src: "/images/galeria/wesela/wesela-37.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (37)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-38.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (38)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-39.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (39)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-40.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (40)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-41.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (41)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-42.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (42)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-43.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (43)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-44.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (44)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-45.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (45)", category: "Wesela", width: 1333, height: 2000 },
  { src: "/images/galeria/wesela/wesela-46.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (46)", category: "Wesela", width: 1333, height: 2000 },
  { src: "/images/galeria/wesela/wesela-47.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (47)", category: "Wesela", width: 1333, height: 2000 },
  { src: "/images/galeria/wesela/wesela-48.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (48)", category: "Wesela", width: 2000, height: 1333 },
  { src: "/images/galeria/wesela/wesela-49.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (49)", category: "Wesela", width: 1333, height: 2000 },
  { src: "/images/galeria/wesela/wesela-50.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (50)", category: "Wesela", width: 1067, height: 1600 },
  { src: "/images/galeria/wesela/wesela-51.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (51)", category: "Wesela", width: 1600, height: 1064 },
  { src: "/images/galeria/wesela/wesela-02.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (2)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-52.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (52)", category: "Wesela", width: 1067, height: 1600 },
  { src: "/images/galeria/wesela/wesela-53.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (53)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-54.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (54)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-55.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (55)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-56.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (56)", category: "Wesela", width: 1365, height: 2048 },
  { src: "/images/galeria/wesela/wesela-57.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (57)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-58.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (58)", category: "Wesela", width: 2048, height: 1365 },
  { src: "/images/galeria/wesela/wesela-59.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (59)", category: "Wesela", width: 1979, height: 1319 },
  { src: "/images/galeria/wesela/wesela-60.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (60)", category: "Wesela", width: 1363, height: 2048 },
  { src: "/images/galeria/wesela/wesela-61.jpg", alt: "Dekoracja weselna - realizacja Ślubnych Dylematów (61)", category: "Wesela", width: 1363, height: 2048 },

  // ── Kościół ─────────────────────────────────────────
  { src: "/images/galeria/kosciol/kosciol-01.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (1)", category: "Kościół", width: 1284, height: 1926 },
  { src: "/images/galeria/kosciol/kosciol-02.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (2)", category: "Kościół", width: 1284, height: 856 },
  { src: "/images/galeria/kosciol/kosciol-03.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (3)", category: "Kościół", width: 1284, height: 856 },
  { src: "/images/galeria/kosciol/kosciol-04.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (4)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-05.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (5)", category: "Kościół", width: 1170, height: 1755 },
  { src: "/images/galeria/kosciol/kosciol-06.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (6)", category: "Kościół", width: 2048, height: 1365 },
  { src: "/images/galeria/kosciol/kosciol-07.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (7)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-08.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (8)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-09.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (9)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-10.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (10)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-11.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (11)", category: "Kościół", width: 2048, height: 1363 },
  { src: "/images/galeria/kosciol/kosciol-12.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (12)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-13.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (13)", category: "Kościół", width: 1365, height: 2048 },
  { src: "/images/galeria/kosciol/kosciol-14.jpg", alt: "Dekoracja kościoła - realizacja Ślubnych Dylematów (14)", category: "Kościół", width: 720, height: 1080 },

  // ── Eventy ──────────────────────────────────────────
  { src: "/images/galeria/eventy/eventy-01.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (1)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-02.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (2)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-03.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (3)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-04.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (4)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-05.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (5)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-06.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (6)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-07.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (7)", category: "Eventy", width: 1363, height: 2048 },
  { src: "/images/galeria/eventy/eventy-08.jpg", alt: "Dekoracja przyjęcia okolicznościowego - realizacja Ślubnych Dylematów (8)", category: "Eventy", width: 1363, height: 2048 },
];

/**
 * Wybór na stronę główną - po nazwach plików, nie po indeksach.
 *
 * Indeksy rozjeżdżały się przy każdej zmianie kolejności w `photos`,
 * co jest łatwe do przeoczenia: lista dalej się kompilowała, tylko
 * pokazywała inne zdjęcia.
 */
const NA_GLOWNA = [
  "wesela-23.jpg",
  "wesela-01.jpg",
  "wesela-13.jpg",
  "wesela-17.jpg",
  "wesela-22.jpg",
  "wesela-26.jpg",
  "wesela-30.jpg",
  "wesela-43.jpg",
  "wesela-51.jpg",
] as const;

export const featuredPhotos: readonly Photo[] = NA_GLOWNA.map((nazwa) => {
  const zdjecie = photos.find((p) => p.src.endsWith(`/${nazwa}`));
  if (!zdjecie) throw new Error(`Brak zdjęcia na stronę główną: ${nazwa}`);
  return zdjecie;
});
