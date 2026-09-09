/**
 * Nagłówek podstrony. Bez falowanych dividerów SVG -
 * wystarczy zmiana tła i oddech.
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="border-b border-line bg-surface pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="type-eyebrow text-accent-strong">{eyebrow}</p>
        <h1 className="type-h2 mt-5 max-w-2xl text-ink">{title}</h1>
        {lead && (
          <p className="type-lead mt-6 max-w-xl text-muted">{lead}</p>
        )}
      </div>
    </section>
  );
}
