import { createFileRoute } from "@tanstack/react-router";
import { PageHero, StepsSection, DifferentiatorSection, ModelSection, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: "How It Works — Recify" },
      { name: "description", content: "How Recify operates your receivables end-to-end — AI for the volume, people for the judgment." },
      { property: "og:title", content: "How It Works — Recify" },
      { property: "og:description", content: "How Recify operates your receivables end-to-end." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function HowItWorksPage() {
  return (
    <>
      <PageHero id="system" />
      <StepsSection />
      <DifferentiatorSection />
      <ModelSection />
      <WhatsAppButton />
    </>
  );
}
