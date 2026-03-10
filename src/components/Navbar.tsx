"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Strona Główna" },
  { href: "/#o-mnie", label: "O Mnie" },
  { href: "/#uslugi", label: "Usługi" },
  { href: "/#realizacje", label: "Realizacje" },
  { href: "/#opinie", label: "Opinie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F4]/95 backdrop-blur-md shadow-sm border-b border-[#E8D9C4]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/images/logo.png"
            alt="Ślubne Dylematy logo"
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span
              className="font-script text-3xl text-[#A8845A] leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Ślubne Dylematy
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#6B5344] uppercase font-sans font-light">
              Dekoracje z sercem
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-sans font-medium tracking-wide transition-colors duration-200 cursor-pointer relative group ${
                pathname === link.href
                  ? "text-[#A8845A]"
                  : "text-[#6B5344] hover:text-[#A8845A]"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#C9A87C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="ml-2 px-5 py-2 bg-[#C9A87C] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#A8845A] transition-colors duration-200 cursor-pointer shadow-sm"
          >
            Zarezerwuj termin
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-[#6B5344] hover:text-[#A8845A] transition-colors cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#FAF8F4]/98 backdrop-blur-md border-b border-[#E8D9C4]`}
      >
        <nav className="px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#6B5344] hover:text-[#A8845A] transition-colors py-2 border-b border-[#E8D9C4] last:border-0 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 bg-[#C9A87C] text-white text-sm font-medium text-center rounded-full hover:bg-[#A8845A] transition-colors cursor-pointer"
          >
            Zarezerwuj termin
          </Link>
        </nav>
      </div>
    </header>
  );
}
