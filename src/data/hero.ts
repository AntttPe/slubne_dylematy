/**
 * Slajdy w tle strony głównej.
 *
 * Kolejność ma znaczenie: pierwszy jest obrazem LCP i ładuje się
 * priorytetowo, reszta dopiero po pierwszym renderze.
 *
 * Dobór nie jest przypadkowy - kadry pokazują po kolei salę, kościół
 * i plener, więc przewijające się tło samo opowiada zakres usług.
 * Wszystkie muszą być szerokie i spokojne w lewym dolnym rogu,
 * bo tam siedzi nagłówek.
 */
export type HeroSlide = { src: string; alt: string };

export const heroSlides: readonly HeroSlide[] = [
  {
    src: "/images/realizacje/sala-weselna-boho-pampasy-zyrandole.jpg",
    alt: "Sala weselna w stylu boho z pampasami i kryształowymi żyrandolami",
  },
  {
    src: "/images/realizacje/sala-weselna-swiatelka-oliwkowe-obrusy.jpg",
    alt: "Sala weselna z girlandami świetlnymi i oliwkowymi obrusami",
  },
  {
    src: "/images/realizacje/slub-plenerowy-luk-z-gipsowka.jpg",
    alt: "Ceremonia plenerowa z łukiem z gipsówki",
  },
  {
    src: "/images/realizacje/dekoracja-kosciola-bialy-dywan-swiece.jpg",
    alt: "Dekoracja kościoła z białym dywanem i świecami",
  },
  {
    src: "/images/realizacje/stol-pary-mlodej-kompozycja-brzoskwiniowa.jpg",
    alt: "Stół pary młodej z brzoskwiniową kompozycją kwiatową",
  },
];

/** Ile milisekund wisi jeden slajd (łącznie z przejściem). */
export const CZAS_SLAJDU = 7000;
