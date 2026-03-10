"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero/hero-bg.JPG')`,
        }}
      />
      {/* Overlay — rozjaśnia ciemne zdjęcie dla czytelności tekstu */}
      <div className="absolute inset-0 bg-[#FAF8F4]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F4]/30 via-transparent to-[#FAF8F4]/70" />

      {/* Decorative botanical SVG top */}
      <div className="absolute top-0 left-0 right-0 h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,80 C180,20 360,160 540,80 C720,0 900,160 1080,80 C1260,0 1350,120 1440,80 L1440,0 L0,0 Z"
            fill="#C9A87C"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        {/* Script tagline */}
        <p
          className="font-script text-[#C9A87C] text-2xl sm:text-3xl mb-4 animate-fade-in-up"
          style={{ fontFamily: "'Great Vibes', cursive", animationDelay: "0.1s" }}
        >
          Witaj, tu Magda
        </p>

        {/* Main heading */}
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#2C1810] leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Tworzymy piękne{" "}
          <em className="text-[#A8845A] not-italic">chwile</em>
          <br />z miłości do detali
        </h1>

        {/* Description */}
        <p className="font-sans text-[#6B5344] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          Dekoracje ślubne, weselne, komunijne i chrzciny — każda realizacja
          tworzona z sercem i troską o każdy detal.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <Link
            href="/kontakt"
            className="px-8 py-4 bg-[#C9A87C] text-white font-medium tracking-wide rounded-full hover:bg-[#A8845A] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Zarezerwuj termin
          </Link>
          <Link
            href="/#realizacje"
            className="px-8 py-4 border-2 border-[#C9A87C] text-[#2C1810] font-medium tracking-wide rounded-full hover:bg-[#C9A87C]/10 transition-all duration-200 cursor-pointer"
          >
            Zobacz realizacje
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-10 animate-fade-in-up" style={{ animationDelay: "0.65s" }}>
          {[
            { value: "5+", label: "lat doświadczenia" },
            { value: "200+", label: "szczęśliwych par" },
            { value: "100%", label: "z sercem" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl text-[#A8845A] font-medium">{stat.value}</div>
              <div className="text-xs tracking-widest uppercase text-[#6B5344] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#o-mnie"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6B5344] hover:text-[#A8845A] transition-colors cursor-pointer animate-float"
        aria-label="Przewiń w dół"
      >
        <span className="text-xs tracking-widest uppercase">Odkryj</span>
        <ChevronDown size={20} />
      </a>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20 fill-[#FAF8F4]">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
