export const galleryCategories = [
  "Wszystkie",
  "Sala weselna",
  "Kościół",
  "Plener",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type Photo = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "Wszystkie">;
  /** Wymiary źródłowe - wymagane przez next/image, żeby nie było skoku layoutu. */
  width: number;
  height: number;
};

export const photos: readonly Photo[] = [
  // ── Sala weselna ──────────────────────────────────────────
  { src: "/images/gallery/wedding_hall/sala_1p.jpg", alt: "Dekoracja sali weselnej w ciepłych barwach", category: "Sala weselna", width: 426, height: 640 },
  { src: "/images/gallery/wedding_hall/sala_2p.jpg", alt: "Romantyczna aranżacja sali weselnej", category: "Sala weselna", width: 426, height: 363 },
  { src: "/images/gallery/wedding_hall/sala_3.jpg", alt: "Elegancki stół weselny z kompozycją kwiatową", category: "Sala weselna", width: 640, height: 427 },
  { src: "/images/gallery/wedding_hall/sala_4p.jpg", alt: "Dekoracja stołów weselnych", category: "Sala weselna", width: 426, height: 355 },
  { src: "/images/gallery/wedding_hall/sala_5p.jpg", alt: "Kompozycja kwiatowa na środku stołu", category: "Sala weselna", width: 426, height: 312 },
  { src: "/images/gallery/wedding_hall/sala_6.jpg", alt: "Dekoracja sali weselnej - widok ogólny", category: "Sala weselna", width: 640, height: 427 },
  { src: "/images/gallery/wedding_hall/sala_7p.jpg", alt: "Subtelna dekoracja stołu weselnego", category: "Sala weselna", width: 427, height: 640 },
  { src: "/images/gallery/wedding_hall/sala_8p.jpg", alt: "Kwiaty na stole weselnym", category: "Sala weselna", width: 426, height: 640 },
  { src: "/images/gallery/wedding_hall/sala.jpg", alt: "Sala weselna - pełna aranżacja", category: "Sala weselna", width: 640, height: 427 },
  { src: "/images/gallery/wedding_hall/sala3.jpg", alt: "Klasyczna dekoracja weselna z gipsówką", category: "Sala weselna", width: 640, height: 427 },

  // ── Kościół ───────────────────────────────────────────────
  { src: "/images/gallery/church/kosciol_1p.jpg", alt: "Dekoracja ław kościelnych", category: "Kościół", width: 426, height: 640 },
  { src: "/images/gallery/church/kosciol_2p.jpg", alt: "Kwiatowa dekoracja wnętrza kościoła", category: "Kościół", width: 425, height: 288 },
  { src: "/images/gallery/church/kosciol_3.jpg", alt: "Dekoracja ołtarza kwiatami", category: "Kościół", width: 640, height: 426 },
  { src: "/images/gallery/church/kosciol_6.jpg", alt: "Oprawa kwiatowa ceremonii kościelnej", category: "Kościół", width: 427, height: 298 },
  { src: "/images/gallery/church/kosciol_7.jpg", alt: "Kompozycja kwiatowa przy ołtarzu", category: "Kościół", width: 427, height: 285 },
  { src: "/images/gallery/church/kosciol_8.jpg", alt: "Dekoracja nawy kościelnej", category: "Kościół", width: 640, height: 426 },
  { src: "/images/gallery/church/kosciol_9.jpg", alt: "Ślubna dekoracja wnętrza kościoła", category: "Kościół", width: 426, height: 325 },
  { src: "/images/gallery/church/church_couple.jpg", alt: "Para młoda w udekorowanym kościele", category: "Kościół", width: 507, height: 453 },
  { src: "/images/gallery/church/church_outsite.jpg", alt: "Dekoracja przy wejściu do kościoła", category: "Kościół", width: 640, height: 427 },

  // ── Plener ────────────────────────────────────────────────
  { src: "/images/gallery/outdoor_wedding/plener_1p.jpg", alt: "Dekoracja ślubu plenerowego", category: "Plener", width: 426, height: 640 },
  { src: "/images/gallery/outdoor_wedding/plener_3p.jpg", alt: "Romantyczna aranżacja pleneru ślubnego", category: "Plener", width: 640, height: 426 },
  { src: "/images/gallery/outdoor_wedding/plener_4p.jpg", alt: "Łuk kwiatowy w plenerze", category: "Plener", width: 426, height: 354 },
  { src: "/images/gallery/outdoor_wedding/plener_5.jpg", alt: "Ślub w plenerze - aranżacja ceremonii", category: "Plener", width: 640, height: 426 },
  { src: "/images/gallery/outdoor_wedding/plener_6.jpg", alt: "Plenerowe dekoracje kwiatowe", category: "Plener", width: 640, height: 426 },
  { src: "/images/gallery/outdoor_wedding/plener_7.jpg", alt: "Naturalne dekoracje ślubne w plenerze", category: "Plener", width: 426, height: 640 },
  { src: "/images/gallery/outdoor_wedding/plener_8.jpg", alt: "Plenerowa ceremonia ślubna", category: "Plener", width: 640, height: 426 },
  { src: "/images/gallery/outdoor_wedding/plener_9.jpg", alt: "Ślub na świeżym powietrzu - dekoracje", category: "Plener", width: 640, height: 426 },
  { src: "/images/gallery/outdoor_wedding/plener-bukiet_2.jpg", alt: "Bukiet ślubny w plenerze", category: "Plener", width: 426, height: 640 },
];

/** Wybór na stronę główną - po trzy z każdej kategorii. */
export const featuredPhotos = [
  photos[0],
  photos[10],
  photos[22],
  photos[2],
  photos[12],
  photos[19],
  photos[1],
  photos[17],
  photos[27],
] as const;
