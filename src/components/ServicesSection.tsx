import Image from "next/image";
import { services } from "@/data/services";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function ServicesSection() {
  return (
    <section id="uslugi" className="scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Czym się zajmuję"
          title={
            <>
              Kompleksowa oprawa <em>Waszego dnia</em>
            </>
          }
          lead="Od pierwszej rozmowy po ostatni kwiat postawiony na sali - zajmuję się całością albo tylko wybranym elementem."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={(i % 3) * 80}>
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-canvas">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="type-h3 text-ink">{service.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <p className="mt-5 text-sm text-faint">
                    {service.tags.join(" · ")}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 text-center">
          <Button href="/kontakt">Zapytaj o wycenę</Button>
        </Reveal>
      </div>
    </section>
  );
}
