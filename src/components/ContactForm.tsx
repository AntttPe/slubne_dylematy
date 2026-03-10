"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

type FormData = {
  imie: string;
  email: string;
  telefon: string;
  rodzajUroczystosci: string;
  data: string;
  liczbaGosci: string;
  miejsceUroczystosci: string;
  budzet: string;
  wiadomosc: string;
};

const initialForm: FormData = {
  imie: "",
  email: "",
  telefon: "",
  rodzajUroczystosci: "",
  data: "",
  liczbaGosci: "",
  miejsceUroczystosci: "",
  budzet: "",
  wiadomosc: "",
};

const rodzajeUroczystosci = [
  "Ślub & Wesele",
  "Przyjęcie weselne",
  "Komunia Święta",
  "Chrzciny",
  "Urodziny / Rocznica",
  "Przyjęcie firmowe",
  "Inne wydarzenie",
];

const opcjeBudzetu = [
  "Do 1 000 zł",
  "1 000 – 3 000 zł",
  "3 000 – 6 000 zł",
  "6 000 – 10 000 zł",
  "Powyżej 10 000 zł",
  "Do ustalenia",
];

type FieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  htmlFor: string;
};

function Field({ label, required, children, htmlFor }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-[#2C1810]">
        {label}
        {required && <span className="text-[#C9A87C] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-[#E8D9C4] bg-white text-[#2C1810] placeholder:text-[#A89080] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A87C]/40 focus:border-[#C9A87C] transition-colors duration-150";

const selectClass =
  "w-full px-4 py-3 rounded-xl border border-[#E8D9C4] bg-white text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A87C]/40 focus:border-[#C9A87C] transition-colors duration-150 cursor-pointer appearance-none bg-no-repeat bg-right pr-10";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder for form submission — integrate with email service or Formspree
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-[#E8D9C4] shadow-sm flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#C9A87C]/10 flex items-center justify-center">
          <CheckCircle size={40} className="text-[#C9A87C]" />
        </div>
        <div>
          <p
            className="font-script text-[#C9A87C] text-3xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Dziękuję!
          </p>
          <h2 className="font-serif text-2xl text-[#2C1810] mb-3">Wiadomość wysłana</h2>
          <p className="text-[#6B5344] leading-relaxed max-w-md">
            Otrzymałam Wasze zapytanie. Odpiszę w ciągu 24 godzin. Nie mogę się
            doczekać, by dowiedzieć się więcej o Waszym wyjątkowym dniu!
          </p>
        </div>
        <button
          onClick={() => { setSent(false); setForm(initialForm); }}
          className="text-sm text-[#A8845A] hover:underline cursor-pointer mt-2"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#E8D9C4] shadow-sm">
      <h2 className="font-serif text-2xl text-[#2C1810] mb-2">Formularz zapytania</h2>
      <p className="text-sm text-[#6B5344] mb-8">
        Wypełnij formularz, a odezwę się do Ciebie w ciągu 24 godzin.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Personal info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field htmlFor="imie" label="Imię i nazwisko" required>
            <input
              id="imie"
              type="text"
              value={form.imie}
              onChange={set("imie")}
              placeholder="Anna Kowalska"
              required
              className={inputClass}
            />
          </Field>
          <Field htmlFor="email" label="Adres e-mail" required>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="anna@example.com"
              required
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field htmlFor="telefon" label="Numer telefonu">
            <input
              id="telefon"
              type="tel"
              value={form.telefon}
              onChange={set("telefon")}
              placeholder="+48 123 456 789"
              className={inputClass}
            />
          </Field>
          <Field htmlFor="rodzajUroczystosci" label="Rodzaj uroczystości" required>
            <div className="relative">
              <select
                id="rodzajUroczystosci"
                value={form.rodzajUroczystosci}
                onChange={set("rodzajUroczystosci")}
                required
                className={selectClass}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B5344' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="">Wybierz rodzaj...</option>
                {rodzajeUroczystosci.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field htmlFor="data" label="Planowana data uroczystości">
            <input
              id="data"
              type="date"
              value={form.data}
              onChange={set("data")}
              className={inputClass}
              min={new Date().toISOString().split("T")[0]}
            />
          </Field>
          <Field htmlFor="liczbaGosci" label="Szacowana liczba gości">
            <input
              id="liczbaGosci"
              type="number"
              value={form.liczbaGosci}
              onChange={set("liczbaGosci")}
              placeholder="np. 80"
              min="1"
              className={inputClass}
            />
          </Field>
        </div>

        <Field htmlFor="miejsceUroczystosci" label="Miejsce uroczystości">
          <input
            id="miejsceUroczystosci"
            type="text"
            value={form.miejsceUroczystosci}
            onChange={set("miejsceUroczystosci")}
            placeholder="np. Sala weselna Złoty Róg, Katowice"
            className={inputClass}
          />
        </Field>

        <Field htmlFor="budzet" label="Orientacyjny budżet na dekoracje">
          <div className="relative">
            <select
              id="budzet"
              value={form.budzet}
              onChange={set("budzet")}
              className={selectClass}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B5344' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundPosition: "right 12px center",
              }}
            >
              <option value="">Wybierz orientacyjny budżet...</option>
              {opcjeBudzetu.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </Field>

        <Field htmlFor="wiadomosc" label="Dodatkowe informacje / wizja dekoracji">
          <textarea
            id="wiadomosc"
            value={form.wiadomosc}
            onChange={set("wiadomosc")}
            rows={5}
            placeholder="Opowiedz mi o swoich marzeniach — styl, kolory, inspiracje, szczegółowe życzenia..."
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Privacy note */}
        <p className="text-xs text-[#A89080] leading-relaxed">
          Wysyłając formularz, zgadzasz się na przetwarzanie danych osobowych w celu
          odpowiedzi na zapytanie. Dane nie będą udostępniane osobom trzecim.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-4 bg-[#C9A87C] text-white font-medium rounded-full hover:bg-[#A8845A] transition-colors duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Wysyłanie...
            </>
          ) : (
            <>
              <Send size={16} />
              Wyślij zapytanie
            </>
          )}
        </button>
      </form>
    </div>
  );
}
