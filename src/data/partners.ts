/**
 * "Sprawdzeni ludzie, z którymi pracuję najchętniej".
 *
 * Świadomie trzymane w kodzie, a nie w panelu - ta lista zmienia się
 * dwa razy w roku, a każda dodatkowa rzecz do klikania to kolejna rzecz
 * do utrzymania. Edycja = jedna linijka tutaj.
 *
 * Logotypy mają bardzo różne proporcje (od kwadratu po 2,8:1), dlatego
 * kafelek skaluje je przez object-contain na białym tle, zamiast kadrować.
 *
 * TODO(klient): `blurb` opisuje na razie wyłącznie zakres usług - czyli to,
 * co da się sprawdzić. Świadomie NIE ma tu ocen ich pracy ani twierdzeń
 * o współpracy, bo byłyby zmyślone. Najlepiej, żeby Magda podała po jednym
 * własnym zdaniu o każdej firmie - to jej rekomendacja, więc powinna brzmieć
 * jej głosem.
 */

export type Partner = {
  name: string;
  role: string;
  blurb: string;
  url: string | null;
  image: string | null;
  /** Wymiary logotypu - bez nich next/image nie zarezerwuje miejsca. */
  width?: number;
  height?: number;
};

export const partners: readonly Partner[] = [
  {
    name: "Marysia Foto",
    role: "Fotografia ślubna",
    blurb: "Reportaż z dnia ślubu i sesje plenerowe.",
    url: "https://marysiafoto.pl",
    image: "/images/partners/marysia.png",
    width: 310,
    height: 169,
  },
  {
    name: "Napompowane",
    role: "Dekoracje balonowe",
    blurb: "Dekoracje balonowe, ścianki i bramy.",
    url: "https://www.napompowane.com",
    image: "/images/partners/napompowane.png",
    width: 150,
    height: 150,
  },
  {
    name: "Piekarnia Kłos",
    role: "Tort i słodki stół",
    blurb: "Torty weselne i słodki stół.",
    url: "https://www.piekarniaklos.pl",
    image: "/images/partners/klos.png",
    width: 901,
    height: 320,
  },
];
