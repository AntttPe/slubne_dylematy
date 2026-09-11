import type { GalleryCategory } from "./gallery";

export type Service = {
  title: string;
  /** Jedno zdanie, które ma sprzedać usługę. */
  lead: string;
  description: string;
  image: string;
  width: number;
  height: number;
  tags: readonly string[];
  /**
   * Kategoria, na którą przefiltruje się galeria po kliknięciu.
   * Bez niej przycisk prowadzi do pełnej galerii.
   */
  galleryCategory?: Exclude<GalleryCategory, "Wszystkie">;
};

const R = "/images/realizacje";

export const services: readonly Service[] = [
  {
    title: "Dekoracje ślubne",
    lead: "Kompleksowa oprawa od kościoła po ostatni stół na sali.",
    description:
      "Spójna koncepcja zamiast zestawu osobnych elementów: jedna paleta, jeden styl, jedna osoba odpowiedzialna za całość. Przyjeżdżam, montuję i zostaję do końca.",
    image: `${R}/sala-weselna-boho-pampasy-zyrandole.jpg`,
    width: 1955,
    height: 1303,
    tags: ["Sala", "Stoły", "Ścianka", "Plener"],
    galleryCategory: "Wesela",
  },
  {
    title: "Dekoracje kościoła",
    lead: "Oprawa, która nie przytłacza wnętrza, tylko je podkreśla.",
    description:
      "Kwiaty przy ołtarzu, dekoracja ław, łuk wejściowy, dywan i świece. Każdy kościół ma swój charakter - kompozycję dobieram do niego, a nie odwrotnie.",
    image: `${R}/dekoracja-kosciola-bialy-dywan-swiece.jpg`,
    width: 2560,
    height: 1703,
    tags: ["Ołtarz", "Ławy", "Łuk", "Świece"],
    galleryCategory: "Kościół",
  },
  {
    title: "Przyjęcia i eventy",
    lead: "Urodziny, rocznice, jubileusze i spotkania firmowe.",
    description:
      "Nie każde wydarzenie musi być weselem, żeby zasługiwać na przemyślaną oprawę. Ten sam standard pracy, skala dopasowana do okazji i budżetu.",
    image: `${R}/sala-industrialna-swiatelka-stoly.jpg`,
    width: 1600,
    height: 1067,
    tags: ["Urodziny", "Rocznice", "Komunie", "Firmowe"],
    galleryCategory: "Eventy",
  },
];
