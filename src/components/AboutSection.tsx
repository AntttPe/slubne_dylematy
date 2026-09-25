import Image from "next/image";
import Reveal from "./ui/Reveal";

const values = [
  {
    title: "Z sercem",
    desc: "Jeden ślub dziennie. Jestem na miejscu osobiście i zostaję do końca montażu.",
  },
  {
    title: "Naturalnie",
    desc: "Sezonowe kwiaty, naturalne materiały, konstrukcje wielokrotnego użytku.",
  },
  {
    title: "Na miarę",
    desc: "Żadnych gotowych pakietów. Każdą dekorację projektuję pod konkretne wnętrze.",
  },
];

export default function AboutSection() {
  return (
    <section id="o-mnie" className="scroll-mt-24 bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src="/images/about/magda.JPG"
                alt="Magda, właścicielka Ślubnych Dylematów"
                fill
                sizes="(min-width: 1024px) 26rem, 92vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="type-eyebrow text-accent-strong">O mnie</p>
              <h2 className="type-h2 mt-4 text-ink">
                Tu Magda - dekoratorka <em>z miłości do piękna</em>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-5 leading-relaxed text-muted">
                Od pięciu lat tworzę dekoracje z miłości do piękna i rodzinnych
                chwil. Zaczynałam od przyjęć w rodzinie - dziś, w ramach{" "}
                <span className="text-ink">Ślubnych Dylematów</span>, projektuję
                oprawę ślubów i przyjęć dla Was.
              </p>

              <p className="mt-4 leading-relaxed text-muted">
                Najbliżej mi do kompozycji romantycznych i delikatnych. Nie
                lubię dekoracji, które krzyczą - wolę takie, które sprawiają, że
                wszystko wygląda po prostu właściwie.
              </p>

              <p className="mt-6 font-serif text-xl italic leading-snug text-ink">
                „Jeśli szukacie dekoracji z sercem - jesteście w dobrym
                miejscu.”
              </p>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-8 grid gap-6 border-t border-line pt-7 sm:grid-cols-3">
                {values.map((value) => (
                  <li key={value.title}>
                    <h3 className="type-eyebrow text-accent-strong">
                      {value.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {value.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
