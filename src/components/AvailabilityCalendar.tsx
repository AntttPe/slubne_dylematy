"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  type AvailabilityMap,
  type Status,
  dateKey,
  monthGrid,
  monthNames,
  statusLabels,
  weekdayNames,
} from "@/lib/availability";

/* Statuses stay within the brand palette rather than using arbitrary red and
   green. Colour never carries the meaning alone: every day has an aria-label
   and booked days are struck through. */
const dayStyles: Record<Status, string> = {
  free: "bg-canvas text-ink border-line hover:border-accent",
  tentative: "bg-accent/25 text-ink border-accent/50",
  booked: "bg-ink text-ink-invert border-ink line-through decoration-1",
};

type Props = {
  availability: AvailabilityMap;
  ok?: boolean;
  monthsAhead?: number;
};

export default function AvailabilityCalendar({
  availability,
  ok = true,
  monthsAhead = 18,
}: Props) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [offset, setOffset] = useState(0);

  const cursor = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const cells = useMemo(() => monthGrid(year, month), [year, month]);

  const takenThisMonth = cells.filter(
    (d) => d && availability[dateKey(d)],
  ).length;

  /* A feed failure must show a message, never an empty grid. An empty grid
     reads as "everything is free" and would produce an enquiry for a date
     that is already taken - worse than having no calendar at all. */
  if (!ok) {
    return (
      <div className="rounded-md border border-line bg-canvas p-8 text-center">
        <p className="type-h3 text-ink">Kalendarz chwilowo niedostępny</p>
        <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          Nie mogę w tej chwili sprawdzić terminów. Napiszcie, a potwierdzę
          dostępność Waszego dnia osobiście.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-line bg-canvas p-5 sm:p-7">
            <div className="mb-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOffset((o) => o - 1)}
          disabled={offset === 0}
          aria-label="Poprzedni miesiąc"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>

        <p aria-live="polite" className="font-serif text-2xl text-ink">
          {monthNames[month]}{" "}
          <span className="text-muted">{year}</span>
        </p>

        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          disabled={offset >= monthsAhead}
          aria-label="Następny miesiąc"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-ink hover:text-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>

            <div className="mb-2 grid grid-cols-7 gap-1.5">
        {weekdayNames.map((d) => (
          <div
            key={d}
            className="pb-1 text-center text-xs font-medium text-faint"
          >
            {d}
          </div>
        ))}
      </div>

            <div className="grid grid-cols-7 gap-1.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} />;

          const past = date < today;
          const status: Status = availability[dateKey(date)] ?? "free";

          if (past) {
            return (
              <div
                key={dateKey(date)}
                className="flex aspect-square items-center justify-center rounded-sm text-sm text-faint/35"
              >
                {date.getDate()}
              </div>
            );
          }

          return (
            <div
              key={dateKey(date)}
              aria-label={`${date.getDate()} ${monthNames[month].toLowerCase()} - ${statusLabels[status]}`}
              className={`flex aspect-square items-center justify-center rounded-sm border text-sm transition-colors duration-200 ${dayStyles[status]}`}
            >
              <span aria-hidden="true">{date.getDate()}</span>
            </div>
          );
        })}
      </div>

            {takenThisMonth === 0 && (
        <p className="mt-6 rounded-sm bg-surface px-4 py-3 text-center text-sm text-muted">
          Cały {monthNames[month].toLowerCase()} jeszcze wolny - to dobry
          moment, żeby zapytać o termin.
        </p>
      )}

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-muted">
        <li className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-[2px] border border-line bg-canvas" />
          Wolny
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-[2px] border border-accent/50 bg-accent/25" />
          Rezerwacja wstępna
        </li>
        <li className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-[2px] bg-ink" />
          Zajęty
        </li>
      </ul>
    </div>
  );
}
