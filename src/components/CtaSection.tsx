import { site } from "@/data/site";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

export default function CtaSection() {
  return (
    <section className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="type-eyebrow text-accent-strong">Rezerwacja</p>
          <h2 className="type-h2 mt-5 text-ink">
            Stwórzmy razem <em>coś wyjątkowego</em>
          </h2>
          <p className="type-lead mt-6 text-muted">
            Terminy w sezonie wiosenno-letnim schodzą najszybciej. Napiszcie
            nawet wtedy, gdy data nie jest jeszcze pewna - sprawdzę dostępność
            i podpowiem, co da się zrobić.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/kontakt">Wyślij zapytanie</Button>
            <Button href={site.social.instagram} variant="secondary">
              Instagram
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
