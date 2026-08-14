import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionContainer, SectionHeader, ButtonPrimary, WhatsAppButton } from "../components/recify";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — Recify" },
      { name: "description", content: "Notes on accounts receivable operations, dispute resolution and cash flow from the Recify team." },
      { property: "og:title", content: "Blog — Recify" },
      { property: "og:description", content: "Notes on accounts receivable operations, dispute resolution and cash flow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const topics = [
  { number: "01", title: "Revenue Recovery" },
  { number: "02", title: "Dispute Resolution" },
  { number: "03", title: "Cash Flow Intelligence" },
];

function BlogPage() {
  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          <SectionHeader
            kicker="Blog"
            title="Notes on getting"
            highlight="paid."
            subtitle="Writing on accounts receivable operations, payment blockers and cash flow. First articles coming soon."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {topics.map((topic) => (
              <div key={topic.number} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <span className="display-heading text-3xl text-primary">{topic.number}</span>
                <h2 className="mt-4 font-display text-xl font-bold">{topic.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Articles in preparation.</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <ButtonPrimary to="/start">Get your free AR health check</ButtonPrimary>
            <Link to="/" className="kicker hover:text-primary">
              Back to home
            </Link>
          </div>
        </SectionContainer>
      </section>
      <WhatsAppButton />
    </>
  );
}
