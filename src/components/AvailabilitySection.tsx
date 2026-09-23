import { getAvailability } from "@/lib/availability";
import AvailabilityCalendar from "./AvailabilityCalendar";
import SectionHeader from "./ui/SectionHeader";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

export default async function AvailabilitySection() {
  const { availability, ok } = await getAvailability();

  return (
    <section id="terminy" className="scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Kalendarz"
          title={
            <>
              Sprawdźcie, czy Wasz <em>termin</em> jest wolny
            </>
          }
          lead="Kalendarz aktualizuję na bieżąco. Terminy w sezonie wiosenno-letnim schodzą najszybciej - warto pytać z wyprzedzeniem."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Reveal>
            <AvailabilityCalendar availability={availability} ok={ok} />
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-28">
            <div className="rounded-md border border-line bg-canvas p-7">
              <h3 className="type-h3 text-ink">Widzicie wolny dzień?</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                Wolny termin w kalendarzu to jeszcze nie rezerwacja. Napiszcie,
                a potwierdzę dostępność i przygotuję wstępną wycenę.
              </p>

              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                <span className="text-ink">Rezerwacja wstępna</span> oznacza, że
                ktoś już pyta o ten dzień - ale nie ma jeszcze umowy.
              </p>

              <Button href="/kontakt" className="mt-7 w-full">
                Zapytaj o termin
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
