import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HelpCircle, ShieldAlert } from "lucide-react";
import { SectionContainer, SectionHeader, WhatsAppButton } from "../../components/recify";
import { SEO_GUIDES } from "../../lib/decoder/seo-data";

export const Route = createFileRoute("/invoice-rejected/")({
  head: () => ({
    meta: [
      {
        title: "Why Was Your Invoice Rejected? Common AP Rejection Reasons & Solutions | Recify",
      },
      {
        name: "description",
        content:
          "Comprehensive library of enterprise invoice rejection guides. Learn why customer AP systems reject invoices for PO mismatches, missing receipts, price variances, and portal rules.",
      },
      {
        property: "og:title",
        content: "Invoice Rejection Knowledge Base & Resolution Guides | Recify",
      },
      {
        property: "og:description",
        content:
          "Solve invoice exceptions across Coupa, Ariba, SAP, and enterprise AP departments. Operational guides from Recify.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://recify.in/invoice-rejected",
      },
    ],
  }),
  component: InvoiceRejectedHubPage,
});

function InvoiceRejectedHubPage() {
  const guidesList = Object.values(SEO_GUIDES);

  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          {/* Header */}
          <SectionHeader
            kicker="INVOICE EXCEPTION DIRECTORY"
            title="Why Was Your Invoice"
            highlight="Rejected?"
            subtitle="Browse step-by-step resolution guides for every major accounts payable exception, portal error code, and matching failure."
            align="center"
          />

          {/* Quick Decoder Callout */}
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary/30 bg-primary/5 p-6 text-center md:p-8">
            <h3 className="display-heading text-lg md:text-xl text-foreground">
              Have an exact rejection error message?
            </h3>
            <p className="mt-2 text-xs md:text-sm text-muted-foreground">
              Paste the text directly into our free diagnostic tool for an immediate analysis of who
              needs to act and what to send back.
            </p>
            <div className="mt-4">
              <Link
                to="/tools/invoice-rejection-decoder"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                Use Invoice Rejection Decoder →
              </Link>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guidesList.map((guide) => (
              <div
                key={guide.slug}
                className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 md:p-8 transition-all hover:border-primary hover:shadow-lg"
              >
                <div>
                  <span className="kicker text-primary text-xs font-semibold">{guide.kicker}</span>
                  <h3 className="font-display text-xl font-bold mt-3 text-foreground">
                    {guide.h1}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    to={`/invoice-rejected/${guide.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Read Guide →
                  </Link>
                  <Link
                    to="/tools/invoice-rejection-decoder"
                    search={{ q: guide.sampleRejectionPhrase }}
                    className="text-[0.7rem] text-muted-foreground hover:text-foreground underline"
                  >
                    Test in Decoder
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Recify Managed Service Callout */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              Dealing with systemic invoice exceptions or payment delays?{" "}
              <Link to="/start" className="font-bold text-primary hover:underline">
                Get a free AR health check
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="font-bold text-primary hover:underline">
                talk to our team
              </Link>
              .
            </p>
          </div>
        </SectionContainer>
      </section>
      <WhatsAppButton />
    </>
  );
}
