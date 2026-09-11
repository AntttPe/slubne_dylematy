"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CZAS_SLAJDU, heroSlides } from "@/data/hero";

/**
 * Przewijające się tło hero.
 *
 * Trzy rzeczy, które decydują o tym, czy to wygląda elegancko,
 * a nie jak pokaz slajdów z lat dwutysięcznych:
 *
 *  1. Długie przenikanie (1,8 s) przy krótkim postoju - obraz ma
 *     płynąć, a nie przeskakiwać.
 *  2. Powolny pan tylko na aktywnym slajdzie, restartowany przy
 *     każdej zmianie. Ruch i przenikanie nakładają się na siebie.
 *  3. Tekst stoi nieruchomo w osobnej warstwie.
 */
export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [pozostaleZamontowane, setPozostaleZamontowane] = useState(false);

  useEffect(() => {
    // Kolejne zdjęcia montujemy dopiero po pierwszym renderze, żeby nie
    // konkurowały o pasmo z pierwszym kadrem - on jest obrazem LCP.
    //
    // setTimeout, nie requestAnimationFrame: rAF nie odpala się w karcie
    // otwartej w tle, więc pokaz slajdów nigdy by nie wystartował
    // u kogoś, kto otworzył stronę w nowej karcie i przełączył się później.
    const id = setTimeout(() => setPozostaleZamontowane(true), 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!pozostaleZamontowane || heroSlides.length < 2) return;

    // Przy wyłączonych animacjach zostaje jeden nieruchomy kadr.
    const bezRuchu = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (bezRuchu.matches) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      CZAS_SLAJDU,
    );
    return () => clearInterval(id);
  }, [pozostaleZamontowane]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {heroSlides.map((slide, i) => {
        if (i > 0 && !pozostaleZamontowane) return null;
        const aktywny = i === index;

        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${
              aktywny ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="hero-pan h-full w-full">
              <Image
                src={slide.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
