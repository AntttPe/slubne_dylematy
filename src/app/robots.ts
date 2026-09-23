import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Indexing is OFF by default and only enabled via NEXT_PUBLIC_INDEXABLE.
 *
 * Test deploys get a public URL. If Google indexed one, we would end up with
 * a copy of the site whose canonicals point at a domain that does not work
 * yet - expensive to undo. A safe default matters more than convenience here.
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
      disallow: ["/panel"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
