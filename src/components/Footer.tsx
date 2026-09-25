import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { navLinks, site } from "@/data/site";
import NavLink from "./ui/NavLink";

export default function Footer() {
  return (
    <footer className="bg-canvas-dark text-ink-invert">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl">{site.name}</p>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-muted-invert">
              Dekoracje ślubne i okolicznościowe. {site.area.label}.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram - ${site.name}`}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-line-dark text-accent transition-colors hover:border-accent hover:bg-accent hover:text-canvas-dark"
              >
                <Instagram size={17} />
              </a>

                            {site.social.facebook && (
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Facebook - ${site.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-line-dark text-accent transition-colors hover:border-accent hover:bg-accent hover:text-canvas-dark"
                >
                  <Facebook size={17} />
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Stopka">
            <h2 className="type-eyebrow text-accent">Nawigacja</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {[...navLinks, { href: "/gdzie-pracuje", label: "Gdzie pracuję" }].map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    className="text-[0.9375rem] text-muted-invert transition-colors hover:text-ink-invert"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="type-eyebrow text-accent">Kontakt</h2>
            <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem]">
              <li>
                <a
                  href={site.contact.emailHref}
                  className="text-muted-invert transition-colors hover:text-ink-invert"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="text-muted-invert transition-colors hover:text-ink-invert"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-invert transition-colors hover:text-ink-invert"
                >
                  {site.social.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

                <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-6 text-sm text-muted-invert sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <Link
            href="/polityka-prywatnosci"
            className="transition-colors hover:text-ink-invert"
          >
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
