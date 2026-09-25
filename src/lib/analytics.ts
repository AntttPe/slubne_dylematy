/**
 * Optional, cookieless measurement. Nothing loads unless the env vars are set.
 *
 * The deliberate constraint: whatever we add here must not set cookies or
 * touch the visitor's device storage. That is what keeps the site free of a
 * consent banner - the ePrivacy cookie rule simply does not apply. Google
 * Analytics would flip that, so it is not an option here.
 */

/** Meta tag proving domain ownership to Google Search Console. Sets nothing. */
export const searchConsoleToken = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

/** Cloudflare Web Analytics beacon token - cookieless, no fingerprinting. */
export const cloudflareAnalyticsToken = process.env.NEXT_PUBLIC_CF_BEACON;

export const analyticsEnabled = Boolean(cloudflareAnalyticsToken);
