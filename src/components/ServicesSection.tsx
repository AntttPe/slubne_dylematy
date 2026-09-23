import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { categorySlug } from "@/data/gallery";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";

/**
 * Alternating rows rather than a card grid: with three services a grid left
 * gaping space and the tiles were too small for the photo to show anything.
 *
 * The link goes to the gallery FILTERED by that category, not to the gallery
 * in general - seeing more of the same kind is the one thing a visitor wants
 * at that point.
 */
export default function ServicesSection() {
  return (
    <section id="oferta" className="scroll-mt-24 bg-surface py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Oferta"
          title={
            <>
              Czym mogę się <em>dla Was zająć</em>
            </>
          }
          lead="Trzy obszary, w których pracuję najczęściej. Biorę całość albo tylko wybrany element - jak Wam wygodniej."
        />

        <div className="mt-16 flex flex-col gap-16 sm:gap-20">
          {services.map((service, i) => {
            const odwrocone = i % 2 === 1;
            const href = service.galleryCategory
              ? `/galeria#${categorySlug(service.galleryCategory)}`
              : "/galeria";

            return (
              <Reveal key={service.title}>
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-md ${
                      odwrocone ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={`${service.title} - realizacja Ślubnych Dylematów`}
                      fill
                      sizes="(min-width: 1024px) 34rem, 92vw"
                      className="object-cover"
                    />
                  </div>

                  <div className={odwrocone ? "lg:order-1" : ""}>
                    <h3 className="type-h2 text-ink">{service.title}</h3>

                    <p className="mt-4 font-serif text-xl leading-snug text-ink">
                      {service.lead}
                    </p>

                    <p className="mt-4 leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-sm border border-line bg-canvas px-3 py-1.5 text-sm text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={href}
                      className="group mt-8 inline-flex items-center gap-2 border-b border-accent-strong/40 pb-1 text-[0.9375rem] text-ink transition-colors hover:border-accent-strong"
                    >
                      Zobacz realizacje
                      <ArrowRight
                        size={16}
                        className="text-accent-strong transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
