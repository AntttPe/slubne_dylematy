import Image from "next/image";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";

const stats = [
  { value: "5+", label: "lat doświadczenia" },
  { value: "200+", label: "zrealizowanych przyjęć" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/*
        Zdjęcie przez next/image, nie CSS background - dzięki temu jest
        priority, generuje AVIF/WebP i liczy się jako LCP.
      */}
      <Image
        src="/images/hero/hero-bg.JPG"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-canvas/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/20 to-canvas/50" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="type-eyebrow text-accent-strong">
              Dekoracje ślubne · {""}
              <span className="text-muted">Śląsk i okolice</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="type-display mt-7 text-ink">
              Tworzymy piękne chwile <em>z miłości</em> do detali
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="type-lead mt-7 max-w-xl text-muted">
              Dekoracje ślubne, weselne i okolicznościowe - od pierwszej
              rozmowy po ostatni kwiat postawiony na sali.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakt">Sprawdź wolny termin</Button>
              <Button href="/galeria" variant="secondary">
                Zobacz realizacje
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-16 flex gap-12 border-t border-ink/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-serif text-4xl text-ink">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
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
