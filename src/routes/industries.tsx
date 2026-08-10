import { createFileRoute } from "@tanstack/react-router";
import { IndustriesSection, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () => ({
    meta: [
      { title: "Industries — Recify" },
      { name: "description", content: "Recify is built for businesses where invoices don't pay themselves." },
      { property: "og:title", content: "Industries — Recify" },
      { property: "og:description", content: "Recify is built for businesses where invoices don't pay themselves." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function IndustriesPage() {
  return (
    <>
      <IndustriesSection />
      <WhatsAppButton />
    </>
  );
}
