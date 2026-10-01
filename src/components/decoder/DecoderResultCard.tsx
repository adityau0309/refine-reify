import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckSquare,
  Copy,
  FileText,
  HelpCircle,
  Info,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { DiagnosisResult } from "../../lib/decoder/types";
import { cn } from "../../lib/utils";

interface DecoderResultCardProps {
  result: DiagnosisResult;
  onReset?: () => void;
}

export function DecoderResultCard({ result, onReset }: DecoderResultCardProps) {
  const { category, confidence, detectedPortal } = result;
  const [copied, setCopied] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  const [checkedEvidence, setCheckedEvidence] = useState<Record<string, boolean>>({});

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        `Subject: ${category.emailTemplate.subject}\n\n${category.emailTemplate.body}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy email text", e);
    }
  };

  const toggleEvidence = (name: string) => {
    setCheckedEvidence((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const getPartyBadgeColor = (party: string) => {
    if (party.includes("Buyer")) {
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    }
    if (party.includes("Supplier")) {
      return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300";
    }
    return "border-primary/30 bg-primary/10 text-primary";
  };

  const getConfidenceBadge = (level: string) => {
    if (level === "High") {
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20";
    }
    if (level === "Medium") {
      return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20";
    }
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="kicker text-muted-foreground">{category.category}</span>
          {detectedPortal && (
            <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-foreground">
              Portal: {detectedPortal}
            </span>
          )}
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              getConfidenceBadge(confidence),
            )}
          >
            {confidence} Confidence
          </span>
        </div>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← Decode Another Rejection
          </button>
        )}
      </div>

      {/* Main Diagnosis Title */}
      <div className="mt-6">
        <h3 className="display-heading text-2xl md:text-3xl text-foreground">{category.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
          {category.whatHappened}
        </p>
      </div>

      {/* Grid: Who Needs to Act & Avoid */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Who needs to act */}
        <div className="rounded-2xl border border-border/80 bg-background p-5">
          <div className="flex items-center gap-2.5">
            <UserCheck className="h-5 w-5 text-primary" />
            <p className="kicker text-foreground">Who needs to act?</p>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
                getPartyBadgeColor(category.actionParty),
              )}
            >
              {category.actionParty}
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {category.actionParty.includes("Buyer")
              ? "The primary blocker sits in your customer's procurement or receiving systems. Your billing team cannot force release without customer-side action."
              : "Action is required on the supplier billing side to align the invoice with customer compliance rules before resubmitting."}
          </p>
        </div>

        {/* What to avoid */}
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="kicker text-destructive font-bold">What to avoid</p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-foreground/90">{category.whatToAvoid}</p>
        </div>
      </div>

      {/* Concrete Next Actions */}
      <div className="mt-8 rounded-2xl border border-border bg-background p-6">
        <p className="kicker text-primary">Concrete next steps</p>
        <h4 className="font-display mt-1 text-lg font-bold">What should you do right now?</h4>
        <ol className="mt-4 space-y-3">
          {category.concreteActions.map((action, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {idx + 1}
              </span>
              <span className="text-foreground/90">{action}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Buyer-Ready Communication Template */}
      <div className="mt-8 rounded-2xl border border-border bg-background p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="kicker text-muted-foreground">What should I send?</p>
            <h4 className="font-display mt-1 text-lg font-bold">
              Buyer-Ready Communication Template
            </h4>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all",
              copied
                ? "bg-emerald-600 text-white"
                : "border border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy email text
              </>
            )}
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-border/80 bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground">
            Subject: <span className="text-foreground">{category.emailTemplate.subject}</span>
          </p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-xs leading-relaxed text-foreground/90">
            {category.emailTemplate.body}
          </pre>
        </div>
      </div>

      {/* Evidence Checklist */}
      <div className="mt-8 rounded-2xl border border-border bg-background p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker text-muted-foreground">Evidence checklist</p>
            <h4 className="font-display mt-1 text-lg font-bold">
              Documents to gather before following up
            </h4>
          </div>
          <CheckSquare className="h-5 w-5 text-muted-foreground" />
        </div>

        <ul className="mt-4 divide-y divide-border/60">
          {category.evidenceChecklist.map((item, idx) => {
            const isChecked = !!checkedEvidence[item.name];
            return (
              <li
                key={idx}
                onClick={() => toggleEvidence(item.name)}
                className="flex cursor-pointer items-start gap-3 py-3 transition-colors hover:bg-muted/30 rounded-lg px-2 -mx-2"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleEvidence(item.name)}
                  className="mt-1 h-4 w-4 shrink-0 rounded accent-primary cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isChecked ? "line-through text-muted-foreground" : "text-foreground",
                      )}
                    >
                      {item.name}
                    </span>
                    {item.essential && (
                      <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase text-destructive">
                        Essential
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Technical Details Accordion */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setShowTechnical(!showTechnical)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="inline-flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Technical & ERP Details (
            {category.technicalDetails.relevantCodes?.join(", ") || "Details"})
          </span>
          <span>{showTechnical ? "− Hide" : "+ Expand"}</span>
        </button>

        {showTechnical && (
          <div className="mt-2 rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground space-y-2.5">
            {category.technicalDetails.portalContext && (
              <p>
                <strong className="text-foreground font-semibold">Portal Context:</strong>{" "}
                {category.technicalDetails.portalContext}
              </p>
            )}
            {category.technicalDetails.erpMechanism && (
              <p>
                <strong className="text-foreground font-semibold">ERP Mechanism:</strong>{" "}
                {category.technicalDetails.erpMechanism}
              </p>
            )}
            {category.technicalDetails.relevantCodes && (
              <p>
                <strong className="text-foreground font-semibold">Standard Error Codes:</strong>{" "}
                {category.technicalDetails.relevantCodes.map((code) => (
                  <code
                    key={code}
                    className="mr-1.5 rounded bg-muted px-1.5 py-0.5 text-[0.7rem] font-mono text-foreground"
                  >
                    {code}
                  </code>
                ))}
              </p>
            )}
            {category.supportingSlug && (
              <div className="pt-2">
                <Link
                  to={`/invoice-rejected/${category.supportingSlug}`}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Read our in-depth {category.name} resolution guide →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Dynamic Recify Contextual CTA Card (Section 9 & 10) */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-background p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-primary">
              {category.recifyCta.badge}
            </span>
            <h4 className="display-heading mt-3 text-xl md:text-2xl text-foreground">
              {category.recifyCta.headline}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {category.recifyCta.supportingText}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to={category.recifyCta.buttonTo}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
            >
              {category.recifyCta.buttonLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
