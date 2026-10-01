import { RejectionCategory } from "./types";

export const UNCERTAIN_CATEGORY: RejectionCategory = {
  id: "UNCERTAIN_REJECTION",
  name: "Unspecified or Ambiguous AP Rejection",
  category: "General Accounts Payable",
  shortDescription:
    "The rejection message does not contain sufficient standard automated error codes.",
  whatHappened:
    "The buyer's AP system or processor rejected or held this invoice without citing a standard automated validation code. This typically occurs when an AP clerk manually flags the invoice, an internal approval times out, or the buyer requires specific job reference codes.",
  actionParty: "Mutual Alignment",
  concreteActions: [
    "Contact the buyer's procurement contact or AP helpdesk requesting the exact line-item discrepancy or missing metadata.",
    "Verify whether internal sign-off by the department manager or project lead has occurred.",
    "Confirm whether the customer migrated their billing portal or changed billing email addresses.",
  ],
  whatToAvoid:
    "Do not blindly reissue the same invoice with a new date or number. That creates duplicate records and further delays payment cycles.",
  evidenceChecklist: [
    {
      name: "Original Purchase Order / Work Order",
      description: "Signed customer agreement or authorized PO number.",
      essential: true,
    },
    {
      name: "Delivery Confirmation / Service Acceptance",
      description: "Signed bill of lading, delivery receipt, or written email confirmation.",
      essential: true,
    },
    {
      name: "Internal Buyer Contact Email",
      description: "Name and email of the business sponsor who ordered the goods/services.",
      essential: false,
    },
  ],
  emailTemplate: {
    subject: "Inquiry: Clarification on Invoice [Invoice#] for [Company Name]",
    body: `Hi AP Team,

We received notice that Invoice [Invoice#] (dated [Invoice Date] for [Amount]) was rejected / returned without a detailed rejection code.

Could you please clarify the specific blocker so we can immediately provide any needed documentation or adjustments?
- Purchase Order / Reference: [PO#]
- Project / Order Description: [Short Description]

Our delivery confirmation and original purchase authorization are attached for your reference.

Thank you,
[Your Name]
[Your Company]`,
  },
  technicalDetails: {
    portalContext: "Unclassified exception or manual AP clerk rejection note.",
    relevantCodes: ["MANUAL_HOLD", "AP_EXCEPTION", "UNSPECIFIED_HOLD"],
    erpMechanism: "Invoice placed in exception queue awaiting human AP specialist intervention.",
  },
  recifyCta: {
    badge: "Ambiguous Exception",
    headline: "There's not enough information to confidently identify the blocker.",
    supportingText:
      "When AP teams provide vague rejections, chasing the right contact takes hours of manual back-and-forth. Recify tracks down the approver and gets the invoice unstuck.",
    buttonLabel: "Talk to Recify about this invoice",
    buttonTo: "/contact",
  },
  keywords: ["rejected", "returned", "cannot process", "hold", "review", "exception", "query"],
  triggerPhrases: ["invoice rejected", "unable to process", "please review", "contact ap"],
};

