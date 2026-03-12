import Link from "next/link";

const services = [
  {
    title: "Dekoracje Ślubne",
    description:
      "Kompleksowe dekoracje ślubne — od kościoła po salę weselną. Tworzymy atmosferę pełną miłości i romantyzmu, dopasowaną do Waszych marzeń.",
    image: "/images/gallery/wedding_hall/sala_3.jpg",
    tags: ["Kościół", "Sala", "Plener"],
    accent: "#C9A87C",
  },
  {
    title: "Przyjęcia & Eventy",
    description:
      "Urodziny, rocznice, przyjęcia okolicznościowe — każde wydarzenie zasługuje na piękną oprawę. Zadbamy o każdy detal, abyście mogli cieszyć się chwilą.",
    image: "/images/gallery/outdoor_wedding/plener_6.jpg",
    tags: ["Urodziny", "Rocznice", "Jubileusze"],
    accent: "#A67C6D",
  },
  {
    title: "Komunia Święta",
    description:
      "Elegancka i subtelna oprawa komunii — stylowe zaproszenia, kwiaty, dekoracja stołu i wianki. Kameralnie, pięknie i z klasą.",
    image: "/images/gallery/wedding_hall/sala_6.jpg",
    tags: ["Zaproszenia", "Kwiaty", "Wianki"],
    accent: "#C9A87C",
  },
  {
    title: "Chrzciny",
    description:
      "Delikatne i romantyczne dekoracje na chrzciny. Tworzymy wyjątkową atmosferę na powitanie nowego życia, pełną czułości i radości.",
    image: "/images/gallery/outdoor_wedding/plener_7.jpg",
    tags: ["Delikatne", "Rodzinne", "Wyjątkowe"],
    accent: "#A67C6D",
  },
  {
    title: "Papeteria Ślubna",
    description:
      "Unikalne zaproszenia, winietki, menu i inne elementy papeterii ślubnej tworzone ręcznie z dbałością o każdy szczegół.",
    image: "/images/gallery/wedding_hall/sala.jpg",
    tags: ["Zaproszenia", "Winietki", "Menu"],
    accent: "#C9A87C",
  },
  {
    title: "Dekoracje Kościoła",
    description:
      "Tworzę aranżacje kościołów pełne emocji i sacrum. Kwiaty, łuki, dekoracja ław — każdy element jako tło dla chwili, która zostaje na zawsze.",
    image: "/images/gallery/church/kosciol_6.jpg",
    tags: ["Łuk", "Ławy", "Ołtarz"],
    accent: "#A67C6D",
  },
];

export default function ServicesSection() {
  return (
    <section id="uslugi" className="py-24 bg-[#F0E8DC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="font-script text-[#C9A87C] text-2xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Czym się zajmuję
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[#2C1810] mb-4">
            Usługi{" "}
            <em className="text-[#A8845A] not-italic">Ślubnych Dylematów</em>
          </h2>
          <div className="floral-divider max-w-xs mx-auto my-6">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#C9A87C] shrink-0">
              <path
                d="M12 2C10 6 6 8 2 8c4 0 8 2 10 6 2-4 6-6 10-6-4 0-8-2-10-6z"
                fill="currentColor"
                opacity="0.7"
              />
            </svg>
          </div>
          <p className="text-[#6B5344] max-w-2xl mx-auto leading-relaxed">
            Ukwiecimy Wasze przyjęcie i zadbamy o każdy detal — od pierwszego spotkania
            po ostatni kwiat.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-[#FFFDF9] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-[#E8D9C4]"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/30 to-transparent" />
                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider uppercase bg-white/80 backdrop-blur-sm text-[#6B5344] px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="w-8 h-0.5 mb-3" style={{ backgroundColor: service.accent }} />
                <h3 className="font-serif text-xl text-[#2C1810] mb-2">{service.title}</h3>
                <p className="text-sm text-[#6B5344] leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A87C] text-white font-medium rounded-full hover:bg-[#A8845A] transition-colors duration-200 shadow-md cursor-pointer"
          >
            Zapytaj o termin
          </Link>
        </div>
      </div>
    </section>
  );
}
