import assert from "node:assert/strict";
import { test } from "node:test";
import { dniZIcs } from "./ics.ts";

const wydarzenie = (tresc: string) => `BEGIN:VCALENDAR\r\n${tresc}\r\nEND:VCALENDAR`;

test("wydarzenie całodniowe zajmuje jeden dzień, mimo że DTEND wskazuje następny", () => {
  // Tak wygląda prawdziwy wpis z Kalendarza Google dla wesela 12.09.
  const ics = wydarzenie(
    "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:20260912\r\nDTEND;VALUE=DATE:20260913\r\nSUMMARY:Busy\r\nEND:VEVENT",
  );
  assert.deepEqual(dniZIcs(ics), ["2026-09-12"]);
});

test("wydarzenie dwudniowe daje dwa dni", () => {
  const ics = wydarzenie(
    "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:20260815\r\nDTEND;VALUE=DATE:20260817\r\nEND:VEVENT",
  );
  assert.deepEqual(dniZIcs(ics).sort(), ["2026-08-15", "2026-08-16"]);
});

test("brak DTEND to pojedynczy dzień", () => {
  const ics = wydarzenie("BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:20260701\r\nEND:VEVENT");
  assert.deepEqual(dniZIcs(ics), ["2026-07-01"]);
});

test("wydarzenie godzinowe nie traci ostatniego dnia", () => {
  // Tu DTEND to realna godzina końca, więc nie wolno odejmować doby.
  const ics = wydarzenie(
    "BEGIN:VEVENT\r\nDTSTART:20260505T100000Z\r\nDTEND:20260505T140000Z\r\nEND:VEVENT",
  );
  assert.deepEqual(dniZIcs(ics), ["2026-05-05"]);
});

test("odwołane wydarzenie jest pomijane", () => {
  const ics = wydarzenie(
    "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:20260601\r\nSTATUS:CANCELLED\r\nEND:VEVENT",
  );
  assert.deepEqual(dniZIcs(ics), []);
});

test("linie złamane przez Google są sklejane", () => {
  const ics = wydarzenie(
    "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:20261224\r\nDTEND;VALUE=DAT\r\n E:20261225\r\nEND:VEVENT",
  );
  assert.deepEqual(dniZIcs(ics), ["2026-12-24"]);
});

test("pusty kalendarz zwraca pustą listę", () => {
  assert.deepEqual(dniZIcs(wydarzenie("X-WR-CALNAME:Terminy - wstępne")), []);
});

test("wydarzenie o absurdalnej długości jest przycinane", () => {
  const ics = wydarzenie(
    "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:20260101\r\nDTEND;VALUE=DATE:20300101\r\nEND:VEVENT",
  );
  assert.equal(dniZIcs(ics).length, 30);
});
