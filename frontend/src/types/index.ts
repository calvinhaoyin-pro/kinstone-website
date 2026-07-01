export type Locale = "en" | "zh";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Product {
  slug: string;
  name: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  image?: string;
}

export interface PortfolioProject {
  slug: string;
  name: LocalizedText;
  location: LocalizedText;
  year: number;
  description: LocalizedText;
  image?: string;
}

export type InquiryType = "general" | "quote" | "inventory-check";

export interface InquiryFormData {
  type: InquiryType;
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  message: string;
}
