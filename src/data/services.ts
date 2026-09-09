export type Service = {
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
};

export const services: readonly Service[] = [
  {
    title: "Dekoracje ślubne",
    description:
      "Kompleksowa oprawa od kościoła po salę weselną. Spójna koncepcja, jeden styl, wszystko dopięte na ostatni guzik.",
    image: "/images/gallery/wedding_hall/sala_3.jpg",
    tags: ["Kościół", "Sala", "Plener"],
  },
  {
    title: "Dekoracje kościoła",
    description:
      "Kwiaty przy ołtarzu, dekoracja ław, łuk wejściowy. Oprawa, która nie przytłacza wnętrza, tylko je podkreśla.",
    image: "/images/gallery/church/kosciol_6.jpg",
    tags: ["Ołtarz", "Ławy", "Łuk"],
  },
  {
    title: "Przyjęcia i eventy",
    description:
      "Urodziny, rocznice, jubileusze, spotkania firmowe. Każde wydarzenie zasługuje na przemyślaną oprawę.",
    image: "/images/gallery/outdoor_wedding/plener_6.jpg",
    tags: ["Urodziny", "Rocznice", "Firmowe"],
  },
  {
    title: "Komunia święta",
    description:
      "Kameralna i stonowana oprawa - zaproszenia, kwiaty, dekoracja stołu i wianki. Elegancko, bez przesady.",
    image: "/images/gallery/wedding_hall/sala_6.jpg",
    tags: ["Zaproszenia", "Kwiaty", "Wianki"],
  },
  {
    title: "Chrzciny",
    description:
      "Delikatne dekoracje na powitanie nowego życia. Jasne barwy, naturalne materiały, rodzinna atmosfera.",
    image: "/images/gallery/outdoor_wedding/plener_7.jpg",
    tags: ["Delikatne", "Rodzinne", "Naturalne"],
  },
  {
    title: "Papeteria ślubna",
    description:
      "Zaproszenia, winietki, menu i plan stołów - projektowane ręcznie i spójne z resztą dekoracji.",
    image: "/images/gallery/wedding_hall/sala.jpg",
    tags: ["Zaproszenia", "Winietki", "Menu"],
  },
];
