import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Galeria realizacji",
  description:
    "Dekoracje ślubne, weselne i komunijne w kościele, na sali i w plenerze. Zobacz realizacje Ślubnych Dylematów.",
  alternates: { canonical: "/galeria" },
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Galeria <em>realizacji</em>
          </>
        }
        lead="Kilka dni, przy których miałam przyjemność pracować. Kliknijcie w zdjęcie, żeby je powiększyć."
      />

            <section className="bg-canvas pb-28 pt-14 sm:pt-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <GalleryGrid />

          <div className="mt-24 border-t border-line pt-16 text-center">
            <h2 className="type-h2 text-ink">
              Zainspirowani? <em>Stwórzmy coś razem</em>
            </h2>
            <p className="type-lead mx-auto mt-5 max-w-lg text-muted">
              Napiszcie i opowiedzcie o swoim dniu - sprawdzę termin i
              przygotuję propozycję.
            </p>
            <div className="mt-8">
              <Button href="/kontakt">Zapytaj o termin</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
