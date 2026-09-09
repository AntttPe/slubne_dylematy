/**
 * Warstwa dostępu do terminów.
 *
 * Cała reszta aplikacji rozmawia wyłącznie z `getAvailability()`.
 * Dziś czyta ze statycznego pliku, jutro z Supabase - komponenty
 * się nie zmienią. To jest ten szew, o który chodzi.
 */

import { bookedDates } from "@/data/availability";

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

/**
 * Zwraca wyłącznie dni różne od "wolny" - reszta jest wolna z definicji,
 * więc nie ma sensu ich przesyłać.
 *
 * Docelowo (Supabase):
 *   const { data } = await supabase
 *     .from("public_availability")   // widok bez kolumny `note`
 *     .select("date, status")
 *     .gte("date", dateKey(new Date()));
 */
export async function getAvailability(): Promise<AvailabilityMap> {
  return bookedDates;
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
