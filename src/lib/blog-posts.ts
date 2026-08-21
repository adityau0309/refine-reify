export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "is-accounts-receivable-an-asset",
    title: "Is Accounts Receivable an Asset? (Yes — But That's Not the Full Story)",
    excerpt: "Yes, accounts receivable is an asset. But calling it that and treating it like one are two different things — and the gap between them is where a lot of businesses quietly bleed cash.",
    date: "2024-08-21",
    category: "Revenue Recovery",
    content: `If you've ever stared at your balance sheet and wondered why it says you're doing fine while your bank account tells a different story, you've already bumped into the real answer to this question.

Yes, accounts receivable is an asset. But calling it that and treating it like one are two different things — and the gap between them is where a lot of businesses quietly bleed cash.

Let's go through this properly.

## Is Accounts Receivable an Asset or a Liability?

It's an asset. When a customer owes you money for a product or service you've already delivered, that unpaid invoice represents future economic value coming to you. Accounting rules classify it as such because you have a legal right to collect it.

It becomes a liability only from the other party's side of the transaction — what's your receivable is their payable. On your own books, it will never sit under liabilities.

The confusion usually comes from a different place: people expect an asset to *feel* like money, and an unpaid invoice doesn't feel like anything until it's paid.

## What Type of Asset Is Accounts Receivable?

Accounts receivable is a **current asset**. That means your business expects to convert it into cash within one operating cycle, typically twelve months, and often much sooner — 30, 45, or 60 days depending on your terms.

It sits on the balance sheet alongside cash, inventory, and short-term investments, all grouped under current assets because they're the assets a business can reasonably tap into within the near term.

This matters for anyone reading your financials. Lenders, investors, and even your own leadership team look at current assets to judge how much breathing room a business actually has. A healthy current asset number gives a false sense of comfort if a big chunk of it is receivables that have been sitting unpaid for four months.

## Is Accounts Receivable a Cash Equivalent, a Liquid Asset?

This is where things get more honest.

Accounts receivable is *liquid* in theory — it's expected to convert to cash relatively fast. But it is **not** a cash equivalent. Cash equivalents are assets you could turn into cash almost instantly, with virtually no risk: things like treasury bills or money market funds. Receivables don't qualify because collecting them depends on someone else actually paying you, on time, without a dispute, without a delay in their AP process, without their finance team just... forgetting.

That distinction is the entire reason receivables management exists as a discipline. An asset that depends on another company's willingness and ability to pay is a very different animal from cash sitting in your account.

## Is Accounts Receivable a Debit or a Credit?

When you issue an invoice, you debit accounts receivable and credit revenue. The debit increases your receivable balance because the customer now owes you more. When the customer pays, you debit cash and credit accounts receivable, reducing the balance back down.

If a payment never comes and the invoice eventually has to be written off, you'd credit accounts receivable again — this time to remove it, paired with a debit to bad debt expense or your allowance for doubtful accounts.

## Where Does Accounts Receivable Actually Show Up?

It lives on the **balance sheet**, under current assets — not on the income statement. This trips a lot of people up, because revenue *does* appear on the income statement the moment it's earned, even before the customer pays.

That's the mechanic behind accrual accounting: you record the sale as revenue right away, and the unpaid amount becomes a receivable on the balance sheet until cash actually arrives. Your income statement can look strong in a given month purely because of invoices you haven't collected on yet.

## The Real Problem: An Asset That Doesn't Behave Like One

Here's the part accounting textbooks don't spend much time on.

Accounts receivable is only a "good" asset when it converts to cash on schedule. The moment an invoice goes 30, 60, 90 days past due, it stops behaving like an asset and starts behaving like a liability in disguise — it ties up capital, distorts your view of available cash, and often signals a process problem somewhere in the chain: a disputed charge, a stuck approval, a missing PO number, a vendor portal nobody logged into, a customer just quietly deprioritizing your invoice behind ten others.

Most finance teams treat this as a collections issue and respond with more reminder emails. But an aging invoice usually isn't sitting there because the customer forgot to pay — it's sitting there because something specific is blocking it, and nobody on either side has gone and found out what.

This is the exact gap Recify was built to close. Not another dashboard to watch your DSO climb, and not a louder reminder system — but the actual legwork of figuring out why each stuck invoice hasn't moved, resolving whatever's in the way, and getting it collected.

## Turning the Asset Into Actual Cash

A few things worth doing if your receivables are starting to feel more theoretical than real:

- **Age your AR regularly**, and be honest about what "current" actually means. An invoice at 45 days on 30-day terms is already a problem, not a rounding error.
- **Separate genuine disputes from silent stalls.** They need completely different handling — one needs documentation and resolution, the other needs a direct conversation with whoever can actually approve payment.
- **Track blockers, not just balances.** "Why hasn't this been paid" is a more useful question than "how much is overdue."
- **Don't let your best customers become your worst habits.** Familiarity is often exactly why the oldest, most trusted accounts get the loosest follow-up.

Accounts receivable earns its place on the asset side of your balance sheet. Whether it earns its place in your bank account is a separate question — and it's the one that actually determines how your business runs.

---

*Recify helps B2B companies get their stuck and overdue receivables moving — not with more automated reminders, but by doing the actual work of finding what's blocking each invoice and resolving it. If you've got a stack of invoices your team has already given up chasing, [Recify](https://recify.in) will take a look.*`,
  },
  {
    slug: "accounts-receivable-vs-accounts-payable",
    title: "Accounts Receivable vs. Accounts Payable: What's Actually the Difference",
    excerpt: "People mix these up constantly. Accounts receivable is money owed to you. Accounts payable is money you owe someone else. That's really it. But here's why the difference matters in practice.",
    date: "2024-08-21",
    category: "Cash Flow Intelligence",
    content: `People mix these up constantly. Even folks who've worked in finance for years pause for half a second before answering. Part of it is just the names — receivable, payable, they're basically mirror images of each other, and your brain has to do a tiny bit of work to remember which side you're on.

So here's the plain answer. Accounts receivable is money owed to you. Accounts payable is money you owe someone else. That's really it. But knowing the definition doesn't tell you much about why the difference matters in practice, so let's actually get into it.

## The basic split

You send a customer an invoice for work you already did. Until they pay, that invoice sits on your books as accounts receivable. It's an asset, because it represents cash that's supposed to come in.

A vendor sends you a bill for something they delivered. Until you pay them, that sits on your books as accounts payable. It's a liability, because it's cash you owe going out.

If your company sells to other businesses, chances are you're dealing with both sides at once. You're chasing your customers for payment while your own vendors are (hopefully more patiently) waiting on you.

## Where they show up on the books

AR lands under current assets on the balance sheet. AP lands under current liabilities. Nothing fancy about the placement — it's just reflecting what each one does to your position. Receivables push it up eventually. Payables pull it down eventually. The "eventually" part is where all the interesting stuff happens.

Two ratios come out of this that are worth knowing. Days Sales Outstanding, or DSO, tells you roughly how long customers take to pay you. Days Payable Outstanding, DPO, tells you how long you take to pay your vendors. And here's the thing people miss — a company can look completely fine on paper, profitable even, and still be short on cash because its DPO is tight and its DSO is loose. You're paying your bills on time, but nobody's paying you on time. That gap has to get filled by something, usually a cash reserve or a line of credit, and neither of those is free.

## AR jobs vs AP jobs

This trips people up too, and it's a pretty common search — accounts receivable and payable jobs, job descriptions, salary comparisons, all of that.

An AR role, whether it's a clerk, an analyst, or someone with "collections" in the title, spends their day invoicing customers, tracking what's outstanding, following up on late payers, and untangling disputes when a customer says they're not paying because something's wrong.

An AP role is more about processing what comes in — matching vendor bills against purchase orders, routing approvals, and paying on schedule. A decent AP person also tries to hold onto cash a little longer where they reasonably can, without upsetting the vendor relationship.

Smaller companies just smash both jobs into one "AR/AP" role because there isn't enough volume to justify splitting it. Bigger companies split it because honestly, the skill sets aren't that similar. AP is mostly about internal process and getting approvals through the pipe. AR involves that too, but there's also a relationship layer to it — you're asking someone else's company for money, and how you do that actually affects whether you get paid.

## Why the balance between the two matters more than either number alone

On their own, AR and AP are just line items. Put them next to each other and they start telling you something real about how cash is actually moving through the business.

If you're paying vendors in 30 days but only collecting from customers in 60, you are, whether you've thought about it this way or not, financing that 30-day gap yourself. Every single month. And that money isn't free — it either comes from cash you'd rather have deployed somewhere else, or from a credit facility that has its own cost attached.

This is one of the more frustrating things about running a B2B business. You can be growing, profitable, doing everything "right" on the income statement, and still feel squeezed because of a timing mismatch nobody's really watching closely enough.

It's also part of why AR tends to be the harder half to manage. Your AP is mostly in your control — you decide when to pay, within reason. Your AR depends on somebody else's finance team, somebody else's approval process, somebody else's list of priorities that day. You can't force a customer to pay faster the way you can choose to pay a vendor faster. That asymmetry is exactly why receivables are the ones that drift past due while payables mostly stay on schedule.

## A few things worth doing about it

Track DSO and DPO together, not as separate metrics you glance at once a quarter. The relationship between them tells you more than either one in isolation.

Don't assume every late payment is entirely the customer's fault. A surprising number trace back to something on your end — an invoice missing a PO number, a portal the customer's AP team doesn't know exists, terms that were never confirmed clearly in the first place.

Treat AR follow-up like an actual process, not something that happens if someone remembers. Invoices that sit "just a little late" without anyone chasing them tend to keep drifting later.

And don't lump every overdue invoice into the same bucket. A $600 invoice that's ten days late needs a very different response than a $45,000 invoice sitting at 75 days.

AP, at the end of the day, is a discipline problem — pay on time, keep good records, done. AR is a people problem wrapped in a paperwork problem, which is a much harder thing to solve with a template or a reminder email.`,
  },
];
