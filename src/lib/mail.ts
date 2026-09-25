import "server-only";

import nodemailer from "nodemailer";
import { site } from "@/data/site";
import type { Inquiry } from "./contact-schema";

/**
 * Mail rendering is not web rendering. Outlook on Windows draws HTML with
 * Word's engine: no flexbox, no grid, `system-ui` degrades to Times New Roman,
 * and unstyled backgrounds get inverted by dark mode.
 *
 * So the mails stay deliberately plain - an explicit font stack, explicit
 * colours on every element, and a single wrapper table, which is the one
 * layout primitive every client agrees on. No branded template: for a
 * one-person business a plain, well-written note reads more personal than a
 * newsletter, and there is far less to break.
 */
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const TLO = "#faf8f4";
const ATRAMENT = "#241610";
const PRZYGASZONY = "#6b5344";
const AKCENT = "#7d5f3c";

/** One wrapper table - Outlook ignores max-width on a div. */
function szablon(tresc: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TLO};margin:0;padding:0">
<tr><td align="left" style="padding:24px">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px">
<tr><td style="font-family:${FONT};font-size:15px;line-height:1.65;color:${ATRAMENT}">
${tresc}
</td></tr>
</table>
</td></tr>
</table>`;
}

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
    html: szablon(`<p style="margin:0 0 14px;color:${ATRAMENT}"><strong>${esc(inquiry.name)}</strong></p>
${wypelnione.map(([k, v]) => `<p style="margin:0 0 4px;color:${ATRAMENT}"><span style="color:${PRZYGASZONY}">${esc(k)}:</span> ${esc(v!)}</p>`).join("\n")}
${inquiry.message ? `<p style="margin:18px 0 4px;color:${PRZYGASZONY}">Wizja:</p><p style="margin:0;color:${ATRAMENT}">${esc(inquiry.message).replace(/\n/g, "<br>")}</p>` : ""}`),
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
    html: szablon(`<p style="margin:0 0 14px;color:${ATRAMENT}">Dzień dobry, ${esc(inquiry.name.split(" ")[0])}!</p>
<p style="margin:0 0 14px;color:${ATRAMENT}"><strong>Wasze zapytanie już do nas dotarło.</strong></p>
<p style="margin:0 0 14px;color:${ATRAMENT}">Na odpowiedź potrzebujemy chwili, ponieważ do każdego zapytania podchodzimy indywidualnie. Informacje z formularza pozwolą mi lepiej poznać Wasze potrzeby, pomysły i oczekiwania.</p>
<p style="margin:0 0 24px;color:${ATRAMENT}">W kolejnym mailu ode mnie otrzymacie najważniejsze informacje i wspólnie wybierzemy dogodny termin spotkania - online lub przy kawie.</p>
<p style="margin:0 0 4px;color:${ATRAMENT}">Do usłyszenia!</p>
<p style="margin:0 0 28px;color:${ATRAMENT}"><strong>${esc(site.owner)}</strong></p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="border-top:1px solid #e4d8c6;padding-top:16px;font-family:${FONT};font-size:13px;line-height:1.6;color:${PRZYGASZONY}">
${esc(site.name)}<br>
<a href="${site.contact.phoneHref}" style="color:${AKCENT};text-decoration:none">${esc(site.contact.phone)}</a> &middot;
<a href="${site.url}" style="color:${AKCENT};text-decoration:none">${esc(site.url.replace(/^https?:\/\//, ""))}</a>
</td></tr>
</table>`),
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
