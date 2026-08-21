// Content mirror of https://recify-ar.lovable.app/
// Kept as close to the original copy as possible.

export const hero = {
  title: "From outstanding invoices to",
  highlight: "outstanding outcomes.",
  tagline: "Your AR team, without another hire.",
  description: "We run your invoice-to-cash work — AI for the volume, people for the judgment. Get Accounts Receivable (AR) moving without the headcount.",
  primaryCta: { label: "Get your free AR health check", to: "/start" },
  secondaryCta: { label: "See how it works", to: "/system" },
  trustLine: "Managed service • AI-enabled • Human-led • Built for growing B2B businesses",
};

export const trustPill = {
  items: [
    { number: "01", label: "Managed AR" },
    { number: "02", label: "Dispute Management" },
    { number: "03", label: "Cash Flow Visibility" },
  ],
  summary: "One service. One accountable team. One outcome: getting your earned revenue into cash.",
};

export const problem = {
  kicker: "The problem",
  title: "Revenue isn't real until it becomes cash.",
  intro: "Growing businesses rarely need another finance system. They need someone to consistently own the work that happens after the invoice is sent.",
  issues: [
    {
      title: "Follow-ups fall through",
      description: "Collections become one more task on a bookkeeper's or founder's list.",
    },
    {
      title: "Disputes stay stuck",
      description: "Missing documentation, approvals, pricing questions and delivery issues can keep valid invoices unpaid for weeks.",
    },
    {
      title: "No one sees the risk",
      description: "An aging report tells you what is overdue. It doesn't always tell you what is about to become overdue.",
    },
    {
      title: "Founders become the collections team",
      description: "Important customer relationships end up depending on someone personally remembering who needs to be chased.",
    },
  ],
  cta: { label: "Let Recify take it from here", to: "/services" },
};

export const services = {
  kicker: "What Recify actually does",
  title: "Three functions. One managed outcome.",
  subtitle: "These are not software modules. They are operated services — the work we take off your team and run to a result.",
  items: [
    {
      number: "01",
      title: "Recover",
      description: "Move outstanding invoices toward payment.",
      features: [
        "Personalised payment follow-ups",
        "Email communication",
        "Approved messaging cadence",
        "Payment reminders",
        "Escalation sequencing",
        "Payment-status tracking",
        "Cash application / reconciliation",
        "Aging monitoring",
      ],
      outcome: "More consistent collections with less internal chasing.",
    },
    {
      number: "02",
      title: "Resolve",
      description: "Find out why an invoice isn't being paid — and work the problem through.",
      features: [
        "Dispute identification",
        "Documentation gathering",
        "Missing PO / approval / W9 follow-up",
        "Customer communication",
        "Dispute tracking",
        "Negotiation support",
        "Exception handling",
        "Escalation and resolution tracking",
      ],
      outcome: "Stuck invoices become actionable problems instead of forgotten balances.",
    },
    {
      number: "03",
      title: "See",
      description: "Know what is coming in, what is delayed and where attention is needed.",
      features: [
        "AR aging",
        "DSO tracking",
        "Weekly reporting",
        "At-risk account identification",
        "Cash-inflow visibility",
        "Customer payment behaviour",
        "Trend monitoring",
        "Action recommendations",
      ],
      outcome: "Clearer cash-flow decisions without another system to manage.",
    },
  ],
  cta: { label: "Explore the services", to: "/services" },
};

export const differentiator = {
  kicker: "The differentiator",
  title: "AI does the volume. People handle the judgment.",
  ai: {
    title: "AI handles the volume",
    items: [
      "Follow-up preparation",
      "Reminder sequencing",
      "Data matching",
      "Aging analysis",
      "Documentation organisation",
      "Account monitoring",
      "Reporting preparation",
      "Risk signals",
    ],
  },
  human: {
    title: "People handle the judgment",
    items: [
      "Disputes",
      "Exceptions",
      "Negotiation",
      "Escalation",
      "Phone conversations",
      "Sensitive customer situations",
      "Complex documentation",
      "Client strategy",
    ],
  },
  closing: "You get the leverage of AI without handing your customer relationships to a bot.",
};

export const model = {
  kicker: "The model",
  title: "Not software you operate. A function we operate for you.",
  rows: [
    { traditional: "You log in.", recify: "You give us the receivables." },
    { traditional: "You configure workflows.", recify: "We run the workflow." },
    { traditional: "You monitor tasks.", recify: "We prepare and manage follow-ups." },
    { traditional: "Your team chases customers.", recify: "We work exceptions." },
    { traditional: "You interpret the exceptions.", recify: "We handle judgment calls." },
    { traditional: "Your team remains responsible.", recify: "We report what matters." },
  ],
  closing: "You're not buying access to Recify. You're buying an AR function.",
};

