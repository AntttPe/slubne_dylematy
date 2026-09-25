"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CZAS_SLAJDU, heroSlides } from "@/data/hero";

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [pozostaleZamontowane, setPozostaleZamontowane] = useState(false);

  useEffect(() => {
    // setTimeout, not requestAnimationFrame: rAF does not fire in a
    // background tab, so the slideshow would never start for anyone who
    // opens the page in a new tab and switches to it later.
    const id = setTimeout(() => setPozostaleZamontowane(true), 100);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!pozostaleZamontowane || heroSlides.length < 2) return;

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
            <div className="hero-pan relative h-full w-full">
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
