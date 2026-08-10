import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ContactForm, ContactDetails, WhatsAppButton } from "../components/recify";

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
      <ContactDetails />
      <WhatsAppButton />
    </>
  );
}
