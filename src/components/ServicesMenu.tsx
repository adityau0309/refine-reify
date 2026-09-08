import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SectionContainer, SectionHeader, ButtonPrimary, ButtonSecondary } from "./recify";

const serviceItems = [
  { number: "01", name: "Collect", title: "Automated AR Follow-Up & Collections Management", summary: "Keep every outstanding invoice moving toward payment without manual chasing.", body: "Recify keeps your receivables moving after the invoice is sent. We track open balances, coordinate timely follow-ups and give your team a clear view of what is due, what is late and what needs attention.", bullets: ["Invoice tracking across your receivables", "Automated reminder sequences via email and SMS", "Follow-ups based on invoice status and due dates", "Basic DSO visibility", "Centralized tracking of collection activity"], outcome: "A consistent collection process that keeps invoices moving without putting the chasing back on your team." },
  { number: "02", name: "Resolve", title: "Dispute Resolution & Documentation Handling", summary: "Remove the issues that are blocking otherwise collectible invoices.", body: "Not every late invoice is a collections problem. Recify helps identify what is actually holding payment up, gathers the required information and keeps each dispute moving until there is a clear resolution or next step.", bullets: ["Identify and track payment disputes", "Organize supporting documentation", "Coordinate resolution of invoice issues", "Track disputed amounts through resolution", "Maintain a clear record of every outstanding blocker"], outcome: "Fewer invoices sitting in limbo because a dispute, document or internal approval was never properly followed through." },
  { number: "03", name: "Apply", title: "Cash Application", summary: "Make sure incoming payments are correctly matched to outstanding invoices.", body: "Getting paid is only half the job. Recify helps keep your receivables records aligned with the money that actually arrives, so partial, unmatched and misapplied payments do not quietly distort your AR picture.", bullets: ["Match payments to invoices", "Identify unmatched or partially paid invoices", "Track payment discrepancies", "Keep receivables records aligned with actual collections"], outcome: "Cleaner AR records and a more reliable view of what has been paid, what remains open and where discrepancies need action." },
  { number: "04", name: "Protect", title: "Credit Risk Flagging", summary: "Spot customers whose payment behavior is becoming a cash-flow risk.", body: "Late payment rarely happens without signals. Recify monitors payment behavior across your receivables and surfaces accounts showing signs of deterioration, giving your team a chance to act before a small delay becomes a large exposure.", bullets: ["Flag deteriorating payment behavior", "Identify customers showing increased payment risk", "Monitor overdue and at-risk accounts", "Give your team visibility before receivables become difficult to collect"], outcome: "Earlier visibility into customers that may require tighter terms, closer monitoring or a different collection approach." },
  { number: "05", name: "Escalate", title: "Escalation Workflows", summary: "Move consistently late accounts through the right escalation path.", body: "A reminder is not always enough. Recify gives overdue accounts a structured path from routine follow-up to increasingly firm action, with account-level tracking so nothing disappears when an invoice needs attention beyond standard collections.", bullets: ["Structured escalation sequences", "Increasingly firm communication", "Account-level escalation tracking", "Handoff of unresolved accounts when required"], outcome: "Persistent late payers move forward instead of remaining indefinitely in the same reminder cycle." },
  { number: "06", name: "Pay", title: "Customer Self-Serve Payment Portal", summary: "Make it easier for customers to pay without involving your team.", body: "Every unnecessary payment question adds friction. Recify gives customers a simple place to access the information they need to complete payment, reducing avoidable back-and-forth and making the final step easier.", bullets: ["Give customers a simple payment destination", "Provide access to invoice and payment information", "Reduce unnecessary back-and-forth", "Make payment completion easier and faster"], outcome: "Less friction between an approved invoice and the payment that closes it." },
  { number: "07", name: "See", title: "Cash-Flow Dashboard & Monthly Review", summary: "Turn receivables activity into a clear view of your cash position.", body: "Collections should not live in a spreadsheet that only gets opened when something goes wrong. Recify turns AR activity into a management view of outstanding cash, collection performance and accounts that could affect what comes next.", bullets: ["Full cash-flow dashboard", "Receivables and collection visibility", "Outstanding and at-risk invoice tracking", "Collection performance visibility", "Monthly review call"], outcome: "A clearer picture of what is coming in, what is at risk and where management attention will have the biggest impact." },
] as const;

function ServiceDropdown({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  const [open, setOpen] = useState(false);
  const active = serviceItems[selected];
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm transition-colors hover:border-primary/40" aria-expanded={open} aria-haspopup="listbox">
        <span className="flex items-center gap-3"><span className="display-heading text-primary">{active.number}</span><span><span className="block font-display text-lg font-bold">{active.name}</span><span className="block text-sm text-muted-foreground">{active.title}</span></span></span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl" role="listbox">
        {serviceItems.map((item, index) => <button key={item.name} type="button" onClick={() => { onSelect(index); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-muted ${selected === index ? "bg-muted" : ""}`} role="option" aria-selected={selected === index}>
          <span className="display-heading w-8 text-primary">{item.number}</span><span className="font-display text-sm font-bold">{item.name}</span>{selected === index && <Check className="ml-auto h-4 w-4 text-primary" />}
        </button>)}
      </div>}
    </div>
  );
}

export function ServicesMenu() {
  const [selected, setSelected] = useState(0);
  const service = serviceItems[selected];
  return (
    <section className="section-padding pt-24 md:pt-32">
      <SectionContainer>
        <SectionHeader kicker="The Recify AR System" title="Everything you need to turn outstanding invoices into collected cash." subtitle="Recify manages the journey from invoice to payment, with the operational work needed to keep receivables moving and the visibility to know where cash stands." align="center" />
        <div className="mt-10"><ServiceDropdown selected={selected} onSelect={setSelected} /></div>
        <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="md:w-2/5"><div className="flex items-baseline gap-3"><span className="display-heading text-4xl text-primary">{service.number}</span><span className="kicker">{service.name}</span></div><h1 className="display-heading mt-4 text-3xl md:text-4xl">{service.title}</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{service.summary}</p></div>
            <div className="md:w-3/5"><p className="leading-relaxed text-muted-foreground">{service.body}</p><ul className="mt-7 space-y-3">{service.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-sm md:text-base"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{bullet}</span></li>)}</ul><div className="mt-8 border-t border-border pt-6"><p className="kicker mb-2">What this changes</p><p className="font-medium leading-relaxed">{service.outcome}</p></div></div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><ButtonPrimary to="/start">Get your free AR health check</ButtonPrimary><ButtonSecondary to="/contact">Talk to Recify</ButtonSecondary></div>
        <div className="mt-16 text-center"><p className="display-heading text-2xl md:text-3xl">One system. From invoice to cash.</p><p className="mt-3 text-muted-foreground">Collect. Resolve. Apply. Protect. Escalate. Pay. See.</p></div>
      </SectionContainer>
    </section>
  );
}
