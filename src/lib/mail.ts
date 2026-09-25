import "server-only";

import nodemailer from "nodemailer";
import { site } from "@/data/site";
import type { Inquiry } from "./contact-schema";

/**
 * Mail goes out through the domain's own SMTP server rather than an external
 * API, and that is a deliberate choice: the domain publishes
 * `v=spf1 ... -all` (hard fail) plus `DMARC p=quarantine; adkim=s` (strict).
 * Anything sent from outside those IPs is rejected, so using a third-party
 * sender would mean rewriting SPF and DKIM on a mailbox that already works.
 *
 * Credentials are server-only - never prefixed NEXT_PUBLIC.
 */
const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const port = Number(process.env.SMTP_PORT ?? 465);

export const mailConfigured = Boolean(host && user && pass);

function transporter() {
  if (!mailConfigured) throw new Error("SMTP nie jest skonfigurowany");
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: user!, pass: pass! },
    // Lambda cold starts plus a TLS handshake: fail fast rather than let the
    // whole request hang if the host is unreachable.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

function esc(v: string) {
  return v.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);
}

/**
 * What the owner receives.
 *
 * Shaped for the reply, not just for reading. Hitting reply goes straight to
 * the couple (replyTo), and most clients quote the whole thing underneath -
 * so the sender name is the couple's, and the body avoids tables, which quote
 * into a mangled mess. There is also no "reply to reach the couple" note: it
 * would end up quoted back to them, which reads oddly.
 */
export function buildOwnerMail(inquiry: Inquiry, budzet: string) {
  const tytul = `Zapytanie: ${inquiry.celebration}${inquiry.date ? ` - ${inquiry.date}` : ""}`;

  const pola: [string, string | undefined][] = [
    ["E-mail", inquiry.email],
    ["Telefon", inquiry.phone],
    ["Uroczystość", inquiry.celebration],
    ["Data", inquiry.date],
    ["Liczba gości", inquiry.guests],
    ["Miejsce", inquiry.venue],
    ["Budżet", budzet],
  ];
  const wypelnione = pola.filter(([, v]) => v?.trim());

  return {
    from: `"${inquiry.name} - zapytanie ze strony" <${user}>`,
    to: site.contact.email,
    replyTo: `"${inquiry.name}" <${inquiry.email}>`,
    subject: tytul,
    text: [
      inquiry.name,
      "",
      ...wypelnione.map(([k, v]) => `${k}: ${v}`),
      "",
      inquiry.message ? `Wizja:\n${inquiry.message}` : "(bez dodatkowego opisu)",
    ].join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#241610">
<p style="margin:0 0 14px"><strong>${esc(inquiry.name)}</strong></p>
${wypelnione.map(([k, v]) => `<p style="margin:0 0 4px"><span style="color:#6b5344">${esc(k)}:</span> ${esc(v!)}</p>`).join("\n")}
${inquiry.message ? `<p style="margin:18px 0 4px;color:#6b5344">Wizja:</p><p style="margin:0">${esc(inquiry.message).replace(/\n/g, "<br>")}</p>` : ""}
</div>`,
  };
}

/**
 * Confirmation for the couple. Sent from the real mailbox, not a noreply
 * address - people do reply to these, and bouncing that reply would lose a
 * lead without anyone noticing.
 */
export function buildCoupleMail(inquiry: Inquiry) {
  return {
    from: `"${site.name}" <${user}>`,
    to: inquiry.email,
    replyTo: site.contact.email,
    subject: `Dziękujemy za zapytanie - ${site.name}`,
    text: [
      `Dzień dobry, ${inquiry.name.split(" ")[0]}!`,
      "",
      "Wasze zapytanie już do nas dotarło.",
      "",
      "Na odpowiedź potrzebujemy chwili, ponieważ do każdego zapytania podchodzimy indywidualnie. Informacje z formularza pozwolą mi lepiej poznać Wasze potrzeby, pomysły i oczekiwania.",
      "",
      "W kolejnym mailu ode mnie otrzymacie najważniejsze informacje i wspólnie wybierzemy dogodny termin spotkania - online lub przy kawie.",
      "",
      "Do usłyszenia!",
      site.owner,
      "",
      `${site.name} | ${site.contact.phone}`,
      site.url,
    ].join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.65;color:#241610;max-width:560px">
<p>Dzień dobry, ${esc(inquiry.name.split(" ")[0])}!</p>
<p><strong>Wasze zapytanie już do nas dotarło.</strong></p>
<p>Na odpowiedź potrzebujemy chwili, ponieważ do każdego zapytania podchodzimy indywidualnie. Informacje z formularza pozwolą mi lepiej poznać Wasze potrzeby, pomysły i oczekiwania.</p>
<p>W kolejnym mailu ode mnie otrzymacie najważniejsze informacje i wspólnie wybierzemy dogodny termin spotkania - online lub przy kawie.</p>
<p style="margin-top:24px">Do usłyszenia!<br><strong>${esc(site.owner)}</strong></p>
<hr style="border:0;border-top:1px solid #e4d8c6;margin:28px 0 16px">
<p style="color:#6b5344;font-size:13px;margin:0">
${esc(site.name)}<br>
<a href="${site.contact.phoneHref}" style="color:#7d5f3c">${esc(site.contact.phone)}</a> &middot;
<a href="${site.url}" style="color:#7d5f3c">${esc(site.url.replace(/^https?:\/\//, ""))}</a>
</p>
</div>`,
  };
}

export async function sendInquiry(inquiry: Inquiry, budzet: string) {
  const t = transporter();
  // The owner's copy is the one that must not be lost, so it goes first and
  // its failure fails the request. The couple's confirmation is best effort.
  await t.sendMail(buildOwnerMail(inquiry, budzet));
  try {
    await t.sendMail(buildCoupleMail(inquiry));
  } catch (error) {
    console.error("[zapytanie] potwierdzenie dla pary nie wyszło:", error);
  }
}
