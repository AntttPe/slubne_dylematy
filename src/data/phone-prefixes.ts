/**
 * Dialling codes offered next to the phone field. Poland first and selected
 * by default; the rest are the countries Polish couples actually write from -
 * emigration, guests abroad, weddings organised from another country.
 *
 * Not a full ISO list on purpose: a short menu is faster to use than a
 * searchable one, and anything missing can still be typed into the number.
 */
export type PhonePrefix = { code: string; iso: string; label: string };

export const phonePrefixes: readonly PhonePrefix[] = [
  { code: "+48", iso: "PL", label: "Polska" },
  { code: "+44", iso: "GB", label: "Wielka Brytania" },
  { code: "+49", iso: "DE", label: "Niemcy" },
  { code: "+353", iso: "IE", label: "Irlandia" },
  { code: "+31", iso: "NL", label: "Holandia" },
  { code: "+32", iso: "BE", label: "Belgia" },
  { code: "+43", iso: "AT", label: "Austria" },
  { code: "+33", iso: "FR", label: "Francja" },
  { code: "+39", iso: "IT", label: "Włochy" },
  { code: "+34", iso: "ES", label: "Hiszpania" },
  { code: "+41", iso: "CH", label: "Szwajcaria" },
  { code: "+45", iso: "DK", label: "Dania" },
  { code: "+46", iso: "SE", label: "Szwecja" },
  { code: "+47", iso: "NO", label: "Norwegia" },
  { code: "+420", iso: "CZ", label: "Czechy" },
  { code: "+421", iso: "SK", label: "Słowacja" },
  { code: "+380", iso: "UA", label: "Ukraina" },
  { code: "+1", iso: "US", label: "USA / Kanada" },
];

export const DOMYSLNY_PREFIKS = "+48";

/** Polish mobile and landline numbers are always 9 digits. */
export const DLUGOSC_PL = 9;
