import { createFileRoute } from "@tanstack/react-router";
import {
  HomeHero,
  TrustPill,
  ProblemSection,
  ServicesSection,
  DifferentiatorSection,
  ModelSection,
  StepsSection,
  IndustriesSection,
  IdealFitSection,
  HealthCheckSection,
  OutcomesSection,
  PricingTeaser,
  SecurityTeaser,
  FaqTeaser,
  WhatsAppButton,
} from "../components/recify";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Recify — Your AR Team, Without Another Hire" },
      { name: "description", content: "Recify runs your invoice-to-cash work — AI for the volume, people for the judgment. Managed AR, dispute resolution and cash flow visibility for growing B2B businesses." },
      { property: "og:title", content: "Recify — Your AR Team, Without Another Hire" },
      { property: "og:description", content: "Recify runs your invoice-to-cash work — AI for the volume, people for the judgment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  return (
    <>
      <HomeHero />
      <TrustPill />
      <ProblemSection />
      <ServicesSection />
      <DifferentiatorSection />
      <ModelSection />
      <StepsSection />
      <IndustriesSection />
      <IdealFitSection />
      <HealthCheckSection />
      <OutcomesSection />
      <PricingTeaser />
      <SecurityTeaser />
      <FaqTeaser />
      <WhatsAppButton />
    </>
  );
}
