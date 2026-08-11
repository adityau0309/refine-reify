import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, X, ChevronDown, MessageCircle, Phone, Mail, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";
import * as content from "../lib/site-content";

/* -------------------------------------------------------------------------- */
/*  Section primitives                                                        */
/* -------------------------------------------------------------------------- */

export function SectionContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl px-4 md:px-6", className)}>{children}</div>;
}

export function SectionHeader({
  kicker,
  title,
  highlight,
  subtitle,
  align = "left",
}: {
  kicker?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto", align === "center" ? "text-center" : "text-left")}>
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl">
        <Highlight text={title} highlight={highlight} />
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}

function Highlight({ text, highlight }: { text: string; highlight?: string | undefined }) {
  if (!highlight) return <>{text}</>;
  const parts = text.split(highlight);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-primary">{highlight}</span>}
        </span>
      ))}
    </>
  );
}

export function ButtonPrimary({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90",
        className
      )}
    >
      {children}
      <ArrowRightIcon />
    </Link>
  );
}

export function ButtonSecondary({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-foreground/5",
        className
      )}
    >
      {children}
      <ArrowRightIcon />
    </Link>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={content.global.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-4 w-4 fill-current" />
      {content.global.whatsappLabel}
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Home                                                                      */
/* -------------------------------------------------------------------------- */

export function HomeHero() {
  const { hero } = content;
  return (
    <section className="section-padding pt-24 md:pt-32">
      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl">
              {hero.title}{" "}
              <span className="text-primary">{hero.highlight}</span>
            </h1>
            <p className="kicker mt-4 text-foreground">{hero.tagline}</p>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{hero.description}</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <ButtonPrimary to={hero.primaryCta.to}>{hero.primaryCta.label}</ButtonPrimary>
              <ButtonSecondary to={hero.secondaryCta.to}>{hero.secondaryCta.label}</ButtonSecondary>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{hero.trustLine}</p>
          </div>

          <div className="relative aspect-video">
            <video
              src="/assets/hero-loop.mp4"
              poster="/assets/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="video-blend h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(75% 75% at 50% 50%, transparent 28%, var(--color-background) 100%)",
              }}
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function TrustPill() {
  const { trustPill } = content;
  return (
    <section className="pb-8 md:pb-12">
      <SectionContainer>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {trustPill.items.map((item) => (
              <div key={item.number} className="flex items-baseline gap-3">
                <span className="display-heading text-2xl text-muted-foreground">{item.number}</span>
                <span className="font-display text-sm font-bold uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-6 md:mt-8 md:pt-8">
            <p className="italic text-muted-foreground">{trustPill.summary}</p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function ProblemSection() {
  const { problem } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeader kicker={problem.kicker} title={problem.title} />
            <p className="mt-6 max-w-xl text-muted-foreground">{problem.intro}</p>
            <div className="mt-8">
              <ButtonPrimary to={problem.cta.to}>{problem.cta.label}</ButtonPrimary>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {problem.issues.map((issue) => (
              <div key={issue.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold">{issue.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function ServicesSection() {
  const { services } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={services.kicker} title={services.title} subtitle={services.subtitle} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.items.map((item) => (
            <div
              key={item.number}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 md:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="display-heading text-3xl text-primary">{item.number}</span>
                <h3 className="display-heading text-2xl">{item.title}</h3>
              </div>
              <p className="mt-3 text-muted-foreground">{item.description}</p>
              <ul className="mt-6 space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <p className="kicker mb-1">Outcome</p>
                <p className="font-medium">{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonPrimary to={services.cta.to}>{services.cta.label}</ButtonPrimary>
        </div>
      </SectionContainer>
    </section>
  );
}

export function DifferentiatorSection() {
  const { differentiator } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader
          kicker={differentiator.kicker}
          title={differentiator.title}
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-xl font-bold">{differentiator.ai.title}</h3>
            <ul className="mt-4 space-y-2">
              {differentiator.ai.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-foreground p-6 text-background md:p-8">
            <h3 className="font-display text-xl font-bold">{differentiator.human.title}</h3>
            <ul className="mt-4 space-y-2">
              {differentiator.human.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-background/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-lg font-medium">{differentiator.closing}</p>
      </SectionContainer>
    </section>
  );
}

export function ModelSection() {
  const { model } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={model.kicker} title={model.title} align="center" />
        <div className="mt-12 overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-2 divide-x divide-border bg-muted">
            <div className="p-4 text-sm font-bold uppercase tracking-wider text-muted-foreground md:p-6">
              Traditional software
            </div>
            <div className="p-4 text-sm font-bold uppercase tracking-wider text-primary md:p-6">Recify</div>
          </div>
          {model.rows.map((row, index) => (
            <div key={index} className="grid grid-cols-2 divide-x divide-border border-t border-border">
              <div className="p-4 text-sm text-muted-foreground md:p-6">{row.traditional}</div>
              <div className="bg-accent/30 p-4 text-sm font-medium md:p-6">{row.recify}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-lg font-medium">{model.closing}</p>
      </SectionContainer>
    </section>
  );
}

export function StepsSection() {
  const { steps } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={steps.kicker} title={steps.title} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.items.map((item) => (
            <div key={item.number} className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <span className="display-heading text-3xl text-primary">{item.number}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">{steps.note}</p>
      </SectionContainer>
    </section>
  );
}

export function IndustriesSection() {
  const { industries } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={industries.kicker} title={industries.title} subtitle={industries.subtitle} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {industries.items.map((item) => (
            <div
              key={item.title}
              className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/30 md:p-8"
            >
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <ul className="mt-4 space-y-1.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Link
                  to="/industries"
                  className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:underline"
                >
                  View industry
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonSecondary to={industries.cta.to}>{industries.cta.label}</ButtonSecondary>
        </div>
      </SectionContainer>
    </section>
  );
}

export function IdealFitSection() {
  const { idealFit } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={idealFit.kicker} title={idealFit.title} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider">A strong fit</h3>
            <ul className="mt-4 space-y-2">
              {idealFit.strong.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider">Not a fit if</h3>
            <ul className="mt-4 space-y-2">
              {idealFit.not.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function HealthCheckSection() {
  const { healthCheck } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-border bg-card p-6 md:p-12 lg:grid-cols-2">
          <div>
            <SectionHeader kicker={healthCheck.kicker} title={healthCheck.title} />
            <p className="mt-4 text-muted-foreground">{healthCheck.description}</p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <ButtonPrimary to={healthCheck.cta.to}>{healthCheck.cta.label}</ButtonPrimary>
            <p className="text-sm text-muted-foreground">{healthCheck.note}</p>
            <Link to={healthCheck.securityCta.to} className="text-sm font-bold text-primary hover:underline">
              {healthCheck.securityCta.label}
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function OutcomesSection() {
  const { outcomes } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={outcomes.kicker} title={outcomes.title} align="center" />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {outcomes.items.map((item) => (
            <div key={item.number} className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <span className="display-heading text-3xl text-primary">{item.number}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export function PricingTeaser() {
  const { pricingTeaser } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader
          kicker={pricingTeaser.kicker}
          title={pricingTeaser.title}
          subtitle={pricingTeaser.subtitle}
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingTeaser.tiers.map((tier) => (
            <div
              key={tier.title}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border bg-card p-6 md:p-8",
                tier.recommended ? "border-primary" : "border-border"
              )}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Recommended
                </span>
              )}
              <p className="kicker">{tier.tier}</p>
              <h3 className="display-heading mt-2 text-2xl">{tier.title}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="display-heading text-3xl">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <p className="mt-4 font-medium">{tier.tagline}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonPrimary to={pricingTeaser.cta.to}>{pricingTeaser.cta.label}</ButtonPrimary>
        </div>
      </SectionContainer>
    </section>
  );
}

export function SecurityTeaser() {
  const { securityTeaser } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="rounded-3xl border border-border bg-card p-6 md:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader kicker={securityTeaser.kicker} title={securityTeaser.title} />
              <div className="mt-6">
                <ButtonSecondary to={securityTeaser.cta.to}>{securityTeaser.cta.label}</ButtonSecondary>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {securityTeaser.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function FaqTeaser() {
  const { faqTeaser } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <SectionHeader kicker={faqTeaser.kicker} title={faqTeaser.title} subtitle={faqTeaser.intro} align="center" />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqAccordion items={faqTeaser.items} />
        </div>
        <div className="mt-10 text-center">
          <ButtonSecondary to={faqTeaser.cta.to}>{faqTeaser.cta.label}</ButtonSecondary>
        </div>
      </SectionContainer>
    </section>
  );
}

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-3xl border border-border bg-card">
      {items.map((item, index) => (
        <div key={item.question}>
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left md:px-8 md:py-5"
            aria-expanded={open === index}
          >
            <span className="font-display text-base font-bold md:text-lg">{item.question}</span>
            <ChevronDown
              className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform", open === index && "rotate-180")}
            />
          </button>
          {open === index && (
            <div className="px-6 pb-5 text-sm text-muted-foreground md:px-8 md:pb-6">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared page pieces                                                        */
/* -------------------------------------------------------------------------- */

export function PageHero({ id }: { id: keyof typeof content.pageHeroes }) {
  const p = content.pageHeroes[id]!;
  return (
    <section className="section-padding pt-28 md:pt-36">
      <SectionContainer>
        <div className="mx-auto max-w-4xl text-center">
          <p className="kicker mb-3">{p.kicker}</p>
          <h1 className="display-heading text-4xl md:text-5xl lg:text-6xl">
            {p.title} <span className="text-primary">{p.highlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{p.subtitle}</p>
        </div>
      </SectionContainer>
    </section>
  );
}

export function FullPricingSection() {
  const { fullPricing } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {fullPricing.tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border bg-card p-6 md:p-8",
                tier.recommended ? "border-primary" : "border-border"
              )}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Recommended
                </span>
              )}
              <h3 className="display-heading mt-2 text-2xl">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="display-heading text-3xl">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
              <p className="mt-4 font-medium">{tier.tagline}</p>
              <p className="mt-2 text-sm text-muted-foreground">Best for: {tier.bestFor}</p>
              <ul className="mt-6 flex-1 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonPrimary to={tier.cta.to} className="w-full justify-center">
                  {tier.cta.label}
                </ButtonPrimary>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">{fullPricing.disclaimer}</p>

        <div className="mt-20">
          <SectionHeader kicker="Pricing questions" title="Before you choose a tier" align="center" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={fullPricing.beforeYouChoose} />
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-border bg-card p-8 text-center md:p-12">
          <h3 className="display-heading text-2xl">{fullPricing.nextStep.title}</h3>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{fullPricing.nextStep.description}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonPrimary to={fullPricing.nextStep.primary.to}>{fullPricing.nextStep.primary.label}</ButtonPrimary>
            <ButtonSecondary to={fullPricing.nextStep.secondary.to}>{fullPricing.nextStep.secondary.label}</ButtonSecondary>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function SecurityGrid() {
  const { securityPage } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityPage.controls.map((control) => (
            <div key={control} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{control}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="font-display text-lg font-bold">What we don't claim</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{securityPage.disclaimer}</p>
        </div>
      </SectionContainer>
    </section>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="display-heading mt-4 text-xl">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll review your details and reply within one business day. For urgent questions, reach us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Full name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
            placeholder="Jane Smith"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Company
          <input
            required
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
            placeholder="Acme Inc."
          />
        </label>
      </div>
      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
        Work email
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
          placeholder="jane@company.com"
        />
      </label>
      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
        Anything we should know (optional)
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
          placeholder="Tell us about your AR challenge..."
        />
      </label>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
      >
        Book a fit call
        <ArrowRightIcon />
      </button>
      <p className="mt-4 text-sm text-muted-foreground">
        Or email{" "}
        <a href={content.global.email} className="font-bold text-primary hover:underline">
          {content.global.emailLabel}
        </a>
      </p>
    </form>
  );
}

export function ContactDetails() {
  const { contactPage } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-wider">What we'll cover</h3>
            <ul className="mt-6 space-y-4">
              {contactPage.whatWellCover.map((item) => (
                <li key={item.number} className="flex items-start gap-3">
                  <span className="display-heading text-xl text-primary">{item.number}</span>
                  <span className="font-medium">{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonSecondary to={contactPage.orStart.to}>{contactPage.orStart.label}</ButtonSecondary>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Direct contact</p>
            <a href={content.global.email} className="mt-3 block text-lg font-bold text-primary hover:underline">
              {content.global.emailLabel}
            </a>
            <div className="mt-6 space-y-3">
              {contactPage.phones.map((phone) => (
                <a
                  key={phone.label}
                  href={phone.href}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {phone.label}
                </a>
              ))}
            </div>
            <a
              href={content.global.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              WhatsApp
            </a>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export function StartForm() {
  const [form, setForm] = useState({ business: "", invoices: "", ar: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);

  const options = [
    "Construction & Trade",
    "Freight / Logistics",
    "Wholesale / Distribution",
    "Professional / Business Services",
    "Other B2B",
  ];

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center md:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="display-heading mt-4 text-xl">Thanks — we'll be in touch</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We've received your answers. A specialist will review them and recommend the right next step within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-10"
    >
      <p className="kicker">1 / 8</p>
      <h2 className="display-heading mt-2 text-2xl">What kind of business are you?</h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
              form.business === option ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-accent"
            )}
          >
            <input
              type="radio"
              name="business"
              value={option}
              checked={form.business === option}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-sm font-medium">{option}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          How many invoices do you send each month?
          <input
            required
            value={form.invoices}
            onChange={(e) => setForm({ ...form, invoices: e.target.value })}
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
            placeholder="e.g. 80"
          />
        </label>
      </div>

      <div className="mt-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          What is your biggest AR challenge right now?
          <textarea
            required
            value={form.ar}
            onChange={(e) => setForm({ ...form, ar: e.target.value })}
            rows={3}
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
            placeholder="Late payments, disputes, missing documentation..."
          />
        </label>
      </div>

      <div className="mt-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Best email to reach you
          <input
            required
            type="email"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2"
            placeholder="you@company.com"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Submit answers
        <ArrowRightIcon />
      </button>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Prefer to talk first?{" "}
        <Link to="/contact" className="font-bold text-primary hover:underline">
          Book an AR fit call
        </Link>
      </p>
    </form>
  );
}

export function ResultGrid() {
  const { outcomes } = content;
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.items.map((item) => (
            <div key={item.number} className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <span className="display-heading text-3xl text-primary">{item.number}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export function ClaimsNote() {
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <h3 className="font-display text-lg font-bold">A note on claims</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We don't publish recovery percentages, DSO improvements or case studies until we have verified client data to support them. When we do, they'll appear here with the client's permission.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}

export function AboutValues() {
  const values = [
    {
      number: "01",
      title: "Lean by design",
      description: "We operate a tight process rather than a large team, so the cost of an AR function stays proportionate to the business.",
    },
    {
      number: "02",
      title: "Technology-enabled",
      description: "AI and automation absorb the repetitive volume — preparation, sequencing, matching, monitoring and reporting.",
    },
    {
      number: "03",
      title: "Human accountable",
      description: "A specialist owns your account. Disputes, negotiation, escalation and sensitive conversations are handled by people.",
    },
  ];
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.number} className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <span className="display-heading text-3xl text-primary">{value.number}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export function WhereWeWork() {
  return (
    <section className="section-padding">
      <SectionContainer>
        <div className="rounded-3xl border border-border bg-card p-6 md:p-12">
          <h3 className="font-display text-2xl font-bold">Built for growing B2B businesses internationally.</h3>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            We support B2B companies across Australia, the United States, Canada, the United Kingdom, the UAE, South Africa and other English-speaking markets — subject to operational, regulatory and communication requirements.
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
