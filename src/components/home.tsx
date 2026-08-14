import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "../lib/utils";
import * as content from "../lib/site-content";
import { SectionContainer, SectionHeader, ButtonPrimary, ButtonSecondary } from "./recify";

/* -------------------------------------------------------------------------- */
/*  1. Hero                                                                   */
/* -------------------------------------------------------------------------- */

const flowStages = ["Invoice", "Follow-up", "Blocker", "Resolution", "Payment", "Cash flow"];

export function Hero() {
  const { hero } = content;
  return (
    <section className="pt-14 pb-16 md:pt-20 md:pb-24">
      <SectionContainer>
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker text-muted-foreground">{hero.tagline}</p>
          <h1 className="display-heading mt-4 text-4xl md:text-5xl lg:text-[3.75rem]">
            Get Your Outstanding Revenue Moving —{" "}
            <span className="text-primary">Without Adding AR Headcount.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonPrimary to={hero.primaryCta.to}>{hero.primaryCta.label}</ButtonPrimary>
            <ButtonSecondary to="/how-it-works">See how it works</ButtonSecondary>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{hero.trustLine}</p>
        </div>

        {/* Video — deliberate focal point, framed rather than washed out */}
        <div className="relative mx-auto mt-12 max-w-5xl md:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]">
            <video
              src="/assets/hero-loop.mp4"
              poster="/assets/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Invoice to cash flow animation"
              className="aspect-[16/10] h-full w-full object-cover md:aspect-video"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in oklab, var(--color-foreground) 55%, transparent) 0%, transparent 45%)",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-6">
              <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
                {flowStages.map((stage, i) => (
                  <li key={stage} className="flex items-center gap-2">
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      {stage}
                    </span>
                    {i < flowStages.length - 1 && (
                      <span aria-hidden="true" className="text-white/50">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. What Recify is                                                         */
/* -------------------------------------------------------------------------- */

const whatCards = [
  {
    number: "01",
    label: "Revenue Recovery",
    description: content.services.items[0]!.description,
  },
  {
    number: "02",
    label: "Dispute Resolution",
    description: content.services.items[1]!.description,
  },
  {
    number: "03",
    label: "Cash Flow Intelligence",
    description: content.services.items[2]!.description,
  },
];

export function WhatRecifyIs() {
  return (
    <section className="section-padding border-y border-border bg-card/60">
      <SectionContainer>
        <SectionHeader
          kicker="What Recify is"
          title="Revenue isn't real until it becomes cash."
          align="center"
          subtitle={content.problem.intro}
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whatCards.map((card) => (
            <div key={card.number} className="rounded-3xl border border-border bg-background p-6 md:p-8">
              <span className="display-heading text-2xl text-primary">{card.number}</span>
              <h3 className="mt-3 font-display text-lg font-bold md:text-xl">{card.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. The 3-part system (progressive disclosure)                             */
/* -------------------------------------------------------------------------- */

const systemNames = ["Revenue Recovery Engine", "Dispute Resolution System", "Cash Flow Intelligence"];

export function SystemCards() {
  const [open, setOpen] = useState<number | null>(null);
  const { services } = content;

  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={services.kicker} title={services.title} align="center" subtitle={services.subtitle} />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {services.items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.number}
                className={cn(
                  "flex flex-col rounded-3xl border bg-card p-6 transition-colors md:p-8",
                  isOpen ? "border-primary" : "border-border"
                )}
              >
                <span className="display-heading text-3xl text-primary">{item.number}</span>
                <h3 className="mt-3 font-display text-xl font-bold">{systemNames[index]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-4 border-t border-border pt-4 text-sm font-medium">{item.outcome}</p>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="kicker mt-5 inline-flex items-center gap-2 text-primary transition-opacity hover:opacity-70"
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {isOpen ? "Hide details" : "What's included"}
                </button>

                {isOpen && (
                  <ul className="mt-4 space-y-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <ButtonSecondary to={services.cta.to}>{services.cta.label}</ButtonSecondary>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. How it works                                                           */
/* -------------------------------------------------------------------------- */

export function HowItWorksFlow() {
  const { steps } = content;
  return (
    <section className="section-padding border-y border-border bg-card/60">
      <SectionContainer>
        <SectionHeader kicker={steps.kicker} title={steps.title} align="center" />
        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((step) => (
            <li key={step.number} className="relative rounded-3xl border border-border bg-background p-6">
              <span className="kicker text-primary">{step.number}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center text-xs text-muted-foreground">{steps.note}</p>
        <div className="mt-8 text-center">
          <ButtonSecondary to="/how-it-works">See the full system</ButtonSecondary>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. Why Recify                                                             */
/* -------------------------------------------------------------------------- */

export function WhyRecify() {
  const { differentiator, model } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={differentiator.kicker} title={differentiator.title} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[differentiator.ai, differentiator.human].map((column) => (
            <div key={column.title} className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <h3 className="font-display text-lg font-bold md:text-xl">{column.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {column.items.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-foreground p-8 text-center text-background md:p-10">
          <p className="display-heading text-xl md:text-2xl">{model.closing}</p>
          <p className="mt-3 text-sm text-background/70">{differentiator.closing}</p>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. Results                                                                */
/* -------------------------------------------------------------------------- */

export function ResultsStrip() {
  const { outcomes } = content;
  return (
    <section className="section-padding border-y border-border bg-card/60">
      <SectionContainer>
        <SectionHeader kicker={outcomes.kicker} title={outcomes.title} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.items.map((item) => (
            <div key={item.number} className="rounded-3xl border border-border bg-background p-6">
              <span className="kicker text-primary">{item.number}</span>
              <h3 className="mt-2 font-display text-base font-bold md:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonSecondary to="/results">See what changes</ButtonSecondary>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. Ideal fit                                                              */
/* -------------------------------------------------------------------------- */

export function IdealFitCompact() {
  const { idealFit } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="kicker mb-3">{idealFit.kicker}</p>
            <h2 className="display-heading text-3xl md:text-4xl">{idealFit.title}</h2>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ButtonPrimary to="/start">Get your free AR health check</ButtonPrimary>
              <ButtonSecondary to="/industries">Check your industry</ButtonSecondary>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2 md:p-8">
            {idealFit.strong.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. Pricing                                                                */
/* -------------------------------------------------------------------------- */

export function PricingHome() {
  const { fullPricing, pricingTeaser } = content;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="section-padding border-y border-border bg-card/60">
      <SectionContainer>
        <SectionHeader
          kicker={pricingTeaser.kicker}
          title={pricingTeaser.title}
          align="center"
          subtitle={pricingTeaser.subtitle}
        />
        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {fullPricing.tiers.map((tier) => {
            const isOpen = open === tier.name;
            const visible = tier.features.slice(0, 5);
            const rest = tier.features.slice(5);
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border bg-background p-6 md:p-8",
                  tier.recommended ? "border-primary shadow-sm" : "border-border"
                )}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                    Recommended
                  </span>
                )}
                <h3 className="display-heading text-2xl">{tier.name}</h3>
                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <span className="display-heading text-3xl">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>
                <p className="mt-4 font-medium">{tier.tagline}</p>
                <p className="mt-2 text-sm text-muted-foreground">{tier.bestFor}</p>

                <ul className="mt-6 space-y-2">
                  {(isOpen ? tier.features : visible).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {rest.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : tier.name)}
                    aria-expanded={isOpen}
                    className="kicker mt-4 inline-flex items-center gap-2 text-primary transition-opacity hover:opacity-70"
                  >
                    {isOpen ? "Hide details" : `View all ${tier.features.length} inclusions`}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                  </button>
                )}

                <div className="mt-8 pt-2">
                  <ButtonPrimary to={tier.cta.to} className="w-full justify-center">
                    {tier.cta.label}
                  </ButtonPrimary>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted-foreground">{fullPricing.disclaimer}</p>
        <div className="mt-8 text-center">
          <ButtonSecondary to="/pricing">See full pricing</ButtonSecondary>
        </div>
      </SectionContainer>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  9. FAQ (short)                                                            */
/* -------------------------------------------------------------------------- */

export function FaqShort() {
  const { faqTeaser } = content;
  const [open, setOpen] = useState<number | null>(null);
  const items = faqTeaser.items.slice(0, 4);

  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={faqTeaser.kicker} title={faqTeaser.title} align="center" />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card">
          {items.map((item, index) => (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left md:px-8 md:py-5"
              >
                <span className="font-display text-base font-bold md:text-lg">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    open === index && "rotate-180"
                  )}
                />
              </button>
              {open === index && (
                <div className="px-6 pb-5 text-sm text-muted-foreground md:px-8 md:pb-6">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/faq" className="kicker text-primary hover:opacity-70">
            Read all questions
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