export const steps = {
  kicker: "How it works",
  title: "Four steps to an owned process.",
  note: "Typical onboarding: approximately 3–5 business days, subject to data and access readiness.",
  items: [
    { number: "01", title: "Connect", description: "Connect your accounting system and securely provide the receivables information we need." },
    { number: "02", title: "Analyze", description: "We review your AR, identify overdue balances, disputes, exceptions and collection priorities." },
    { number: "03", title: "Operate", description: "Recify starts the follow-up, reconciliation, dispute and escalation process." },
    { number: "04", title: "Report & improve", description: "You receive clear reporting on recovered cash, outstanding risk, DSO and what needs attention." },
  ],
};

export const industries = {
  kicker: "Industries",
  title: "Built for businesses where invoices don't pay themselves.",
  subtitle: "Different industries stall payment for different reasons. We work the specific blockers that keep your revenue outstanding.",
  items: [
    {
      title: "Construction & Trade Contracting",
      description: "Keep payment issues moving before they become cash-flow problems.",
      bullets: ["Progress claims", "Variations", "Retentions", "Approval delays", "Documentation disputes", "GC / subcontractor payment delays"],
      href: "/industries/construction",
    },
    {
      title: "Freight, Logistics & Trucking",
      description: "Resolve the paperwork and payment blockers keeping freight revenue outstanding.",
      bullets: ["Detention / accessorial disputes", "Rate disagreements", "POD / documentation issues", "Brokers and shippers paying late", "Invoice discrepancies"],
      href: "/industries/freight-logistics",
    },
    {
      title: "Wholesale & Distribution",
      description: "Keep recurring B2B receivables moving without adding another finance hire.",
      bullets: ["Pricing discrepancies", "PO mismatches", "Delivery disputes", "Short payments", "Credit-term customers", "Large customer balances"],
      href: "/industries/wholesale-distribution",
    },
  ],
  cta: { label: "See whether Recify fits your business", to: "/industries" },
};

export const idealFit = {
  kicker: "Ideal fit",
  title: "Recify works best when the revenue is earned — but the cash is late.",
  strong: [
    "B2B business",
    "Sells on credit terms",
    "50+ invoices per month",
    "Recurring invoicing",
    "Meaningful outstanding receivables",
    "No dedicated AR / collections team",
    "Owner, bookkeeper or finance team currently handles collections",
    "Wants someone to actively own the process",
  ],
  not: [
    "Consumer or COD business",
    "Very low invoice volume",
    "No meaningful receivables problem",
    "Wants only software",
    "Requires legal debt collection rather than AR operations",
    "Requires regulated or legal services Recify does not provide",
  ],
};

export const healthCheck = {
  kicker: "Free AR health check",
  title: "Find out where your cash is getting stuck — free.",
  description: "Share your AR aging report. We'll return a concise analysis showing where receivables are concentrated, what appears at risk and where follow-up may be getting lost.",
  cta: { label: "Get my free AR health check", to: "/start" },
  note: "Your data is handled confidentially and only used for the agreed assessment.",
  securityCta: { label: "How we handle data", to: "/security" },
};

export const outcomes = {
  kicker: "What to expect",
  title: "The outcomes we work toward.",
  items: [
    { number: "01", title: "More cash collected", description: "Outstanding invoices actively move toward resolution." },
    { number: "02", title: "Less internal work", description: "Your team spends less time chasing payment status." },
    { number: "03", title: "Faster dispute resolution", description: "Payment blockers become tracked actions instead of forgotten email threads." },
    { number: "04", title: "Better visibility", description: "Know what is overdue, what is at risk and what is expected." },
  ],
};

export const pricingTeaser = {
  kicker: "Pricing",
  title: "One team. One monthly fee. No software seat licenses.",
  subtitle: "Simple monthly pricing based primarily on the volume and complexity of receivables we manage.",
  tiers: [
    { tier: "Tier 1", title: "Execution", price: "$750", period: "per month", tagline: "We chase. We track. You get paid." },
    { tier: "Tier 2", title: "Resolution", price: "$1,200", period: "per month", tagline: "We solve delays. We recover cash.", recommended: true },
    { tier: "Tier 3", title: "Optimization", price: "$2,000 – $4,000+", period: "per month", tagline: "We scale systems. We improve cash flow." },
  ],
  cta: { label: "See full pricing", to: "/pricing" },
};

export const securityTeaser = {
  kicker: "Security & trust",
  title: "Your receivables are sensitive. We treat them that way.",
  cta: { label: "Read our data practices", to: "/security" },
  items: [
    "Role-based access",
    "Two-factor authentication",
    "Encryption in transit and at rest",
    "Data Processing Agreement",
    "Defined retention and deletion",
    "No training of public AI models on your data",
  ],
};

