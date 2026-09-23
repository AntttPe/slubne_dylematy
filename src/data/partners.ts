/**
 * "Sprawdzeni ludzie, z którymi pracuję najchętniej".
 *
 * Świadomie trzymane w kodzie, a nie w panelu - ta lista zmienia się
 * dwa razy w roku, a każda dodatkowa rzecz do klikania to kolejna rzecz
 * do utrzymania. Edycja = jedna linijka tutaj.
 *
 * Logotypy mają bardzo różne proporcje (od kwadratu po 2,8:1), dlatego
 * kafelek skaluje je przez object-contain na białym tle, zamiast kadrować.
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
    blurb:
      "Reportaż, który wygląda jak wspomnienie, a nie jak sesja. Jest wszędzie tam, gdzie trzeba, i nigdzie tam, gdzie przeszkadza.",
    url: "https://marysiafoto.pl",
    image: "/images/partners/marysia.png",
    width: 310,
    height: 169,
  },
  {
    name: "Napompowane",
    role: "Dekoracje balonowe",
    blurb:
      "Balony, które wyglądają jak element dekoracji, a nie jak dodatek z ostatniej chwili. Świetnie dogrywają się z resztą aranżacji.",
    url: "https://www.napompowane.com",
    image: "/images/partners/napompowane.png",
    width: 150,
    height: 150,
  },
  {
    name: "Piekarnia Kłos",
    role: "Tort i słodki stół",
    blurb:
      "Tort, który smakuje tak dobrze, jak wygląda. Dobierają go do stylu dekoracji, zamiast proponować katalog.",
    url: "https://www.piekarniaklos.pl",
    image: "/images/partners/klos.png",
    width: 901,
    height: 320,
  },
];
