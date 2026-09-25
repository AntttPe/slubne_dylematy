export const galleryCategories = [
  "Wszystkie",
  "Wesela",
  "Kościół",
  "Eventy",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

/** Category in the URL: /galeria#kosciol. A hash, not a query param - works
 *  with static export and does not force dynamic rendering. */
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

/**
 * Venues the owner has actually worked at.
 *
 * Kept as structured data rather than baked into alt strings: the same list
 * drives the alt text, the lightbox caption and the "where I work" section.
 * Venue plus city is the phrase couples actually search for once they have
 * booked a place ("dekoracje Stara Szwajcaria Gliwice") - far less contested
 * than the generic terms and with much higher intent.
 */
export type Venue = { name: string; city: string };

export const venues = {
  "stara-szwajcaria": { name: "Stara Szwajcaria", city: "Gliwice" },
  impresja: { name: "Impresja", city: "Zabrze" },
  "lesna-perla": { name: "Leśna Perła", city: "Radlin" },
  "wisniowy-sad": { name: "Wiśniowy Sad", city: "Tarnowskie Góry" },
  "bytom-michala": { name: "kościół św. Michała Archanioła", city: "Bytom" },
  swierklaniec: { name: "kościół w Świerklańcu", city: "Świerklaniec" },
  naklo: { name: "kościół w Nakle Śląskim", city: "Nakło Śląskie" },
  "kozlowa-gora": { name: "kościół w Kozłowej Górze", city: "Kozłowa Góra" },
} as const satisfies Record<string, Venue>;

export type VenueKey = keyof typeof venues;

/** What is in frame. Drives the alt text, so it stays descriptive rather than
 *  keyword-stuffed - screen readers read these out loud. */
const subjects = {
  bukiet: "Bukiet ślubny",
  stol: "Dekoracja stołu weselnego",
  "stol-pary": "Dekoracja stołu pary młodej",
  "stol-zima": "Zimowa dekoracja stołu weselnego",
  "stol-jesien": "Jesienna dekoracja stołu weselnego",
  plener: "Dekoracja miejsca przysięgi - ślub plenerowy",
  wesele: "Dekoracja weselna",
  kosciol: "Dekoracja kościoła",
  event: "Dekoracja przyjęcia okolicznościowego",
} as const;

export type Subject = keyof typeof subjects;

export type Photo = {
  src: string;
  category: Exclude<GalleryCategory, "Wszystkie">;
  /** Source dimensions - next/image needs them to avoid layout shift. */
  width: number;
  height: number;
  subject: Subject;
  venue?: VenueKey;
};

/** Alt text is generated, not hand-written: 88 photos would drift otherwise,
 *  and every venue added here flows into the alt text for free. */
export function photoAlt(photo: Photo): string {
  const base = subjects[photo.subject];
  if (!photo.venue) return base;
  const v = venues[photo.venue];
  return `${base} - ${v.name}, ${v.city}`;
}

export function photoVenue(photo: Photo): Venue | null {
  return photo.venue ? venues[photo.venue] : null;
}

export const photos: readonly Photo[] = [
  // ── Wesela ────────────────────────────────────────
  { src: "/images/galeria/wesela/wesela-01.jpg", category: "Wesela", width: 1066, height: 1600, subject: "stol", venue: "lesna-perla" },
  { src: "/images/galeria/wesela/wesela-03.jpg", category: "Wesela", width: 1064, height: 1600, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-04.jpg", category: "Wesela", width: 1363, height: 2048, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-05.jpg", category: "Wesela", width: 1170, height: 1755, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-06.jpg", category: "Wesela", width: 1067, height: 1600, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-07.jpg", category: "Wesela", width: 1206, height: 1809, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-08.jpg", category: "Wesela", width: 640, height: 960, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-09.jpg", category: "Wesela", width: 1284, height: 1926, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-10.jpg", category: "Wesela", width: 1284, height: 856, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-11.jpg", category: "Wesela", width: 1290, height: 860, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-12.jpg", category: "Wesela", width: 1440, height: 960, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-13.jpg", category: "Wesela", width: 1440, height: 960, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-14.jpg", category: "Wesela", width: 1206, height: 804, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-15.jpg", category: "Wesela", width: 2016, height: 1341, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-16.jpg", category: "Wesela", width: 1341, height: 2016, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-17.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-18.jpg", category: "Wesela", width: 2048, height: 1365, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-19.jpg", category: "Wesela", width: 1365, height: 2048, subject: "stol", venue: "impresja" },
  { src: "/images/galeria/wesela/wesela-20.jpg", category: "Wesela", width: 1365, height: 2048, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-21.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-22.jpg", category: "Wesela", width: 2048, height: 1365, subject: "wesele", venue: "impresja" },
  { src: "/images/galeria/wesela/wesela-23.jpg", category: "Wesela", width: 2048, height: 1365, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-24.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-25.jpg", category: "Wesela", width: 1363, height: 2048, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-26.jpg", category: "Wesela", width: 2048, height: 1363, subject: "plener" },
  { src: "/images/galeria/wesela/wesela-27.jpg", category: "Wesela", width: 1363, height: 2048, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-28.jpg", category: "Wesela", width: 2048, height: 1363, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-29.jpg", category: "Wesela", width: 1363, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-30.jpg", category: "Wesela", width: 2000, height: 1331, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-31.jpg", category: "Wesela", width: 1363, height: 2048, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-32.jpg", category: "Wesela", width: 1363, height: 2048, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-33.jpg", category: "Wesela", width: 1363, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-34.jpg", category: "Wesela", width: 1363, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-35.jpg", category: "Wesela", width: 1500, height: 1000, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-36.jpg", category: "Wesela", width: 1500, height: 1000, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-37.jpg", category: "Wesela", width: 1363, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-38.jpg", category: "Wesela", width: 1363, height: 2048, subject: "stol", venue: "wisniowy-sad" },
  { src: "/images/galeria/wesela/wesela-39.jpg", category: "Wesela", width: 1365, height: 2048, subject: "stol-zima" },
  { src: "/images/galeria/wesela/wesela-40.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-41.jpg", category: "Wesela", width: 1365, height: 2048, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-42.jpg", category: "Wesela", width: 1365, height: 2048, subject: "plener" },
  { src: "/images/galeria/wesela/wesela-43.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-44.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-45.jpg", category: "Wesela", width: 1333, height: 2000, subject: "plener" },
  { src: "/images/galeria/wesela/wesela-46.jpg", category: "Wesela", width: 1333, height: 2000, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-47.jpg", category: "Wesela", width: 1333, height: 2000, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-48.jpg", category: "Wesela", width: 2000, height: 1333, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-49.jpg", category: "Wesela", width: 1333, height: 2000, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-50.jpg", category: "Wesela", width: 1067, height: 1600, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-51.jpg", category: "Wesela", width: 1600, height: 1064, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-02.jpg", category: "Wesela", width: 2048, height: 1365, subject: "stol-jesien" },
  { src: "/images/galeria/wesela/wesela-52.jpg", category: "Wesela", width: 1067, height: 1600, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-53.jpg", category: "Wesela", width: 2048, height: 1365, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-54.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-55.jpg", category: "Wesela", width: 1365, height: 2048, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-56.jpg", category: "Wesela", width: 1365, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-57.jpg", category: "Wesela", width: 2048, height: 1365, subject: "plener" },
  { src: "/images/galeria/wesela/wesela-58.jpg", category: "Wesela", width: 2048, height: 1365, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-59.jpg", category: "Wesela", width: 1979, height: 1319, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-60.jpg", category: "Wesela", width: 1363, height: 2048, subject: "wesele" },
  { src: "/images/galeria/wesela/wesela-61.jpg", category: "Wesela", width: 1363, height: 2048, subject: "stol" },

  // ── Kościół ───────────────────────────────────────
  { src: "/images/galeria/kosciol/kosciol-01.jpg", category: "Kościół", width: 1284, height: 1926, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-02.jpg", category: "Kościół", width: 1284, height: 856, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-03.jpg", category: "Kościół", width: 1284, height: 856, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-04.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-05.jpg", category: "Kościół", width: 1170, height: 1755, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-06.jpg", category: "Kościół", width: 2048, height: 1365, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-07.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-08.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol", venue: "bytom-michala" },
  { src: "/images/galeria/kosciol/kosciol-09.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-10.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-11.jpg", category: "Kościół", width: 2048, height: 1363, subject: "kosciol", venue: "swierklaniec" },
  { src: "/images/galeria/kosciol/kosciol-12.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol", venue: "naklo" },
  { src: "/images/galeria/kosciol/kosciol-13.jpg", category: "Kościół", width: 1365, height: 2048, subject: "kosciol" },
  { src: "/images/galeria/kosciol/kosciol-14.jpg", category: "Kościół", width: 720, height: 1080, subject: "kosciol" },

  // ── Eventy ────────────────────────────────────────
  { src: "/images/galeria/eventy/eventy-01.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event" },
  { src: "/images/galeria/eventy/eventy-02.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event", venue: "impresja" },
  { src: "/images/galeria/eventy/eventy-03.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event", venue: "impresja" },
  { src: "/images/galeria/eventy/eventy-04.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event", venue: "impresja" },
  { src: "/images/galeria/eventy/eventy-05.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event" },
  { src: "/images/galeria/eventy/eventy-06.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event" },
  { src: "/images/galeria/eventy/eventy-07.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event" },
  { src: "/images/galeria/eventy/eventy-08.jpg", category: "Eventy", width: 1363, height: 2048, subject: "event", venue: "impresja" },

  // ── Wesela ────────────────────────────────────────
  { src: "/images/galeria/wesela/wesela-62.jpg", category: "Wesela", width: 1365, height: 2048, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-63.jpg", category: "Wesela", width: 1365, height: 2048, subject: "stol-pary" },
  { src: "/images/galeria/wesela/wesela-64.jpg", category: "Wesela", width: 2048, height: 1366, subject: "bukiet" },
  { src: "/images/galeria/wesela/wesela-65.jpg", category: "Wesela", width: 1365, height: 2048, subject: "stol" },
  { src: "/images/galeria/wesela/wesela-66.jpg", category: "Wesela", width: 2048, height: 1365, subject: "plener" },
];

/** Homepage selection - by file name, not index: indexes drifted whenever the
 *  order changed, and the list still compiled while showing other photos. */
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
