import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SectionContainer } from "../../components/recify";
import { DecoderTool } from "../../components/decoder/DecoderTool";
import { DecoderSeoContent } from "../../components/decoder/DecoderSeoContent";
import { WhatsAppButton } from "../../components/recify";

const searchSchema = z.object({
  q: z.string().optional(),
});

export const Route = createFileRoute("/tools/invoice-rejection-decoder")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      {
        title: "Invoice Rejection Decoder — Find Out Why Your Invoice Was Rejected | Recify",
      },
      {
        name: "description",
        content:
          "Paste an invoice rejection message and find out why it happened, who needs to act, and what to do next. Diagnose PO, pricing, tax, portal and AP issues.",
      },
      {
        property: "og:title",
        content: "Invoice Rejection Decoder — Find Out Why Your Invoice Was Rejected | Recify",
      },
      {
        property: "og:description",
        content:
          "Paste an invoice rejection message and find out what went wrong, who needs to act, and what to send back. Free deterministic AP diagnostic tool.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://recify.in/tools/invoice-rejection-decoder",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Invoice Rejection Decoder",
          applicationCategory: "BusinessApplication",
          operatingSystem: "All",
          description:
            "Diagnose why an invoice was rejected by a customer accounts payable system, identify who needs to act, and generate a buyer-ready resolution response.",
          url: "https://recify.in/tools/invoice-rejection-decoder",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          provider: {
            "@type": "Organization",
            name: "Recify",
            url: "https://recify.in",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why was my invoice rejected?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Invoices are rejected primarily due to automated ERP matching checks, such as invalid or closed purchase orders (PO), unit price variance, missing goods receipts (GRN), duplicate invoice numbers, or compliance/tax errors.",
              },
            },
            {
              "@type": "Question",
              name: "What should I do when a customer AP team rejects an invoice?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "First inspect the rejection notice to determine if the issue is supplier-side (tax/math) or buyer-side (closed PO, pending receiving). Contact the buyer contact with proof of delivery before resubmitting.",
              },
            },
            {
              "@type": "Question",
              name: "How do I fix a PO mismatch?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "If the PO was closed because funds were depleted, request a formal PO change order / amendment or revised PO number from your buyer contact.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: InvoiceRejectionDecoderPage,
});

function InvoiceRejectionDecoderPage() {
  const { q } = Route.useSearch();

  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          {/* Hero Section — Tool is the Hero (Section 5 & 6) */}
          <div className="mx-auto max-w-3xl text-center mb-10 md:mb-14">
            <p className="kicker text-primary">INVOICE OPERATIONS TOOL</p>
            <h1 className="display-heading mt-3 text-3xl md:text-5xl lg:text-6xl text-foreground">
              Why was your invoice <span className="text-primary">rejected?</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Paste the rejection message and find out what went wrong, who needs to act, and what
              to do next.
            </p>
          </div>

          {/* Core Tool */}
          <DecoderTool initialQuery={q} />

          {/* In-depth Scannable SEO Content Below the Tool */}
          <DecoderSeoContent />
        </SectionContainer>
      </section>
      <WhatsAppButton />
    </>
  );
}