export const REJECTION_CATEGORIES: RejectionCategory[] = [
  {
    id: "PO_CLOSED_OR_INVALID",
    name: "PO Number is Invalid or Closed",
    category: "Purchase Order Validity",
    shortDescription:
      "The PO cited on the invoice is invalid, expired, or already closed in the buyer's ERP.",
    whatHappened:
      "The buyer's accounts payable system verified the PO reference against their ERP database and found the PO number either does not exist, was cancelled, was closed out after prior billings, or has expired.",
    actionParty: "Buyer / Procurement",
    concreteActions: [
      "Contact your purchasing agent / buyer contact immediately and request an updated PO number or have them reopen the closed line.",
      "Check for common typographical errors in the PO number (e.g., confusing 'O' with '0' or missing prefix letters like 'PO-').",
      "Do NOT submit an invoice without an active, confirmed PO reference.",
    ],
    whatToAvoid:
      "Avoid submitting a new invoice with the same closed PO number. The system will automatically reject it again within minutes.",
    evidenceChecklist: [
      {
        name: "Copy of original PO document",
        description: "The signed or emailed PO document from the buyer.",
        essential: true,
      },
      {
        name: "Change Order / Scope Amendment",
        description: "Any formal authorization extending the project or purchase order.",
        essential: false,
      },
      {
        name: "Proof of Delivery",
        description: "Documentation demonstrating goods/services were ordered and received.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Action Required: Reopen or Update PO [PO#] for Invoice [Invoice#]",
      body: `Hi [Buyer Name],

Our invoice [Invoice#] for [Amount] was rejected by your AP system with the message: 'PO number is invalid or has been closed'.

Could you please confirm if PO [PO#] can be reopened, or issue a revised PO number covering this delivery? 

Invoice details:
- Invoice Number: [Invoice#]
- PO Number Cited: [PO#]
- Delivery Date: [Delivery Date]
- Total Amount: [Amount]

Attached is our proof of delivery and the original PO confirmation for reference.

Best regards,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext:
        "Triggered in SAP, Oracle ERP, Coupa, or Ariba during 2-way / 3-way line matching.",
      relevantCodes: [
        "PO_CLOSED",
        "PO_NOT_FOUND",
        "ERR_INVALID_PURCHASE_ORDER",
        "STATUS_INACTIVE_PO",
      ],
      erpMechanism:
        "ERP checks table EKKO/EKPO (SAP) or PO_HEADERS_ALL (Oracle) where STATUS='CLOSED' or FINALLY_CLOSED.",
    },
    recifyCta: {
      badge: "Buyer-Side Blocker",
      headline: "Your invoice may be fine — the blocker is on the buyer's side.",
      supportingText:
        "Procurement needs to update their system before payment can occur. Recify handles buyer follow-ups and PO reconciliation directly so your billing team doesn't lose billable hours.",
      buttonLabel: "Have Recify handle the follow-up",
      buttonTo: "/contact",
    },
    keywords: [
      "closed",
      "invalid po",
      "po invalid",
      "po closed",
      "po number",
      "purchase order closed",
      "inactive po",
      "po cancelled",
      "expired po",
      "po not found",
      "no po found",
      "po is closed",
      "po has been closed",
    ],
    triggerPhrases: [
      "po number is invalid or has been closed",
      "purchase order has been closed",
      "po is closed",
      "invalid purchase order",
      "po not open for billing",
      "po already finalized",
    ],
    supportingSlug: "po-mismatch",
  },
  {
    id: "PO_AMOUNT_OR_PRICE_EXCEEDED",
    name: "Invoice Amount Exceeds PO Amount / Variance",
    category: "Financial & Line Variance",
    shortDescription:
      "The total or line item price on the invoice exceeds the authorized PO amount or tolerance threshold.",
    whatHappened:
      "Automated AP matching detected that the invoice total (or specific unit price) is higher than the funds authorized on the corresponding Purchase Order line, exceeding the buyer's configured tolerance limit (usually 0% to 5%).",
    actionParty: "Buyer / Procurement",
    concreteActions: [
      "Verify whether unauthorized items, unexpected freight, fuel surcharges, or price increases were included.",
      "If the price increase was pre-agreed, request that the purchasing manager issue a PO change order (amendment) increasing the line value.",
      "If billing was an internal calculation error, credit the difference or issue a revised invoice matching the exact PO price.",
    ],
    whatToAvoid:
      "Never simply remove legitimate contractual charges without buyer agreement. Conversely, do not resubmit without an approved PO amendment.",
    evidenceChecklist: [
      {
        name: "Approved Quote or Price Agreement",
        description: "Showing the agreed unit rate or total project cost.",
        essential: true,
      },
      {
        name: "PO Amendment / Change Order Request",
        description: "Written buyer approval for extra charges, overtime, or freight.",
        essential: true,
      },
      {
        name: "Itemized Billing Breakdown",
        description: "Reconciliation showing PO amount vs. invoice line items.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Variance Clarification: Invoice [Invoice#] exceeds PO [PO#]",
      body: `Hi [Buyer Name],

Invoice [Invoice#] for [Amount] was flagged by AP because the total exceeds the authorized amount on PO [PO#] by [Variance Amount].

The variance is due to: [Reason, e.g., agreed freight addition / approved change order / extra quantity requested on [Date]].

Attached is the written approval from [Contact] on [Date]. Could you please submit a PO amendment for the remaining [Variance Amount] so AP can release the payment?

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "Coupa 'PO Line Amount Exceeded' or SAP MR8M price variance tolerance halt.",
      relevantCodes: [
        "PRICE_VARIANCE_EXCEEDED",
        "AMOUNT_EXCEEDS_PO",
        "LINE_LIMIT_REACHED",
        "ERR_TOLERANCE_CHECK",
      ],
      erpMechanism:
        "Automated 3-way match calculates (Invoice Price - PO Price) / PO Price > tolerance.",
    },
    recifyCta: {
      badge: "Dispute & Variance",
      headline: "Price disputes stall cash flow for weeks if not actively resolved.",
      supportingText:
        "Resolving price variances requires aligning the buyer, procurement, and AP. Recify's team manages the dispute resolution loop from start to payment.",
      buttonLabel: "Have Recify resolve this dispute",
      buttonTo: "/contact",
    },
    keywords: [
      "exceeds",
      "amount exceeds",
      "price mismatch",
      "price variance",
      "over billing",
      "insufficient funds",
      "po balance",
      "tolerance",
      "exceeds po amount",
      "unit price variance",
      "rate mismatch",
      "exceeds line amount",
    ],
    triggerPhrases: [
      "invoice amount exceeds po amount",
      "price exceeds purchase order",
      "insufficient funds on po",
      "price variance exceeds tolerance",
      "unit price does not match po",
      "amount billed exceeds po balance",
    ],
    supportingSlug: "price-mismatch",
  },
  {
    id: "MISSING_GOODS_RECEIPT_OR_GRN",
    name: "Goods Receipt / Service Entry Not Received",
    category: "Receiving & Verification",
    shortDescription:
      "The buyer's internal receiving team has not yet recorded the Goods Receipt (GRN) or signed Service Entry Sheet.",
    whatHappened:
      "Enterprise 3-way matching requires PO + Invoice + Goods Receipt (GRN). Even if your invoice is 100% accurate, the AP system will block payment until the buyer's internal warehouse or project manager enters confirmation that the goods or services were delivered.",
    actionParty: "Buyer Receiving / Warehouse",
    concreteActions: [
      "Retrieve your signed Proof of Delivery (POD), carrier tracking, or signed Service Completion Certificate.",
      "Send the signed delivery evidence directly to both your buyer contact and AP, requesting the receiving team log the GRN in their ERP.",
      "Ask your buyer for the GRN (Goods Receipt Note) or SES (Service Entry Sheet) reference number.",
    ],
    whatToAvoid:
      "Do not cancel the invoice or send a duplicate. The invoice is technically waiting on an internal buyer warehouse click.",
    evidenceChecklist: [
      {
        name: "Signed Proof of Delivery (POD)",
        description: "Delivery bill signed with receiver name, date, and timestamp.",
        essential: true,
      },
      {
        name: "Carrier Bill of Lading / Tracking link",
        description: "Official freight or courier tracking showing delivery location.",
        essential: true,
      },
      {
        name: "Service Sign-Off Sheet",
        description: "If services: timesheet, milestone sign-off, or acceptance email.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "POD Attached for Invoice [Invoice#] — Pending Goods Receipt on PO [PO#]",
      body: `Hi [Buyer Name] and AP Team,

We note that Invoice [Invoice#] (PO [PO#]) is currently blocked pending Goods Receipt / Service Entry confirmation.

The goods were delivered on [Delivery Date] and signed for by [Receiver Name]. Attached is the signed Proof of Delivery (POD) / Bill of Lading.

Could the receiving department please log the Goods Receipt (GRN) against PO [PO#] so AP can release the invoice for scheduled payment?

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext:
        "SAP Status 'Parked - Pending GR', Coupa 'Pending Receipt', Oracle 'Hold: Quantity Billed > Received'.",
      relevantCodes: [
        "HOLD_QTY_REC",
        "MISSING_GRN",
        "PENDING_RECEIPT",
        "SES_NOT_APPROVED",
        "NO_GOODS_RECEIPT",
      ],
      erpMechanism: "ERP 3-way match validation fails condition: Qty_Invoiced <= Qty_Received.",
    },
    recifyCta: {
      badge: "Receiving Bottleneck",
      headline: "Your invoice is accurate — the delay is inside the buyer's warehouse.",
      supportingText:
        "Missing GRNs are the #1 cause of delayed B2B payments. Recify contacts the internal receiving stakeholders, supplies the POD, and ensures the receipt is entered before due dates pass.",
      buttonLabel: "Have Recify handle the follow-up",
      buttonTo: "/contact",
    },
    keywords: [
      "goods receipt",
      "grn",
      "not received",
      "pending receipt",
      "missing grn",
      "goods receipt has not been received",
      "service entry",
      "service entry sheet",
      "receiving hold",
      "pod",
      "proof of delivery",
      "no receipt",
      "unreceived",
    ],
    triggerPhrases: [
      "goods receipt has not been received",
      "pending goods receipt",
      "receipt has not been created",
      "service entry sheet not approved",
      "goods not received in system",
      "quantity invoiced exceeds quantity received",
    ],
    supportingSlug: "missing-goods-receipt",
  },
  {
    id: "DUPLICATE_INVOICE_SUBMISSION",
    name: "Duplicate Invoice Detected",
    category: "Duplication & System Validation",
    shortDescription:
      "An invoice with this invoice number or document reference already exists in the buyer's system.",
    whatHappened:
      "The buyer's AP portal or accounting engine enforces strict unique document controls. An invoice with this identical invoice number (and vendor ID) has already been processed, is currently in review, or was previously paid.",
    actionParty: "Supplier Billing",
    concreteActions: [
      "Check your billing ledger to confirm whether this invoice was already paid, or if an earlier draft was submitted.",
      "If you are attempting to reissue a corrected bill, ensure you void the original and either add a suffix (e.g. -R1) or issue a formal credit note plus new invoice.",
      "If the buyer mistakenly flagged a fresh bill as duplicate, request their AP ledger statement to verify which prior transaction they are referencing.",
    ],
    whatToAvoid:
      "Do not re-upload the same PDF repeatedly. AP systems log duplicate submission attempts and may flag the vendor profile for fraud review.",
    evidenceChecklist: [
      {
        name: "Original Invoice and Payment Status",
        description: "Bank statement reconciliation proving payment was not received.",
        essential: true,
      },
      {
        name: "Credit Note / Revised Invoice Notice",
        description: "Official document voiding the prior submission if amending.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Clarification on Duplicate Flag: Invoice [Invoice#] for [Company]",
      body: `Hi AP Team,

Our submission of Invoice [Invoice#] for [Amount] was flagged as a duplicate.

According to our accounts receivable records, this invoice covers [Deliverables on Date] and remains outstanding and unpaid.

Could you please confirm if this invoice is already scheduled in an upcoming payment run? If you show a prior payment, please provide the remittance advice and reference number so we can reconcile.

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "Triggered instantly upon upload in Coupa, Ariba, Taulia, or ERP batch run.",
      relevantCodes: [
        "ERR_DUPLICATE_INVOICE",
        "DOC_ALREADY_EXISTS",
        "SAP_BS014_DUP",
        "ARIBABLD_DUPLICATE",
      ],
      erpMechanism: "Unique constraint check on (Vendor_ID + Invoice_Number + Fiscal_Year).",
    },
    recifyCta: {
      badge: "Internal Billing Review",
      headline: "Fix this issue before resubmitting.",
      supportingText:
        "Duplicate rejections often reveal broken billing records or lack of remittance visibility. Recify handles cash application and ledger reconciliation so you never double-bill or chase phantom receivables.",
      buttonLabel: "Talk to Recify about AR management",
      buttonTo: "/contact",
    },
    keywords: [
      "duplicate",
      "already exists",
      "invoice already exists",
      "previously submitted",
      "duplicate invoice number",
      "already paid",
      "duplicate document",
      "re-submission",
      "same invoice number",
    ],
    triggerPhrases: [
      "invoice already exists in the system",
      "duplicate invoice",
      "invoice number already in use",
      "invoice has already been processed",
      "duplicate document reference",
    ],
    supportingSlug: "duplicate-invoice",
  },
  {
    id: "TAX_OR_COMPLIANCE_ERROR",
    name: "Tax ID / VAT / Calculation Compliance Error",
    category: "Tax & Compliance",
    shortDescription:
      "The Tax ID, VAT/GST calculation, or legal entity tax breakdown does not comply with portal rules.",
    whatHappened:
      "Automated e-invoicing validators detected a tax discrepancy: a missing Tax/VAT/GST identification number, mathematical rounding discrepancy between line items and total tax, or an invalid tax jurisdiction code.",
    actionParty: "Supplier Billing",
    concreteActions: [
      "Verify that your company's full legal tax ID (EIN, VAT, GST, ABN) and the customer's tax ID are clearly printed on the invoice.",
      "Check line item tax math — e-invoicing portals sum taxes per line rather than calculating total tax on the gross amount.",
      "Ensure tax exempt items cite the specific statutory exemption clause or customer exemption certificate number.",
    ],
    whatToAvoid:
      "Do not manually override tax figures without checking regional invoice compliance regulations.",
    evidenceChecklist: [
      {
        name: "W-9 / Tax Exemption Certificate",
        description: "Official government tax registration or customer tax-exempt certificate.",
        essential: true,
      },
      {
        name: "Itemized Tax Math Sheet",
        description: "Clear line-by-line tax calculation showing rate and taxable base.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Corrected Tax Invoice [Invoice#] for [Company]",
      body: `Hi AP Team,

We have updated Invoice [Invoice#] to resolve the tax validation notice.

Updates made:
- Updated Tax Registration ID: [Tax ID]
- Line-item tax calculation reconciled to [Tax Amount] at [Tax Rate]%

Attached is the revised compliant PDF and our current tax certificate. Please release this for processing.

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext:
        "Mandatory in PEPPOL, Coupa cXML, Ariba Network, and European e-invoicing frameworks.",
      relevantCodes: [
        "ERR_TAX_CALCULATION",
        "INVALID_VAT_NUMBER",
        "PEPPOL_R004_TAX",
        "TAX_ID_REQUIRED",
      ],
      erpMechanism:
        "ERP tax engine (Vertex, Avalara, SAP Tax) fails cross-check between line tax and header tax.",
    },
    recifyCta: {
      badge: "Compliance Fix Required",
      headline: "Fix this issue before resubmitting.",
      supportingText:
        "E-invoicing tax rules grow stricter every month across global AP portals. Recify monitors portal compliance and ensures every invoice adheres to customer-specific billing profiles.",
      buttonLabel: "Need someone to manage your invoicing?",
      buttonTo: "/start",
    },
    keywords: [
      "tax",
      "vat",
      "gst",
      "tax id",
      "tax calculation",
      "ein",
      "vat number",
      "tax rate",
      "tax mismatch",
      "sales tax",
      "withholding tax",
      "invalid tax",
    ],
    triggerPhrases: [
      "tax id is missing or invalid",
      "vat calculation error",
      "tax amount does not match line items",
      "invalid tax code",
      "tax exemption certificate required",
    ],
    supportingSlug: "tax-error",
  },
  {
    id: "PORTAL_OR_SUBMISSION_CHANNEL_ERROR",
    name: "Incorrect Submission Channel or Portal Validation Error",
    category: "Portal & Ingestion",
    shortDescription:
      "The invoice was submitted through the wrong channel (e.g. email instead of portal) or failed technical portal parsing.",
    whatHappened:
      "The buyer mandates electronic invoicing through a dedicated portal (e.g. Coupa, SAP Ariba, Tungsten, Bill.com) or their automated OCR engine failed to extract the required header fields from your attachment.",
    actionParty: "Supplier Billing / Portal Ops",
    concreteActions: [
      "Verify the customer's mandatory invoice delivery rules. Many enterprise customers bounce emailed PDFs automatically.",
      "Log into the designated customer supplier portal and submit directly against the purchase order flip.",
      "Check document requirements: file must usually be a machine-readable text PDF (not a flat image scan), under 10MB, with no password protection.",
    ],
    whatToAvoid:
      "Avoid emailing invoices to individual accounts payable staff when the company has published an e-invoicing portal mandate.",
    evidenceChecklist: [
      {
        name: "Supplier Portal Login / Invitation",
        description: "Credentials or active onboarding link for Coupa, Ariba, or Tungsten.",
        essential: true,
      },
      {
        name: "Machine-Readable PDF",
        description: "Text-selectable PDF generated from your accounting software.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Invoice [Invoice#] Submission Confirmation — Portal Ingestion",
      body: `Hi AP Team,

We received notice that our invoice [Invoice#] could not be processed via email submission.

Could you please confirm the designated portal or upload endpoint (e.g., Coupa, Ariba, or Tungsten) and ensure our supplier profile is linked to PO [PO#]?

If an invitation or portal link is required, please resend to [Billing Email].

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "Coupa, SAP Ariba, Basware, Tungsten Network, Tipalti, Taulia, Bill.com.",
      relevantCodes: [
        "ERR_CHANNEL_NOT_ALLOWED",
        "CXML_REJECTED",
        "OCR_PARSING_FAILED",
        "PORTAL_MANDATE",
      ],
      erpMechanism:
        "Inbound mailbox auto-responder rules reject PDF attachments from vendors enrolled in e-portals.",
    },
    recifyCta: {
      badge: "Portal Administration",
      headline: "Managing 10 different customer portals is a full-time job.",
      supportingText:
        "Every enterprise customer requires a different portal login, PO-flip workflow, and file format. Recify's team manages all customer portals on your behalf, so no invoice sits in limbo.",
      buttonLabel: "Have Recify manage your portals",
      buttonTo: "/contact",
    },
    keywords: [
      "portal",
      "coupa",
      "ariba",
      "tungsten",
      "cxml",
      "submission channel",
      "upload",
      "electronic invoice",
      "email not accepted",
      "supplier portal",
      "po flip",
      "parsing failed",
    ],
    triggerPhrases: [
      "rejected in coupa",
      "rejected in ariba",
      "submit via supplier portal",
      "email submission no longer accepted",
      "invalid cxml format",
      "failed to parse document",
      "must be submitted via portal",
    ],
    supportingSlug: "wrong-submission-channel",
  },
  {
    id: "MISSING_PO_NUMBER",
    name: "Missing Purchase Order (No PO No Pay)",
    category: "Purchase Order Governance",
    shortDescription:
      "The customer operates a strict 'No PO, No Pay' policy and no PO reference was provided.",
    whatHappened:
      "Enterprise finance departments enforce automated 'No PO, No Pay' filters. Any invoice submitted without a valid PO reference in the designated metadata field is automatically rejected prior to review.",
    actionParty: "Buyer / Procurement",
    concreteActions: [
      "Contact the individual who authorized or requested the service and ask them to generate an official Purchase Order.",
      "If the work was done under an emergency or master service agreement, obtain the Blanket PO or contract authorization number.",
      "Reissue the invoice with the PO number prominently displayed in both the header and footer.",
    ],
    whatToAvoid:
      "Never start work or submit invoices without obtaining the PO number upfront. It delays payment by an average of 45+ days.",
    evidenceChecklist: [
      {
        name: "Written Work Order / Email Approval",
        description: "Written authorization from the customer stakeholder requesting the work.",
        essential: true,
      },
      {
        name: "Master Services Agreement / Quote",
        description: "The underlying contract with pricing terms.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Purchase Order Needed for Invoice [Invoice#] — [Project Name]",
      body: `Hi [Buyer Name],

Our accounts team submitted Invoice [Invoice#] for [Amount] for work completed on [Project Name]. 

The AP system returned the invoice because no PO number was referenced ('No PO, No Pay' policy).

Could you please provide the approved PO number for this engagement, or initiate the requisition with your finance team?

Attached is the work completion sign-off and original quote for your records.

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "Universal across Fortune 1000 ERP policies (SAP, Oracle, Workday).",
      relevantCodes: [
        "NO_PO_NO_PAY",
        "PO_REQUIRED",
        "MISSING_MANDATORY_FIELD_PO",
        "ERR_NO_REFERENCE",
      ],
      erpMechanism:
        "Gateway validation rejects document during ingestion if field PO_NUMBER is NULL or EMPTY.",
    },
    recifyCta: {
      badge: "Governance Blocker",
      headline: "Your invoice may be fine — the blocker is on the buyer's side.",
      supportingText:
        "When customers don't issue POs on time, your cash sits trapped. Recify runs proactive pre-billing follow-ups to secure POs before invoices are even generated.",
      buttonLabel: "Have Recify handle the follow-up",
      buttonTo: "/contact",
    },
    keywords: [
      "no po",
      "missing po",
      "po required",
      "no po no pay",
      "purchase order required",
      "missing purchase order",
      "unreferenced",
      "no purchase order",
    ],
    triggerPhrases: [
      "no po no pay",
      "missing purchase order",
      "po number is required",
      "purchase order number must be provided",
      "invoice rejected due to missing po",
    ],
    supportingSlug: "missing-po",
  },
  {
    id: "LEGAL_ENTITY_OR_REMIT_TO_MISMATCH",
    name: "Incorrect Legal Entity, Bill-To, or Remit-To Details",
    category: "Master Data & Vendor Profile",
    shortDescription:
      "The customer legal entity name, address, or your supplier remit-to details do not match vendor master records.",
    whatHappened:
      "Enterprise buyers operate dozens of distinct legal subsidiaries. Invoicing the parent company instead of the contracting subsidiary — or listing bank remit-to details that differ from the buyer's approved vendor file — halts the invoice to prevent fraud.",
    actionParty: "Supplier Billing & Buyer Vendor Master",
    concreteActions: [
      "Examine the buyer's purchase order to identify the exact legal company name and billing address (e.g., 'Acme Logistics LLC' vs 'Acme Corp Inc').",
      "Confirm whether your company recently changed bank accounts or corporate addresses, and submit a vendor update form if needed.",
      "Reissue the invoice matching the exact entity name and address specified on the contract/PO.",
    ],
    whatToAvoid:
      "Never update banking details via casual email. Enterprise buyers require formal verification to avoid payment redirection scams.",
    evidenceChecklist: [
      {
        name: "Purchase Order Header",
        description: "Official PO showing exact legal entity name and address.",
        essential: true,
      },
      {
        name: "Bank Letter / Voided Cheque",
        description: "Official bank confirmation on bank letterhead confirming remit-to details.",
        essential: false,
      },
    ],
    emailTemplate: {
      subject: "Legal Entity Verification on Invoice [Invoice#]",
      body: `Hi AP Team,

Invoice [Invoice#] was flagged for a legal entity / remit-to address mismatch.

Could you confirm the exact legal entity name and billing address registered in your ERP for PO [PO#]? 

We will immediately regenerate the invoice to mirror your vendor master file specifications.

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "Vendor master compliance checks in SAP FI, Oracle Payables, and Coupa SIM.",
      relevantCodes: [
        "ENTITY_MISMATCH",
        "INVALID_REMIT_TO",
        "BANK_DETAILS_NOT_ON_FILE",
        "ADDRESS_MISMATCH",
      ],
      erpMechanism: "ERP compares field KUNNR/LIFNR against invoice XML vendor identifier.",
    },
    recifyCta: {
      badge: "Master Data Alignment",
      headline: "Fix this issue before resubmitting.",
      supportingText:
        "Master data mismatches can trap invoices for months in corporate treasury queues. Recify verifies vendor master records across all your accounts before invoices are dispatched.",
      buttonLabel: "Talk to Recify",
      buttonTo: "/contact",
    },
    keywords: [
      "legal entity",
      "remit to",
      "bill to",
      "address mismatch",
      "entity mismatch",
      "vendor master",
      "wrong subsidiary",
      "bank details",
      "banking information",
    ],
    triggerPhrases: [
      "billed to wrong legal entity",
      "remit-to address mismatch",
      "supplier bank details mismatch",
      "invalid bill-to address",
      "vendor details do not match po",
    ],
  },
  {
    id: "COUPA_SPECIFIC_REJECTION",
    name: "Coupa Portal Rejection / cXML Transmission Failure",
    category: "Portal: Coupa",
    shortDescription:
      "Rejected by the customer's Coupa e-invoicing instance due to validation rules or PO matching flags.",
    whatHappened:
      "The customer's Coupa instance evaluated the electronic invoice and rejected it. Coupa enforces strict line-level field matching against the PO, including UOM (Unit of Measure), tax codes, and attachment size limits.",
    actionParty: "Supplier Billing / Portal Ops",
    concreteActions: [
      "Log into the customer's Coupa Supplier Portal (CSP) and review the exact rejection comments listed on the invoice history tab.",
      "Check Unit of Measure (UOM) compatibility — if the PO specifies 'EA' (Each) and your bill says 'PCS' (Pieces), Coupa rejects it.",
      "Use the 'Create Invoice from PO' (PO Flip) button directly in CSP to ensure all header and line details map 1:1.",
    ],
    whatToAvoid:
      "Do not submit invoices via Coupa's email-to-invoice address if your supplier profile has been switched to Coupa Supplier Portal.",
    evidenceChecklist: [
      {
        name: "Coupa Purchase Order",
        description: "Viewable inside the Coupa Supplier Portal.",
        essential: true,
      },
      {
        name: "Coupa Rejection History Screenshot",
        description: "Full error log from the Coupa invoice status page.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "Coupa Invoice [Invoice#] Rejection Follow-Up — PO [PO#]",
      body: `Hi AP Team,

Invoice [Invoice#] submitted via Coupa for PO [PO#] was rejected with status: '[Coupa Status]'.

We are reviewing the line item UOM and tax mapping. Could you confirm if the PO lines need to be receipted or if any Coupa custom fields are required?

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "Coupa Supplier Portal (CSP) or Coupa cXML Gateway.",
      relevantCodes: ["COUPA_INVOICE_REJECTED", "COUPA_UOM_MISMATCH", "COUPA_PO_FLIP_ERROR"],
      erpMechanism:
        "Coupa business rules engine validates cXML schema and PO matching tolerances before ERP sync.",
    },
    recifyCta: {
      badge: "Coupa Portal Operations",
      headline: "Stop wrestling with Coupa exceptions.",
      supportingText:
        "Coupa PO flips, UOM errors, and receipt holds stall payments for thousands of vendors. Recify monitors and resolves Coupa invoice disputes on your behalf.",
      buttonLabel: "Have Recify handle Coupa billing",
      buttonTo: "/contact",
    },
    keywords: ["coupa", "csp", "coupa portal", "coupa rejection", "uom mismatch", "coupa invoice"],
    triggerPhrases: [
      "rejected in coupa",
      "coupa status rejected",
      "coupa validation error",
      "coupa supplier portal",
    ],
    supportingSlug: "coupa",
  },
  {
    id: "ARIBA_SPECIFIC_REJECTION",
    name: "SAP Ariba Network Rejection / Exception",
    category: "Portal: SAP Ariba",
    shortDescription:
      "Rejected on the SAP Ariba Network due to customer transaction rules, line matching, or unconfirmed orders.",
    whatHappened:
      "The invoice submitted via SAP Business Network (formerly Ariba Network) failed the customer's published Country-Based Invoice Rules or order-confirmation prerequisites.",
    actionParty: "Supplier Billing / Portal Ops",
    concreteActions: [
      "Log into your SAP Business Network account and check the 'History' tab of the rejected invoice to view the exact rule violation.",
      "Check if the customer requires an Order Confirmation or Ship Notice (ASN) to be published on Ariba prior to invoice submission.",
      "Confirm whether your Ariba account routing status is linked to the buyer's ANID (Ariba Network Identifier).",
    ],
    whatToAvoid:
      "Avoid deleting rejected invoices in Ariba without reviewing the error code. Ariba preserves history for credit matching.",
    evidenceChecklist: [
      {
        name: "Ariba Purchase Order (ANID)",
        description: "The official order document visible on your SAP Business Network dashboard.",
        essential: true,
      },
      {
        name: "Ariba Rule Violation Log",
        description: "Export of the Ariba error text.",
        essential: true,
      },
    ],
    emailTemplate: {
      subject: "SAP Ariba Invoice [Invoice#] Error — Customer Rule Check for PO [PO#]",
      body: `Hi AP Team,

Our submission of Invoice [Invoice#] on the SAP Business Network (Ariba) for PO [PO#] was returned by your automated network rules.

Ariba Error Notice: [Error message from Ariba history]

Could you confirm if an Order Confirmation / Ship Notice is required on our side, or if your procurement team needs to approve the receipt in SAP?

Thank you,
[Your Name]
[Your Company]`,
    },
    technicalDetails: {
      portalContext: "SAP Business Network / Ariba Network.",
      relevantCodes: ["ARIBA_RULE_FAIL", "HTTP_417_ARIBA", "ASN_REQUIRED", "ANID_MISMATCH"],
      erpMechanism:
        "Ariba Network pre-validation filters check buyer rule matrix before submitting to SAP S/4HANA.",
    },
    recifyCta: {
      badge: "SAP Ariba Operations",
      headline: "Ariba network rules shouldn't delay your payroll.",
      supportingText:
        "Ariba's transaction rules, ASN requirements, and line exceptions are notoriously tedious. Recify operates your enterprise portals so your cash arrives on time.",
      buttonLabel: "Have Recify manage your Ariba portal",
      buttonTo: "/contact",
    },
    keywords: [
      "ariba",
      "sap ariba",
      "ariba network",
      "business network",
      "anid",
      "asn",
      "ariba error",
    ],
    triggerPhrases: [
      "rejected in ariba",
      "ariba network error",
      "ariba rule violation",
      "sap business network rejected",
    ],
    supportingSlug: "ariba",
  },
];
