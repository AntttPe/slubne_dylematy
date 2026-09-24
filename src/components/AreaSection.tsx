import { MapPin } from "lucide-react";
import { cities } from "@/data/area";
import { venues } from "@/data/gallery";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";

/**
 * Venues and cities as crawlable text.
 *
 * Alt attributes alone are a weak signal; visible, linked-to text naming a
 * venue is what ranks for "dekoracje <nazwa sali>". Those queries come from
 * couples who have already booked a place, so intent is about as high as it
 * gets - and almost nobody competes for them.
 */
export default function AreaSection() {
  const lista = Object.values(venues);

  return (
    <section id="obszar" className="scroll-mt-24 bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Gdzie pracuję"
          title={
            <>
              Śląsk i <em>cała Polska</em>
            </>
          }
          lead="Najczęściej dekoruję na Śląsku, ale dojeżdżam w każde miejsce w kraju. Jeśli Waszego obiektu nie ma na liście, to żaden problem - po prostu jeszcze się nie poznaliśmy."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <Reveal>
            <h3 className="type-eyebrow text-accent-strong">
              Obiekty, w których dekorowałam
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
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
            <h3 className="type-eyebrow text-accent-strong">
              Miasta i okolice
            </h3>
            <p className="mt-5 leading-relaxed text-muted">
              {cities.join(" · ")}
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-muted">
              <MapPin size={16} className="mt-1 shrink-0 text-accent-strong" />
              Poza Śląskiem dojeżdżam w całej Polsce - wystarczy, że napiszecie,
              gdzie odbywa się Wasza uroczystość.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
