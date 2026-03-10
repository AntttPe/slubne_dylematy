import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ślubne Dylematy | Dekoracje Ślubne & Eventowe",
  description:
    "Tworzymy wyjątkowe dekoracje ślubne, weselne i eventowe z miłości do piękna. Ślub, przyjęcie, komunia, chrzciny – zadbamy o każdy detal. Zarezerwuj termin!",
  keywords: [
    "dekoracje ślubne",
    "dekoracje weselne",
    "florystyka ślubna",
    "dekoracje komunia",
    "dekoracje chrzciny",
    "dekoracje przyjęcie",
    "ślubne dylematy",
    "dekorator ślubny",
  ],
  openGraph: {
    title: "Ślubne Dylematy | Dekoracje Ślubne & Eventowe",
    description: "Tworzymy wyjątkowe dekoracje z miłości do piękna i rodzinnych chwil.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
