/**
 * "Sprawdzeni ludzie, z którymi pracuję najchętniej".
 *
 * Świadomie trzymane w kodzie, a nie w panelu - ta lista zmienia się
 * dwa razy w roku, a każda dodatkowa rzecz do klikania to kolejna rzecz
 * do utrzymania. Edycja = jedna linijka tutaj.
 *
 * TODO(klient): Magda podaje prawdziwe nazwy, role i linki.
 * Na start trzy firmy - role poniżej są propozycją, do podmiany
 * na te, z którymi realnie współpracuje.
 * Zdjęcia wrzucamy do /public/images/partners/ (kwadrat, min. 600x600).
 * Bez `image` kafelek pokaże inicjały - działa, nie trzeba czekać na zdjęcia.
 */

export type Partner = {
  name: string;
  role: string;
  blurb: string;
  url: string | null;
  image: string | null;
};

export const partners: readonly Partner[] = [
  {
    name: "Do uzupełnienia",
    role: "Fotografia ślubna",
    blurb:
      "Reportaż, który wygląda jak wspomnienie, a nie jak sesja. Zawsze na czas i zawsze niewidoczny.",
    url: null,
    image: null,
  },
  {
    name: "Do uzupełnienia",
    role: "Film ślubny",
    blurb:
      "Spokojne, filmowe kadry bez efekciarstwa. Materiał, który ogląda się po latach.",
    url: null,
    image: null,
  },
  {
    name: "Do uzupełnienia",
    role: "Oprawa muzyczna",
    blurb:
      "Czyta parkiet lepiej niż ktokolwiek. Nikt nie siedzi przy stoliku dłużej, niż chce.",
    url: null,
    image: null,
  },
];
