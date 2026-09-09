/**
 * "Sprawdzeni ludzie, z którymi pracuję najchętniej".
 *
 * Świadomie trzymane w kodzie, a nie w panelu - ta lista zmienia się
 * dwa razy w roku, a każda dodatkowa rzecz do klikania to kolejna rzecz
 * do utrzymania. Edycja = jedna linijka tutaj.
 *
 * TODO(klient): Magda podaje prawdziwe nazwy, role i linki.
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
  {
    name: "Do uzupełnienia",
    role: "Cukiernia",
    blurb:
      "Tort, który smakuje tak dobrze, jak wygląda - i zgadza się ze stylem dekoracji.",
    url: null,
    image: null,
  },
  {
    name: "Do uzupełnienia",
    role: "Sala weselna",
    blurb:
      "Miejsce, w którym pracuje mi się najlepiej. Wiem, co gdzie stanie, zanim wejdę.",
    url: null,
    image: null,
  },
  {
    name: "Do uzupełnienia",
    role: "Papeteria i kaligrafia",
    blurb:
      "Ręczne liternictwo na winietkach i zaproszeniach. Detal, który goście zabierają do domu.",
    url: null,
    image: null,
  },
];
