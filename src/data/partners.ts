
export type Partner = {
  name: string;
  role: string;
  blurb: string;
  url: string | null;
  image: string | null;
  width?: number;
  height?: number;
};

/**
 * TODO(client): `blurb` currently states only the scope of services - the
 * part that can be verified. Deliberately no opinions about their work: this
 * is a recommendation section, and invented praise for someone else's company
 * is worse than none. Ideally the owner supplies one sentence per partner.
 */
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
