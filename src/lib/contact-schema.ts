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

export const budgetOptions = [
  "Do 3 000 zł",
  "3 000 – 6 000 zł",
  "6 000 – 10 000 zł",
  "Powyżej 10 000 zł",
  "Jeszcze nie wiem",
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

  budget: z.enum(budgetOptions).optional().or(z.literal("")),

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
