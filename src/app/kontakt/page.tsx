import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Instagram, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt & Rezerwacja | Ślubne Dylematy",
  description:
    "Skontaktuj się z Ślubymi Dylematami i zarezerwuj termin. Wypełnij formularz i razem stworzymy wymarzone dekoracje na Wasz wyjątkowy dzień.",
};

const contactDetails = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+48 123 456 789",
    href: "tel:+48123456789",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "kontakt@slubnedylematy.pl",
    href: "mailto:kontakt@slubnedylematy.pl",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@slubne.dylematy",
    href: "https://instagram.com/slubne.dylematy",
  },
  {
    icon: Clock,
    label: "Odpowiadam",
    value: "w ciągu 24 godzin",
    href: null,
  },
  {
    icon: MapPin,
    label: "Obszar działania",
    value: "Śląsk i okolice",
    href: null,
  },
];

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Hero */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
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
            Napisz do mnie
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-[#2C1810] mb-4">
            Zarezerwuj <em className="text-[#A8845A] not-italic">termin</em>
          </h1>
          <p className="text-[#6B5344] text-lg leading-relaxed max-w-xl mx-auto">
            Napisz, by zarezerwować termin. Chętnie poznam Wasze marzenia
            i opowiem, jak mogę pomóc w stworzeniu wymarzonej dekoracji.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-[#2C1810] rounded-3xl p-8 text-[#E8D9C4]">
              <p
                className="font-script text-[#C9A87C] text-2xl mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Ślubne Dylematy
              </p>
              <p className="text-[#A89080] text-sm mb-8 leading-relaxed">
                Tworzę dekoracje z miłości do piękna — skontaktuj się ze mną,
                by razem stworzyć coś wyjątkowego na Wasz wyjątkowy dzień.
              </p>

              <div className="flex flex-col gap-5">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#C9A87C]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-[#C9A87C]" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-[#6B5344] mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[#E8D9C4] hover:text-[#C9A87C] transition-colors text-sm cursor-pointer"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-[#E8D9C4] text-sm">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-[#F0E8DC] rounded-3xl p-6 border border-[#E8D9C4]">
              <p className="font-serif text-lg text-[#2C1810] italic leading-relaxed mb-4">
                &ldquo;Dużo pracy, mało snu, litry kawy i ogrom emocji. Każda realizacja
                robiona jest z sercem i wiem, że było warto.&rdquo;
              </p>
              <p className="text-sm text-[#A8845A] font-medium">— Magda</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
