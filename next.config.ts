import type { NextConfig } from "next";

/**
 * Security headers are declared here rather than only in netlify.toml.
 *
 * Netlify's [[headers]] reach static files, but responses rendered by the
 * Next runtime came back with only HSTS and nosniff - Referrer-Policy,
 * Permissions-Policy and frame-ancestors were missing on every HTML page.
 * Declared here, Next emits them itself, so both paths are covered.
 *
 * Still no full Content-Security-Policy: Next injects inline styles and
 * scripts, so a real policy needs nonces from middleware.
 */
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback. Next only ships WebP by default;
    // the hero photos are large flat-toned interiors, exactly the case
    // where AVIF wins the most over WebP.
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
