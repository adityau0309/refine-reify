import { createFileRoute } from "@tanstack/react-router";
import { PageHero, StepsSection, DifferentiatorSection, ModelSection, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/system")({
  component: SystemPage,
  head: () => ({
    meta: [
      { title: "The System — Recify" },
      { name: "description", content: "How Recify operates your receivables end-to-end." },
      { property: "og:title", content: "The System — Recify" },
      { property: "og:description", content: "How Recify operates your receivables end-to-end." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SystemPage() {
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
