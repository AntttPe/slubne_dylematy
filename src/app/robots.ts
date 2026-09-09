import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
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
