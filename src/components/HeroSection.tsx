import HeroSlideshow from "./HeroSlideshow";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

const stats = [
  { value: "5+", label: "lat doświadczenia" },
  { value: "200+", label: "zrealizowanych przyjęć" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-scrim">
      <HeroSlideshow />

      <div className="absolute inset-0 bg-gradient-to-t from-scrim/88 via-scrim/52 to-transparent" />
      {/*
        Osobne przyciemnienie u góry - pod paskiem nawigacji sufit jest
        jasny i białe linki na nim znikały. Sięga tylko 220 px, więc
        nie rusza środka kadru.
      */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-scrim/75 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <div className="max-w-2xl">
          <Reveal>
            <p className="type-eyebrow text-accent">
              Dekoracje ślubne · Śląsk i cała Polska
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="type-display mt-5 text-white">
              Tworzymy piękne chwile <em className="text-accent">z miłości</em>{" "}
              do detali
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="type-lead mt-5 max-w-lg text-white/85">
              Dekoracje ślubne, weselne i okolicznościowe - od pierwszej
              rozmowy po ostatni kwiat postawiony na sali.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakt">Sprawdź wolny termin</Button>
              <Button href="/galeria" variant="onDark">
                Zobacz realizacje
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-10 flex gap-12 border-t border-white/20 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-3xl text-white">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-white/65">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
