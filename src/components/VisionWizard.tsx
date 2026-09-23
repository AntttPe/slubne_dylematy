"use client";

import { useState } from "react";
import { ArrowLeft, Check, Sparkles, X } from "lucide-react";
import { buildSummary, questions } from "@/data/wizard";

/**
 * Pomocnik do opisania wizji.
 *
 * Powód istnienia: puste pole "Wasza wizja" to bariera. Para albo
 * wpisuje "proszę o wycenę", co nic nie wnosi, albo porzuca formularz.
 *
 * Zasady, które trzymam tu świadomie:
 *
 *  - Wynik ląduje w polu tekstowym, a NIE w osobnym kanale danych.
 *    Para widzi dokładnie, co zostanie wysłane, i może to poprawić.
 *  - Żadna opcja nie jest zaznaczona domyślnie. Podpowiadanie
 *    droższego zakresu przez domyślny stan byłoby nieuczciwe.
 *  - Liczba kroków jest podana z góry i prawdziwa.
 *  - Wszędzie da się pominąć pytanie.
 *
 * Czego tu nie ma i nie będzie: liczników czasu, komunikatów
 * o kończących się terminach, wyskakujących okienek. Przy usłudze,
 * o której decyduje się po spotkaniu, taka wymiana - chwilowy skok
 * konwersji za utratę zaufania - jest zła.
 */
export default function VisionWizard({
  onComplete,
}: {
  onComplete: (summary: string) => void;
}) {
  const [otwarty, setOtwarty] = useState(false);
  const [krok, setKrok] = useState(0);
  const [odpowiedzi, setOdpowiedzi] = useState<Record<string, string[]>>({});

  const pytanie = questions[krok];
  const wybrane = odpowiedzi[pytanie?.id] ?? [];
  const ostatni = krok === questions.length - 1;

  const zamknij = () => {
    setOtwarty(false);
    setKrok(0);
    setOdpowiedzi({});
  };

  const dalej = (nowe: Record<string, string[]>) => {
    if (ostatni) {
      onComplete(buildSummary(nowe));
      zamknij();
      return;
    }
    setKrok((k) => k + 1);
  };

  const wybierz = (opcja: string) => {
    const juz = wybrane.includes(opcja);
    const nowaLista = pytanie.multi
      ? juz
        ? wybrane.filter((o) => o !== opcja)
        : [...wybrane, opcja]
      : [opcja];

    const nowe = { ...odpowiedzi, [pytanie.id]: nowaLista };
    setOdpowiedzi(nowe);

    // Przy jednokrotnym wyborze przechodzimy dalej od razu - dodatkowe
    // "Dalej" byłoby kliknięciem bez treści.
    if (!pytanie.multi) dalej(nowe);
  };

  if (!otwarty) {
    return (
      <button
        type="button"
        onClick={() => setOtwarty(true)}
        className="tylko-z-js group mt-1 inline-flex items-center gap-2 text-sm text-accent-strong underline-offset-4 hover:underline"
      >
        <Sparkles size={15} />
        Nie wiecie, jak to opisać? Pomogę w {questions.length} pytaniach
      </button>
    );
  }

  return (
    <div className="tylko-z-js mt-3 rounded-md border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="type-eyebrow text-accent-strong">
            Krok {krok + 1} z {questions.length}
          </p>
          <h3 className="mt-2.5 font-serif text-xl leading-snug text-ink">
            {pytanie.question}
          </h3>
          {pytanie.hint && (
            <p className="mt-2 text-sm text-muted">{pytanie.hint}</p>
          )}
        </div>

        <button
          type="button"
          onClick={zamknij}
          aria-label="Zamknij pomocnik"
          className="-mr-1 -mt-1 shrink-0 rounded-sm p-1.5 text-faint transition-colors hover:text-ink"
        >
          <X size={18} />
        </button>
      </div>

      {/* Pasek postępu - uczciwy, odzwierciedla realną liczbę kroków. */}
      <div
        className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-line"
        role="presentation"
      >
        <div
          className="h-full bg-accent-strong transition-[width] duration-300"
          style={{ width: `${((krok + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {pytanie.options.map((opcja) => {
          const aktywna = wybrane.includes(opcja);
          return (
            <button
              key={opcja}
              type="button"
              onClick={() => wybierz(opcja)}
              aria-pressed={pytanie.multi ? aktywna : undefined}
              className={`inline-flex items-center gap-1.5 rounded-sm border px-4 py-2.5 text-sm transition-colors ${
                aktywna
                  ? "border-ink bg-ink text-canvas"
                  : "border-line bg-canvas text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {aktywna && <Check size={14} />}
              {opcja}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
        <button
          type="button"
          onClick={() => (krok === 0 ? zamknij() : setKrok((k) => k - 1))}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} />
          {krok === 0 ? "Rezygnuję" : "Wstecz"}
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => dalej(odpowiedzi)}
            className="text-sm text-faint transition-colors hover:text-ink"
          >
            Pomiń
          </button>

          {/* Przy wielokrotnym wyborze potrzebne jest jawne zatwierdzenie. */}
          {pytanie.multi && (
            <button
              type="button"
              onClick={() => dalej(odpowiedzi)}
              className="rounded-sm bg-accent-strong px-5 py-2.5 text-sm text-white transition-colors hover:bg-ink"
            >
              {ostatni ? "Gotowe" : "Dalej"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
