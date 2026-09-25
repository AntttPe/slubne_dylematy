"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToTop } from "@/lib/scroll";

/**
 * A nav link that scrolls to the top when it points at the page you are
 * already on.
 *
 * Next deliberately does not scroll when the route does not change, which
 * made the footer nav look broken: clicking "Kontakt" from the bottom of
 * /kontakt did nothing at all. Links carrying a hash are left alone - the
 * browser resolves those itself.
 */
export default function NavLink({
  href,
  className,
  onNavigate,
  children,
}: {
  href: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sciezka, hash] = href.split("#");
  const taSamaStrona = (sciezka || "/") === pathname;

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (!taSamaStrona || hash) return;
        e.preventDefault();
        scrollToTop();
      }}
    >
      {children}
    </Link>
  );
}
