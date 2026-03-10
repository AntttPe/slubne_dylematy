import { Leaf, Heart, Star } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Z sercem",
    desc: "Każda realizacja jest dla mnie wyjątkowa. Podchodzę do niej z pełnym zaangażowaniem i miłością do detali.",
  },
  {
    icon: Leaf,
    title: "Eko",
    desc: "Wierzę, że ekologia i estetyka mogą iść w parze. Używam naturalnych materiałów i dbam o środowisko.",
  },
  {
    icon: Star,
    title: "Unikalność",
    desc: "Tworzę papeterię ślubną i dekoracje szyte na miarę — każde zamówienie to niepowtarzalna historia.",
  },
];

export default function AboutSection() {
  return (
    <section id="o-mnie" className="py-24 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            {/* Main image — portrait, capped to match text column */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl max-h-[600px]">
              <img
                src="/images/about/magda.JPG"
                alt="Magda - właścicielka Ślubnych Dylematów"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {/* Warm tint */}
              <div className="absolute inset-0 bg-[#C9A87C]/10" />
              {/* Floating card — inside image, bottom-right */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-[#E8D9C4] max-w-[180px]">
                <p
                  className="font-script text-[#C9A87C] text-3xl leading-none mb-1"
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                >
                  5 lat
                </p>
                <p className="text-xs text-[#6B5344] font-sans leading-snug">
                  tworzenia dekoracji z miłości do piękna
                </p>
              </div>
            </div>

            {/* Decorative corner element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#C9A87C]/40 rounded-tl-2xl pointer-events-none" />
          </div>

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <div>
              <p
                className="font-script text-[#C9A87C] text-2xl mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Cześć!
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-[#2C1810] leading-tight mb-4">
                Tu Magda — dekoratorka
                <br />
                <em className="text-[#A8845A] not-italic">z miłości do piękna</em>
              </h2>
            </div>

            <p className="text-[#6B5344] leading-relaxed">
              Od 5 lat tworzę dekoracje z miłości do piękna i rodzinnych chwil.
              Zaczynałam od dekorowania rodzinnych przyjęć — teraz, w ramach{" "}
              <strong className="text-[#A8845A] font-medium">Ślubnych Dylematów</strong>,
              tworzę aranżacje ślubów i przyjęć dla Was, dbając o każdy detal.
            </p>

            <p className="text-[#6B5344] leading-relaxed">
              Uwielbiam romantyczne, delikatne kompozycje — a to wszystko w duchu slow
              i z troską o naturę. Ekologia i estetyka mogą iść w parze — i to właśnie
              staram się Wam pokazać w każdej realizacji.
            </p>

            <p className="font-serif text-lg text-[#2C1810] italic">
              &ldquo;Jeśli szukasz dekoracji z sercem — jesteś w dobrym miejscu.&rdquo;
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2 p-4 bg-[#F0E8DC] rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-[#C9A87C]/20 flex items-center justify-center">
                    <Icon size={16} className="text-[#A8845A]" />
                  </div>
                  <h3 className="font-serif text-base text-[#2C1810] font-medium">{title}</h3>
                  <p className="text-xs text-[#6B5344] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
