import { steps } from "@/data/process";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function ProcessSection() {
  return (
    <section id="wspolpraca" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Jak to działa"
          title={
            <>
              Jak możesz zacząć <em>z nami współpracę</em>?
            </>
          }
          lead="To prostsze, niż myślicie. Cały proces zamyka się w czterech krokach."
        />

                <ol className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={(i % 2) * 80}>
              <div className="flex gap-5 border-t border-line pt-6 sm:gap-7">
                <span className="font-serif text-3xl leading-none text-accent-strong">
                  {step.number}
                </span>

                <div className="min-w-0">
                  <h3 className="type-eyebrow text-faint">{step.title}</h3>
                  <p className="mt-3 font-serif text-xl leading-snug text-ink">
                    {step.lead}
                  </p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-16 text-center">
          <Button href="/kontakt">Umówmy spotkanie</Button>
        </Reveal>
      </div>
    </section>
  );
}
