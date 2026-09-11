/**
 * Warstwa dostępu do terminów.
 *
 * Cała reszta aplikacji rozmawia wyłącznie z `getAvailability()`.
 * Dziś czyta publiczne feedy iCal z Kalendarza Google, po przejściu
 * na static export to samo przeniesie się do Workera na Cloudflare -
 * komponenty się nie zmienią. To jest ten szew, o który chodzi.
 */

import { ODSWIEZANIE_SEKUNDY, kalendarze } from "@/data/calendars";
import { dniZIcs } from "./ics";

export const STATUS = {
  free: "free",
  tentative: "tentative",
  booked: "booked",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const statusLabels: Record<Status, string> = {
  free: "Wolny",
  tentative: "Rezerwacja wstępna",
  booked: "Zajęty",
};

/** Klucz dnia w formacie YYYY-MM-DD, budowany z komponentów lokalnych.
 *  `toISOString()` przesunąłby datę o strefę i potrafi zgubić dzień. */
export function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export type AvailabilityMap = Record<string, Status>;

export type AvailabilityResult = {
  availability: AvailabilityMap;
  /** false = któregoś feedu nie udało się pobrać; nie wolno wtedy
   *  pokazać siatki, bo brakujące dni wyglądałyby na wolne. */
  ok: boolean;
};

async function pobierzDni(url: string): Promise<string[] | null> {
  try {
    const res = await fetch(url, {
      next: {
        // W trybie deweloperskim pobieramy za każdym razem od nowa.
        // Inaczej po dodaniu wydarzenia w Kalendarzu trzeba czekać
        // kwadrans, żeby zobaczyć efekt - i wygląda to jak awaria.
        revalidate:
          process.env.NODE_ENV === "development" ? 0 : ODSWIEZANIE_SEKUNDY,
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[terminy] feed odpowiedział ${res.status}: ${url}`);
      return null;
    }
    return dniZIcs(await res.text());
  } catch (error) {
    console.error("[terminy] nie udało się pobrać feedu:", error);
    return null;
  }
}

/**
 * Zwraca wyłącznie dni różne od "wolny" - reszta jest wolna z definicji.
 *
 * Status bierze się z tego, w którym kalendarzu Magda założyła wydarzenie,
 * a nie z jego tytułu. Tytuły i tak nie są publiczne.
 */
export async function getAvailability(): Promise<AvailabilityResult> {
  const [booked, tentative] = await Promise.all([
    pobierzDni(kalendarze.booked),
    pobierzDni(kalendarze.tentative),
  ]);

  if (booked === null || tentative === null) {
    return { availability: {}, ok: false };
  }

  const availability: AvailabilityMap = {};
  for (const dzien of tentative) availability[dzien] = STATUS.tentative;
  // Potwierdzona rezerwacja przebija wstępną, gdyby dzień był w obu.
  for (const dzien of booked) availability[dzien] = STATUS.booked;

  return { availability, ok: true };
}

/** Siatka miesiąca z dopełnieniem, tydzień od poniedziałku. */
export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // getDay(): 0 = niedziela. Przesuwamy tak, by 0 = poniedziałek.
  const leading = (first.getDay() + 6) % 7;

  const cells: (Date | null)[] = Array(leading).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
}

export const monthNames = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
];

export const weekdayNames = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
