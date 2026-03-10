const steps = [
  {
    number: "01",
    title: "Pierwsze spotkanie",
    description:
      "Poznajemy się i rozmawiamy o Waszych marzeniach, stylu i wizji. Każda para jest wyjątkowa — słucham uważnie, by stworzyć coś naprawdę dla Was.",
  },
  {
    number: "02",
    title: "Projekt & koncepcja",
    description:
      "Tworzę spersonalizowaną propozycję dekoracji — dobór kwiatów, kolory, styl. Pokazuję inspiracje i razem dopracowujemy każdy detal.",
  },
  {
    number: "03",
    title: "Rezerwacja terminu",
    description:
      "Po akceptacji projektu podpisujemy umowę i rezerwujemy Wasz wyjątkowy dzień w kalendarzu. Spokojna głowa — jesteście w dobrych rękach.",
  },
  {
    number: "04",
    title: "Dzień Waszego ślubu",
    description:
      "Przyjeżdżam i realizuję dekoracje z pełnym zaangażowaniem. Wy cieszcie się chwilą — o resztę zadbam ja.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#F0E8DC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="font-script text-[#C9A87C] text-2xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Jak działam
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[#2C1810] mb-4">
            Prosta droga do{" "}
            <em className="text-[#A8845A] not-italic">wymarzonej dekoracji</em>
          </h2>
          <p className="text-[#6B5344] max-w-xl mx-auto leading-relaxed">
            Proces współpracy z Ślubymi Dylematami jest prosty i przyjemny —
            zadbam o wszystko, byś mógł skupić się na tym, co naprawdę ważne.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#C9A87C]/30 -translate-x-1/2 pointer-events-none" />
              )}

              {/* Number */}
              <div className="w-16 h-16 rounded-full bg-[#FFFDF9] border-2 border-[#C9A87C]/30 flex items-center justify-center shadow-sm">
                <span className="font-script text-2xl text-[#C9A87C]" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-xl text-[#2C1810] mb-2">{step.title}</h3>
                <p className="text-sm text-[#6B5344] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