export const faqTeaser = {
  kicker: "FAQ",
  title: "Straight answers.",
  intro: "What Recify does, what it doesn't do, and how the service actually operates.",
  items: [
    {
      question: "What exactly does Recify do?",
      answer: "Recify manages the work between invoice and cash — payment follow-ups, reconciliation, dispute identification and documentation, escalation, customer communication and reporting [...]",
    },
    {
      question: "Is Recify software?",
      answer: "No. Recify is an Outcome-as-a-Service company. We use software and AI internally, but you are hiring us to operate your receivables — not buying another system to manage.",
    },
    {
      question: "Do I need to hire an AR employee?",
      answer: "No. Recify is designed to provide the operational capacity of a managed AR function without requiring you to build the function internally.",
    },
    {
      question: "Will AI communicate with my customers?",
      answer: "AI can assist with preparation and workflow, while appropriate customer communication is reviewed and managed according to your agreed process. Sensitive judgment calls and escalat[...]",
    },
    {
      question: "Can Recify handle disputes?",
      answer: "Yes, within the agreed scope. We organise documentation, identify blockers, coordinate communication and track disputes toward resolution. Recify does not provide legal advice.",
    },
    {
      question: "Do you make phone calls?",
      answer: "Yes, where included in the selected service scope and appropriate for the account.",
    },
  ],
  cta: { label: "Read all questions", to: "/faq" },
};

export const global = {
  whatsapp: "https://wa.me/919428513418",
  whatsappLabel: "WhatsApp",
  email: "mailto:hello@recify.in",
  emailLabel: "hello@recify.in",
  phone: "+91 94285 13418",
  phoneHref: "https://wa.me/919428513418",
};

export const pageHeroes: Record<string, { kicker: string; title: string; highlight?: string; subtitle: string }> = {
  system: { kicker: "The system", title: "You don't operate Recify.", highlight: "Recify operates your receivables.", subtitle: "A managed function that takes over the work between invoice and ca[...]" },
  services: { kicker: "What Recify actually does", title: "Three functions.", highlight: "One managed outcome.", subtitle: "These are not software modules. They are operated services — the work[...]" },
  industries: { kicker: "Industries", title: "Built for businesses where invoices", highlight: "don't pay themselves.", subtitle: "Different industries stall payment for different reasons. We wor[...]" },
  pricing: { kicker: "Pricing", title: "One team. One monthly fee.", highlight: "No seat licenses.", subtitle: "Simple monthly pricing based primarily on the volume and complexity of receivables [...]" },
  results: { kicker: "Results", title: "What an owned AR process", highlight: "actually changes.", subtitle: "Recify is early-stage and we don't publish numbers we can't verify. Here is what the [...]" },
  about: { kicker: "About Recify", title: "AR shouldn't require", highlight: "another full-time hire.", subtitle: "Recify was built around a simple observation: many growing B2B companies have en[...]" },
  faq: { kicker: "FAQ", title: "Straight", highlight: "answers.", subtitle: "What Recify does, what it doesn't do, and how the service actually operates." },
  contact: { kicker: "Prefer to talk?", title: "Book a short conversation", highlight: "about your receivables.", subtitle: "This is a receivables review, not a sales demo. Twenty minutes to unde[...]" },
  start: { kicker: "Free AR health check", title: "Let's see if Recify", highlight: "is a fit.", subtitle: "Answer a few questions. We'll recommend the right next step." },
  security: { kicker: "Security & trust", title: "Your receivables are sensitive.", highlight: "We treat them that way.", subtitle: "Recify works inside your financial data. These are the control[...]" },
};

