import { REJECTION_CATEGORIES, UNCERTAIN_CATEGORY } from "./knowledge-base";
import {
  BatchItemResult,
  BatchSummary,
  DiagnosisResult,
  MatchSimulatorInput,
  MatchSimulatorResult,
  RejectionCategory,
} from "./types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function detectPortal(text: string): string | undefined {
  const normalized = text.toLowerCase();
  if (normalized.includes("coupa")) return "Coupa";
  if (normalized.includes("ariba") || normalized.includes("sap business network"))
    return "SAP Ariba";
  if (normalized.includes("tungsten") || normalized.includes("ob10")) return "Tungsten Network";
  if (normalized.includes("taulia")) return "Taulia";
  if (normalized.includes("bill.com")) return "Bill.com";
  if (normalized.includes("tipalti")) return "Tipalti";
  if (normalized.includes("basware")) return "Basware";
  if (normalized.includes("sap") || normalized.includes("s/4hana")) return "SAP ERP";
  if (normalized.includes("oracle")) return "Oracle Payables";
  return undefined;
}

export function decodeRejectionMessage(rawInput: string): DiagnosisResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      category: UNCERTAIN_CATEGORY,
      confidence: "Uncertain",
      confidenceScore: 0,
      matchedKeywords: [],
      rawInput,
    };
  }

  const normalized = normalize(trimmed);
  const detectedPortal = detectPortal(trimmed);

  let bestCategory: RejectionCategory | null = null;
  let bestScore = -1;
  let bestMatchedKeywords: string[] = [];

  for (const category of REJECTION_CATEGORIES) {
    let score = 0;
    const matched: string[] = [];

    // 1. Check exact trigger phrases (very high weight)
    for (const phrase of category.triggerPhrases) {
      const normPhrase = normalize(phrase);
      if (normalized.includes(normPhrase)) {
        score += 10;
        matched.push(phrase);
      }
    }

    // 2. Check keywords
    for (const kw of category.keywords) {
      const normKw = normalize(kw);
      if (normalized.includes(normKw)) {
        score += normKw.includes(" ") ? 3 : 1.5;
        if (!matched.includes(kw)) {
          matched.push(kw);
        }
      }
    }

    // 3. Portal boosts
    if (detectedPortal && category.portalBoosts && category.portalBoosts[detectedPortal]) {
      score += category.portalBoosts[detectedPortal];
    } else if (detectedPortal === "Coupa" && category.id === "COUPA_SPECIFIC_REJECTION") {
      score += 4;
    } else if (detectedPortal === "SAP Ariba" && category.id === "ARIBA_SPECIFIC_REJECTION") {
      score += 4;
    }

    // 4. Negative keyword penalties
    if (category.negativeKeywords) {
      for (const neg of category.negativeKeywords) {
        if (normalized.includes(normalize(neg))) {
          score -= 4;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
      bestMatchedKeywords = matched;
    }
  }

  if (!bestCategory || bestScore < 3) {
    return {
      category: UNCERTAIN_CATEGORY,
      confidence: "Uncertain",
      confidenceScore: Math.max(0, bestScore),
      matchedKeywords: bestMatchedKeywords,
      detectedPortal,
      rawInput,
    };
  }

  const confidence = bestScore >= 7 ? "High" : bestScore >= 3.5 ? "Medium" : "Uncertain";

  return {
    category: bestCategory,
    confidence,
    confidenceScore: Math.round(bestScore * 10) / 10,
    matchedKeywords: bestMatchedKeywords,
    detectedPortal,
    rawInput,
  };
}

export function runMatchSimulator(input: MatchSimulatorInput): MatchSimulatorResult {
  const issues: string[] = [];
  let status: "pass" | "warning" | "reject" = "pass";

  // Check PO Presence
  if (!input.poNumber.trim()) {
    issues.push("Missing PO Number: Buyer ERP 'No PO No Pay' gatekeeper will immediately reject.");
    status = "reject";
  }

  // Check Unit Price Variance
  const priceVariance =
    input.poUnitPrice > 0
      ? ((input.invoiceUnitPrice - input.poUnitPrice) / input.poUnitPrice) * 100
      : 0;

  if (priceVariance > 0.05) {
    issues.push(
      `Unit Price Variance: Invoiced unit price is ${priceVariance.toFixed(1)}% higher than authorized PO unit price ($${input.invoiceUnitPrice} vs $${input.poUnitPrice}).`,
    );
    status = "reject";
  } else if (priceVariance < -0.05) {
    issues.push(
      `Underbilled Unit Price: Invoiced unit price is lower than PO by ${Math.abs(priceVariance).toFixed(1)}%. May pass but requires supplier margin review.`,
    );
    if (status !== "reject") status = "warning";
  }

  // Check Quantity Variance
  const qtyDiff = input.invoiceQuantity - input.poQuantity;
  if (qtyDiff > 0) {
    issues.push(
      `Quantity Overbilled: Invoiced quantity (${input.invoiceQuantity}) exceeds authorized PO line quantity (${input.poQuantity}).`,
    );
    status = "reject";
  }

  // Check Total Amount Variance
  const calculatedTotal =
    input.invoiceQuantity * input.invoiceUnitPrice +
    (input.taxAmount || 0) +
    (input.freightAmount || 0);

  const amountDiff = input.invoiceTotal - input.poTotal;
  if (amountDiff > 1 && input.poTotal > 0) {
    issues.push(
      `Total Exceeds PO: Total invoice amount ($${input.invoiceTotal.toLocaleString()}) exceeds total authorized PO balance ($${input.poTotal.toLocaleString()}) by $${amountDiff.toFixed(2)}.`,
    );
    status = "reject";
  }

  // 3-Way Match (Goods Receipt / GRN)
  let threeWayMatchPass = true;
  if (input.goodsReceiptReceived === "no") {
    threeWayMatchPass = false;
    issues.push(
      "3-Way Match Alert: Buyer has not entered Goods Receipt (GRN). Automated 3-way match will hold this invoice in exception queue.",
    );
    if (status === "pass") status = "warning";
  } else if (input.goodsReceiptReceived === "partial") {
    threeWayMatchPass = false;
    issues.push(
      "Partial Receiving: Goods receipt logged for partial quantity. Any invoice beyond received quantity will be held.",
    );
    if (status === "pass") status = "warning";
  }

  let recommendation = "";
  let recifyCtaText = "";

  if (status === "reject") {
    recommendation =
      "Do NOT submit this invoice yet. Fix line items to match the PO or request a PO revision from the buyer before sending.";
    recifyCtaText = "Need help managing PO revisions and buyer approvals? Talk to Recify →";
  } else if (status === "warning") {
    recommendation =
      "Invoice may be submitted, but attach your signed Proof of Delivery (POD) proactively to prevent an AP receiving hold.";
    recifyCtaText = "Have Recify track your invoice delivery and confirm buyer GRN entry →";
  } else {
    recommendation =
      "Clean 3-way match detected. Invoice aligns with PO lines and receiving records.";
    recifyCtaText = "Recify operates end-to-end receivables from invoice to cash →";
  }

  return {
    status,
    issues,
    tolerances: {
      priceVariancePercent: Math.round(priceVariance * 10) / 10,
      amountDifference: Math.round(amountDiff * 100) / 100,
      quantityDifference: qtyDiff,
    },
    threeWayMatchPass,
    recommendation,
    recifyCtaText,
  };
}

export function runBatchDecoder(rawLines: string): {
  items: BatchItemResult[];
  summary: BatchSummary;
} {
  const lines = rawLines
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 3);

  const items: BatchItemResult[] = [];
  const byCategory: { [cat: string]: number } = {};
  const byParty: { [party: string]: number } = {};

  lines.forEach((line, idx) => {
    const diagnosis = decodeRejectionMessage(line);
    const catName = diagnosis.category.name;
    const party = diagnosis.category.actionParty;

    byCategory[catName] = (byCategory[catName] || 0) + 1;
    byParty[party] = (byParty[party] || 0) + 1;

    items.push({
      id: `batch-${idx + 1}`,
      input: line,
      categoryName: catName,
      actionParty: party,
      confidence: diagnosis.confidence,
      keyAction: diagnosis.category.concreteActions[0] || "Review with AP",
    });
  });

  const total = items.length;
  let patternInsight = "";
  let recifyActionMessage = "";

  const buyerSideCount =
    (byParty["Buyer / Procurement"] || 0) + (byParty["Buyer Receiving / Warehouse"] || 0);
  const buyerPercent = total > 0 ? Math.round((buyerSideCount / total) * 100) : 0;

  if (buyerPercent >= 50) {
    patternInsight = `${buyerPercent}% of your rejections are buyer-side administrative bottlenecks (missing POs, closed lines, or receiving holds) rather than billing mistakes.`;
    recifyActionMessage =
      "You don't have an invoice calculation problem — you have an AR workflow follow-up bottleneck. Recify handles chasing buyer approvals, PO reopenings, and warehouse GRNs so your cash stays on schedule.";
  } else {
    patternInsight = `Your rejections span ${Object.keys(byCategory).length} distinct categories, indicating varied data-entry and portal compliance exceptions.`;
    recifyActionMessage =
      "Recurring rejections across multiple categories indicate systemic friction before billing. Recify provides managed receivables execution to eradicate exceptions before they cause cash flow gaps.";
  }

  return {
    items,
    summary: {
      total,
      byCategory,
      byActionParty: byParty,
      patternInsight,
      recifyActionMessage,
    },
  };
}
