import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

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
        <div
          className={`type-lead mt-5 flex flex-col gap-4 ${
            tone === "dark" ? "text-muted-invert" : "text-muted"
          }`}
        >
          {typeof lead === "string" ? <p>{lead}</p> : lead}
        </div>
      )}
    </Reveal>
  );
}
