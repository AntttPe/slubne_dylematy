import { z } from "zod";
import { formatName, phoneDigits } from "./format";
import { DOMYSLNY_PREFIKS, phonePrefixes } from "@/data/phone-prefixes";

const prefiksy = phonePrefixes.map((p) => p.code);

export const celebrationTypes = [
  "Ślub i wesele",
  "Dekoracja kościoła",
  "Komunia święta",
  "Chrzciny",
  "Urodziny / rocznica",
  "Przyjęcie firmowe",
  "Inne wydarzenie",
] as const;

export const inquirySchema = z.object({
  // Normalised here rather than in the form, so a submission with JS off
  // gets the same treatment as one from the browser.
  name: z
    .string()
    .trim()
    .min(2, "Podaj imię i nazwisko")
    .max(100, "Za długie imię i nazwisko")
    .transform(formatName),

  email: z.email("Sprawdź adres e-mail").max(200),

  // The dialling code is a separate control, so the number itself is digits
  // and spacing only.
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9\s()-]*$/, "Numer może zawierać tylko cyfry")
    .refine(
      (v) => v === "" || phoneDigits(v).length >= 6,
      "Ten numer wygląda na niepełny",
    )
    .optional()
    .or(z.literal("")),

  phoneCountry: z
    .string()
    .trim()
    .refine((v) => v === "" || prefiksy.includes(v), "Nieznany kierunkowy")
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

  budget: z
    .string()
    .trim()
    .regex(/^\d*$/, "Wpisz samą kwotę, bez spacji i złotówek")
    .max(7, "Ta kwota wygląda na pomyłkę")
    .optional()
    .or(z.literal("")),

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
})

/**
 * The dialling code is only ever useful glued to the number, so the schema
 * emits one ready-to-use `phone` and the rest of the app never has to think
 * about the two fields again.
 */
.transform((dane) => ({
  ...dane,
  phone: dane.phone
    ? `${dane.phoneCountry || DOMYSLNY_PREFIKS} ${dane.phone}`.replace(/\s+/g, " ").trim()
    : "",
}));

export type Inquiry = z.infer<typeof inquirySchema>;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Echoed back on success so a typo in the address is visible at once. */
  email?: string;
  errors?: Record<string, string>;
};
