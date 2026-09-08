import { createFileRoute } from "@tanstack/react-router";
import { ServicesMenu } from "../components/ServicesMenu";
import { WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Recify" },
      { name: "description", content: "From invoice to cash — Recify operates the receivables work that keeps your business getting paid." },
      { property: "og:title", content: "Services — Recify" },
      { property: "og:description", content: "From invoice to cash — Recify operates the receivables work that keeps your business getting paid." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ServicesPage() {
  return (
    <>
      <ServicesMenu />
      <WhatsAppButton />
    </>
  );
}
