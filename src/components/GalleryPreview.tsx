import Image from "next/image";
import { featuredPhotos } from "@/data/gallery";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function GalleryPreview() {
  return (
    <section id="realizacje" className="scroll-mt-24 bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Realizacje"
          title={
            <>
              Kilka dni, które <em>udało się dobrze ubrać</em>
            </>
          }
        />

        <div className="masonry mt-14">
          {featuredPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 3) * 80}>
              <figure className="overflow-hidden rounded-sm bg-surface">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
                  className="h-auto w-full"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Button href="/galeria" variant="secondary">
            Zobacz pełną galerię
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
