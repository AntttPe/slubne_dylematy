"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/app/kontakt/actions";
import {
  budgetOptions,
  celebrationTypes,
  type FormState,
} from "@/lib/contact-schema";
import {
  type AvailabilityMap,
  statusLabels,
  type Status,
} from "@/lib/availability";
import Button from "./ui/Button";
import VisionWizard from "./VisionWizard";

const field =
  "w-full rounded-sm border border-line bg-canvas px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint/70 focus:border-accent-strong focus:outline-none";

const initialState: FormState = { status: "idle" };

function Field({
  label,
  name,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm text-ink">
        {label}
        {required && <span className="ml-1 text-accent-strong">*</span>}
      </label>
      {children}
      {hint}
      {error && (
        <p id={`${name}-error`} className="text-sm text-accent-strong">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({
  availability,
}: {
  availability: AvailabilityMap;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  const startedAtInput = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState("");

  // Pole kontrolowane, żeby pomocnik mógł je wypełnić. Wynik pomocnika
  // ląduje tutaj, a nie w osobnym polu - para widzi, co wysyła.
  const [message, setMessage] = useState("");

  // Znacznik czasu ustawiamy dopiero w przeglądarce - w HTML-u z serwera
  // byłby zamrożony na moment renderu (i identyczny dla wszystkich).
  // Wpisujemy go prosto do DOM-u, żeby nie wywoływać dodatkowego renderu.
  useEffect(() => {
    if (startedAtInput.current) {
      startedAtInput.current.value = String(Date.now());
    }
  }, []);

  const dateStatus: Status | undefined = date ? availability[date] : undefined;
  const errors = state.errors ?? {};
  const today = new Date().toISOString().slice(0, 10);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 rounded-md border border-line bg-canvas p-10">
        <CheckCircle2 size={32} className="text-accent-strong" />
        <div>
          <h2 className="type-h3 text-ink">Zapytanie wysłane</h2>
          <p className="mt-3 max-w-md leading-relaxed text-muted">
            {state.message ??
              "Dziękuję! Odpowiem w ciągu 24 godzin."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-md border border-line bg-canvas p-6 sm:p-9">
      <h2 className="type-h3 text-ink">Formularz zapytania</h2>
      <p className="mt-2 text-[0.9375rem] text-muted">
        Im więcej szczegółów, tym konkretniej odpowiem.
      </p>

      {/* Honeypot - ukryty przed ludźmi, widoczny dla botów. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Nie wypełniaj tego pola</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {/* "0" jako wartość zapasowa: bez JS-u time-trap nie zablokuje wysyłki. */}
      <input
        ref={startedAtInput}
        type="hidden"
        name="startedAt"
        defaultValue="0"
      />

      <div className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Imię i nazwisko" name="name" required error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Anna Kowalska"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={field}
            />
          </Field>

          <Field label="Adres e-mail" name="email" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="anna@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={field}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Telefon" name="phone" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+48 123 456 789"
              className={field}
            />
          </Field>

          <Field
            label="Rodzaj uroczystości"
            name="celebration"
            required
            error={errors.celebration}
          >
            <select
              id="celebration"
              name="celebration"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Wybierzcie…
              </option>
              {celebrationTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Planowana data"
            name="date"
            error={errors.date}
            /* Formularz rozmawia z kalendarzem - para od razu wie,
               czy pytanie ma sens. */
            hint={
              dateStatus ? (
                <p className="text-sm text-accent-strong">
                  Ten dzień mam oznaczony jako:{" "}
                  {statusLabels[dateStatus].toLowerCase()}. Napiszcie mimo to -
                  czasem coś się zwalnia.
                </p>
              ) : date ? (
                <p className="text-sm text-muted">Ten termin jest wolny.</p>
              ) : undefined
            }
          >
            <input
              id="date"
              name="date"
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={field}
            />
          </Field>

          <Field label="Liczba gości" name="guests" error={errors.guests}>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="np. 80"
              className={field}
            />
          </Field>
        </div>

        <Field label="Miejsce uroczystości" name="venue" error={errors.venue}>
          <input
            id="venue"
            name="venue"
            type="text"
            placeholder="np. Sala Złoty Róg, Katowice"
            className={field}
          />
        </Field>

        <Field label="Orientacyjny budżet" name="budget" error={errors.budget}>
          <select id="budget" name="budget" defaultValue="" className={field}>
            <option value="">Wolę nie podawać</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Wasza wizja"
          name="message"
          error={errors.message}
          hint={
            <VisionWizard
              onComplete={(summary) =>
                setMessage((obecna) =>
                  obecna.trim() ? `${obecna.trim()}\n\n${summary}` : summary,
                )
              }
            />
          }
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={4000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Styl, kolory, inspiracje, co jest dla Was najważniejsze…"
            className={`${field} resize-y`}
          />
        </Field>

        {/* Zgoda jako checkbox, nie jako akapit - RODO wymaga
            działania użytkownika, a nie samego poinformowania. */}
        <div className="flex flex-col gap-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-[#a8845a]"
            />
            <span>
              Zgadzam się na przetwarzanie moich danych w celu odpowiedzi na
              zapytanie.{" "}
              <a
                href="/polityka-prywatnosci"
                className="text-ink underline underline-offset-2"
              >
                Polityka prywatności
              </a>
              .<span className="ml-1 text-accent-strong">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="text-sm text-accent-strong">{errors.consent}</p>
          )}
        </div>

        {state.status === "error" && state.message && (
          <p
            role="alert"
            className="rounded-sm border border-accent/50 bg-accent/10 px-4 py-3 text-sm text-ink"
          >
            {state.message}
          </p>
        )}

        <Button type="submit" disabled={pending} className="mt-2 w-full">
          {pending ? "Wysyłanie…" : "Wyślij zapytanie"}
        </Button>
      </div>
    </form>
  );
}
