import { site } from "@/data/site";

/**
 * Dane strukturalne LocalBusiness - dla lokalnej firmy usługowej
 * to jedna z niewielu rzeczy SEO, która realnie coś zmienia.
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description:
      "Dekoracje ślubne, weselne i okolicznościowe - kościół, sala, plener.",
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    image: `${site.url}/images/realizacje/sala-weselna-boho-pampasy-zyrandole.jpg`,
    address: {
      "@type": "PostalAddress",
      addressRegion: site.area.region,
      addressCountry: site.area.country,
    },
    /*
      Dwa wpisy, nie jeden napis: region mówi Google, gdzie szukać
      dopasowania lokalnego, kraj - że Magda dojedzie też dalej.
      To pole opisuje ZASIĘG; siedzibę opisuje `address` poniżej.
    */
    areaServed: [
      { "@type": "AdministrativeArea", name: "Śląsk" },
      { "@type": "Country", name: "Polska" },
    ],
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    founder: { "@type": "Person", name: site.owner },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
