import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Indeksowanie jest domyślnie wyłączone i włącza się dopiero po jawnym
 * ustawieniu NEXT_PUBLIC_INDEXABLE="true".
 *
 * Powód: testowe wdrożenia dostają publiczny adres (np. na .netlify.app).
 * Gdyby Google je zaindeksował, powstałaby kopia strony z kanonicznymi
 * odnośnikami do domeny, która jeszcze nie działa - i trzeba by to potem
 * odkręcać. Bezpieczny domyślny stan jest tu ważniejszy niż wygoda.
 */
const indeksowanie = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export default function robots(): MetadataRoute.Robots {
  if (!indeksowanie) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Panel administracyjny nie ma czego szukać w wynikach.
      disallow: ["/panel"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
