"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Para Młoda",
    event: "Dekoracje ślubne & papeteria",
    text: "Najlepsza dekoratorka, jaką mogłam sobie wymarzyć! Dekoracje ślubne w pięknym, nowoczesnym stylu, a do tego cała papeteria. Bardzo otwarta na nasze propozycje, ale też z mnóstwem własnych pomysłów. Gorąco polecam!",
    initials: "PM",
    stars: 5,
  },
  {
    name: "Para Młoda",
    event: "Ślub & wesele",
    text: "Pani Magdo, jeszcze raz — razem z mężem chcieliśmy podziękować za przepiękne dekoracje naszego ślubu. Jesteśmy bardzo wdzięczni za dopilnowanie każdego szczegółu. Z pewnością nieraz jeszcze skorzystamy z Pani usług i będziemy polecać innym, bo naprawdę warto.",
    initials: "PM",
    stars: 5,
  },
  {
    name: "Para Młoda",
    event: "Wesele & dekoracja kościoła",
    text: "BARDZO DZIĘKUJEMY — było przepięknie! Wszyscy goście byli oczarowani wystrojem. Ścianka na zewnątrz spełniła swoje zadanie — cały Facebook zapłonął od zdjęć! Pomysł w dziesiątkę! Kościół również wyglądał przepięknie, a przyozdobiona tablica zrobiła ogromne wrażenie. Dziękujemy za wszystko!",
    initials: "PM",
    stars: 5,
  },
  {
    name: "Para Młoda",
    event: "Wesele zimowo-świąteczne",
    text: "Mieliśmy przyjemność współpracować z Panią Magdą przy naszym weselu. Współpraca na najwyższym poziomie! Przepiękne, wymarzone dekoracje w zimowo-świątecznym stylu — piękniej niż na inspiracjach! Mnóstwo własnych pomysłów i pomocnych rad. Nigdy nie usłyszeliśmy, że czegoś się nie da zrobić. Polecamy z całego serca!",
    initials: "PM",
    stars: 5,
  },
  {
    name: "Para Młoda",
    event: "Dekoracje weselne",
    text: "Najlepsze dekoracje, jakie mogliśmy sobie wymarzyć! Każdy detal był dopracowany, a goście byli zachwyceni. Nie zastanawiajcie się — tylko zapisujcie terminy. Polecamy z całego serca!",
    initials: "PM",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" className="text-[#C9A87C]">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section id="opinie" className="py-24 bg-[#2C1810] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A87C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A67C6D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="font-script text-[#C9A87C] text-2xl mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Co mówią Klienci
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-[#E8D9C4] mb-4">
            Opinie <em className="text-[#C9A87C] not-italic">szczęśliwych par</em>
          </h2>
          <p className="text-[#A89080] max-w-xl mx-auto leading-relaxed">
            Każda dekoracja tworzona jest z myślą o parach młodych i ich wyjątkowym dniu.
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#3D2318] rounded-3xl p-8 md:p-12 border border-[#C9A87C]/20">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote size={64} className="text-[#C9A87C]" />
            </div>

            {/* Stars */}
            <div className="mb-6">
              <StarRating count={testimonials[active].stars} />
            </div>

            {/* Text */}
            <blockquote className="font-serif text-xl md:text-2xl text-[#E8D9C4] leading-relaxed italic mb-8">
              &ldquo;{testimonials[active].text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C9A87C]/20 border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C] font-serif font-medium text-sm">
                {testimonials[active].initials}
              </div>
              <div>
                <p className="font-sans font-medium text-[#E8D9C4]">{testimonials[active].name}</p>
                <p className="text-sm text-[#A89080]">{testimonials[active].event}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Przejdź do opinii ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? "w-8 bg-[#C9A87C]" : "w-3 bg-[#C9A87C]/30"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                aria-label="Poprzednia opinia"
                className="w-10 h-10 rounded-full border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Następna opinia"
                className="w-10 h-10 rounded-full border border-[#C9A87C]/40 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#C9A87C]/15">
          {[
            { number: "5+", label: "lat na rynku" },
            { number: "200+", label: "zrealizowanych projektów" },
            { number: "100%", label: "zadowolonych klientów" },
            { number: "♥", label: "z sercem & pasją" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-serif text-3xl text-[#C9A87C] mb-1">{item.number}</div>
              <div className="text-xs tracking-wide uppercase text-[#A89080]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
