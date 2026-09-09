import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-canvas px-5 py-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="type-eyebrow text-accent-strong">Błąd 404</p>
        <h1 className="type-h2 mt-5 text-ink">
          Tej strony <em>tu nie ma</em>
        </h1>
        <p className="type-lead mt-5 text-muted">
          Może link się zestarzał, a może literówka w adresie. Zapraszam na
          stronę główną albo do galerii.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Strona główna</Button>
          <Button href="/galeria" variant="secondary">
            Galeria
          </Button>
        </div>
      </div>
    </section>
  );
}
