import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionContainer, SectionHeader, ButtonSecondary, WhatsAppButton } from "../components/recify";
import { securityPage, global } from "../lib/site-content";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Recify" },
      { name: "description", content: "How Recify collects, uses, stores and deletes the information you share with us." },
      { property: "og:title", content: "Privacy Policy — Recify" },
      { property: "og:description", content: "How Recify collects, uses, stores and deletes your information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PrivacyPage() {
  return (
    <>
      <section className="section-padding pt-28 md:pt-36">
        <SectionContainer>
          <SectionHeader
            kicker="Privacy"
            title="Privacy"
            highlight="Policy."
            subtitle="Recify works inside your financial data. This page summarises what we collect and how it is handled."
            align="center"
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            <Block title="Information we collect">
              Contact and business details you submit through our forms (name, company, email, phone) and the receivables
              information you choose to share with us for an assessment or for service delivery.
            </Block>
            <Block title="How we use it">
              Only to respond to your enquiry, prepare the requested assessment and operate the agreed service. Your data is
              handled confidentially and only used for the agreed assessment.
            </Block>
            <Block title="Controls we operate">
              <ul className="mt-3 space-y-2">
                {securityPage.controls.map((control) => (
                  <li key={control} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {control}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="What we don't claim">{securityPage.disclaimer}</Block>
            <Block title="Retention, deletion and contact">
              Data retention and deletion follow a defined process, and access is revoked at offboarding. For access,
              correction or deletion requests, contact{" "}
              <a href={global.email} className="font-bold text-primary hover:underline">
                {global.emailLabel}
              </a>
              .
            </Block>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <ButtonSecondary to="/security">Read our data practices</ButtonSecondary>
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
