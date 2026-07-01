import type { InquiryFormData, Locale } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export interface InquiryFieldError {
  field: string;
  message: string;
}

export class InquiryValidationError extends Error {
  details: InquiryFieldError[];

  constructor(details: InquiryFieldError[]) {
    super("Validation failed");
    this.name = "InquiryValidationError";
    this.details = details;
  }
}

export interface SubmitInquiryResult {
  id: string;
  message: string;
}

/**
 * Calls the Inquiry Service's `POST /api/inquiries` (see
 * docs/design/02-api-registry.md). Requires the backend in `backend/` to be
 * running locally (`npm run dev` there, default http://localhost:4000).
 */
export async function submitInquiry(
  data: InquiryFormData,
  locale: Locale,
  /** Honeypot field value — should always be empty for real visitors. */
  honeypot = "",
): Promise<SubmitInquiryResult> {
  const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: data.type,
      name: data.name,
      company: data.company || undefined,
      email: data.email,
      phone: data.phone || undefined,
      message: data.message,
      productInterest: data.productInterest || undefined,
      locale,
      "company-website": honeypot || undefined,
    }),
  });

  if (response.status === 400) {
    const body = (await response.json()) as { details?: InquiryFieldError[] };
    throw new InquiryValidationError(body.details ?? []);
  }

  if (!response.ok) {
    throw new Error(`Inquiry submission failed with status ${response.status}`);
  }

  return (await response.json()) as SubmitInquiryResult;
}
