import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
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
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <body>
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
