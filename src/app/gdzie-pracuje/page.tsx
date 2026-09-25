import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { cities } from "@/data/area";
import { venues } from "@/data/gallery";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gdzie pracuję - obiekty i miasta",
  description:
    "Dekoracje ślubne na Śląsku i w całej Polsce. Obiekty, w których pracowałam: Stara Szwajcaria Gliwice, Impresja Zabrze, Leśna Perła Radlin, Wiśniowy Sad Tarnowskie Góry.",
  alternates: { canonical: "/gdzie-pracuje" },
};

/**
 * A page rather than a homepage section: it earns its keep through search,
 * not through browsing. Venue plus city ("dekoracje Stara Szwajcaria Gliwice")
 * is what couples type once they have booked a place - low competition, very
 * high intent - and a dedicated URL can rank for it on its own.
 *
 * Linked from the footer only. It is a reference list, not a selling point,
 * and does not belong in the main navigation.
 */
export default function GdziePracujePage() {
  const lista = Object.values(venues);

  return (
    <>
      <PageHeader
        eyebrow="Obszar działania"
        title={
          <>
            Śląsk i <em>cała Polska</em>
          </>
        }
        lead="Najczęściej dekoruję na Śląsku, ale dojeżdżam w każde miejsce w kraju. Jeśli Waszego obiektu nie ma na liście, to żaden problem - po prostu jeszcze się nie poznaliśmy."
      />

      <section className="bg-canvas py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
            <Reveal>
              <h2 className="type-eyebrow text-accent-strong">
                Obiekty, w których dekorowałam
              </h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {lista.map((v) => (
                  <li
                    key={`${v.name}-${v.city}`}
                    className="flex items-baseline gap-2 border-b border-line pb-3 text-[0.9375rem]"
                  >
                    <span className="text-ink">{v.name}</span>
                    <span className="text-faint">{v.city}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="type-eyebrow text-accent-strong">
                Miasta i okolice
              </h2>
              <p className="mt-6 leading-relaxed text-muted">
                {cities.join(" · ")}
              </p>
              <p className="mt-6 flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
                <MapPin size={16} className="mt-1 shrink-0 text-accent-strong" />
                Poza Śląskiem dojeżdżam w całej Polsce - wystarczy, że
                napiszecie, gdzie odbywa się Wasza uroczystość.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 border-t border-line pt-14 text-center">
            <h2 className="type-h2 text-ink">
              Dekorujecie w <em>którymś z tych miejsc</em>?
            </h2>
            <p className="type-lead mx-auto mt-5 max-w-lg text-muted">
              Znam je od kuchni - wiem, co gdzie stanie, zanim wejdę. Napiszcie,
              a sprawdzę termin.
            </p>
            <div className="mt-8">
              <Button href="/kontakt">Zapytaj o termin</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
