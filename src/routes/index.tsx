import { createFileRoute } from "@tanstack/react-router";
import { WhatsAppButton } from "../components/recify";
import {
  Hero,
  WhatRecifyIs,
  SystemCards,
  HowItWorksFlow,
  WhyRecify,
  ResultsStrip,
  IdealFitCompact,
  PricingHome,
  FaqShort,
} from "../components/home";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Recify — Managed B2B Accounts Receivable & Revenue Recovery" },
      {
        name: "description",
        content:
          "Recify runs your invoice-to-cash work — AI for the volume, people for the judgment. Get outstanding revenue moving without adding AR headcount.",
      },
      { property: "og:title", content: "Recify — Managed B2B Accounts Receivable & Revenue Recovery" },
      {
        property: "og:description",
        content: "Get your outstanding revenue moving — without adding AR headcount.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://recify.in/" }],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <WhatRecifyIs />
      <SystemCards />
      <HowItWorksFlow />
      <WhyRecify />
      <ResultsStrip />
      <IdealFitCompact />
      <PricingHome />
      <FaqShort />
      <WhatsAppButton />
    </>
  );
}
