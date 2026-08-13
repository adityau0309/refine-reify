import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "../lib/utils";
import * as content from "../lib/site-content";

/* -------------------------------------------------------------------------- */
/*  Shared primitives                                                         */
/* -------------------------------------------------------------------------- */

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring transition-shadow focus:ring-2";
const errorInputClass = "border-destructive ring-destructive/40";

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

const CONSENT_TEXT =
  "I consent to Recify collecting and processing this information to provide the requested service, in accordance with the Privacy Policy.";

function ConsentCheckbox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string | undefined;
}) {
  return (
    <div className="mt-6">
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">{CONSENT_TEXT}</span>
      </label>
      <div className="mt-1.5">
        <FieldError message={error} />
      </div>
    </div>
  );
}

function SuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center md:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="h-6 w-6" />
      </div>
      <h3 className="display-heading mt-4 text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Validation                                                                */
/* -------------------------------------------------------------------------- */

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name (at least 2 characters).")
  .max(100, "Name must be under 100 characters.")
  .regex(/^[a-zA-Z\s'.-]+$/, "Use letters, spaces, apostrophes or hyphens only.");

const companySchema = z
  .string()
  .trim()
  .min(2, "Please enter your company name (at least 2 characters).")
  .max(120, "Company name must be under 120 characters.");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .max(255, "Email must be under 255 characters.")
  .email("Enter a valid email address, e.g. jane@company.com.");

const phoneOptionalSchema = z
  .string()
  .trim()
  .max(20, "Phone number must be under 20 characters.")
  .regex(/^\+?[0-9\s()-]{7,20}$/, "Enter a valid phone number, e.g. +61 400 000 000.")
  .optional()
  .or(z.literal(""));

const invoiceSchema = z
  .string()
  .trim()
  .regex(/^\d{1,6}$/, "Enter a whole number of invoices, e.g. 80.")
  .refine((v) => Number(v) > 0, "Enter a number greater than 0.");

const messageSchema = z
  .string()
  .trim()
  .min(10, "Please give us at least 10 characters of detail.")
  .max(1000, "Please keep this under 1000 characters.");

/* -------------------------------------------------------------------------- */
/*  Start / AR health check — 8 step wizard                                   */
/* -------------------------------------------------------------------------- */

type StartData = {
  business: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  invoices: string;
  overdue: string;
  challenge: string;
  consent: boolean;
};

const businessOptions = [
  "Construction & Trade",
  "Freight / Logistics",
  "Wholesale / Distribution",
  "Professional / Business Services",
  "Other B2B",
];

const overdueOptions = [
  "Mostly on time",
  "1–30 days overdue",
  "31–60 days overdue",
  "60+ days overdue",
  "Not sure",
];

const TOTAL_STEPS = 8;

export function StartForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<StartData>({
    business: "",
    fullName: "",
    company: "",
    email: "",
    phone: "",
    invoices: "",
    overdue: "",
    challenge: "",
    consent: false,
  });
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof StartData>(key: K, value: StartData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setError(undefined);
  };

  function validateStep(current: number): string | undefined {
    const check = (result: z.SafeParseReturnType<unknown, unknown>) =>
      result.success ? undefined : result.error.issues[0]?.message;

    switch (current) {
      case 1:
        return data.business ? undefined : "Please choose the option that best describes your business.";
      case 2:
        return check(nameSchema.safeParse(data.fullName));
      case 3:
        return check(companySchema.safeParse(data.company));
      case 4:
        return check(emailSchema.safeParse(data.email));
      case 5:
        return check(phoneOptionalSchema.safeParse(data.phone));
      case 6:
        return check(invoiceSchema.safeParse(data.invoices));
      case 7:
        return data.overdue ? undefined : "Please select how your invoices are currently tracking.";
      case 8:
        if (!messageSchema.safeParse(data.challenge).success) {
          return check(messageSchema.safeParse(data.challenge));
        }
        return data.consent ? undefined : "You need to tick the consent box before we can submit your details.";
      default:
        return undefined;
    }
  }

  const next = () => {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => {
    setError(undefined);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) {
      next();
      return;
    }
    // Re-validate every step so nothing is skipped.
    for (let i = 1; i <= TOTAL_STEPS; i += 1) {
      const message = validateStep(i);
      if (message) {
        setStep(i);
        setError(message);
        return;
      }
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("leads").insert({
      full_name: data.fullName.trim(),
      email: data.email.trim(),
      company_name: data.company.trim(),
      phone: data.phone.trim() || null,
      form_type: "onboarding",
      consent_given: true,
      details: {
        business_type: data.business,
        monthly_invoices: Number(data.invoices),
        overdue_profile: data.overdue,
        biggest_challenge: data.challenge.trim(),
      },
    });
    setSubmitting(false);

    if (insertError) {
      setError("We couldn't submit your details just now. Please try again in a moment.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessCard
        title="Thanks — our team will contact you"
        body="We've received all 8 answers. A Recify specialist will review them and get in touch within one business day with the right next step."
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 md:p-10"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="kicker">
          {step} / {TOTAL_STEPS}
        </p>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted md:w-48">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        {step === 1 && (
          <Step title="What kind of business are you?">
            <RadioGrid
              name="business"
              options={businessOptions}
              value={data.business}
              onChange={(v) => set("business", v)}
            />
          </Step>
        )}

        {step === 2 && (
          <Step title="What's your full name?">
            <input
              value={data.fullName}
              onChange={(e) => set("fullName", e.target.value)}
              className={cn(inputClass, error && errorInputClass)}
              placeholder="Jane Smith"
              autoComplete="name"
            />
          </Step>
        )}

        {step === 3 && (
          <Step title="Which company are you with?">
            <input
              value={data.company}
              onChange={(e) => set("company", e.target.value)}
              className={cn(inputClass, error && errorInputClass)}
              placeholder="Acme Pty Ltd"
              autoComplete="organization"
            />
          </Step>
        )}

        {step === 4 && (
          <Step title="What's the best email to reach you?" hint="We'll only use this to send your AR health check.">
            <input
              type="email"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              className={cn(inputClass, error && errorInputClass)}
              placeholder="jane@company.com"
              autoComplete="email"
            />
          </Step>
        )}

        {step === 5 && (
          <Step title="A phone number, if you'd like a call" hint="Optional — include your country code.">
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={cn(inputClass, error && errorInputClass)}
              placeholder="+61 400 000 000"
              autoComplete="tel"
            />
          </Step>
        )}

        {step === 6 && (
          <Step title="How many invoices do you send each month?" hint="A whole number is fine.">
            <input
              inputMode="numeric"
              value={data.invoices}
              onChange={(e) => set("invoices", e.target.value)}
              className={cn(inputClass, error && errorInputClass)}
              placeholder="e.g. 80"
            />
          </Step>
        )}

        {step === 7 && (
          <Step title="How are your invoices tracking today?">
            <RadioGrid
              name="overdue"
              options={overdueOptions}
              value={data.overdue}
              onChange={(v) => set("overdue", v)}
            />
          </Step>
        )}

        {step === 8 && (
          <Step title="What is your biggest AR challenge right now?" hint="The more detail, the better our recommendation.">
            <textarea
              rows={4}
              value={data.challenge}
              onChange={(e) => set("challenge", e.target.value)}
              className={cn(inputClass, error && errorInputClass)}
              placeholder="Late payments, disputes, missing documentation..."
            />
            <ConsentCheckbox checked={data.consent} onChange={(v) => set("consent", v)} />
          </Step>
        )}
      </div>

      <div className="mt-3">
        <FieldError message={error} />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-input bg-background px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting || !data.consent}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit answers"}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Prefer to talk first?{" "}
        <Link to="/contact" className="font-bold text-primary hover:underline">
          Book an AR fit call
        </Link>
      </p>
    </form>
  );
}

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="display-heading text-2xl">{title}</h2>
      {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function RadioGrid({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
            value === option ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-accent"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-medium">{option}</span>
        </label>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact / AR health check form                                            */
/* -------------------------------------------------------------------------- */

type ContactErrors = Partial<Record<"name" | "company" | "email" | "phone" | "message" | "consent" | "form", string>>;

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: ContactErrors = {};
    const nameResult = nameSchema.safeParse(form.name);
    if (!nameResult.success) next.name = nameResult.error.issues[0]?.message;
    const companyResult = companySchema.safeParse(form.company);
    if (!companyResult.success) next.company = companyResult.error.issues[0]?.message;
    const emailResult = emailSchema.safeParse(form.email);
    if (!emailResult.success) next.email = emailResult.error.issues[0]?.message;
    const phoneResult = phoneOptionalSchema.safeParse(form.phone);
    if (!phoneResult.success) next.phone = phoneResult.error.issues[0]?.message;
    if (form.message.trim().length > 0) {
      const messageResult = messageSchema.safeParse(form.message);
      if (!messageResult.success) next.message = messageResult.error.issues[0]?.message;
    }
    if (!form.consent) next.consent = "Please tick the consent box so we can process your request.";

    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("leads").insert({
      full_name: form.name.trim(),
      email: form.email.trim(),
      company_name: form.company.trim(),
      phone: form.phone.trim() || null,
      form_type: "health_check",
      consent_given: true,
      details: { message: form.message.trim() || null },
    });
    setSubmitting(false);

    if (insertError) {
      setErrors({ form: "We couldn't send your request just now. Please try again in a moment." });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-6 w-6" />
        </div>
        <h3 className="display-heading mt-4 text-xl">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team will review your details and reply within one business day. For urgent questions, reach us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Full name
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={cn(inputClass, errors.name && errorInputClass)}
            placeholder="Jane Smith"
            autoComplete="name"
          />
          <FieldError message={errors.name} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Company
          <input
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={cn(inputClass, errors.company && errorInputClass)}
            placeholder="Acme Inc."
            autoComplete="organization"
          />
          <FieldError message={errors.company} />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Work email
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={cn(inputClass, errors.email && errorInputClass)}
            placeholder="jane@company.com"
            autoComplete="email"
          />
          <FieldError message={errors.email} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Phone (optional)
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={cn(inputClass, errors.phone && errorInputClass)}
            placeholder="+61 400 000 000"
            autoComplete="tel"
          />
          <FieldError message={errors.phone} />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
        Anything we should know (optional)
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={4}
          className={cn(inputClass, errors.message && errorInputClass)}
          placeholder="Tell us about your AR challenge..."
        />
        <FieldError message={errors.message} />
      </label>

      <ConsentCheckbox checked={form.consent} onChange={(v) => set("consent", v)} error={errors.consent} />

      <div className="mt-3">
        <FieldError message={errors.form} />
      </div>

      <button
        type="submit"
        disabled={submitting || !form.consent}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {submitting ? "Sending..." : "Book a fit call"}
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 text-sm text-muted-foreground">
        Or email{" "}
        <a href={content.global.email} className="font-bold text-primary hover:underline">
          {content.global.emailLabel}
        </a>
      </p>
    </form>
  );
}
