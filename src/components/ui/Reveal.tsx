"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    __revealFailsafe?: ReturnType<typeof setTimeout>;
  }
}

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

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

    // This effect ran, so hydration worked - the layout failsafe is no
    // longer needed. Without clearing it, all animations would die after
    // 2.5s on a slow connection.
    if (window.__revealFailsafe !== undefined) {
      clearTimeout(window.__revealFailsafe);
      window.__revealFailsafe = undefined;
    }

    // No IntersectionObserver: reveal immediately instead of leaving the
    // element invisible forever. Set on the DOM directly - a one-off sync
    // with an external API, not state that should trigger a render.
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
