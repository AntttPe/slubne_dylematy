export type Partner = {
  name: string;
  role: string;
  blurb: string;
  url: string | null;
  image: string | null;
  /** Logo dimensions - next/image needs them to reserve space. */
  width?: number;
  height?: number;
};

export const partners: readonly Partner[] = [
  {
    name: "Marysia Foto",
    role: "Fotografia ślubna",
    blurb:
      "Marysia tworzy reportaże, które zostają w pamięci na lata. Z niezwykłą uważnością zatrzymuje emocje, spojrzenia i wszystkie te małe momenty, które składają się na wyjątkową historię tego dnia. Dba o każdy szczegół, dzięki czemu jej zdjęcia są dopracowane, naturalne i pełne piękna.",
    url: "https://marysiafoto.pl",
    image: "/images/partners/marysia.png",
    width: 310,
    height: 169,
  },
  {
    name: "Napompowane",
    role: "Dekoracje balonowe",
    blurb:
      "Klaudia tworzy przede wszystkim dekoracje balonowe, ale w zupełnie nowoczesnym wydaniu. Bawi się formą, kolorem i detalem, tworząc niebanalne kompozycje, które przyciągają wzrok i potrafią naprawdę zaskoczyć Waszych gości. Jej realizacje pokazują, że balony mogą być stylowym i wyjątkowym elementem każdej uroczystości.",
    url: "https://www.napompowane.com",
    image: "/images/partners/napompowane.png",
    width: 150,
    height: 150,
  },
  {
    name: "Piekarnia Kłos",
    role: "Tort i słodki stół",
    blurb:
      "Kłos tworzy torty i słodkie stoły, w których wyjątkowy smak spotyka się z piękną oprawą. Każdą realizację dopasowują do charakteru i stylistyki wesela, dbając o spójną całość i najmniejsze detale. To firma z wieloletnią tradycją, która stawia na naturalne składniki, jakość i smak, do którego chce się wracać.",
    url: "https://www.piekarniaklos.pl",
    image: "/images/partners/klos.png",
    width: 901,
    height: 320,
  },
];
