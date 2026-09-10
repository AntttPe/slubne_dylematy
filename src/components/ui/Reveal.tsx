"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    /** Timer bezpiecznika ustawiany przez inline'owy skrypt w layoucie. */
    __revealFailsafe?: ReturnType<typeof setTimeout>;
  }
}

type Props = {
  children: React.ReactNode;
  /** Opóźnienie w ms - wyłącznie do kaskady w obrębie jednej grupy. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Jedyna animacja w projekcie: fade-up przy wejściu w viewport.
 * Bez slide, bounce, scale i float - spójność ruchu robi więcej
 * dla wrażenia dopracowania niż dziesięć różnych efektów.
 *
 * Zasada nadrzędna: treść nigdy nie może zostać niewidoczna dlatego,
 * że coś po stronie klienta nie wypaliło. Stąd trzy zabezpieczenia -
 * klasa `js` w CSS, bezpiecznik czasowy w layoucie i obsługa braku
 * IntersectionObserver poniżej.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skoro ten efekt się wykonał, hydratacja doszła do skutku -
    // bezpiecznik z layoutu jest zbędny. Bez tego po 2,5 s zgasłyby
    // wszystkie animacje na wolnym łączu.
    if (window.__revealFailsafe !== undefined) {
      clearTimeout(window.__revealFailsafe);
      window.__revealFailsafe = undefined;
    }

    // Brak IntersectionObserver (bardzo stara przeglądarka): pokazujemy
    // od razu, zamiast zostawić element niewidoczny na zawsze. Atrybut
    // ustawiamy wprost w DOM - to jednorazowa synchronizacja z zewnętrznym
    // API, a nie stan, który miałby wywołać kolejny render.
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      data-visible={visible ? "true" : "false"}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
