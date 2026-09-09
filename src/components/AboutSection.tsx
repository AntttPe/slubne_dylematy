import Image from "next/image";
import Reveal from "./ui/Reveal";

const values = [
  {
    title: "Z sercem",
    desc: "Biorę jeden ślub dziennie. Zawsze jestem na miejscu osobiście i zostaję do końca montażu.",
  },
  {
    title: "Naturalnie",
    desc: "Sezonowe kwiaty, naturalne materiały, konstrukcje wielokrotnego użytku. Estetyka i ekologia idą w parze.",
  },
  {
    title: "Na miarę",
    desc: "Żadnych gotowych pakietów. Każdą dekorację projektuję od zera pod konkretne wnętrze i konkretną parę.",
  },
];

export default function AboutSection() {
  return (
    <section id="o-mnie" className="scroll-mt-24 bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src="/images/about/magda.JPG"
                alt="Magda, właścicielka Ślubnych Dylematów"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="type-eyebrow text-accent-strong">O mnie</p>
              <h2 className="type-h2 mt-5 text-ink">
                Tu Magda - dekoratorka <em>z miłości do piękna</em>
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-7 flex flex-col gap-5 text-muted">
                <p>
                  Od pięciu lat tworzę dekoracje z miłości do piękna i
                  rodzinnych chwil. Zaczynałam od dekorowania przyjęć w
                  rodzinie - dziś, w ramach{" "}
                  <span className="text-ink">Ślubnych Dylematów</span>,
                  projektuję oprawę ślubów i przyjęć dla Was.
                </p>
                <p>
                  Najbliżej mi do kompozycji romantycznych i delikatnych,
                  robionych w duchu slow i z troską o naturę. Nie lubię
                  dekoracji, które krzyczą - wolę takie, które sprawiają, że
                  wszystko wygląda po prostu właściwie.
                </p>
                <p className="font-serif text-2xl italic leading-snug text-ink">
                  „Jeśli szukacie dekoracji z sercem - jesteście w dobrym
                  miejscu.”
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-10 flex flex-col divide-y divide-line border-y border-line">
                {values.map((value) => (
                  <li key={value.title} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <h3 className="type-eyebrow pt-1 text-accent-strong">
                      {value.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-relaxed text-muted">
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
