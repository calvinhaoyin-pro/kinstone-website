import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { submitInquiry, InquiryValidationError } from "../lib/api";
import type { InquiryType } from "../types";

const INQUIRY_TYPES: InquiryType[] = ["general", "quote", "inventory-check"];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  productInterest: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t, locale } = useLocale();
  const [searchParams] = useSearchParams();

  const initialType = INQUIRY_TYPES.includes(searchParams.get("type") as InquiryType)
    ? (searchParams.get("type") as InquiryType)
    : "general";

  const [type, setType] = useState<InquiryType>(initialType);
  const [form, setForm] = useState<FormState>({
    ...EMPTY_FORM,
    productInterest: searchParams.get("product") ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [honeypot, setHoneypot] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) nextErrors.name = t.contact.form.errorRequired;
    if (!form.email.trim()) {
      nextErrors.email = t.contact.form.errorRequired;
    } else if (!EMAIL_PATTERN.test(form.email)) {
      nextErrors.email = t.contact.form.errorEmail;
    }
    if (!form.message.trim()) nextErrors.message = t.contact.form.errorRequired;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setStatus("submitting");

    try {
      // Calls the local Inquiry Service — run `npm run dev` in `backend/`
      // (default http://localhost:4000). See docs/design/02-api-registry.md
      // for the request/response contract.
      await submitInquiry({ type, ...form }, locale, honeypot);
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus("idle");
      if (error instanceof InquiryValidationError) {
        const fieldErrors: Partial<Record<keyof FormState, string>> = {};
        for (const detail of error.details) {
          if (detail.field in EMPTY_FORM) {
            fieldErrors[detail.field as keyof FormState] = detail.message;
          }
        }
        setErrors(fieldErrors);
      }
      setSubmitError(t.contact.form.errorSubmit);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {INQUIRY_TYPES.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setType(option)}
            aria-pressed={type === option}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              type === option
                ? "border-accent bg-accent text-white"
                : "border-border text-text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {t.contact.inquiryTypes[option]}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Honeypot field — hidden from real users, flags bots that fill every input. */}
        <input
          type="text"
          name="company-website"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <Field
          label={t.contact.form.name}
          value={form.name}
          onChange={(value) => updateField("name", value)}
          error={errors.name}
          required
        />
        <Field
          label={t.contact.form.company}
          value={form.company}
          onChange={(value) => updateField("company", value)}
        />
        <Field
          label={t.contact.form.email}
          type="email"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          error={errors.email}
          required
        />
        <Field
          label={t.contact.form.phone}
          type="tel"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
        />
        <Field
          label={t.contact.form.productInterest}
          value={form.productInterest}
          onChange={(value) => updateField("productInterest", value)}
          placeholder={t.contact.form.productInterestPlaceholder}
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-text">
            {t.contact.form.message}
            <span className="text-accent"> *</span>
          </label>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={t.contact.form.messagePlaceholder}
            rows={5}
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary ${
              errors.message ? "border-red-400" : "border-border"
            }`}
          />
          {errors.message ? <p className="mt-1 text-xs text-red-500">{errors.message}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light disabled:opacity-60"
          >
            {status === "submitting" ? t.contact.form.submitting : t.contact.form.submit}
          </button>

          {status === "success" ? (
            <p className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {t.contact.form.success}
            </p>
          ) : null}

          {submitError ? (
            <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {submitError}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-text">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary ${
          error ? "border-red-400" : "border-border"
        }`}
      />
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
