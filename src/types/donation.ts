export type DonationStatus =
  | "initiated"
  | "pending"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "refunded";

export interface Donation {
  id: string;
  campaignId: string;
  campaignSlug: string;
  patientName: string;
  condition: string;
  amount: number;
  date: string;
  status: DonationStatus;
  receiptId: string | null;
  receiptUrl: string | null;
  image: string;
}

export interface SavedCause {
  id: string;
  name: string;
  age: number;
  condition: string;
  description: string;
  raised: number;
  goal: number;
  backers: number;
  image: string;
  savedOn: string;
}

export type WithdrawalStatus =
  | "requested"
  | "under_review"
  | "approved"
  | "rejected"
  | "partially_disbursed"
  | "fully_disbursed"
  | "cancelled";
