/**
 * Publiczne feedy iCal z Kalendarza Google Magdy.
 *
 * Te adresy są celowo trzymane w kodzie, nie w zmiennych środowiskowych -
 * są PUBLICZNE z definicji i nie ma w nich czego chronić. Sprawdzone
 * na żywym feedzie: przy ustawieniu "widzi wyłącznie stan Wolny/Zajęty"
 * Google podmienia tytuły wydarzeń na "Busy", więc na zewnątrz wychodzi
 * sama data. Nazwiska klientek i kwoty zaliczek zostają w kalendarzu.
 *
 * NIGDY nie wolno tu wstawić "Tajnego adresu w formacie iCal" z ustawień
 * Google - tamten zwraca pełne szczegóły niezależnie od ustawień prywatności.
 */
export const kalendarze = {
  booked:
    "https://calendar.google.com/calendar/ical/d745cbe03e1a091361a25a877253aefeaa40dc051aa26a5bb2bc7815bf03e6cc%40group.calendar.google.com/public/basic.ics",
  tentative:
    "https://calendar.google.com/calendar/ical/b9f8e5219e22d9e36c59b49756289b69aeca6c3bc3e167d63007135ecd31c254%40group.calendar.google.com/public/basic.ics",
} as const;

/** Co ile sekund odpytywać Google ponownie. */
export const ODSWIEZANIE_SEKUNDY = 900;
