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

function wiersz(etykieta: string, wartosc?: string) {
  if (!wartosc?.trim()) return "";
  return `<tr><td style="padding:6px 16px 6px 0;color:#6b5344;white-space:nowrap;vertical-align:top">${esc(etykieta)}</td><td style="padding:6px 0;color:#241610">${esc(wartosc).replace(/\n/g, "<br>")}</td></tr>`;
}

/** What the owner receives. replyTo points at the couple, so hitting reply works. */
export function buildOwnerMail(inquiry: Inquiry, budzet: string) {
  const tytul = `Zapytanie: ${inquiry.celebration}${inquiry.date ? ` - ${inquiry.date}` : ""}`;
  return {
    from: `"Formularz - ${site.name}" <${user}>`,
    to: site.contact.email,
    replyTo: `"${inquiry.name}" <${inquiry.email}>`,
    subject: tytul,
    text: [
      `Imię i nazwisko: ${inquiry.name}`,
      `E-mail: ${inquiry.email}`,
      inquiry.phone && `Telefon: ${inquiry.phone}`,
      `Uroczystość: ${inquiry.celebration}`,
      inquiry.date && `Data: ${inquiry.date}`,
      inquiry.guests && `Liczba gości: ${inquiry.guests}`,
      inquiry.venue && `Miejsce: ${inquiry.venue}`,
      `Budżet: ${budzet}`,
      "",
      inquiry.message || "(bez dodatkowego opisu)",
    ].filter(Boolean).join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">
<h2 style="font-size:18px;margin:0 0 16px">${esc(tytul)}</h2>
<table style="border-collapse:collapse;font-size:15px">
${wiersz("Imię i nazwisko", inquiry.name)}
${wiersz("E-mail", inquiry.email)}
${wiersz("Telefon", inquiry.phone)}
${wiersz("Uroczystość", inquiry.celebration)}
${wiersz("Data", inquiry.date)}
${wiersz("Liczba gości", inquiry.guests)}
${wiersz("Miejsce", inquiry.venue)}
${wiersz("Budżet", budzet)}
</table>
${inquiry.message ? `<p style="margin:20px 0 6px;color:#6b5344">Wasza wizja:</p><div style="padding:14px 16px;background:#f0e8dc;border-radius:4px;color:#241610">${esc(inquiry.message).replace(/\n/g, "<br>")}</div>` : ""}
<p style="margin-top:24px;color:#8a725f;font-size:13px">Odpowiedz na tę wiadomość, aby napisać bezpośrednio do pary.</p>
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
