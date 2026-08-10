import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ResultGrid, StepsSection, ClaimsNote, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/results")({
  component: ResultsPage,
  head: () => ({
    meta: [
      { title: "Results — Recify" },
      { name: "description", content: "What an owned AR process actually changes." },
      { property: "og:title", content: "Results — Recify" },
      { property: "og:description", content: "What an owned AR process actually changes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ResultsPage() {
  return (
    <>
      <PageHero id="results" />
      <ResultGrid />
      <StepsSection />
      <ClaimsNote />
      <WhatsAppButton />
    </>
  );
}
