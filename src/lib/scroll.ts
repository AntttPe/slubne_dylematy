/**
 * Scrolls to the top of the page, honouring the visitor's reduced-motion
 * setting. Used wherever a link points at the page you are already on -
 * Next deliberately skips scrolling when the route does not change.
 */
export function scrollToTop() {
  const ograniczonyRuch = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  window.scrollTo({ top: 0, behavior: ograniczonyRuch ? "auto" : "smooth" });
}
