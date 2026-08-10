import { createFileRoute } from "@tanstack/react-router";
import { ServicesSection, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Recify" },
      { name: "description", content: "Recover, Resolve and See — the three functions Recify operates for you." },
      { property: "og:title", content: "Services — Recify" },
      { property: "og:description", content: "Recover, Resolve and See — the three functions Recify operates for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ServicesPage() {
  return (
    <>
      <ServicesSection />
      <WhatsAppButton />
    </>
  );
}
