export interface Program {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  activities: string[];
  howToSupport: string;
  imageKey: string;
  active: boolean;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featuredImage?: string;
  category: string;
  author: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type InquiryType = "contact" | "get-involved";

export type AreaOfInterest =
  | "donate-money"
  | "donate-items"
  | "volunteer"
  | "partner"
  | "general-inquiry";

export interface Inquiry {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  areaOfInterest?: AreaOfInterest;
  message: string;
  privacyConsent: boolean;
  status: "new" | "reviewed" | "responded";
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  paypalOrderId: string;
  paypalCaptureId: string;
  amount: number;
  currency: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  donorEmail?: string;
  donorName?: string;
  createdAt: string;
}

export interface SiteSettings {
  id?: string;
  paypalMode: "sandbox" | "live";
  allowOnlineDonations: boolean;
  supportedCurrencies: string[];
  defaultCurrency: string;
  updatedAt?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: "admin";
}
