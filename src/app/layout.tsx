import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

/*
  Fraunces zamiast Instrument Serif. Zdjęcia Magdy są ciepłe i miękkie -
  beże, złoto, brzoskwinia - a Instrument Serif ma chłodny, redakcyjny
  rysunek, który się z nimi rozjeżdżał. Fraunces trzyma tę samą klasę,
  ale ma zaokrąglone, cieplejsze zakończenia.
*/
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ślubne Dylematy | Dekoracje ślubne i eventowe",
    template: "%s | Ślubne Dylematy",
  },
  description:
    "Dekoracje ślubne, weselne i okolicznościowe na Śląsku. Kościół, sala, plener - kompleksowa oprawa Waszego dnia. Sprawdź wolne terminy.",
  keywords: [
    "dekoracje ślubne",
    "dekoracje weselne",
    "florystyka ślubna",
    "dekoracje kościoła",
    "dekoracje komunia",
    "dekorator ślubny śląsk",
    "ślubne dylematy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ślubne Dylematy | Dekoracje ślubne i eventowe",
    description:
      "Dekoracje ślubne, weselne i okolicznościowe na Śląsku. Sprawdź wolne terminy.",
    url: site.url,
    siteName: "Ślubne Dylematy",
    type: "website",
    locale: "pl_PL",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${fraunces.variable} ${inter.variable}`}
      /*
        Skrypt poniżej dopisuje do <html> klasę `js` jeszcze przed
        hydratacją, więc React zastaje inny className, niż wyrenderował
        serwer, i zgłasza niezgodność. Robimy to celowo, dlatego
        wyciszamy ostrzeżenie - dotyczy ono wyłącznie atrybutów tego
        jednego elementu, nie całego drzewa.
      */
      suppressHydrationWarning
    >
      <body>
        {/*
          Odpalane synchronicznie, przed sparsowaniem reszty <body>, więc
          treść nigdy nie mignie. Robi dwie rzeczy:

          1. Klasa `js` włącza ukrywanie elementów <Reveal>. Jeśli skrypt
             nie wystartuje, CSS nie ukryje niczego i strona jest czytelna.
          2. Timer to bezpiecznik na wypadek, gdy skrypt się wykona, ale
             paczka Reacta padnie po drodze (np. w przeglądarce wbudowanej
             w Messengera). Pierwszy zamontowany <Reveal> go kasuje.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');" +
              "window.__revealFailsafe=setTimeout(function(){" +
              "d.classList.add('reveal-failsafe')},2500);",
          }}
        />
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ink-invert"
        >
          Przejdź do treści
        </a>
        <Navbar />
        <main id="tresc">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
