/**
 * Jedno źródło prawdy dla danych firmy.
 * Zmiana numeru telefonu = jedna edycja, nie trzy.
 *
 * TODO(klient): podmienić telefon i e-mail na prawdziwe - poniższe to placeholdery.
 */

export const site = {
  name: "Ślubne Dylematy",
  tagline: "Dekoracje ślubne i eventowe",
  owner: "Magda",

  // Używane przez metadataBase, sitemap i JSON-LD.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://slubnedylematy.pl",

  contact: {
    phone: "+48 123 456 789",
    phoneHref: "tel:+48123456789",
    email: "kontakt@slubnedylematy.pl",
    emailHref: "mailto:kontakt@slubnedylematy.pl",
    responseTime: "w ciągu 24 godzin",
  },

  area: {
    label: "Śląsk i okolice",
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
