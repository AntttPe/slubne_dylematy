/** Name and phone normalisation, shared by the form, the server action and the mails. */

const PL = "pl-PL";

/**
 * Capitalises one word. The rest of the word is lowercased only when the
 * whole word was shouted, so "ANTEK" becomes "Antek" while "McDonald" and
 * "O'Brien" survive as typed.
 */
function wyrazDuzaLitera(word: string): string {
  if (!word) return word;
  const krzyczy = word === word.toLocaleUpperCase(PL);
  const reszta = krzyczy ? word.slice(1).toLocaleLowerCase(PL) : word.slice(1);
  return word[0].toLocaleUpperCase(PL) + reszta;
}

/**
 * "antek kowalski" -> "Antek Kowalski", "ANNA-MARIA NOWAK" -> "Anna-Maria Nowak".
 *
 * Splits on spaces, hyphens and apostrophes while keeping them, because both
 * double-barrelled first names and hyphenated surnames are common here.
 */
export function formatName(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .split(/([ \-'’])/)
    .map(wyrazDuzaLitera)
    .join("");
}

/** Just the first name - what the couple's confirmation greets them with. */
export function firstName(value: string): string {
  return formatName(value).split(" ")[0] ?? "";
}

/** Digits only, for length checks and for building the final number. */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Groups digits in threes as they are typed: "725824732" -> "725 824 732".
 * Deliberately not per-country - a wrong national pattern is more confusing
 * than a neutral one, and the grouping is only there to make a long string
 * readable.
 */
export function formatPhone(value: string, maxDigits = 15): string {
  const cyfry = phoneDigits(value).slice(0, maxDigits);
  return cyfry.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

/**
 * Groups an amount in thousands as it is typed: "12000" -> "12 000".
 *
 * A plain space, not the non-breaking one `toLocaleString` produces: this
 * value goes back into an <input>, and a non-breaking space there is
 * invisible but breaks a naive copy-paste into a calculator.
 */
export function formatAmount(value: string, maxDigits = 7): string {
  const cyfry = value
    .replace(/\D/g, "")
    .replace(/^0+(?=\d)/, "")
    .slice(0, maxDigits);
  return cyfry.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
