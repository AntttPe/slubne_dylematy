import Reveal from "./Reveal";

type Props = {
  /** Mikro-nagłówek: rozstrzelone wersaliki. Zastąpił font skryptowy. */
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

/**
 * Nagłówek sekcji - jeden układ na całą stronę.
 * Wcześniej ten sam blok był przepisany ręcznie pięć razy.
 */
export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "light",
}: Props) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`type-eyebrow mb-5 ${
          tone === "dark" ? "text-accent" : "text-accent-strong"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`type-h2 ${tone === "dark" ? "text-ink-invert" : "text-ink"}`}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`type-lead mt-5 ${
            tone === "dark" ? "text-muted-invert" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
