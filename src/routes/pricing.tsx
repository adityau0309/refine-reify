import { createFileRoute } from "@tanstack/react-router";
import { FullPricingSection, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Recify" },
      { name: "description", content: "One team. One monthly fee. No software seat licenses." },
      { property: "og:title", content: "Pricing — Recify" },
      { property: "og:description", content: "One team. One monthly fee. No software seat licenses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PricingPage() {
  return (
    <>
      <FullPricingSection />
      <WhatsAppButton />
    </>
  );
}
