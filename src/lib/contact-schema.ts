import { z } from "zod";

export const celebrationTypes = [
  "Ślub i wesele",
  "Dekoracja kościoła",
  "Komunia święta",
  "Chrzciny",
  "Urodziny / rocznica",
  "Przyjęcie firmowe",
  "Inne wydarzenie",
] as const;

/**
 * Jedna schema dla klienta (UX) i serwera (bezpieczeństwo).
 * Serwer waliduje zawsze od nowa - nigdy nie ufamy temu, co przyszło z przeglądarki.
 */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Podaj imię i nazwisko")
    .max(100, "Za długie imię i nazwisko"),

  email: z.email("Sprawdź adres e-mail").max(200),

  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+\s()-]*$/, "Numer może zawierać tylko cyfry i znaki + ( ) -")
    .optional()
    .or(z.literal("")),

  celebration: z.enum(celebrationTypes, {
    message: "Wybierz rodzaj uroczystości",
  }),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Nieprawidłowa data")
    .optional()
    .or(z.literal("")),

  guests: z
    .string()
    .trim()
    .regex(/^\d*$/, "Podaj liczbę")
    .max(5)
    .optional()
    .or(z.literal("")),

  venue: z.string().trim().max(200).optional().or(z.literal("")),

  /*
    Kwota wpisywana ręcznie zamiast przedziałów do wyboru.
    Przedziały zmuszały do zaklasyfikowania się do widełek, których
    para często jeszcze nie zna - i albo strzelała, albo omijała pole.

    Same cyfry: pole w formularzu jest typu number, ale do akcji
    serwerowej trafia jako tekst, więc walidujemy zapis.
  */
  budget: z
    .string()
    .trim()
    .regex(/^\d*$/, "Wpisz samą kwotę, bez spacji i złotówek")
    .max(7, "Ta kwota wygląda na pomyłkę")
    .optional()
    .or(z.literal("")),

  /** Zaznaczone "nie wiem jeszcze" - wtedy pole kwoty jest wyłączone. */
  budgetUnknown: z.literal("on").optional().or(z.literal("")),

  message: z
    .string()
    .trim()
    .max(4000, "Wiadomość jest za długa (maks. 4000 znaków)")
    .optional()
    .or(z.literal("")),

  consent: z.literal("on", {
    message: "Zgoda jest wymagana, żeby móc odpowiedzieć na zapytanie",
  }),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Błędy per pole - klucz to nazwa inputa. */
  errors?: Record<string, string>;
};
