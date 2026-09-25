
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

export function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export type AvailabilityMap = Record<string, Status>;

export type AvailabilityResult = {
  availability: AvailabilityMap;
  ok: boolean;
};

async function pobierzDni(url: string): Promise<string[] | null> {
  try {
    const res = await fetch(url, {
      next: {
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
 * Returns only days that are not "free" - the rest are free by definition.
 *
 * Status comes from WHICH calendar the event lives in, never from its title;
 * titles are not public.
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
  for (const dzien of booked) availability[dzien] = STATUS.booked;

  return { availability, ok: true };
}

export function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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

/* Genitive forms, for reading a date out loud: "12 września", not
   "12 wrzesień". Only the screen-reader text uses these; the heading above
   the grid names the month on its own and stays nominative. */
export const monthNamesGenitive = [
  "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
  "lipca", "sierpnia", "września", "października", "listopada", "grudnia",
];

export const weekdayNames = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
