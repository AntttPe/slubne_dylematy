/**
 * Public iCal feeds from the owner's Google Calendar.
 *
 * Kept in code on purpose - they are public by design. Verified on the live
 * feed: with "see only free/busy" Google replaces event titles with "Busy",
 * so only dates leave the calendar.
 *
 * NEVER put the "Secret address in iCal format" here - that one returns full
 * details regardless of the privacy setting.
 */
export const kalendarze = {
  booked:
    "https://calendar.google.com/calendar/ical/d745cbe03e1a091361a25a877253aefeaa40dc051aa26a5bb2bc7815bf03e6cc%40group.calendar.google.com/public/basic.ics",
  tentative:
    "https://calendar.google.com/calendar/ical/b9f8e5219e22d9e36c59b49756289b69aeca6c3bc3e167d63007135ecd31c254%40group.calendar.google.com/public/basic.ics",
} as const;

export const ODSWIEZANIE_SEKUNDY = 900;
