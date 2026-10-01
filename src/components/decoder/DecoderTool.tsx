import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  FileSpreadsheet,
  HelpCircle,
  Layers,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  decodeRejectionMessage,
  runBatchDecoder,
  runMatchSimulator,
} from "../../lib/decoder/engine";
import {
  BatchItemResult,
  BatchSummary,
  DiagnosisResult,
  MatchSimulatorInput,
  MatchSimulatorResult,
} from "../../lib/decoder/types";
import { cn } from "../../lib/utils";
import { DecoderResultCard } from "./DecoderResultCard";

const EXAMPLE_PHRASES = [
  "PO number is invalid or has been closed",
  "Invoice amount exceeds PO amount",
  "Goods receipt has not been received",
  "Invoice already exists in the system",
  "Tax ID is missing or invalid",
  "Rejected in Coupa: line price exceeds PO tolerance",
];

export function DecoderTool({ initialQuery }: { initialQuery?: string }) {
  const [activeTab, setActiveTab] = useState<"single" | "guided" | "match" | "batch">("single");
  const [inputMessage, setInputMessage] = useState(initialQuery || "");
  const [result, setResult] = useState<DiagnosisResult | null>(
    initialQuery ? decodeRejectionMessage(initialQuery) : null,
  );

  // Guided diagnosis state
  const [guidedStep, setGuidedStep] = useState(1);
  const [guidedStuckWhere, setGuidedStuckWhere] = useState("");
  const [guidedSymptom, setGuidedSymptom] = useState("");
  const [guidedDeliveryStatus, setGuidedDeliveryStatus] = useState("");

  // Match Simulator state
  const [matchInput, setMatchInput] = useState<MatchSimulatorInput>({
    poNumber: "PO-48291",
    poTotal: 15000,
    poQuantity: 100,
    poUnitPrice: 150,
    invoiceNumber: "INV-9021",
    invoiceTotal: 15450,
    invoiceQuantity: 100,
    invoiceUnitPrice: 150,
    goodsReceiptReceived: "yes",
    taxAmount: 450,
    freightAmount: 0,
  });
  const [matchResult, setMatchResult] = useState<MatchSimulatorResult | null>(null);

  // Batch mode state
  const [batchInput, setBatchInput] = useState(
    "PO number is invalid or has been closed\nInvoice amount exceeds PO amount\nGoods receipt has not been received\nMissing mandatory Tax ID\nInvoice already exists in system",
  );
  const [batchResult, setBatchResult] = useState<{
    items: BatchItemResult[];
    summary: BatchSummary;
  } | null>(null);

  const handleDecode = (textToDecode?: string) => {
    const text = textToDecode !== undefined ? textToDecode : inputMessage;
    if (!text.trim()) return;
    const diag = decodeRejectionMessage(text);
    setResult(diag);
  };

  const handleExampleClick = (phrase: string) => {
    setInputMessage(phrase);
    handleDecode(phrase);
  };

  const handleGuidedSubmit = () => {
    let synthesizedText = "";
    if (guidedSymptom === "po_closed" || guidedSymptom === "no_po") {
      synthesizedText = "PO number is invalid or has been closed";
    } else if (guidedSymptom === "amount_high") {
      synthesizedText = "Invoice amount exceeds PO amount";
    } else if (guidedSymptom === "grn_pending" || guidedDeliveryStatus === "pending_signoff") {
      synthesizedText = "Goods receipt has not been received";
    } else if (guidedSymptom === "duplicate") {
      synthesizedText = "Invoice already exists in the system";
    } else if (guidedStuckWhere === "coupa") {
      synthesizedText = "Rejected in Coupa: line price exceeds PO tolerance";
    } else if (guidedStuckWhere === "ariba") {
      synthesizedText = "Rejected in Ariba: customer transaction rule violation";
    } else {
      synthesizedText = "Unspecified rejection pending AP review";
    }

    const diag = decodeRejectionMessage(synthesizedText);
    setResult(diag);
    setActiveTab("single");
  };

  const handleRunMatchSimulator = () => {
    const res = runMatchSimulator(matchInput);
    setMatchResult(res);
  };

  const handleRunBatch = () => {
    if (!batchInput.trim()) return;
    const res = runBatchDecoder(batchInput);
    setBatchResult(res);
  };

  return (
    <div id="decoder-tool" className="mx-auto max-w-5xl">
      {/* Tool Container */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
        {/* Navigation Modes Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("single");
              }}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                activeTab === "single"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              Core Decoder
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("guided");
                setResult(null);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                activeTab === "guided"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <Compass className="h-3.5 w-3.5" />
              Guided Diagnosis
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("match");
                setResult(null);
                if (!matchResult) handleRunMatchSimulator();
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                activeTab === "match"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              Match Simulator
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("batch");
                setResult(null);
                if (!batchResult) handleRunBatch();
              }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                activeTab === "batch"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Batch Mode
            </button>
          </div>

          <div className="hidden sm:block text-xs font-medium text-muted-foreground">
            Deterministic Engine • Zero AI Hallucination
          </div>
        </div>

        {/* 1. SINGLE DECODER FLOW (HERO FLOW) */}
        {activeTab === "single" && (
          <div className="mt-8">
            {!result ? (
              <div>
                <label
                  htmlFor="rejection-input"
                  className="block text-sm font-semibold text-foreground md:text-base"
                >
                  Paste the buyer's rejection message or error notice
                </label>
                <div className="relative mt-3">
                  <textarea
                    id="rejection-input"
                    rows={4}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="e.g. 'Invoice rejected: PO line 001 closed. Amount exceeds authorized tolerance or goods receipt has not been created in SAP.'"
                    className="w-full rounded-2xl border border-input bg-background p-4 text-sm md:text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 outline-none ring-ring transition-shadow focus:ring-2"
                  />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleDecode()}
                    disabled={!inputMessage.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Decode rejection
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <span className="text-xs text-muted-foreground">
                    Supports Coupa, SAP Ariba, Oracle, Tungsten, Bill.com, and AP emails
                  </span>
                </div>

                {/* Clickable Examples */}
                <div className="mt-8 border-t border-border/80 pt-6">
                  <p className="kicker text-muted-foreground">
                    Or click a common rejection example to test:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {EXAMPLE_PHRASES.map((phrase) => (
                      <button
                        key={phrase}
                        type="button"
                        onClick={() => handleExampleClick(phrase)}
                        className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs text-foreground/90 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary text-left"
                      >
                        "{phrase}"
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-Entry Points to Advanced Capabilities (Section 7) */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-border/80 pt-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab("guided")}
                    className="group flex flex-col text-left rounded-2xl border border-border/70 bg-background/50 p-4 transition-all hover:border-primary hover:bg-card"
                  >
                    <span className="text-xs text-muted-foreground font-medium">
                      Don't have a clear message?
                    </span>
                    <span className="mt-1 font-display text-sm font-bold text-foreground group-hover:text-primary flex items-center justify-between">
                      Guided Diagnosis
                      <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("match");
                      handleRunMatchSimulator();
                    }}
                    className="group flex flex-col text-left rounded-2xl border border-border/70 bg-background/50 p-4 transition-all hover:border-primary hover:bg-card"
                  >
                    <span className="text-xs text-muted-foreground font-medium">
                      Check before submitting?
                    </span>
                    <span className="mt-1 font-display text-sm font-bold text-foreground group-hover:text-primary flex items-center justify-between">
                      Match Simulator
                      <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("batch");
                      handleRunBatch();
                    }}
                    className="group flex flex-col text-left rounded-2xl border border-border/70 bg-background/50 p-4 transition-all hover:border-primary hover:bg-card"
                  >
                    <span className="text-xs text-muted-foreground font-medium">
                      Multiple rejected invoices?
                    </span>
                    <span className="mt-1 font-display text-sm font-bold text-foreground group-hover:text-primary flex items-center justify-between">
                      Batch Mode
                      <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <DecoderResultCard
                result={result}
                onReset={() => {
                  setResult(null);
                  setInputMessage("");
                }}
              />
            )}
          </div>
        )}

        {/* 2. GUIDED DIAGNOSIS MODE */}
        {activeTab === "guided" && (
          <div className="mt-8">
            <div className="mb-6">
              <span className="kicker text-primary">Interactive Diagnostic Tree</span>
              <h3 className="display-heading text-xl md:text-2xl mt-1">
                Diagnose a rejection without an error code
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Answer 3 quick operational questions to isolate the root cause.
              </p>
            </div>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Step 1: Where is your invoice stuck?
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "coupa", label: "Coupa Supplier Portal (CSP)" },
                    { id: "ariba", label: "SAP Ariba / Business Network" },
                    { id: "email", label: "AP Inbound Mailbox / Email" },
                    { id: "receiving", label: "Internal Buyer Receiving / Warehouse" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGuidedStuckWhere(opt.id)}
                      className={cn(
                        "rounded-xl border p-3 text-left text-xs font-semibold transition-all",
                        guidedStuckWhere === opt.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:bg-muted text-foreground",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Step 2: What symptom or status did you receive?
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "po_closed", label: "Status says 'PO Closed' or 'Invalid PO'" },
                    { id: "amount_high", label: "Invoice amount is higher than PO" },
                    { id: "grn_pending", label: "Status says 'Pending Receipt' or 'No GRN'" },
                    { id: "duplicate", label: "System claims invoice is duplicate" },
                    { id: "no_po", label: "No PO was ever issued for this work" },
                    { id: "unspecified", label: "No reason given / general AP delay" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGuidedSymptom(opt.id)}
                      className={cn(
                        "rounded-xl border p-3 text-left text-xs font-semibold transition-all",
                        guidedSymptom === opt.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:bg-muted text-foreground",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Step 3: What is the delivery or sign-off status?
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "signed_pod", label: "Fully delivered with signed POD on file" },
                    { id: "pending_signoff", label: "Work finished, waiting on client approval" },
                    { id: "partial", label: "Partial shipment delivered so far" },
                    { id: "recurring", label: "Recurring monthly retainer / service" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGuidedDeliveryStatus(opt.id)}
                      className={cn(
                        "rounded-xl border p-3 text-left text-xs font-semibold transition-all",
                        guidedDeliveryStatus === opt.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card hover:bg-muted text-foreground",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleGuidedSubmit}
                  disabled={!guidedStuckWhere || !guidedSymptom || !guidedDeliveryStatus}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                >
                  Generate Diagnosis
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGuidedStuckWhere("");
                    setGuidedSymptom("");
                    setGuidedDeliveryStatus("");
                  }}
                  className="rounded-full border border-border px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-muted"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. MATCH SIMULATOR MODE */}
        {activeTab === "match" && (
          <div className="mt-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="kicker text-primary">Pre-Submission Validator</span>
                <h3 className="display-heading text-xl md:text-2xl mt-1">
                  2-Way & 3-Way PO Match Simulator
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Simulate buyer ERP match checks before submitting your invoice to prevent
                  exceptions.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRunMatchSimulator}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                Run Match Check
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: PO authorized parameters */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <h4 className="font-display text-sm font-bold text-foreground">
                  1. Customer Purchase Order Data
                </h4>
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="font-medium text-muted-foreground">PO Number</label>
                    <input
                      type="text"
                      value={matchInput.poNumber}
                      onChange={(e) => setMatchInput((p) => ({ ...p, poNumber: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-muted-foreground">PO Quantity</label>
                      <input
                        type="number"
                        value={matchInput.poQuantity}
                        onChange={(e) =>
                          setMatchInput((p) => ({
                            ...p,
                            poQuantity: Number(e.target.value),
                            poTotal: Number(e.target.value) * p.poUnitPrice,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-muted-foreground">PO Unit Price ($)</label>
                      <input
                        type="number"
                        value={matchInput.poUnitPrice}
                        onChange={(e) =>
                          setMatchInput((p) => ({
                            ...p,
                            poUnitPrice: Number(e.target.value),
                            poTotal: Number(e.target.value) * p.poQuantity,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">
                      PO Total Authorized ($)
                    </label>
                    <input
                      type="number"
                      value={matchInput.poTotal}
                      onChange={(e) =>
                        setMatchInput((p) => ({ ...p, poTotal: Number(e.target.value) }))
                      }
                      className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">
                      Goods Receipt (GRN) Status
                    </label>
                    <select
                      value={matchInput.goodsReceiptReceived}
                      onChange={(e) =>
                        setMatchInput((p) => ({
                          ...p,
                          goodsReceiptReceived: e.target.value as "yes" | "partial" | "no",
                        }))
                      }
                      className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                    >
                      <option value="yes">Yes — Signed & Logged in ERP</option>
                      <option value="partial">Partial Quantity Logged</option>
                      <option value="no">No — Goods Receipt Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Invoiced parameters */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <h4 className="font-display text-sm font-bold text-foreground">
                  2. Invoice Draft Parameters
                </h4>
                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="font-medium text-muted-foreground">Invoice Number</label>
                    <input
                      type="text"
                      value={matchInput.invoiceNumber}
                      onChange={(e) =>
                        setMatchInput((p) => ({ ...p, invoiceNumber: e.target.value }))
                      }
                      className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-muted-foreground">Invoice Quantity</label>
                      <input
                        type="number"
                        value={matchInput.invoiceQuantity}
                        onChange={(e) =>
                          setMatchInput((p) => ({
                            ...p,
                            invoiceQuantity: Number(e.target.value),
                            invoiceTotal:
                              Number(e.target.value) * p.invoiceUnitPrice +
                              p.taxAmount +
                              p.freightAmount,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-muted-foreground">
                        Invoice Unit Price ($)
                      </label>
                      <input
                        type="number"
                        value={matchInput.invoiceUnitPrice}
                        onChange={(e) =>
                          setMatchInput((p) => ({
                            ...p,
                            invoiceUnitPrice: Number(e.target.value),
                            invoiceTotal:
                              Number(e.target.value) * p.invoiceQuantity +
                              p.taxAmount +
                              p.freightAmount,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-medium text-muted-foreground">Tax Amount ($)</label>
                      <input
                        type="number"
                        value={matchInput.taxAmount}
                        onChange={(e) =>
                          setMatchInput((p) => ({
                            ...p,
                            taxAmount: Number(e.target.value),
                            invoiceTotal:
                              p.invoiceQuantity * p.invoiceUnitPrice +
                              Number(e.target.value) +
                              p.freightAmount,
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-medium text-muted-foreground">Freight ($)</label>
                      <input
                        type="number"
                        value={matchInput.freightAmount}
                        onChange={(e) =>
                          setMatchInput((p) => ({
                            ...p,
                            freightAmount: Number(e.target.value),
                            invoiceTotal:
                              p.invoiceQuantity * p.invoiceUnitPrice +
                              p.taxAmount +
                              Number(e.target.value),
                          }))
                        }
                        className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-medium text-muted-foreground">Total Invoiced ($)</label>
                    <input
                      type="number"
                      value={matchInput.invoiceTotal}
                      onChange={(e) =>
                        setMatchInput((p) => ({ ...p, invoiceTotal: Number(e.target.value) }))
                      }
                      className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Match Simulator Result View */}
            {matchResult && (
              <div className="mt-6 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="kicker text-muted-foreground">Simulation Result</span>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
                      matchResult.status === "pass"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : matchResult.status === "warning"
                          ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                          : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {matchResult.status === "pass"
                      ? "Match Passed — Low Risk"
                      : matchResult.status === "warning"
                        ? "Warning — Potential AP Hold"
                        : "High Risk — Rejection Likely"}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-foreground">
                    {matchResult.recommendation}
                  </p>

                  {matchResult.issues.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
                      {matchResult.issues.map((iss, i) => (
                        <li key={i} className="text-foreground/90 font-medium">
                          {iss}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground max-w-xl">
                    {matchResult.recifyCtaText}
                  </p>
                  <Link
                    to="/contact"
                    className="shrink-0 rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                  >
                    Talk to Recify →
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. BATCH MODE */}
        {activeTab === "batch" && (
          <div className="mt-8">
            <div className="mb-6">
              <span className="kicker text-primary">Portfolio Analytics</span>
              <h3 className="display-heading text-xl md:text-2xl mt-1">
                Batch Invoice Rejection Analysis
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Paste multiple rejection notices (one per line) from your ERP, portal exports, or AP
                emails.
              </p>
            </div>

            <textarea
              rows={5}
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              className="w-full rounded-2xl border border-input bg-background p-4 text-xs font-mono leading-relaxed outline-none ring-ring focus:ring-2"
              placeholder="Paste rejection lines here..."
            />

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleRunBatch}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
              >
                Analyze Batch Rejections
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground">
                Instant categorizations & pattern detection
              </span>
            </div>

            {batchResult && (
              <div className="mt-8 space-y-6">
                {/* Pattern Insight Banner (Section 10) */}
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
                  <span className="kicker text-primary">Workflow Pattern Insight</span>
                  <h4 className="display-heading text-lg md:text-xl mt-1 text-foreground">
                    {batchResult.summary.patternInsight}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {batchResult.summary.recifyActionMessage}
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/start"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
                    >
                      Get your AR handled by Recify →
                    </Link>
                  </div>
                </div>

                {/* Individual Line Breakdown Table */}
                <div className="overflow-x-auto rounded-2xl border border-border bg-background">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-border bg-muted/40 font-display text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="p-3.5">Rejection Line</th>
                        <th className="p-3.5">Diagnosis Category</th>
                        <th className="p-3.5">Action Party</th>
                        <th className="p-3.5">Key Resolution Step</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {batchResult.items.map((it) => (
                        <tr key={it.id} className="hover:bg-muted/20">
                          <td className="p-3.5 font-mono text-[0.75rem] max-w-xs truncate text-foreground">
                            {it.input}
                          </td>
                          <td className="p-3.5 font-semibold text-foreground">{it.categoryName}</td>
                          <td className="p-3.5">
                            <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[0.65rem] font-bold uppercase text-muted-foreground">
                              {it.actionParty}
                            </span>
                          </td>
                          <td className="p-3.5 text-muted-foreground max-w-xs">{it.keyAction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
