export type ActionParty =
  | "Buyer / Procurement"
  | "Buyer Receiving / Warehouse"
  | "Buyer Accounts Payable"
  | "Supplier Billing"
  | "Supplier Credit / AR"
  | "Mutual Alignment";

export type ConfidenceLevel = "High" | "Medium" | "Uncertain";

export interface EvidenceItem {
  name: string;
  description: string;
  essential: boolean;
}

export interface RejectionCategory {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  whatHappened: string;
  actionParty: ActionParty;
  concreteActions: string[];
  whatToAvoid: string;
  evidenceChecklist: EvidenceItem[];
  emailTemplate: {
    subject: string;
    body: string;
  };
  technicalDetails: {
    portalContext?: string;
    relevantCodes?: string[];
    erpMechanism?: string;
  };
  recifyCta: {
    badge: string;
    headline: string;
    supportingText: string;
    buttonLabel: string;
    buttonTo: string;
  };
  keywords: string[];
  triggerPhrases: string[];
  negativeKeywords?: string[];
  portalBoosts?: { [portal: string]: number };
  supportingSlug?: string;
}

export interface DiagnosisResult {
  category: RejectionCategory;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  matchedKeywords: string[];
  detectedPortal?: string;
  rawInput: string;
}

export interface MatchSimulatorInput {
  poNumber: string;
  poTotal: number;
  poQuantity: number;
  poUnitPrice: number;
  invoiceNumber: string;
  invoiceTotal: number;
  invoiceQuantity: number;
  invoiceUnitPrice: number;
  goodsReceiptReceived: "yes" | "partial" | "no";
  taxAmount: number;
  freightAmount: number;
}

export interface MatchSimulatorResult {
  status: "pass" | "warning" | "reject";
  issues: string[];
  tolerances: {
    priceVariancePercent: number;
    amountDifference: number;
    quantityDifference: number;
  };
  threeWayMatchPass: boolean;
  recommendation: string;
  recifyCtaText: string;
}

export interface BatchItemResult {
  id: string;
  input: string;
  categoryName: string;
  actionParty: ActionParty;
  confidence: ConfidenceLevel;
  keyAction: string;
}

export interface BatchSummary {
  total: number;
  byCategory: { [cat: string]: number };
  byActionParty: { [party: string]: number };
  patternInsight: string;
  recifyActionMessage: string;
}
