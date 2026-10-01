import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SectionContainer } from "../recify";
import { SEO_GUIDES } from "../../lib/decoder/seo-data";
import { cn } from "../../lib/utils";

const FAQS = [
  {
    q: "Why was my invoice rejected?",
    a: "Invoices are rejected primarily due to automated ERP matching checks. Common reasons include closed or invalid purchase orders (PO), unit price or total variance exceeding the buyer's tolerance, missing goods receipt (GRN) from the warehouse, duplicate invoice numbers, or compliance/tax errors.",
  },
  {
    q: "What should I do when a customer AP team rejects an invoice?",
    a: "First, inspect the rejection notice to identify whether the issue is supplier-side (e.g. math or tax error) or buyer-side (e.g. PO closed, receipt pending). Do NOT simply resubmit the identical invoice with a new date. Contact the business sponsor or procurement lead with proof of delivery to update the PO or log the goods receipt before re-uploading.",
  },
  {
    q: "How do I fix a PO mismatch?",
    a: "If the PO was closed because earlier invoices depleted the funds, contact your purchasing contact and request a formal PO change order / amendment or revised PO number. Never guess or substitute an unapproved PO number, as automated systems will immediately reject it again.",
  },
  {
    q: "What does 'Goods receipt has not been received' mean?",
    a: "In 3-way matching, payments are locked until the buyer's internal receiving team logs confirmation in their ERP that the products or service milestones were delivered. Even if your invoice is 100% accurate, payment cannot be released until the internal warehouse logs the GRN (Goods Receipt Note).",
  },
  {
    q: "Can an invoice rejection reset my payment terms (Net 30/60)?",
    a: "Yes. Many enterprise purchasing contracts state that payment terms (e.g., Net 30 or Net 60) begin only upon receipt of a 'valid, clean, and undisputed invoice'. Resolving exceptions quickly is critical so customer payment clocks do not reset.",
  },
  {
    q: "How can businesses reduce repeated invoice rejections?",
    a: "Establish strict pre-billing verification: confirm verified PO numbers upfront, enforce 1:1 line item matching, capture signed delivery proof (POD) on every shipment, and maintain customer-specific portal profiles. For scaling teams, Recify manages this entire invoice-to-cash lifecycle.",
  },
];

