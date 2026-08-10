import { createFileRoute } from "@tanstack/react-router";
import { SectionContainer, SectionHeader, FaqAccordion, WhatsAppButton } from "../components/recify";
import { fullFaq } from "../lib/site-content";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — Recify" },
      { name: "description", content: "Straight answers about what Recify does and how it works." },
      { property: "og:title", content: "FAQ — Recify" },
      { property: "og:description", content: "Straight answers about what Recify does and how it works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function FaqPage() {
  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          <SectionHeader
            kicker="FAQ"
            title="Straight"
            highlight="answers."
            subtitle="What Recify does, what it doesn't do, and how the service actually operates."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={fullFaq} />
          </div>
        </SectionContainer>
      </section>
      <WhatsAppButton />
    </>
  );
}
