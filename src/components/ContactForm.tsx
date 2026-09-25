"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/app/kontakt/actions";
import { celebrationTypes, type FormState } from "@/lib/contact-schema";
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

  const [message, setMessage] = useState("");

  // Checking "don't know yet" disables the amount field. A disabled field is
  // not included in FormData, so the amount clears itself.
  const [budgetUnknown, setBudgetUnknown] = useState(false);

  useEffect(() => {
    // Set in the browser only - in server HTML it would be frozen at render
    // time and identical for everyone. Written straight to the DOM to avoid
    // an extra render.
    if (startedAtInput.current) {
      startedAtInput.current.value = String(Date.now());
    }
  }, []);

  const dateStatus: Status | undefined = date ? availability[date] : undefined;
  const errors = state.errors ?? {};
  const today = new Date().toISOString().slice(0, 10);

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-line bg-canvas p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-strong/10">
          <CheckCircle2 size={24} className="text-accent-strong" />
        </div>

        <h2 className="type-h2 mt-6 text-ink">
          Dziękujemy! <em>Wasze zapytanie już do nas dotarło</em> 🤍
        </h2>

        <div className="mt-5 flex max-w-lg flex-col gap-4 leading-relaxed text-muted">
          <p>
            Na odpowiedź potrzebujemy chwili, ponieważ do każdego zapytania
            podchodzimy indywidualnie.
          </p>
          <p>
            Informacje z formularza pozwolą mi lepiej poznać Wasze potrzeby,
            pomysły i oczekiwania, dzięki czemu już przed naszym spotkaniem
            będę miała dobrą bazę do rozmowy.
          </p>
          <p>
            W mailu ode mnie otrzymacie najważniejsze informacje i wspólnie
            wybierzemy dogodny termin spotkania. Możemy porozmawiać online lub
            spotkać się przy kawie.
          </p>
          <p className="font-serif text-xl text-ink">Do usłyszenia!</p>
        </div>

        {state.email && (
          <div className="mt-8 rounded-sm border border-line bg-surface p-5">
            <p className="type-eyebrow text-accent-strong">
              Odpowiedź trafi na adres
            </p>
            <p className="mt-2 break-all font-serif text-xl text-ink">
              {state.email}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Jeśli widzicie tu literówkę, napiszcie jeszcze raz - bez
              poprawnego adresu nie będę w stanie odpowiedzieć.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-muted">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0 text-accent-strong"
          />
          <p>
            <span className="text-ink">Zajrzyjcie też do folderu spam.</span>{" "}
            Wiadomości od nowych nadawców czasem tam trafiają.
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row">
          <Button href="/galeria" variant="secondary">
            Obejrzyjcie realizacje w międzyczasie
          </Button>
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

            <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Nie wypełniaj tego pola</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
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
              placeholder="+48 600 000 000"
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
          <div className="relative">
            <input
              id="budget"
              name="budget"
              type="number"
              min="0"
              step="100"
              inputMode="numeric"
              disabled={budgetUnknown}
              placeholder={budgetUnknown ? "" : "np. 4000"}
              aria-describedby="budget-waluta"
              className={`${field} pr-10 disabled:cursor-not-allowed disabled:bg-surface disabled:text-faint`}
            />
            <span
              id="budget-waluta"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-faint"
            >
              zł
            </span>
          </div>

          <label className="mt-2.5 inline-flex items-center gap-2.5 text-sm text-muted">
            <input
              type="checkbox"
              name="budgetUnknown"
              checked={budgetUnknown}
              onChange={(e) => setBudgetUnknown(e.target.checked)}
              className="h-4 w-4 accent-accent-strong"
            />
            Nie wiem jeszcze
          </label>
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

                <div className="flex flex-col gap-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-accent-strong"
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
