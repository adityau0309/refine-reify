import { createFileRoute } from "@tanstack/react-router";
import { PageHero, AboutValues, WhereWeWork, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Recify" },
      { name: "description", content: "AR shouldn't require another full-time hire." },
      { property: "og:title", content: "About — Recify" },
      { property: "og:description", content: "AR shouldn't require another full-time hire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AboutPage() {
  return (
    <>
      <PageHero id="about" />
      <AboutValues />
      <WhereWeWork />
      <WhatsAppButton />
    </>
  );
}
