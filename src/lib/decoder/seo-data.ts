export interface SeoGuidePage {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  summary: string;
  whatItMeans: string;
  commonReasons: string[];
  whatBuyerIsChecking: string;
  whatSupplierShouldVerify: string[];
  commonMistakesToAvoid: string[];
  howToResolve: { step: string; detail: string }[];
  evidenceRequired: string[];
  emailTemplate: { subject: string; body: string };
  preventionTips: string[];
  sampleRejectionPhrase: string;
  faqs: { question: string; answer: string }[];
}

export const SEO_GUIDES: Record<string, SeoGuidePage> = {
  "po-mismatch": {
    slug: "po-mismatch",
    title: "Invoice Rejected Due to PO Mismatch: Causes, Fixes & Next Steps | Recify",
    metaDescription:
      "Understand why your invoice was rejected due to a PO mismatch. Learn what AP systems check, how to resolve invalid or closed POs, and what to send your buyer.",
    h1: "Invoice Rejected Due to PO Mismatch",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "A Purchase Order (PO) mismatch occurs when the details on your invoice do not line up with the buyer's approved purchase order in their ERP system. It is the single most common cause of delayed B2B payments.",
    whatItMeans:
      "When enterprise accounts payable teams process an invoice, their automated accounting system executes a two-way or three-way match against the purchase order. If the PO number is marked closed, expired, invalid, or mapped to the wrong line items, the system halts processing instantly to prevent unauthorized disbursements.",
    commonReasons: [
      "The PO was closed out automatically because prior invoices consumed the full committed balance.",
      "The buyer issued a new PO number following a scope change or fiscal year rollover, but the supplier billed against the legacy number.",
      "Typographical error: transposition of digits or omission of prefix codes (e.g. 'PO-100234' entered as '100234').",
      "Line item mapping failure: billing line item 002 against line item 001 on a multi-line PO.",
      "The purchasing department cancelled the PO internally without notifying the supplier's billing desk.",
    ],
    whatBuyerIsChecking:
      "The buyer's ERP (SAP, Oracle, NetSuite, Workday) validates table records to confirm: 1) Does this PO number exist in the current fiscal company code? 2) Is the PO status 'Approved / Open'? 3) Does the PO line specify the matching part number or service description?",
    whatSupplierShouldVerify: [
      "Confirm the PO document in your file is the latest signed revision.",
      "Check whether your billing system combined multiple purchase orders onto a single invoice (most AP portals prohibit multi-PO invoices).",
      "Verify whether any change orders were verbally promised but never formally created in the buyer's procurement system.",
    ],
    commonMistakesToAvoid: [
      "Never re-upload the same rejected invoice without getting the buyer to reopen or amend the PO in their ERP.",
      "Do not invent or guess a PO number to bypass an online portal submission gate.",
      "Avoid emailing invoices to AP without copying the buyer who ordered the work.",
    ],
    howToResolve: [
      {
        step: "1. Audit previous billings against the PO",
        detail:
          "Check your receivables ledger for every prior payment received under this PO number to see if the authorized balance was already exhausted.",
      },
      {
        step: "2. Contact the purchasing agent / buyer contact",
        detail:
          "Email your primary business sponsor explaining that AP flagged the PO as closed/invalid, and request an amended PO or revised number.",
      },
      {
        step: "3. Reissue with updated reference",
        detail:
          "Once the buyer confirms the PO is reopened or provides a new number, reissue the invoice clearly citing the new reference.",
      },
    ],
    evidenceRequired: [
      "Original signed Purchase Order",
      "Written scope change or change order approvals",
      "Signed Proof of Delivery (POD) or work acceptance sign-off",
      "Prior invoice ledger showing billed vs. remaining balance",
    ],
    emailTemplate: {
      subject: "PO Verification Needed: Invoice [Invoice#] flagged for PO Mismatch [PO#]",
      body: `Hi [Buyer Name],

Our accounts team submitted Invoice [Invoice#] for [Amount], which was rejected by your AP portal with a PO Mismatch notice for PO [PO#].

Could you please verify if PO [PO#] has been closed or if an updated PO number was generated for this project?

Invoice Details:
- Invoice #: [Invoice#]
- PO Cited: [PO#]
- Deliverables / Date: [Description on Date]
- Amount: [Amount]

Attached is our original order confirmation and proof of delivery. We appreciate your quick help so AP can schedule payment.

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Enforce mandatory PO verification before jobs or deliveries are dispatched.",
      "Track remaining balances on blanket purchase orders after every billing cycle.",
      "Establish automated alerts when an active PO reaches 80% utilization.",
    ],
    sampleRejectionPhrase: "PO number is invalid or has been closed",
    faqs: [
      {
        question: "Can an accounts payable clerk override a PO mismatch?",
        answer:
          "Rarely. In modern ERPs like SAP and Oracle, PO matching rules are enforced by automated workflows. An AP clerk cannot bypass a closed PO without formal change order authorization from procurement.",
      },
      {
        question: "How long does it take to fix a PO mismatch?",
        answer:
          "If the buyer only needs to click 'Reopen' on a closed line, it can take 24–48 hours. If a new purchase requisition and executive sign-off are required, resolution can take 2 to 4 weeks.",
      },
      {
        question: "Will a PO mismatch restart our payment terms (Net 30/60)?",
        answer:
          "Many enterprise contracts state that payment terms commence only upon receipt of a 'valid, undisputed invoice'. Resolving PO issues immediately is vital to prevent payment dates from resetting.",
      },
    ],
  },
  "price-mismatch": {
    slug: "price-mismatch",
    title: "Invoice Rejected Due to Price Mismatch: How to Resolve | Recify",
    metaDescription:
      "Find out why your invoice was rejected for price variance or exceeding the PO limit. Learn tolerance rules, how to handle price discrepancies, and next actions.",
    h1: "Invoice Rejected Due to Price Mismatch",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "A price mismatch rejection occurs when the unit price, line total, or gross invoice amount exceeds the agreed figure on the customer's purchase order.",
    whatItMeans:
      "Enterprise accounting systems apply strict tolerance checks (typically 0% to 5%). If the line item price on your bill is even pennies above the authorized unit cost, or includes unapproved freight, overtime, or surcharges, the invoice is halted for price variance.",
    commonReasons: [
      "Supplier instituted a price increase that was not updated in the buyer's procurement catalog or PO.",
      "Unapproved freight, shipping, fuel surcharges, or packaging fees added to the invoice.",
      "Billing calculated in a different currency than the PO (e.g. CAD vs USD).",
      "Unit of measure pricing confusion (e.g., price per case billed against price per single unit).",
      "Overtime or rush delivery charges added without an approved change order.",
    ],
    whatBuyerIsChecking:
      "The ERP checks line math: (Invoice Unit Price - PO Unit Price) * Quantity. If the variance is positive and exceeds the buyer's allowed tolerance, the payment pipeline halts automatically.",
    whatSupplierShouldVerify: [
      "Compare your invoice line item prices against the exact line items on the buyer's PO document.",
      "Check whether freight was explicitly authorized as a separate line item on the PO.",
      "Review whether sales tax was mistakenly included in the taxable subtotal line.",
    ],
    commonMistakesToAvoid: [
      "Do not silently credit or absorb valid contractual charges without discussing them with the customer.",
      "Do not submit invoices with estimated or variable shipping fees unless authorized as 'T&M / Pass-Through'.",
    ],
    howToResolve: [
      {
        step: "1. Identify the exact line item variance",
        detail:
          "Calculate line-by-line differences between your invoice and the PO to pinpoint the specific dollars in dispute.",
      },
      {
        step: "2. Determine if the variance is justified",
        detail:
          "If the price was agreed, gather the quote or email approval and request a PO amendment. If it was an internal billing error, issue a credit memo and revised invoice.",
      },
      {
        step: "3. Align with purchasing and AP",
        detail:
          "Send the revised invoice and credit note or confirmation of the PO amendment to the AP specialist handling your file.",
      },
    ],
    evidenceRequired: [
      "Signed quotation / rate card",
      "Customer email approving price change or freight pass-through",
      "Proof of delivery showing actual shipped quantities",
    ],
    emailTemplate: {
      subject: "Price Variance Resolution: Invoice [Invoice#] and PO [PO#]",
      body: `Hi [Buyer Name],

Invoice [Invoice#] for [Amount] was flagged by AP due to a price variance of [Variance Amount] against PO [PO#].

The difference reflects: [Explain reason, e.g. updated freight rates / agreed material cost adjustment approved on Date].

Attached is the written agreement from [Date]. Could you please submit a PO amendment for the difference so AP can release the invoice?

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Require sales and customer success teams to confirm PO match before customer invoicing runs.",
      "Lock billing system unit prices to the exact numbers agreed on the customer contract.",
    ],
    sampleRejectionPhrase: "Invoice amount exceeds PO amount",
    faqs: [
      {
        question: "What is price tolerance in accounts payable?",
        answer:
          "A price tolerance is a small threshold (e.g. 1% or $10) programmed into AP software allowing minor rounding differences to pass without human intervention.",
      },
      {
        question: "Can we issue a partial invoice to get paid for the agreed amount?",
        answer:
          "Some buyers allow short-paying the disputed amount while paying the undisputed balance. Inquire whether their AP policy permits partial settlement.",
      },
    ],
  },
  "missing-po": {
    slug: "missing-po",
    title: "Invoice Rejected for Missing PO: No PO No Pay Rules | Recify",
    metaDescription:
      "Learn how to handle 'No PO, No Pay' invoice rejections. Find out why companies enforce this rule, how to get a PO retroactively, and how to get paid.",
    h1: "Invoice Rejected Due to Missing PO",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "When a buyer enforces a strict 'No PO, No Pay' policy, any invoice submitted without an approved purchase order number in the required field is automatically returned or deleted.",
    whatItMeans:
      "Large corporations use 'No PO, No Pay' governance to control spend and ensure internal budgets are committed before vendor commitments are made. Inbound mailboxes and OCR scanning software immediately bounce documents that lack valid PO numbers.",
    commonReasons: [
      "Work was performed on verbal agreement or casual email without obtaining an official PO number upfront.",
      "The PO number was placed in the notes or line description rather than the dedicated 'Customer PO' header field.",
      "The contract was executed under an MSA, but individual billing required work order or call-off numbers.",
    ],
    whatBuyerIsChecking:
      "AP OCR software searches the top header quadrant of the PDF for standard strings ('PO#', 'P.O.', 'Purchase Order'). If empty, the document fails ingestion automatically.",
    whatSupplierShouldVerify: [
      "Review all emails and purchase documents from the customer for any 10-digit number or code representing their internal PO.",
      "Confirm whether your billing system printed the PO number in a machine-readable text layer, not a flattened scanned image.",
    ],
    commonMistakesToAvoid: [
      "Never continue providing ongoing goods or services without securing the PO number for previous milestones.",
      "Avoid submitting invoices marked 'PO Pending'. Automated intake gates reject them instantly.",
    ],
    howToResolve: [
      {
        step: "1. Escalate to the business sponsor",
        detail:
          "Contact the department manager who ordered the work and request that they submit a purchase requisition to finance immediately.",
      },
      {
        step: "2. Reissue the invoice with clean header placement",
        detail:
          "Once issued, generate a new invoice PDF with the PO clearly stated in the header, and resubmit.",
      },
    ],
    evidenceRequired: [
      "Signed scope of work or project agreement",
      "Email correspondence authorizing commencement of work",
      "Milestone completion sign-off",
    ],
    emailTemplate: {
      subject: "PO Request: Invoicing for [Project Name] — Invoice [Invoice#]",
      body: `Hi [Buyer Name],

Our invoice [Invoice#] for [Amount] was returned by accounts payable under your company's 'No PO, No Pay' policy.

To enable payment processing, could you please provide the approved PO number for this engagement?

Deliverables completed: [Brief summary]
Amount: [Amount]

Attached is our original project confirmation and sign-off.

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Establish a firm internal policy: No work begins and no goods ship until a verified PO is received.",
    ],
    sampleRejectionPhrase: "No PO number provided - No PO No Pay policy",
    faqs: [
      {
        question: "Can an enterprise customer refuse to pay if there was no PO?",
        answer:
          "Legally, if you have proof that the customer ordered, received, and benefited from the goods or services, they are obligated to pay. However, missing POs can delay payment by several months.",
      },
    ],
  },
  "missing-goods-receipt": {
    slug: "missing-goods-receipt",
    title: "Invoice Blocked for Missing Goods Receipt (GRN): How to Fix | Recify",
    metaDescription:
      "Why is your invoice on hold for missing goods receipt or GRN? Understand 3-way matching rules, how receiving holds work, and how to get paid fast.",
    h1: "Invoice Rejected / Held for Missing Goods Receipt (GRN)",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "A Goods Receipt Note (GRN) or Service Entry Sheet (SES) hold means your invoice is accurate, but the buyer's internal warehouse or project team hasn't logged confirmation that they received the goods or services.",
    whatItMeans:
      "In enterprise 3-way matching (PO + Goods Receipt + Invoice), payment cannot be scheduled until internal receiving enters confirmation in their ERP. This is a buyer-side operational bottleneck, not a supplier billing error.",
    commonReasons: [
      "Warehouse received the shipment but failed to scan or log the packing slip into SAP/Oracle.",
      "Shipment was delivered to a field site or sub-contractor location with no central receiving clerk.",
      "Service milestone was delivered, but the internal project manager forgot to approve the digital timesheet or SES.",
      "Partial delivery was made, but the invoice billed for the total order quantity.",
    ],
    whatBuyerIsChecking:
      "The ERP evaluates: Quantity Billed <= Quantity Received. If Quantity Received = 0, the invoice sits in a 'Parked' or 'Held' queue indefinitely.",
    whatSupplierShouldVerify: [
      "Obtain your carrier's signed Proof of Delivery (POD) showing recipient name, date, time, and stamp.",
      "Check whether the shipment was delivered to the exact dock/door specified on the PO.",
    ],
    commonMistakesToAvoid: [
      "Do not cancel the invoice or issue a credit note. The invoice is valid; the buyer's receiving department must record the receipt.",
      "Do not send repeated automated invoice reminders to AP without attaching the signed delivery proof.",
    ],
    howToResolve: [
      {
        step: "1. Retrieve signed delivery proof",
        detail: "Download the signed Bill of Lading, courier POD, or client sign-off sheet.",
      },
      {
        step: "2. Forward POD to both Buyer and AP",
        detail:
          "Send an email with the POD attached, requesting the warehouse log the Goods Receipt in their ERP against the PO.",
      },
    ],
    evidenceRequired: [
      "Signed Bill of Lading (BOL)",
      "Carrier tracking receipt with recipient signature",
      "Packing slip copy showing PO number",
    ],
    emailTemplate: {
      subject: "POD Attached for PO [PO#] — Missing Goods Receipt for Invoice [Invoice#]",
      body: `Hi [Buyer Name] & Accounts Payable,

Invoice [Invoice#] for [Amount] is currently on hold pending Goods Receipt (GRN) confirmation on PO [PO#].

The delivery was completed on [Delivery Date] and signed for by [Signee Name]. Attached is the signed Proof of Delivery (POD) and packing slip.

Could the receiving team please enter the Goods Receipt so AP can release the invoice for scheduled payment?

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Always attach carrier tracking and packing slips to invoice submissions proactively.",
    ],
    sampleRejectionPhrase: "Goods receipt has not been received",
    faqs: [
      {
        question: "How long does a goods receipt hold take to resolve?",
        answer:
          "Once the buyer's receiving team receives a signed POD, logging the GRN in SAP or Oracle takes under 5 minutes, immediately clearing the invoice hold.",
      },
    ],
  },
  "duplicate-invoice": {
    slug: "duplicate-invoice",
    title: "Invoice Rejected as Duplicate: Verification & Resolution | Recify",
    metaDescription:
      "Diagnose and resolve duplicate invoice rejections. Understand ERP unique constraint checks, how to handle re-submissions, and how to verify payment status.",
    h1: "Invoice Rejected Due to Duplicate Invoice",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "A duplicate invoice rejection indicates that an invoice with the identical invoice number and vendor code already exists in the buyer's accounting ledger.",
    whatItMeans:
      "Enterprise AP software checks for duplicates using a composite key: Vendor ID + Invoice Number + Amount. If any invoice enters the system with identical data, it is rejected immediately to protect against double payment.",
    commonReasons: [
      "An automated recurring invoice was sent twice by mistake.",
      "A corrected invoice was re-uploaded with the exact same invoice number rather than an amended reference.",
      "The invoice was submitted via portal and also emailed by a staff member.",
      "The buyer previously processed and paid the bill, but supplier cash application failed to reconcile the ledger.",
    ],
    whatBuyerIsChecking:
      "The ERP checks the vendor ledger table for any matching document number in the current or previous fiscal year.",
    whatSupplierShouldVerify: [
      "Audit your bank statements and unallocated cash accounts to confirm whether payment was actually deposited.",
      "Check whether a revised version was issued without appending a revision code (e.g. '-R1').",
    ],
    commonMistakesToAvoid: [
      "Never simply change the invoice number to a new number without checking if the previous invoice is already scheduled for payment.",
    ],
    howToResolve: [
      {
        step: "1. Request buyer AP statement of account",
        detail:
          "Ask the customer's AP department for a payment voucher, remittance advice, or current statement showing where the original invoice is posted.",
      },
      {
        step: "2. Reconcile records",
        detail:
          "If unpaid and amending, issue a formal cancellation/credit note for the original and submit a clearly marked revision.",
      },
    ],
    evidenceRequired: [
      "Accounts receivable statement of account",
      "Bank deposit records",
      "Formal credit memo (if replacing prior submission)",
    ],
    emailTemplate: {
      subject: "Duplicate Check Inquiry: Invoice [Invoice#] for [Company]",
      body: `Hi AP Team,

Our submission of Invoice [Invoice#] for [Amount] was flagged as a duplicate.

According to our receivables records, this invoice remains outstanding and unpaid.

Could you please confirm if this invoice is scheduled in an upcoming payment cycle, or provide the remittance advice if already disbursed?

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Establish strict internal controls ensuring only one submission channel is utilized per customer.",
    ],
    sampleRejectionPhrase: "Invoice already exists in the system",
    faqs: [
      {
        question: "Can an AP system falsely flag a unique invoice as duplicate?",
        answer:
          "Yes, if two different suppliers have similar vendor names, or if a supplier repeats invoice numbering at the start of a new calendar year without year prefixes.",
      },
    ],
  },
  "tax-error": {
    slug: "tax-error",
    title: "Invoice Rejected Due to Tax / VAT / GST Calculation Error | Recify",
    metaDescription:
      "Resolve invoice tax calculation errors, VAT mismatches, and compliance rejections. Learn how automated tax engines validate B2B invoices.",
    h1: "Invoice Rejected Due to Tax or Compliance Error",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "Tax and compliance rejections happen when mandatory tax identifiers are missing, line item calculations don't sum to the gross tax amount, or invalid tax codes are applied.",
    whatItMeans:
      "Global tax regulations (PEPPOL, European VAT directives, US state sales tax compliance) require exact machine-validated tax breakdowns. Automated engines like Vertex or Avalara reject invoices with even 1-cent rounding mismatches.",
    commonReasons: [
      "Missing or invalid supplier Tax ID, EIN, VAT, GST, or ABN number.",
      "Rounding discrepancy between line-item tax calculation and gross subtotal tax.",
      "Wrong tax jurisdiction code applied for customer delivery address.",
      "Missing tax exemption certificate number for tax-exempt B2B transactions.",
    ],
    whatBuyerIsChecking:
      "Tax engines verify tax registration validity and recalculate line tax rates against country and state statutory tables.",
    whatSupplierShouldVerify: [
      "Confirm both your company's full legal tax ID and customer's tax ID are clearly visible.",
      "Verify rounding logic: calculate tax per line and sum the lines, rather than multiplying the grand total.",
    ],
    commonMistakesToAvoid: [
      "Do not combine taxable and non-taxable products onto a single lump-sum line item.",
    ],
    howToResolve: [
      {
        step: "1. Check exact error notice",
        detail: "Identify whether the failure is missing ID data or a mathematical discrepancy.",
      },
      {
        step: "2. Reissue corrected compliant tax invoice",
        detail:
          "Update the tax breakdown, attach tax exemption certificates if applicable, and resubmit.",
      },
    ],
    evidenceRequired: [
      "Official tax registration certificate (W-9, VAT certificate)",
      "Customer Tax Exemption Certificate",
      "Reconciled line-by-line tax calculation sheet",
    ],
    emailTemplate: {
      subject: "Corrected Tax Invoice [Invoice#] — [Company]",
      body: `Hi AP Team,

We have updated Invoice [Invoice#] with the reconciled tax specifications.

- Updated Tax Registration: [Tax ID]
- Tax Rate & Subtotal: [Tax Amount] at [Tax Rate]%

Attached is the revised PDF and our tax certificate. Please process for payment.

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Configure your accounting software to calculate line-level tax rounding that aligns with e-invoicing standards.",
    ],
    sampleRejectionPhrase: "Tax ID is missing or invalid tax calculation error",
    faqs: [
      {
        question: "Why do e-invoicing portals reject for 1 cent rounding differences?",
        answer:
          "E-invoicing compliance laws require that the sum of line item taxes exactly matches the header tax total to satisfy statutory reporting requirements.",
      },
    ],
  },
  "wrong-submission-channel": {
    slug: "wrong-submission-channel",
    title: "Invoice Rejected: Wrong Submission Channel or Portal Mandate | Recify",
    metaDescription:
      "What to do when an invoice is rejected for being sent via the wrong channel (email vs portal). Learn customer e-invoicing mandates and portal requirements.",
    h1: "Invoice Rejected Due to Wrong Submission Channel",
    kicker: "INVOICE EXCEPTION GUIDE",
    summary:
      "When enterprise customers mandate supplier portal submissions (Coupa, Ariba, Tungsten), any invoices sent via regular email or physical post are rejected automatically.",
    whatItMeans:
      "Modern enterprises automate ingestion by routing 100% of invoices through electronic portals. Their inbound email addresses often run automated bounce bots that discard PDF attachments from registered suppliers.",
    commonReasons: [
      "Customer rolled out a new supplier portal policy without the supplier's AR team updating billing records.",
      "The invoice was uploaded as a flat image scan that the customer's OCR gateway could not parse.",
      "The file size exceeded portal attachment limits (usually 10MB).",
    ],
    whatBuyerIsChecking:
      "The customer's email gateway checks sender domains against an active portal vendor list and auto-rejects unapproved email submissions.",
    whatSupplierShouldVerify: [
      "Check your customer onboarding records to see which portal (Coupa, Ariba, Taulia, Tungsten, Bill.com) the customer uses.",
      "Ensure you have valid login credentials and that your supplier profile is active.",
    ],
    commonMistakesToAvoid: [
      "Do not forward the bounced email to the AP manager's personal inbox. They cannot bypass portal ingestion rules.",
    ],
    howToResolve: [
      {
        step: "1. Log into the designated portal",
        detail:
          "Access the customer portal, locate the purchase order, and initiate a PO-flip or direct upload.",
      },
      {
        step: "2. Verify digital ingestion",
        detail:
          "Ensure the status changes to 'Submitted' or 'Pending Approval' and note the portal document reference.",
      },
    ],
    evidenceRequired: [
      "Portal invitation / account verification",
      "Text-selectable PDF invoice",
      "PO document visible in portal",
    ],
    emailTemplate: {
      subject: "Portal Ingestion Inquiry: Invoice [Invoice#] for PO [PO#]",
      body: `Hi AP Team,

We received notice that email submissions are no longer accepted for Invoice [Invoice#].

Could you please confirm the designated supplier portal URL and ensure our vendor profile [Supplier ID] is linked to PO [PO#]?

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Maintain a customer billing directory tracking mandatory delivery channels for every client account.",
    ],
    sampleRejectionPhrase: "Submit via supplier portal email submission no longer accepted",
    faqs: [
      {
        question: "Can we charge a portal administration fee to customers?",
        answer:
          "Unless your contract explicitly permits administrative portal fees, enterprise buyers will reject such surcharges immediately.",
      },
    ],
  },
  coupa: {
    slug: "coupa",
    title: "Invoice Rejected in Coupa: Troubleshooting Errors & Fixes | Recify",
    metaDescription:
      "Diagnose and resolve Coupa invoice rejections. Fix PO line errors, UOM mismatches, tax issues, and status flags in the Coupa Supplier Portal.",
    h1: "Invoice Rejected in Coupa",
    kicker: "PORTAL TROUBLESHOOTING GUIDE",
    summary:
      "Coupa is one of the most widely used enterprise e-procurement platforms. When an invoice is rejected in Coupa, it is usually due to Unit of Measure (UOM) conflicts, tolerance overages, or unapproved lines.",
    whatItMeans:
      "Coupa evaluates electronic submissions against strict pre-configured business rules before transferring data to the customer's core ERP (SAP, Oracle, NetSuite). Any mismatch against the PO schema triggers an automated rejection.",
    commonReasons: [
      "Unit of Measure (UOM) mismatch: PO specifies 'EA' (Each) while invoice specifies 'PCS' (Pieces) or 'HRS' (Hours).",
      "Failure to use the 'Create Invoice from PO' (PO Flip) workflow.",
      "Invoice currency does not match the purchase order currency.",
      "Buyer has not logged receiving in Coupa ('Pending Receipt' status).",
    ],
    whatBuyerIsChecking:
      "Coupa's matching engine validates line numbers, UOM codes, price per unit, and tax fields against the buyer's internal chart of accounts.",
    whatSupplierShouldVerify: [
      "Log into the Coupa Supplier Portal (CSP) and inspect the 'Invoice History' tab for the exact system log.",
      "Verify that the invoice date is not in the future or older than allowed submission limits.",
    ],
    commonMistakesToAvoid: [
      "Never create a 'Credit Note' in Coupa without linking it to the specific rejected invoice number.",
    ],
    howToResolve: [
      {
        step: "1. Access Coupa Supplier Portal",
        detail:
          "Open the customer PO in CSP and use the 'PO Flip' button to generate an invoice pre-populated with verified lines.",
      },
      {
        step: "2. Verify UOM and attachment",
        detail:
          "Ensure your Unit of Measure matches the PO exactly and attach the customer-facing PDF.",
      },
    ],
    evidenceRequired: [
      "Coupa Purchase Order",
      "Coupa Rejection Log screenshot",
      "Proof of Delivery / Timesheet",
    ],
    emailTemplate: {
      subject: "Coupa Invoice [Invoice#] Rejection Follow-up — PO [PO#]",
      body: `Hi AP Team,

Our invoice [Invoice#] submitted via Coupa for PO [PO#] was rejected with status: [Coupa Error Message].

We are reviewing line-item mapping and UOM. Could you please confirm if the receiving has been recorded by [Buyer Name]?

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Always invoice directly through the Coupa Supplier Portal PO-flip feature rather than emailing cXML or PDFs.",
    ],
    sampleRejectionPhrase: "Rejected in Coupa: invoice line price exceeds PO tolerance",
    faqs: [
      {
        question: "What does 'Pending Receipt' mean in Coupa?",
        answer:
          "It means the invoice has been submitted successfully, but Coupa is waiting for the buyer's internal team to click 'Receive' on the purchase order before scheduling payment.",
      },
    ],
  },
  ariba: {
    slug: "ariba",
    title: "Invoice Rejected in SAP Ariba: Resolution & Rules Guide | Recify",
    metaDescription:
      "Troubleshoot SAP Ariba Network invoice rejections. Fix transaction rule violations, ASN issues, and line matching errors.",
    h1: "Invoice Rejected in SAP Ariba Network",
    kicker: "PORTAL TROUBLESHOOTING GUIDE",
    summary:
      "SAP Ariba (SAP Business Network) enforces rigorous buyer-configured Country-Based Invoice Rules. Invoices are rejected if prerequisites like Order Confirmations or Ship Notices are omitted.",
    whatItMeans:
      "When you submit an invoice via SAP Ariba, Ariba runs an automated validation pass before transmitting the invoice into the buyer's SAP S/4HANA or ECC system. Rejections occur in the network before reaching human AP staff.",
    commonReasons: [
      "Customer requires an Order Confirmation or Advance Ship Notice (ASN) to be submitted on Ariba prior to invoicing.",
      "Supplier's Ariba Network Identifier (ANID) is not properly linked or mapped to the buyer's trading relationship.",
      "Line item numbering or part numbering differs from the Ariba electronic PO.",
      "Customer does not allow non-PO invoices or paper attachments.",
    ],
    whatBuyerIsChecking:
      "Ariba Network checks the buyer's published 'Default Transaction Rules' and 'Invoice Rules'.",
    whatSupplierShouldVerify: [
      "Open the invoice on your SAP Business Network dashboard and review the 'History' tab for the specific rule number violated.",
      "Confirm whether your trading relationship status with the buyer is 'Current'.",
    ],
    commonMistakesToAvoid: [
      "Do not try to delete a rejected invoice in Ariba. You must cancel or edit and resubmit to preserve document audit trails.",
    ],
    howToResolve: [
      {
        step: "1. Review Ariba error code",
        detail: "Check the History tab to read the exact transaction rule that failed.",
      },
      {
        step: "2. Submit missing prerequisites",
        detail:
          "If an Order Confirmation or ASN is required, create it first against the PO before resubmitting the invoice.",
      },
    ],
    evidenceRequired: [
      "Ariba Purchase Order (ANID)",
      "Ariba Error Notification email",
      "Order Confirmation / ASN document",
    ],
    emailTemplate: {
      subject: "SAP Ariba Invoice [Invoice#] Rule Violation — PO [PO#]",
      body: `Hi AP Team,

Our submission of Invoice [Invoice#] for PO [PO#] on the SAP Business Network (Ariba) was returned by automated network rules: [Ariba Error].

Could you confirm if an Order Confirmation or Ship Notice is required on our side, or if an internal receipt hold exists in SAP?

Thank you,
[Your Name]
[Your Company]`,
    },
    preventionTips: [
      "Review the customer's published Ariba transaction rules under your trading relationship settings before billing.",
    ],
    sampleRejectionPhrase: "Rejected in Ariba: customer transaction rule violation",
    faqs: [
      {
        question: "What is an Ariba ANID?",
        answer:
          "An ANID (Ariba Network Identifier) is a unique routing number assigned to each company on the SAP Business Network. Your ANID must be linked to the buyer's ANID.",
      },
    ],
  },
};
