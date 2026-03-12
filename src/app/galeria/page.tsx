import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria Realizacji | Ślubne Dylematy",
  description:
    "Zobacz nasze realizacje — dekoracje ślubne, weselne, komunijne i przyjęcia. Każde zdjęcie to niepowtarzalna historia stworzona z miłości do piękna.",
};

const categories = ["Wszystkie", "Sala weselna", "Kościół", "Plener"];

const allPhotos = [
  // Sala weselna
  { src: "/images/gallery/wedding_hall/sala_1p.jpg",  alt: "Dekoracja sali weselnej",                   category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_2p.jpg",  alt: "Romantyczna aranżacja sali weselnej",        category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_3.jpg",   alt: "Elegancki stół weselny z kwiatami",          category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_4p.jpg",  alt: "Dekoracja stołów weselnych",                 category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_5p.jpg",  alt: "Centerpiece weselny z kwiatów",              category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_6.jpg",   alt: "Dekoracja sali — widok ogólny",              category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_7p.jpg",  alt: "Subtelna dekoracja stołu weselnego",         category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala_8p.jpg",  alt: "Kwiaty na stole weselnym",                   category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala.jpg",     alt: "Sala weselna — pełna aranżacja",             category: "Sala weselna" },
  { src: "/images/gallery/wedding_hall/sala3.jpg",    alt: "Dekoracje weselne — klasyk z gipsówką",      category: "Sala weselna" },
  // Kościół
  { src: "/images/gallery/church/kosciol_1p.jpg",     alt: "Dekoracja ławek kościelnych",                category: "Kościół" },
  { src: "/images/gallery/church/kosciol_2p.jpg",     alt: "Kwiatowa dekoracja kościoła",                category: "Kościół" },
  { src: "/images/gallery/church/kosciol_3.jpg",      alt: "Dekoracja kościoła — ołtarz i kwiaty",       category: "Kościół" },
  { src: "/images/gallery/church/kosciol_6.jpg",      alt: "Romantyczna oprawa kościelna",               category: "Kościół" },
  { src: "/images/gallery/church/kosciol_7.jpg",      alt: "Kwiaty przy ołtarzu",                        category: "Kościół" },
  { src: "/images/gallery/church/kosciol_8.jpg",      alt: "Dekoracja nawy kościelnej",                  category: "Kościół" },
  { src: "/images/gallery/church/kosciol_9.jpg",      alt: "Ślubna dekoracja kościoła",                  category: "Kościół" },
  { src: "/images/gallery/church/church_couple.jpg",  alt: "Para młoda w udekorowanym kościele",         category: "Kościół" },
  { src: "/images/gallery/church/church_outsite.jpg", alt: "Dekoracja przy wejściu do kościoła",         category: "Kościół" },
  // Plener
  { src: "/images/gallery/outdoor_wedding/plener_1p.jpg",    alt: "Dekoracja ślubu plenerowego",         category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_3p.jpg",    alt: "Romantyczny plener ślubny",           category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_4p.jpg",    alt: "Łuk kwiatowy w plenerze",             category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_5.jpg",     alt: "Ślub w plenerze — aranżacja",         category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_6.jpg",     alt: "Dekoracje plenerowe — kwiaty",        category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_7.jpg",     alt: "Naturalne dekoracje ślubne",          category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_8.jpg",     alt: "Plenerowa ceremonia ślubna",          category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener_9.jpg",     alt: "Romantyczny ślub na świeżym powietrzu", category: "Plener" },
  { src: "/images/gallery/outdoor_wedding/plener-bukiet_2.jpg", alt: "Bukiet ślubny w plenerze",         category: "Plener" },
];

export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Page hero */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        {/* Background decor */}
        <div className="absolute inset-0 bg-[#F0E8DC] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-16 fill-[#FAF8F4]">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <p
            className="font-script text-[#C9A87C] text-2xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Nasze prace
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-[#2C1810] mb-4">
            Galeria <em className="text-[#A8845A] not-italic">realizacji</em>
          </h1>
          <p className="text-[#6B5344] text-lg leading-relaxed">
            Każde zdjęcie opowiada historię wyjątkowego dnia. Zapraszamy do
            odkrywania naszych dekoracji pełnych emocji i piękna.
          </p>
        </div>
      </div>

      {/* Category filter — static for now (JS filtering can be added) */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${
                i === 0
                  ? "bg-[#C9A87C] text-white"
                  : "bg-[#F0E8DC] text-[#6B5344] hover:bg-[#C9A87C]/20 border border-[#E8D9C4]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry gallery */}
        <div className="masonry-grid">
          {allPhotos.map((photo, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl cursor-pointer border border-[#E8D9C4] bg-[#F0E8DC]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Category */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] tracking-widest uppercase bg-white/80 backdrop-blur-sm text-[#6B5344] px-2.5 py-1 rounded-full font-medium">
                  {photo.category}
                </span>
              </div>
              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-sans leading-snug">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-[#2C1810] mb-2">
            Zainspirowani? Stwórzmy coś wyjątkowego razem!
          </p>
          <p className="text-[#6B5344] mb-8">
            Napiszcie do mnie i porozmawiajmy o Waszym wyjątkowym dniu.
          </p>
          <a
            href="/kontakt"
            className="inline-flex px-8 py-4 bg-[#C9A87C] text-white font-medium rounded-full hover:bg-[#A8845A] transition-colors duration-200 shadow-md cursor-pointer"
          >
            Zapytaj o termin
          </a>
        </div>
      </div>
    </div>
  );
}
