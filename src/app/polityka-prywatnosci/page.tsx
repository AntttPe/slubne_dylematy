import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Zasady przetwarzania danych osobowych przekazanych przez formularz kontaktowy.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

/**
 * TODO(klient): uzupełnić pełną nazwę działalności, adres i NIP -
 * bez danych administratora dokument nie spełnia wymogów RODO.
 * Warto dać to do sprawdzenia prawnikowi przed startem.
 */
export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <PageHeader eyebrow="Dokumenty" title="Polityka prywatności" />

      <section className="bg-canvas py-20">
        <div className="mx-auto flex max-w-2xl flex-col gap-10 px-5 text-muted sm:px-8">
          <div>
            <h2 className="type-h3 text-ink">Administrator danych</h2>
            <p className="mt-3 leading-relaxed">
              Administratorem danych osobowych jest {site.name}. Kontakt w
              sprawach dotyczących danych:{" "}
              <a
                href={site.contact.emailHref}
                className="text-ink underline underline-offset-2"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Jakie dane zbieramy</h2>
            <p className="mt-3 leading-relaxed">
              Wyłącznie dane podane dobrowolnie w formularzu kontaktowym: imię i
              nazwisko, adres e-mail, opcjonalnie numer telefonu, data i miejsce
              uroczystości, liczba gości, orientacyjny budżet oraz treść
              wiadomości.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Cel i podstawa prawna</h2>
            <p className="mt-3 leading-relaxed">
              Dane przetwarzamy w celu udzielenia odpowiedzi na zapytanie i
              ewentualnego przygotowania oferty - na podstawie zgody (art. 6
              ust. 1 lit. a RODO) oraz działań podejmowanych przed zawarciem
              umowy (art. 6 ust. 1 lit. b RODO).
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Okres przechowywania</h2>
            <p className="mt-3 leading-relaxed">
              Zapytania przechowujemy przez 24 miesiące od ostatniego kontaktu,
              a w przypadku zawarcia umowy - przez okres wymagany przepisami
              podatkowymi.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Odbiorcy danych</h2>
            <p className="mt-3 leading-relaxed">
              Dane mogą być powierzone dostawcom usług technicznych:
              hostingu strony oraz obsługi poczty. Podmioty te działają na
              podstawie umów powierzenia przetwarzania. Część z nich ma
              siedzibę poza Europejskim Obszarem Gospodarczym - przekazanie
              danych odbywa się wówczas na podstawie standardowych klauzul
              umownych zatwierdzonych przez Komisję Europejską. Danych nie
              sprzedajemy ani nie udostępniamy w celach marketingowych.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Wasze prawa</h2>
            <p className="mt-3 leading-relaxed">
              Przysługuje Wam prawo dostępu do danych, ich sprostowania,
              usunięcia, ograniczenia przetwarzania, przenoszenia oraz cofnięcia
              zgody w dowolnym momencie. Macie też prawo wniesienia skargi do
              Prezesa Urzędu Ochrony Danych Osobowych.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Pliki cookies</h2>
            <p className="mt-3 leading-relaxed">
              Strona nie używa plików cookies do celów marketingowych ani
              analitycznych. Zabezpieczenie formularza przed spamem realizujemy
              w sposób nieprofilujący użytkowników.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
