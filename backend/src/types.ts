export type Locale = "en" | "zh";

export type InquiryType = "general" | "quote" | "inventory-check";

export interface Inquiry {
  id: string;
  type: InquiryType;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  productInterest?: string;
  locale: Locale;
  createdAt: string;
}
