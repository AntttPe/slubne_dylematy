type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Entrance animation for content that is already on screen when the page
 * loads. Pure CSS, no client component, nothing waits for JS.
 *
 * <Reveal> must not be used above the fold: it keeps the element at
 * opacity 0 until React has hydrated and IntersectionObserver has fired.
 * On the hero heading that measured as 5.4 s of LCP render delay on
 * Slow 4G - the text was in the HTML the whole time, just invisible.
 */
export default function Intro({ children, delay = 0, className = "" }: Props) {
  return (
    <div
      className={`intro ${className}`}
      style={
        delay
          ? ({ "--intro-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
