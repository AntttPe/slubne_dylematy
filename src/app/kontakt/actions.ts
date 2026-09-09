"use server";

import { inquirySchema, type FormState } from "@/lib/contact-schema";

/**
 * Server Action zamiast API route - brak publicznego endpointu,
 * który da się bezmyślnie zasypać requestami.
 *
 * Kolejność obrony:
 *   1. honeypot        - pole niewidoczne dla ludzi, boty je wypełniają
 *   2. time-trap       - formularz wysłany szybciej niż w 3 s to bot
 *   3. walidacja Zod   - na serwerze, niezależnie od tego, co robi klient
 *   4. TODO: Turnstile - weryfikacja tokenu po stronie Cloudflare
 *   5. TODO: rate limit per IP
 */
export async function submitInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Honeypot - prawdziwy użytkownik nigdy tego nie wypełni.
  if (formData.get("website")) {
    // Udajemy sukces: bot nie dowie się, że został odrzucony.
    return { status: "success" };
  }

  // 2. Time-trap.
  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return { status: "success" };
  }

  // 3. Walidacja.
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

  try {
    // TODO(integracja): Resend + zapis do Supabase.
    //
    //   await resend.emails.send({
    //     from: "formularz@slubnedylematy.pl",
    //     to: site.contact.email,
    //     replyTo: inquiry.email,
    //     subject: `Zapytanie: ${inquiry.celebration}${inquiry.date ? ` - ${inquiry.date}` : ""}`,
    //     react: InquiryEmail(inquiry),
    //   });
    //
    //   await supabase.from("inquiries").insert(inquiry);
    //
    // Zapis do bazy jest osobno od maila celowo: jeśli poczta padnie,
    // zgłoszenie i tak czeka w panelu.

    console.info("[zapytanie]", {
      ...inquiry,
      receivedAt: new Date().toISOString(),
    });

    return {
      status: "success",
      message: "Dziękuję! Odpowiem w ciągu 24 godzin.",
    };
  } catch (error) {
    console.error("[zapytanie] błąd wysyłki:", error);
    return {
      status: "error",
      message:
        "Coś poszło nie tak przy wysyłce. Napiszcie proszę bezpośrednio na kontakt@slubnedylematy.pl.",
    };
  }
}
