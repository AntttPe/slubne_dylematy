import { testimonials } from "@/data/testimonials";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";

/**
 * Ściana cytatów zamiast karuzeli: wszystkie opinie widoczne od razu,
 * zero JS-u po stronie klienta i cały tekst indeksowany przez Google.
 */
export default function TestimonialsSection() {
  return (
    <section
      id="opinie"
      className="scroll-mt-24 bg-canvas-dark py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          tone="dark"
          eyebrow="Opinie"
          title={
            <>
              Co mówią <em>pary młode</em>
            </>
          }
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.author} delay={(i % 3) * 80}>
              <figure className="flex h-full flex-col rounded-md border border-line-dark bg-surface-dark p-7">
                <blockquote className="flex-1 font-serif text-xl leading-snug text-ink-invert">
                  „{t.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t border-line-dark pt-5">
                  <span className="block text-[0.9375rem] text-ink-invert">
                    {t.author}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-invert">
                    {t.event}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
