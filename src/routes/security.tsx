import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SecurityGrid, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/security")({
  component: SecurityPage,
  head: () => ({
    meta: [
      { title: "Security — Recify" },
      { name: "description", content: "Your receivables are sensitive. We treat them that way." },
      { property: "og:title", content: "Security — Recify" },
      { property: "og:description", content: "Your receivables are sensitive. We treat them that way." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SecurityPage() {
  return (
    <>
      <PageHero id="security" />
      <SecurityGrid />
      <WhatsAppButton />
    </>
  );
}
