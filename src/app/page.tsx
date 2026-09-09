import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GalleryPreview from "@/components/GalleryPreview";
import AvailabilitySection from "@/components/AvailabilitySection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GalleryPreview />
      <AvailabilitySection />
      <ProcessSection />
      <TestimonialsSection />
      <PartnersSection />
      <CtaSection />
    </>
  );
}
