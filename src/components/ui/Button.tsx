import Link from "next/link";

type Variant = "primary" | "secondary" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-[0.9375rem] font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-strong text-white hover:bg-ink",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  /* Na zdjęciu: białe obramowanie z lekkim przyciemnieniem pod spodem,
     żeby przycisk był czytelny także na jasnym fragmencie kadru. */
  onDark:
    "border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-ink",
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/**
 * Jedyny przycisk w projekcie. Nowe warianty dokładamy tutaj,
 * nie przez dopisywanie klas w miejscu użycia.
 */
export default function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");

    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
