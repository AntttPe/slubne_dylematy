/**
 * Minimalny parser iCal - tyle, ile potrzeba do odczytania zajętych dni
 * z publicznego feedu Kalendarza Google.
 *
 * Świadomie bez biblioteki: z całego formatu używamy trzech pól
 * (DTSTART, DTEND, STATUS), a dokładanie zależności do czegoś takiego
 * to więcej kodu do aktualizowania niż do napisania.
 *
 * Zachowania potwierdzone na prawdziwym feedzie, nie na dokumentacji:
 *   - tytuły są podmieniane przez Google na "Busy" (tryb wolny/zajęty),
 *   - linie dłuższe niż 75 znaków są łamane i kontynuowane spacją,
 *   - DTEND wydarzenia całodniowego jest WYŁĄCZNY (12.09 ma DTEND 13.09).
 */

/** Wydarzenie rozciągnięte na absurdalną liczbę dni to błąd, nie rezerwacja. */
const MAX_DNI_NA_WYDARZENIE = 30;

/** Skleja linie złamane zgodnie z RFC 5545 (kontynuacja zaczyna się spacją lub tabem). */
function rozwinLinie(tekst: string): string[] {
  return tekst
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\n[ \t]/g, "")
    .split("\n");
}

/**
 * Buduje datę z komponentów lokalnych, a nie przez Date.parse.
 * `new Date("2026-09-12")` jest interpretowane jako UTC i w naszej strefie
 * potrafi cofnąć się na 11 września.
 */
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

/** Zwraca listę dni (YYYY-MM-DD) zajętych przez wydarzenia w feedzie. */
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
        // DTEND całodniowego jest wyłączny - stąd odjęcie dnia.
        // Przy wydarzeniu godzinowym DTEND to realna godzina końca,
        // więc ostatni dzień liczy się normalnie.
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
