import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionContainer, SectionHeader, ButtonSecondary, WhatsAppButton } from "../components/recify";
import { fullPricing, global } from "../lib/site-content";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms — Recify" },
      { name: "description", content: "The terms that govern use of the Recify website and the scope of the Recify managed AR service." },
      { property: "og:title", content: "Terms — Recify" },
      { property: "og:description", content: "Terms governing the Recify website and service scope." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function TermsPage() {
  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          <SectionHeader
            kicker="Terms"
            title="Terms of"
            highlight="use."
            subtitle="A summary of how this website and the Recify service are governed. Full terms are set out in the service agreement."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            <Block title="The service">
              Recify is a managed accounts receivable service. We use software and AI internally, but you are hiring us to
              operate your receivables — not buying another system to manage.
            </Block>
            <Block title="Scope">
              Scope is defined in the service agreement. Recify does not provide legal advice and does not provide regulated
              or legal debt-collection services.
            </Block>
            <Block title="Pricing">{fullPricing.disclaimer}</Block>
            <Block title="Website content">
              Information on this website is provided for general information about the service and may change. We don't
              publish recovery percentages, DSO improvements or case studies until we have verified client data to support
              them.
            </Block>
            <Block title="Contact">
              Questions about these terms:{" "}
              <a href={global.email} className="font-bold text-primary hover:underline">
                {global.emailLabel}
              </a>
              .
            </Block>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <ButtonSecondary to="/privacy-policy">Read the privacy policy</ButtonSecondary>
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

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
