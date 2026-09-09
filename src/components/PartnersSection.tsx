import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { partners } from "@/data/partners";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";

/** Inicjały jako zapas, gdy nie ma jeszcze zdjęcia. */
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
    <section id="polecani" className="scroll-mt-24 bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Zaufany zespół"
          title={
            <>
              Sprawdzeni ludzie, z którymi <em>pracuję najchętniej</em>
            </>
          }
          lead="Przez lata zebrała się grupa osób, na których po prostu wiem, że mogę polegać. Jeśli czegoś Wam jeszcze brakuje - chętnie połączę."
        />

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => {
            const Wrapper = partner.url ? "a" : "div";

            return (
              <Reveal as="li" key={`${partner.role}-${i}`} delay={i * 60}>
                <Wrapper
                  {...(partner.url
                    ? {
                        href: partner.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className={`group flex h-full gap-5 ${
                    partner.url ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-surface">
                    {partner.image ? (
                      <Image
                        src={partner.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center font-serif text-lg text-accent-strong">
                        {initials(partner.name)}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="type-eyebrow text-accent-strong">
                      {partner.role}
                    </p>
                    <h3 className="mt-2 flex items-center gap-1 font-serif text-xl text-ink">
                      {partner.name}
                      {partner.url && (
                        <ArrowUpRight
                          size={16}
                          className="text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      )}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      {partner.blurb}
                    </p>
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
