"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const aktywny = (href: string) => href.split("#")[0] === pathname;

  // Above the hero the bar is transparent with white text (dark photo
  // underneath); after scrolling it switches to cream with dark text.
  const nadHero = pathname === "/" && !scrolled && !open;
  const jasnyPasek = !nadHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        jasnyPasek
          ? "border-b border-line bg-canvas/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={(e) => {
            // Next does not scroll when the route does not change. This
            // replaced the "Start" item in the menu.
            //
            // No aria-label here on purpose: the visible name and tagline
            // already name the link, and an aria-label that omitted the
            // tagline made the accessible name disagree with the text -
            // which breaks voice control.
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }
          }}
          className="flex items-center gap-3"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={449}
            height={555}
            sizes="40px"
            className={`h-10 w-auto transition-[filter] ${
              jasnyPasek ? "" : "brightness-0 invert"
            }`}
            priority
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-serif text-xl transition-colors ${
                jasnyPasek ? "text-ink" : "text-white"
              }`}
            >
              {site.name}
            </span>
            <span
              className={`type-eyebrow mt-1.5 transition-colors ${
                jasnyPasek ? "text-faint" : "text-white/70"
              }`}
            >
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 ${
                jasnyPasek
                  ? aktywny(link.href)
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                  : aktywny(link.href)
                    ? "text-white"
                    : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`-mr-2 p-2 transition-colors lg:hidden ${
            jasnyPasek ? "text-ink" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobilne"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

            <div
        id="menu-mobilne"
        inert={!open}
        className={`overflow-hidden border-t border-line bg-canvas transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-2 sm:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-[0.9375rem] text-muted last:border-0 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
