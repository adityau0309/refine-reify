import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ContactForm, ContactDetails, WhatsAppButton, SectionContainer } from "../components/recify";
import { CalendlyInline } from "../components/CalendlyModal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Recify" },
      { name: "description", content: "Book a short conversation about your receivables." },
      { property: "og:title", content: "Contact — Recify" },
      { property: "og:description", content: "Book a short conversation about your receivables." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ContactPage() {
  return (
    <>
      <PageHero id="contact" />
      <section className="section-padding">
        <div className="mx-auto max-w-2xl px-4 md:px-6">
          <ContactForm />
        </div>
      </section>
      <section id="book-a-call" className="section-padding pt-0">
        <SectionContainer>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="display-heading text-3xl md:text-4xl">Book a call</h2>
            <p className="mt-3 text-muted-foreground text-pretty">
              Pick a time that works for you and we&apos;ll talk through your receivables.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
            <CalendlyInline />
          </div>
        </SectionContainer>
      </section>
      <ContactDetails />
      <WhatsAppButton />
    </>
  );
}
