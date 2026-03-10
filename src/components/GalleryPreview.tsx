import Link from "next/link";

const photos = [
  {
    src: "/images/gallery/wedding_hall/sala_1p.jpg",
    alt: "Elegancka dekoracja sali weselnej",
    category: "Sala weselna",
  },
  {
    src: "/images/gallery/church/kosciol_1p.jpg",
    alt: "Dekoracja kościoła — ławy i kwiaty",
    category: "Kościół",
  },
  {
    src: "/images/gallery/outdoor_wedding/plener_5.jpg",
    alt: "Dekoracja plenerowa — romantyczny klimat",
    category: "Plener",
  },
  {
    src: "/images/gallery/wedding_hall/sala_3.jpg",
    alt: "Stół weselny z kwiatowymi dekoracjami",
    category: "Sala weselna",
  },
  {
    src: "/images/gallery/church/kosciol_3.jpg",
    alt: "Kościelna dekoracja ślubna z kwiatami",
    category: "Kościół",
  },
  {
    src: "/images/gallery/outdoor_wedding/plener_1p.jpg",
    alt: "Ślub plenerowy — dekoracje na świeżym powietrzu",
    category: "Plener",
  },
  {
    src: "/images/gallery/wedding_hall/sala_2p.jpg",
    alt: "Romantyczna dekoracja sali weselnej",
    category: "Sala weselna",
  },
  {
    src: "/images/gallery/church/church_couple.jpg",
    alt: "Para młoda przy ołtarzu — dekoracja kościoła",
    category: "Kościół",
  },
  {
    src: "/images/gallery/outdoor_wedding/plener-bukiet_2.jpg",
    alt: "Bukiet ślubny w plenerze",
    category: "Plener",
  },
];

export default function GalleryPreview() {
  return (
    <section id="realizacje" className="py-24 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="font-script text-[#C9A87C] text-2xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Portfolio
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[#2C1810] mb-4">
            Nasze <em className="text-[#A8845A] not-italic">realizacje</em>
          </h2>
          <p className="text-[#6B5344] max-w-2xl mx-auto leading-relaxed">
            Każda dekoracja to niepowtarzalna historia. Zobaczcie, jak tworzymy
            wyjątkowe chwile dla naszych Klientów.
          </p>
        </div>

        {/* Masonry gallery */}
        <div className="masonry-grid">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl cursor-pointer border border-[#E8D9C4]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] tracking-widest uppercase bg-white/80 backdrop-blur-sm text-[#6B5344] px-2.5 py-1 rounded-full font-medium">
                  {photo.category}
                </span>
              </div>
              {/* Hover text */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-sans leading-snug">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-[#6B5344] mb-6 font-serif text-lg italic">
            To tylko część naszych realizacji — zapraszamy do galerii!
          </p>
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#C9A87C] text-[#2C1810] font-medium rounded-full hover:bg-[#C9A87C] hover:text-white transition-colors duration-200 cursor-pointer"
          >
            Zobacz pełną galerię
          </Link>
        </div>
      </div>
    </section>
  );
}
