"use server";

import { mailConfigured, sendInquiry } from "@/lib/mail";
import { site } from "@/data/site";
import { inquirySchema, type FormState } from "@/lib/contact-schema";

/**
 * Server Action rather than an API route - no public endpoint to hammer.
 *
 * Defence order: honeypot, time trap, Zod on the server, then TODO Turnstile
 * and per-IP rate limiting.
 */
export async function submitInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (formData.get("website")) {
    return { status: "success" };
  }

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return { status: "success" };
  }

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      errors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Sprawdźcie zaznaczone pola.",
      errors,
    };
  }

  const inquiry = parsed.data;

  const budzet = inquiry.budgetUnknown
    ? "jeszcze nie wie"
    : inquiry.budget
      ? `${Number(inquiry.budget).toLocaleString("pl-PL")} zł`
      : "nie podano";

  try {
    if (!mailConfigured) {
      // Local development without SMTP credentials: log instead of failing,
      // so the form can still be exercised end to end.
      console.info("[zapytanie] SMTP nieskonfigurowany, tylko log:", {
        ...inquiry,
        budzet,
      });
      return { status: "success", email: inquiry.email };
    }

    await sendInquiry(inquiry, budzet);
    return { status: "success", email: inquiry.email };
  } catch (error) {
    console.error("[zapytanie] błąd wysyłki:", error);
    return {
      status: "error",
      message:
        `Coś poszło nie tak przy wysyłce. Napiszcie proszę bezpośrednio na ${site.contact.email}.`,
    };
  }
}
