import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

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
    "Dekoracje ślubne, weselne i okolicznościowe - Śląsk i cała Polska. Kościół, sala, plener - kompleksowa oprawa Waszego dnia. Sprawdź wolne terminy.",
  keywords: [
    "dekoracje ślubne",
    "dekoracje weselne",
    "florystyka ślubna",
    "dekoracje kościoła",
    "dekoracje komunia",
    "dekorator ślubny śląsk",
    "dekoracje ślubne śląsk",
    "dekoracje ślubne katowice",
    "dekoracje ślubne cała Polska",
    "ślubne dylematy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ślubne Dylematy | Dekoracje ślubne i eventowe",
    description:
      "Dekoracje ślubne, weselne i okolicznościowe - Śląsk i cała Polska. Sprawdź wolne terminy.",
    url: site.url,
    siteName: "Ślubne Dylematy",
    type: "website",
    locale: "pl_PL",
  },
  robots: {
    index: process.env.NEXT_PUBLIC_INDEXABLE === "true",
    follow: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Runs synchronously before the rest of <body> is parsed, so
            content never flashes. Adds `js` to enable hiding <Reveal>
            elements, and arms a failsafe timer in case the React bundle
            dies after this point. */}
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
