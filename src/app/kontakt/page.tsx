import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import PageHeader from "@/components/ui/PageHeader";
import { getAvailability } from "@/lib/availability";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontakt i rezerwacja terminu",
  description:
    "Sprawdź wolne terminy i wyślij zapytanie o dekoracje ślubne. Odpowiadam w ciągu 24 godzin.",
  alternates: { canonical: "/kontakt" },
};

const details = [
  { icon: Phone, label: "Telefon", value: site.contact.phone, href: site.contact.phoneHref },
  { icon: Mail, label: "E-mail", value: site.contact.email, href: site.contact.emailHref },
  { icon: MapPin, label: "Obszar działania", value: site.area.label, href: null },
  { icon: Clock, label: "Odpowiadam", value: site.contact.responseTime, href: null },
];

export default async function KontaktPage() {
  const { availability, ok } = await getAvailability();

  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title={
          <>
            Sprawdźcie termin i <em>napiszcie do mnie</em>
          </>
        }
        lead="Odpowiadam w ciągu 24 godzin. Piszcie także wtedy, gdy data nie jest jeszcze pewna."
      />

      <section className="bg-canvas py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
                        <div className="flex flex-col gap-8">
              <div className="rounded-md border border-line bg-surface p-7">
                <h2 className="type-eyebrow text-accent-strong">Dane kontaktowe</h2>
                <ul className="mt-6 flex flex-col gap-5">
                  {details.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon size={16} className="mt-1 shrink-0 text-accent-strong" />
                      <div>
                        <p className="text-sm text-faint">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-[0.9375rem] text-ink underline-offset-4 hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-[0.9375rem] text-ink">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

                            <div>
                <h2 className="type-eyebrow mb-4 text-accent-strong">
                  Wolne terminy
                </h2>
                <AvailabilityCalendar availability={availability} ok={ok} />
              </div>
            </div>

            <ContactForm availability={availability} />
          </div>
        </div>
      </section>
    </>
  );
}
