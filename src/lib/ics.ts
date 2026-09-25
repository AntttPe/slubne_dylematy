
const MAX_DNI_NA_WYDARZENIE = 30;

function rozwinLinie(tekst: string): string[] {
  return tekst
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n[ \t]/g, "")
    .split("\n");
}

/** Builds the date from local parts. `new Date("2026-09-12")` is parsed as
 *  UTC and can slip back a day in our timezone. */
function dataZIcs(wartosc: string): Date | null {
  const m = wartosc.trim().match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function klucz(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dzien = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dzien}`;
}

/**
 * Returns the days (YYYY-MM-DD) occupied by events in the feed.
 *
 * Verified against the live feed, not the spec: Google replaces titles with
 * "Busy" in free/busy mode, folds lines over 75 chars, and DTEND of an
 * all-day event is EXCLUSIVE - 12 Sep has DTEND 13 Sep. Getting that wrong
 * marks one extra day as booked and silently costs a real enquiry.
 */
export function dniZIcs(ics: string): string[] {
  const dni = new Set<string>();

  let wWydarzeniu = false;
  let start: Date | null = null;
  let koniec: Date | null = null;
  let calodniowe = false;
  let odwolane = false;

  for (const linia of rozwinLinie(ics)) {
    if (linia.startsWith("BEGIN:VEVENT")) {
      wWydarzeniu = true;
      start = koniec = null;
      calodniowe = odwolane = false;
      continue;
    }

    if (linia.startsWith("END:VEVENT")) {
      if (wWydarzeniu && start && !odwolane) {
        const ostatni = koniec
          ? new Date(koniec.getTime() - (calodniowe ? 86_400_000 : 0))
          : start;

        const kursor = new Date(start);
        let licznik = 0;
        while (kursor <= ostatni && licznik < MAX_DNI_NA_WYDARZENIE) {
          dni.add(klucz(kursor));
          kursor.setDate(kursor.getDate() + 1);
          licznik++;
        }
      }
      wWydarzeniu = false;
      continue;
    }

    if (!wWydarzeniu) continue;

    const dwukropek = linia.indexOf(":");
    if (dwukropek === -1) continue;

    const nazwa = linia.slice(0, dwukropek).toUpperCase();
    const wartosc = linia.slice(dwukropek + 1);
    const pole = nazwa.split(";")[0];

    if (pole === "DTSTART") {
      start = dataZIcs(wartosc);
      calodniowe = nazwa.includes("VALUE=DATE");
    } else if (pole === "DTEND") {
      koniec = dataZIcs(wartosc);
    } else if (pole === "STATUS" && wartosc.trim().toUpperCase() === "CANCELLED") {
      odwolane = true;
    }
  }

  return [...dni];
}
