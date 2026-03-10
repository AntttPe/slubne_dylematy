import Link from "next/link";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-[#E8D9C4]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span
              className="font-script text-4xl text-[#C9A87C] leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Ślubne Dylematy
            </span>
            <p className="text-sm leading-relaxed text-[#A89080] font-light">
              Tworzymy dekoracje z miłości do piękna i rodzinnych chwil. Każda realizacja
              robiona jest z sercem i dbałością o każdy detal.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://instagram.com/slubne.dylematy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Ślubnych Dylematów"
                className="w-10 h-10 rounded-full border border-[#C9A87C]/30 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook Ślubnych Dylematów"
                className="w-10 h-10 rounded-full border border-[#C9A87C]/30 flex items-center justify-center text-[#C9A87C] hover:bg-[#C9A87C] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg text-[#E8D9C4] tracking-wide">
              Szybkie linki
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Strona Główna" },
                { href: "/#o-mnie", label: "O Mnie" },
                { href: "/#uslugi", label: "Usługi" },
                { href: "/#realizacje", label: "Realizacje" },
                { href: "/#opinie", label: "Opinie" },
                { href: "/kontakt", label: "Kontakt" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#A89080] hover:text-[#C9A87C] transition-colors duration-200 cursor-pointer w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg text-[#E8D9C4] tracking-wide">
              Kontakt
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:kontakt@slubnedylematy.pl"
                className="flex items-center gap-3 text-sm text-[#A89080] hover:text-[#C9A87C] transition-colors duration-200 cursor-pointer"
              >
                <Mail size={16} className="text-[#C9A87C] shrink-0" />
                kontakt@slubnedylematy.pl
              </a>
              <a
                href="tel:+48123456789"
                className="flex items-center gap-3 text-sm text-[#A89080] hover:text-[#C9A87C] transition-colors duration-200 cursor-pointer"
              >
                <Phone size={16} className="text-[#C9A87C] shrink-0" />
                +48 123 456 789
              </a>
            </div>
            <Link
              href="/kontakt"
              className="mt-4 px-6 py-3 border border-[#C9A87C] text-[#C9A87C] text-sm font-medium text-center rounded-full hover:bg-[#C9A87C] hover:text-white transition-colors duration-200 cursor-pointer w-fit"
            >
              Napisz do mnie
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#C9A87C]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B5344]">
          <p>© {new Date().getFullYear()} Ślubne Dylematy. Wszelkie prawa zastrzeżone.</p>
          <p>Tworzone z sercem ❤</p>
        </div>
      </div>
    </footer>
  );
}
