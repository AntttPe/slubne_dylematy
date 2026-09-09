import type { Status } from "@/lib/availability";

/**
 * TYMCZASOWE dane terminów - do czasu podpięcia Supabase.
 *
 * Format: "RRRR-MM-DD": "tentative" | "booked".
 * Dni nieobecne na liście są wolne.
 *
 * Po migracji ten plik znika, a `getAvailability()` w lib/availability.ts
 * czyta z bazy. Panel Magdy będzie edytował dokładnie te same wartości.
 */
export const bookedDates: Record<string, Status> = {
  "2026-08-15": "booked",
  "2026-08-22": "booked",
  "2026-08-29": "tentative",
  "2026-09-05": "booked",
  "2026-09-12": "tentative",
  "2026-09-19": "booked",
  "2026-09-26": "booked",
  "2026-10-03": "tentative",
  "2026-10-10": "booked",
};
