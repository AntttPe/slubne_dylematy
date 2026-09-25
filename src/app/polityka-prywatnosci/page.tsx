import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { analyticsEnabled } from "@/lib/analytics";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Co dzieje się z danymi podanymi w formularzu kontaktowym Ślubnych Dylematów.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

/**
 * Written in plain Polish on purpose. Legalese is not a legal requirement -
 * GDPR asks for clear, plain language - and a wall of clauses on a one-person
 * business reads as copied boilerplate.
 *
 * The substance still has to be here: who the controller is, what is
 * collected, why, for how long, who else sees it, and what rights people have.
 *
 * TODO(client): worth having a lawyer read this before launch.
 */
export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title="Polityka prywatności"
        lead="Krótko i bez prawniczego żargonu: co dzieje się z danymi, które nam podajecie."
      />

      <section className="bg-canvas py-16 sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col gap-10 px-5 leading-relaxed text-muted sm:px-8">
          <div>
            <h2 className="type-h3 text-ink">Kto odpowiada za Wasze dane</h2>
            <p className="mt-3">
              Administratorem danych jest {site.legalName}, prowadząca
              działalność pod nazwą {site.name}. W każdej sprawie
              dotyczącej Waszych danych napiszcie na{" "}
              <a
                href={site.contact.emailHref}
                className="text-ink underline underline-offset-2"
              >
                {site.contact.email}
              </a>{" "}
              - odpowiadam osobiście.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Co zbieramy</h2>
            <p className="mt-3">
              Tylko to, co sami wpiszecie w formularzu. Konieczne są{" "}
              <span className="text-ink">imię i nazwisko oraz adres e-mail</span>{" "}
              - bez nich nie mam jak odpowiedzieć. Reszta jest dobrowolna:
              telefon, data i miejsce uroczystości, liczba gości, budżet i opis
              Waszej wizji.
            </p>
            <p className="mt-3">
              Nie kupujemy baz danych i nie zbieramy niczego poza formularzem.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Po co</h2>
            <p className="mt-3">
              Żeby odpowiedzieć na zapytanie i przygotować propozycję
              dekoracji. Do niczego innego. Nie wysyłamy newslettera i nie
              wykorzystujemy tych danych do reklam.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Jak długo je trzymamy</h2>
            <p className="mt-3">
              Zapytania przechowujemy dwa lata od ostatniego kontaktu - na
              wypadek, gdybyście wrócili do rozmowy. Jeśli dojdzie do
              współpracy, dokumenty rozliczeniowe zostają tak długo, jak
              wymagają tego przepisy podatkowe.
            </p>
            <p className="mt-3">
              Możecie w każdej chwili poprosić o usunięcie wcześniej - wystarczy
              jeden mail.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Kto jeszcze ma do nich dostęp</h2>
            <p className="mt-3">
              Nikt poza firmami, które technicznie obsługują stronę i pocztę -
              hosting i serwer pocztowy. Nie sprzedajemy danych, nie
              udostępniamy ich innym firmom ani nie przekazujemy nikomu do
              celów marketingowych.
            </p>
            <p className="mt-3">
              Część tych usług ma siedzibę poza Unią Europejską i korzysta ze
              standardowych klauzul umownych zatwierdzonych przez Komisję
              Europejską.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Co możecie zrobić</h2>
            <p className="mt-3">
              Możecie poprosić o wgląd w swoje dane, ich poprawienie, usunięcie
              albo wycofać zgodę - bez podawania powodu i bez żadnych
              konsekwencji. Napiszcie na adres powyżej.
            </p>
            <p className="mt-3">
              Gdyby coś Wam się nie podobało, macie też prawo złożyć skargę do
              Prezesa Urzędu Ochrony Danych Osobowych.
            </p>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Pliki cookies</h2>
            <p className="mt-3">
              Strona nie zapisuje plików cookies ani niczego innego na Waszym
              urządzeniu. Nie śledzimy Was na innych stronach. Dlatego nie
              wyświetlamy okna zgody na cookies - nie ma na co jej wyrażać.
            </p>
            {analyticsEnabled && (
              <p className="mt-3">
                Liczymy tylko anonimowe odwiedziny (ile osób weszło, z jakiego
                kraju, na jakim urządzeniu). Tych danych nie da się powiązać z
                konkretną osobą ani rozpoznać jej przy kolejnej wizycie.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