export function DecoderSeoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="mt-20 border-t border-border/80 pt-16">
      {/* 1. Explanatory Context: What is an invoice rejection? */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="kicker text-primary">Accounts Receivable Operations</p>
          <h2 className="display-heading mt-2 text-2xl md:text-3xl text-foreground">
            What happens when an invoice is rejected?
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Enterprise AP teams don't manually inspect every bill. Automated ERP systems (SAP,
            Oracle, Coupa, Workday) run automated two-way and three-way validation rules.
          </p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold">The 3-Way Match Rule</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              To disburse cash, enterprise systems require an exact three-way match:
              <br />
              <strong>1. Purchase Order</strong> (Procurement authorization)
              <br />
              <strong>2. Goods Receipt / SES</strong> (Warehouse / PM delivery confirmation)
              <br />
              <strong>3. Supplier Invoice</strong> (Billing document)
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            When any component fails to reconcile—whether by pennies in price tolerance or a missing
            warehouse scan—the invoice drops out of the automated payment workflow into an exception
            queue. Once in exception status, it is invisible to scheduled payment runs until someone
            takes manual action.
          </p>
          <p>
            According to accounts payable studies,{" "}
            <strong className="text-foreground">over 60% of invoice rejections</strong> stem from
            buyer-side administrative bottlenecks (closed PO lines, missing internal receiving
            sign-offs, or unallocated funds), rather than mathematical errors by the vendor.
          </p>
          <h3 className="font-display text-lg font-bold text-foreground pt-2">
            Why repeated invoice rejection is an AR workflow problem
          </h3>
          <p>
            When a supplier experiences repeated invoice rejections across multiple customers, it
            usually isn't a collection issue—it is an <em>operational handoff gap</em> between
            billing, delivery tracking, and customer portal management. Each unresolved rejection
            inflates Days Sales Outstanding (DSO) by an average of 28 to 45 days.
          </p>
        </div>
      </div>

      {/* 2. Common Rejection Hub / Knowledge Guides Grid (Section 11 & 12) */}
      <div className="mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="kicker text-muted-foreground">Operational Knowledge Base</p>
            <h2 className="display-heading mt-1 text-2xl md:text-3xl text-foreground">
              Explore Common Rejection Guides
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Deep-dive operational instructions for resolving specific invoice exceptions across
              major enterprise buyers and e-procurement portals.
            </p>
          </div>
          <Link
            to="/invoice-rejected"
            className="kicker text-primary hover:underline inline-flex items-center gap-1 shrink-0"
          >
            View all guides →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(SEO_GUIDES).map((guide) => (
            <Link
              key={guide.slug}
              to={`/invoice-rejected/${guide.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
            >
              <div>
                <span className="kicker text-primary text-[0.65rem]">{guide.kicker}</span>
                <h3 className="font-display mt-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {guide.h1}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                  {guide.summary}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs font-semibold text-primary">
                <span>Read resolution steps</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. The 5-Step Operational Resolution Protocol */}
      <div className="mt-20 rounded-3xl border border-border bg-card p-6 md:p-12">
        <div className="max-w-2xl">
          <p className="kicker text-primary">Standard Operating Procedure</p>
          <h2 className="display-heading mt-2 text-2xl md:text-3xl">
            What to do after an invoice is rejected
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Follow this operational protocol to prevent payment dates from resetting.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-5">
          {[
            {
              step: "01",
              title: "Log the code",
              desc: "Extract the exact rejection notice, portal status, or AP exception memo.",
            },
            {
              step: "02",
              title: "Identify party",
              desc: "Determine if the fix is buyer-side (procurement/warehouse) or supplier-side.",
            },
            {
              step: "03",
              title: "Gather evidence",
              desc: "Collect signed PODs, work orders, contracts, and itemized calculations.",
            },
            {
              step: "04",
              title: "Align & amend",
              desc: "Request PO reopenings or issue formatted credit notes rather than raw duplicates.",
            },
            {
              step: "05",
              title: "Verify ingestion",
              desc: "Track the resubmitted bill until status reads 'Approved for Payment'.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-2xl border border-border/70 bg-background p-4">
              <span className="display-heading text-xl text-primary">{item.step}</span>
              <h3 className="font-display mt-2 text-sm font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Natural Recify Managed Service Transition (Section 9 & 10) */}
      <div className="mt-20 rounded-3xl border border-primary/30 bg-foreground p-8 text-background md:p-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <span className="kicker text-primary font-bold">Recify Managed AR Service</span>
            <h2 className="display-heading mt-3 text-2xl md:text-4xl">
              You found the blocker. <br />
              <span className="text-primary">You don't necessarily have to own the follow-up.</span>
            </h2>
            <p className="mt-4 text-sm text-background/80 leading-relaxed md:text-base">
              Recify operates the entire work between invoice and cash. Our team handles portal
              submissions, PO reconciliations, goods receipt follow-ups, and dispute resolution—so
              your staff can focus on running your business.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-3">
            <Link
              to="/start"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 text-center"
            >
              Get your free AR health check
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-background transition-colors hover:bg-background/10 text-center"
            >
              Talk to Recify
            </Link>
          </div>
        </div>
      </div>

      {/* 5. FAQ Section (Section 32) */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="kicker text-muted-foreground">Frequently Asked Questions</p>
          <h2 className="display-heading mt-2 text-2xl md:text-3xl">
            Frequently Asked Questions About Invoice Rejections
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Clear operational answers to common B2B invoice exception and payment hold queries.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-foreground transition-colors hover:bg-muted/30"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border/60 bg-background/50 px-5 pb-5 pt-3">
                    <p className="text-xs leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
