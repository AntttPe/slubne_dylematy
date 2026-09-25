import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. Next only ships WebP by default;
    // the hero photos are large flat-toned interiors, exactly the case
    // where AVIF wins the most over WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
