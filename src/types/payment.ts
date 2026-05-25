export interface CreateDonationRequest {
  campaignId: string;
  amount: number;
  currency?: string;
  isAnonymous?: boolean;
  message?: string;
  donorName?: string;
  donorEmail?: string;
  captchaToken?: string;
}

export interface CreatedDonation {
  id: string;
  campaignId: string;
  amount: number;
  currency: string;
  status: string;
}

export interface DonationInitiation {
  donation: CreatedDonation;
  paymentIntent: PaymentIntent;
}

export interface CreatePaymentIntentRequest {
  donationId: string;
  amount: number;
  currency?: string;
}

export interface PaymentIntent {
  id: string;
  donationId: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  providerOrderId: string | null;
  providerIntentId: string | null;
  clientData: {
    key: string;
    order_id: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    prefill?: {
      name?: string;
      email?: string;
    };
  };
}

export interface PaymentStatus {
  id: string;
  status: string;
  donation: {
    id: string;
    status: string;
    amount: number;
    currency: string;
  };
}

export interface VerifyPaymentRequest {
  orderId: string;
  paymentId: string;
  signature: string;
}

// Recurring monthly donations (Razorpay Subscriptions / UPI Autopay).
export const RECURRING_TIERS = [500, 1000, 2500, 5000] as const;
export type RecurringTier = (typeof RECURRING_TIERS)[number];

export type RecurringStatus =
  | "pending"
  | "active"
  | "halted"
  | "paused"
  | "cancelled"
  | "completed";

export interface CreateRecurringDonationRequest {
  campaignId: string;
  tier: RecurringTier;
}

export interface CreatedRecurringDonation {
  id: string;
  subscriptionId: string;
  shortUrl: string;
  status: RecurringStatus;
}

export interface RecurringDonation {
  id: string;
  campaign: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
    status: string;
  };
  amount: number;
  currency: string;
  tier: string | null;
  status: RecurringStatus;
  shortUrl: string | null;
  nextRunDate: string | null;
  lastRunDate: string | null;
  cancelledAt: string | null;
  authenticatedAt: string | null;
  createdAt: string;
}
