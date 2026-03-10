import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 bg-[#FAF8F4] relative overflow-hidden">
      {/* Decorative background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=60')`,
        }}
      />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-[#C9A87C]/10 border border-[#C9A87C]/30 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" className="text-[#C9A87C]">
            <path
              d="M12 2C10 6 6 8 2 8c4 0 8 2 10 6 2-4 6-6 10-6-4 0-8-2-10-6z M12 12C10 16 6 18 2 18c4 0 8 2 10 6 2-4 6-6 10-6-4 0-8-2-10-6z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>

        <p
          className="font-script text-[#C9A87C] text-3xl mb-4"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Zarezerwuj swój termin
        </p>

        <h2 className="font-serif text-4xl lg:text-5xl text-[#2C1810] mb-6 leading-tight">
          Stwórzmy razem{" "}
          <em className="text-[#A8845A] not-italic">coś wyjątkowego</em>
        </h2>

        <p className="text-[#6B5344] text-lg leading-relaxed mb-4">
          Napisz, by zarezerwować termin. Terminy wypełniają się szybko —
          szczególnie w sezonie wiosenno-letnim!
        </p>
        <p className="font-serif text-[#A8845A] italic text-lg mb-10">
          &ldquo;Każda realizacja robiona jest z sercem, z myślą o parach młodych i ich wyjątkowym dniu.&rdquo;
          <br />
          <span className="text-sm text-[#6B5344] not-italic">— Magda</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/kontakt"
            className="px-8 py-4 bg-[#C9A87C] text-white font-medium tracking-wide rounded-full hover:bg-[#A8845A] transition-colors duration-200 shadow-md cursor-pointer"
          >
            Wyślij zapytanie
          </Link>
          <a
            href="https://instagram.com/slubne.dylematy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-[#C9A87C] text-[#2C1810] font-medium tracking-wide rounded-full hover:bg-[#C9A87C]/10 transition-colors duration-200 cursor-pointer"
          >
            Obserwuj na Instagramie
          </a>
        </div>
      </div>
    </section>
  );
}
