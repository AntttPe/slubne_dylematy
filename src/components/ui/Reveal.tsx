"use client";

import { useEffect, useRef, useState } from "react";

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

    // Element już w kadrze przy pierwszym renderze (np. hero) - pokaż od razu.
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
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
