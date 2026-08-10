import { createFileRoute } from "@tanstack/react-router";
import { PageHero, StartForm, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/start")({
  component: StartPage,
  head: () => ({
    meta: [
      { title: "Free AR Health Check — Recify" },
      { name: "description", content: "Let's see if Recify is a fit for your business." },
      { property: "og:title", content: "Free AR Health Check — Recify" },
      { property: "og:description", content: "Let's see if Recify is a fit for your business." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function StartPage() {
  return (
    <>
      <PageHero id="start" />
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <StartForm />
        </div>
      </section>
      <WhatsAppButton />
    </>
  );
}