export const fullPricing = {
  tiers: [
    {
      name: "Execution",
      price: "$750",
      period: "per month",
      tagline: "We chase. We track. You get paid.",
      bestFor: "Companies that need consistent follow-ups and clear visibility.",
      features: [
        "Invoice-to-cash follow-ups (email-based cadence)",
        "AI-assisted personalized collection messaging",
        "Payment tracking & status updates",
        "Cash application & reconciliation",
        "Weekly AR aging reports",
        "DSO tracking",
        "Basic AR visibility dashboard",
        "1 accounting software integration",
      ],
      cta: { label: "Start with Execution", to: "/start" },
    },
    {
      name: "Resolution",
      price: "$1,200",
      period: "per month",
      tagline: "We solve delays. We recover cash.",
      bestFor: "Businesses where payments are blocked, delayed, or disputed.",
      features: [
        "Everything in Execution",
        "Full dispute management & tracking",
        "Exception handling (missing PO, approvals, docs)",
        "Documentation collection & follow-ups",
        "Direct customer communication",
        "Escalation for chronic non-payers",
        "Payment-risk tracking",
        "Phone follow-ups (when required)",
      ],
      cta: { label: "Choose Resolution", to: "/start" },
      recommended: true,
    },
    {
      name: "Optimization",
      price: "$2,000 – $4,000+",
      period: "per month",
      tagline: "We scale systems. We improve cash flow.",
      bestFor: "High-volume AR operations that need structure, insights, and control.",
      features: [
        "Everything in Resolution",
        "High-volume AR operations handling",
        "Customer & collections intelligence",
        "Payment behavior & risk trend monitoring",
        "Dispute & payment history tracking",
        "ERP & workflow automation support",
        "Portal submission support (Coupa, Ariba, etc.)",
        "Custom dashboards & reporting",
        "Continuous process optimization",
      ],
      cta: { label: "Talk to Recify", to: "/contact" },
    },
  ],
  disclaimer: "Pricing shown is indicative for standard scopes. Final pricing may vary based on invoice volume, dispute complexity, communication requirements, integrations and operational scope.[...]",
  beforeYouChoose: [
    {
      question: "What exactly does Recify do?",
      answer: "Recify manages the work between invoice and cash — payment follow-ups, reconciliation, dispute identification and documentation, escalation, customer communication and reporting [...]",
    },
    {
      question: "Is Recify software?",
      answer: "No. Recify is an Outcome-as-a-Service company. We use software and AI internally, but you are hiring us to operate your receivables — not buying another system to manage.",
    },
    {
      question: "Do I need to hire an AR employee?",
      answer: "No. Recify is designed to provide the operational capacity of a managed AR function without requiring you to build the function internally.",
    },
    {
      question: "Will AI communicate with my customers?",
      answer: "AI can assist with preparation and workflow, while appropriate customer communication is reviewed and managed according to your agreed process. Sensitive judgment calls and escalat[...]",
    },
  ],
  nextStep: {
    title: "Not sure which tier fits?",
    description: "Answer a few questions and we'll recommend the right next step — no obligation.",
    primary: { label: "Get your free AR health check", to: "/start" },
    secondary: { label: "Book an AR fit call", to: "/contact" },
  },
};

export const fullFaq = [
  {
    question: "What exactly does Recify do?",
    answer: "Recify manages the work between invoice and cash — payment follow-ups, reconciliation, dispute identification and documentation, escalation, customer communication and reporting [...]",
  },
  {
    question: "Is Recify software?",
    answer: "No. Recify is an Outcome-as-a-Service company. We use software and AI internally, but you are hiring us to operate your receivables — not buying another system to manage.",
  },
  {
    question: "Do I need to hire an AR employee?",
    answer: "No. Recify is designed to provide the operational capacity of a managed AR function without requiring you to build the function internally.",
  },
  {
    question: "Will AI communicate with my customers?",
    answer: "AI can assist with preparation and workflow, while appropriate customer communication is reviewed and managed according to your agreed process. Sensitive judgment calls and escalatio[...]",
  },
  {
    question: "Can Recify handle disputes?",
    answer: "Yes, within the agreed scope. We organise documentation, identify blockers, coordinate communication and track disputes toward resolution. Recify does not provide legal advice.",
  },
  {
    question: "Do you make phone calls?",
    answer: "Yes, where included in the selected service scope and appropriate for the account.",
  },
  {
    question: "Which accounting systems do you support?",
    answer: "Support can include systems such as Xero, QuickBooks and MYOB, with broader integrations depending on scope.",
  },
  {
    question: "Do you work internationally?",
    answer: "Yes. Recify is designed to support B2B businesses across international markets, subject to operational, regulatory and communication requirements.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer: "No long-term commitment is intended for standard plans. Exact contractual terms are confirmed in the service agreement.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Typical onboarding can take approximately 3–5 business days when required information and access are available.",
  },
];

export const securityPage = {
  controls: [
    "Role-based access",
    "Two-factor authentication",
    "Secure data handling and encryption",
    "Access limited to the people operating your account",
    "Data Processing Agreement",
    "Defined data retention and deletion process",
    "Access revoked at offboarding",
    "Payment processing through established PCI-compliant providers",
    "AI services used under appropriate business / API terms",
    "Client data is not used to train public AI models",
  ],
  disclaimer:
    "Recify does not currently hold SOC 2, ISO 27001 or similar third-party certifications, and we won't claim otherwise. The practices above are the controls we operate and commit to contractual[...]",
};

export const contactPage = {
  whatWellCover: [
    { number: "01", title: "How your invoicing and payment terms work today" },
    { number: "02", title: "Where follow-ups, disputes and documentation currently stall" },
    { number: "03", title: "What a managed AR function would take over" },
    { number: "04", title: "Whether Recify is the right fit — and what we'd suggest if it isn't" },
  ],
  orStart: { label: "Or start with a free AR health check", to: "/start" },
  phones: [
    { label: "+91 94285 13418", href: "https://wa.me/919428513418" },
    { label: "+91 76002 87922", href: "https://wa.me/917600287922" },
  ],
};
