import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { partners } from "@/data/partners";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function PartnersSection() {
  if (partners.length === 0) return null;

  return (
    <section id="polecani" className="scroll-mt-24 bg-canvas py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Zaufany zespół"
          title={
            <>
              Sprawdzeni ludzie, z którymi <em>pracuję najchętniej</em>
            </>
          }
          lead={
            <>
              <p>
                Za każdą piękną realizacją stoją ludzie. Przez lata miałam
                przyjemność poznać wiele osób, których pracę naprawdę cenię za
                jakość, zaangażowanie i serce, jakie wkładają w to, co robią.
              </p>
              <p>
                Zebrałam tutaj kontakty do osób i marek, z którymi dobrze mi się
                współpracuje i do których mam zaufanie.
              </p>
              <p>Być może znajdziecie wśród nich kogoś, kogo właśnie szukacie.</p>
            </>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => {
            const Wrapper = partner.url ? "a" : "div";

            return (
              <Reveal as="li" key={`${partner.role}-${i}`} delay={(i % 3) * 80}>
                <Wrapper
                  {...(partner.url
                    ? {
                        href: partner.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className={`group flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-colors duration-200 ${
                    partner.url ? "hover:border-ink/30" : ""
                  }`}
                >
                  {/* White panel + object-contain: some logos ship with a
                      white background instead of transparency, and ratios
                      run from 1:1 to 2.8:1. Cropping would cut off names. */}
                                    <div className="relative flex h-32 items-center justify-center border-b border-line bg-white px-8">
                    {partner.image ? (
                      <Image
                        src={partner.image}
                        alt={`Logo ${partner.name}`}
                        width={partner.width ?? 300}
                        height={partner.height ?? 160}
                        sizes="(min-width: 1024px) 20rem, 90vw"
                        className="max-h-20 w-auto object-contain"
                      />
                    ) : (
                      <span className="font-serif text-3xl text-accent-strong">
                        {initials(partner.name)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="type-eyebrow text-accent-strong">
                      {partner.role}
                    </p>

                    <h3 className="mt-3 font-serif text-xl text-ink">
                      {partner.name}
                    </h3>

                    <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                      {partner.blurb}
                    </p>

                    {partner.url && (
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink">
                        {new URL(partner.url).hostname.replace(/^www\./, "")}
                        <ArrowUpRight
                          size={15}
                          className="text-accent-strong transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
