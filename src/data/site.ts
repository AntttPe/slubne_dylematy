
/** TODO(client): the e-mail is temporary (Gmail). Once the mailbox on the
 *  real domain exists, swap it here AND in the Google Business Profile -
 *  the two must match. */
export const site = {
  name: "Ślubne Dylematy",
  tagline: "Dekoracje ślubne i eventowe",
  owner: "Magda",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://slubnedylematy.pl",

  contact: {
    phone: "+48 725 824 732",
    phoneHref: "tel:+48725824732",
    email: "slubnedylematy.kontakt@gmail.com",
    emailHref: "mailto:slubnedylematy.kontakt@gmail.com",
    responseTime: "w ciągu 24 godzin",
  },

  area: {
    label: "Śląsk i cała Polska",
    /* Region stays even though we serve all of Poland: addressRegion in
       structured data says WHERE the business is based, not how far it
       travels. Local map visibility depends on it. Reach is areaServed. */
    region: "śląskie",
    country: "PL",
  },

  social: {
    instagram: "https://instagram.com/slubne.dylematy",
    instagramHandle: "@slubne.dylematy",
    facebook: "https://www.facebook.com/profile.php?id=100076236873547" as string | null,
  },
} as const;

export const navLinks = [
  { href: "/#o-mnie", label: "O mnie" },
  { href: "/#oferta", label: "Oferta" },
  { href: "/#realizacje", label: "Realizacje" },
  { href: "/#terminy", label: "Terminy" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
