"use client";

import { useState } from "react";
import {
  DLUGOSC_PL,
  DOMYSLNY_PREFIKS,
  phonePrefixes,
} from "@/data/phone-prefixes";
import { formatPhone } from "@/lib/format";

/**
 * Dialling code and number as two real controls, submitted as `phoneCountry`
 * and `phone` and glued together by the schema.
 *
 * A native <select> rather than a custom dropdown: on a phone it opens the
 * system picker, which beats anything hand-rolled. Options read "+48 PL" -
 * an <option> cannot show one label closed and another when open, and a
 * compact code leaves the number room to breathe.
 *
 * Non-digits are dropped as they are typed: type="tel" happily accepts
 * letters, which previously only surfaced as a server-side error.
 */
export default function PhoneField({ error }: { error?: string }) {
  const [prefiks, setPrefiks] = useState(DOMYSLNY_PREFIKS);
  const [numer, setNumer] = useState("");

  const maxCyfr = prefiks === DOMYSLNY_PREFIKS ? DLUGOSC_PL : 15;

  return (
    <div
      className={`flex overflow-hidden rounded-sm border bg-canvas transition-colors focus-within:border-accent-strong ${
        error ? "border-accent-strong" : "border-line"
      }`}
    >
      <select
        name="phoneCountry"
        value={prefiks}
        aria-label="Numer kierunkowy kraju"
        onChange={(e) => {
          const nowy = e.target.value;
          const max = nowy === DOMYSLNY_PREFIKS ? DLUGOSC_PL : 15;
          setPrefiks(nowy);
          // Switching to Poland can leave a number longer than 9 digits.
          setNumer((n) => formatPhone(n, max));
        }}
        className="shrink-0 border-r border-line bg-surface py-3 pl-3 pr-2 text-[0.9375rem] text-ink focus:outline-none"
      >
        {phonePrefixes.map((p) => (
          <option key={p.code} value={p.code}>
            {p.code} {p.iso}
          </option>
        ))}
      </select>

      <input
        id="phone"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={numer}
        onChange={(e) => setNumer(formatPhone(e.target.value, maxCyfr))}
        placeholder={prefiks === DOMYSLNY_PREFIKS ? "725 824 732" : "numer"}
        aria-invalid={!!error}
        aria-describedby={error ? "phone-error" : undefined}
        className="min-w-0 flex-1 bg-canvas px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint/70 focus:outline-none"
      />
    </div>
  );
}
