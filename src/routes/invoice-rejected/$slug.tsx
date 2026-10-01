import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  FileText,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { SectionContainer, WhatsAppButton } from "../../components/recify";
import { SEO_GUIDES } from "../../lib/decoder/seo-data";
import { cn } from "../../lib/utils";

export const Route = createFileRoute("/invoice-rejected/$slug")({
  loader: ({ params }) => {
    const guide = SEO_GUIDES[params.slug];
    if (!guide) {
      throw notFound();
    }
    return guide;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: loaderData.title },
        { name: "description", content: loaderData.metaDescription },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.metaDescription },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://recify.in/invoice-rejected/${loaderData.slug}`,
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.h1,
            description: loaderData.metaDescription,
            publisher: {
              "@type": "Organization",
              name: "Recify",
              url: "https://recify.in",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://recify.in/invoice-rejected/${loaderData.slug}`,
            },
          }),
        },
        ...(loaderData.faqs.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: loaderData.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.answer,
                    },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: GuideDetailPage,
});

function GuideDetailPage() {
  const guide = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        `Subject: ${guide.emailTemplate.subject}\n\n${guide.emailTemplate.body}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <article className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/tools/invoice-rejection-decoder" className="hover:text-foreground">
                  Decoder
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/invoice-rejected" className="hover:text-foreground">
                  Guides
                </Link>
              </li>
              <li>/</li>
              <li className="text-primary truncate max-w-[200px] md:max-w-none">{guide.h1}</li>
            </ol>
          </nav>

          {/* Guide Header */}
          <div className="max-w-4xl">
            <span className="kicker text-primary">{guide.kicker}</span>
            <h1 className="display-heading mt-3 text-3xl md:text-5xl text-foreground">
              {guide.h1}
            </h1>
            <p className="mt-4 text-base md:text-xl text-muted-foreground leading-relaxed">
              {guide.summary}
            </p>
          </div>

          {/* Quick Decoder Action Banner */}
          <div className="my-10 rounded-2xl border border-primary/30 bg-primary/10 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-display text-sm md:text-base font-bold text-foreground">
                Received this rejection notice right now?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Run it through our automated decoder to generate an immediate customized resolution
                response.
              </p>
            </div>
            <Link
              to="/tools/invoice-rejection-decoder"
              search={{ q: guide.sampleRejectionPhrase }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              Test in Decoder →
            </Link>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mt-12">
            <div className="lg:col-span-8 space-y-10">
              {/* Section 1: What it means */}
              <section>
                <h2 className="display-heading text-2xl text-foreground">
                  What this rejection means
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {guide.whatItMeans}
                </p>
              </section>

              {/* Section 2: Common reasons */}
              <section>
                <h2 className="display-heading text-2xl text-foreground">
                  Common reasons it occurs
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {guide.commonReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 3: What the buyer is checking */}
              <section className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold text-foreground">
                  What the buyer's system is checking
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {guide.whatBuyerIsChecking}
                </p>
              </section>

              {/* Section 4: What supplier should verify */}
              <section>
                <h2 className="display-heading text-2xl text-foreground">
                  What your billing desk should verify
                </h2>
                <div className="mt-4 space-y-2.5">
                  {guide.whatSupplierShouldVerify.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-border/80 bg-background p-4 text-sm text-foreground/90 flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Common mistakes to avoid */}
              <section className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                <div className="flex items-center gap-2 text-destructive font-display font-bold">
                  <AlertTriangle className="h-5 w-5" />
                  Common mistakes to avoid
                </div>
                <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                  {guide.commonMistakesToAvoid.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-destructive">✕</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 6: How to resolve step-by-step */}
              <section>
                <h2 className="display-heading text-2xl text-foreground">
                  Step-by-step resolution process
                </h2>
                <div className="mt-5 space-y-4">
                  {guide.howToResolve.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border bg-background p-5 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {idx + 1}
                        </span>
                        <h4 className="font-display font-bold text-foreground">{item.step}</h4>
                      </div>
                      <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed pl-9">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Buyer-ready email template */}
              <section className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold">What to say to the buyer</h3>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy template
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-border/80 bg-background p-4 text-xs font-mono">
                  <p className="font-bold text-foreground">
                    Subject: {guide.emailTemplate.subject}
                  </p>
                  <pre className="mt-3 font-sans whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {guide.emailTemplate.body}
                  </pre>
                </div>
              </section>

              {/* Section 8: Evidence required */}
              <section>
                <h3 className="font-display text-lg font-bold">
                  Evidence to gather before submitting
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {guide.evidenceRequired.map((ev, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-foreground/90"
                    >
                      ✓ {ev}
                    </span>
                  ))}
                </div>
              </section>

              {/* Section 9: Prevention */}
              <section>
                <h3 className="font-display text-lg font-bold">How to prevent recurrence</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {guide.preventionTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-bold">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQs */}
              {guide.faqs.length > 0 && (
                <section className="border-t border-border pt-8">
                  <h3 className="font-display text-xl font-bold">Frequently Asked Questions</h3>
                  <div className="mt-4 space-y-3">
                    {guide.faqs.map((faq, idx) => (
                      <div key={idx} className="rounded-xl border border-border bg-card p-4">
                        <p className="font-display text-sm font-bold text-foreground">
                          {faq.question}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar / Recify Managed Service Bridge */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-24 rounded-3xl border border-primary/30 bg-card p-6 md:p-8">
                <span className="kicker text-primary">Recify Managed AR</span>
                <h3 className="display-heading text-xl mt-2 text-foreground">
                  Stop chasing invoice exceptions manually.
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  When invoice rejections cause payment delays, your team spends days chasing PO
                  reopenings, warehouse receipts, and AP clerks.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Recify operates the entire invoice-to-cash workflow for B2B companies—resolving
                  exceptions, managing customer portals, and ensuring undisputed payments arrive on
                  time.
                </p>
                <div className="mt-6 flex flex-col gap-2.5">
                  <Link
                    to="/start"
                    className="rounded-full bg-primary px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                  >
                    Get free AR health check →
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full border border-border bg-background px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted"
                  >
                    Talk to Recify →
                  </Link>
                </div>

                <div className="mt-8 border-t border-border/80 pt-6">
                  <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground font-bold">
                    Other Rejection Guides
                  </p>
                  <div className="mt-3 flex flex-col gap-2 text-xs">
                    {Object.values(SEO_GUIDES)
                      .filter((g) => g.slug !== guide.slug)
                      .slice(0, 5)
                      .map((g) => (
                        <Link
                          key={g.slug}
                          to={`/invoice-rejected/${g.slug}`}
                          className="text-foreground hover:text-primary transition-colors truncate"
                        >
                          → {g.h1}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </article>
      <WhatsAppButton />
    </>
  );
}
