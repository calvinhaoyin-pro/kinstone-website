import { z } from "zod";

// Mirrors the contract in docs/design/01-backend-architecture.md and
// docs/design/02-openapi.yaml — keep these in sync if either changes.
export const InquirySchema = z.object({
  type: z.enum(["general", "quote", "inventory-check"]),
  name: z.string().min(1).max(100),
  company: z.string().max(200).optional(),
  email: z.email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(1).max(2000),
  productInterest: z.string().max(200).optional(),
  locale: z.enum(["en", "zh"]),
  // Honeypot — real visitors never fill this in. Bots that auto-fill every
  // field will populate it, letting us silently drop the submission.
  "company-website": z.string().optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;
