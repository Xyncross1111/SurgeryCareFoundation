import { apiClient } from "@/lib/api-client";
import type {
  CreateDonationRequest,
  CreatedDonation,
  CreatePaymentIntentRequest,
  PaymentIntent,
  PaymentStatus,
  DonationInitiation,
  VerifyPaymentRequest,
  CreateRecurringDonationRequest,
  CreatedRecurringDonation,
  RecurringDonation,
} from "@/types/payment";

export const paymentService = {
  createDonation(data: CreateDonationRequest) {
    return apiClient.post<DonationInitiation>("/donations", data);
  },

  createGuestDonation(data: CreateDonationRequest) {
    return apiClient.post<CreatedDonation>("/public/donations", data);
  },

  createIntent(data: CreatePaymentIntentRequest) {
    return apiClient.post<PaymentIntent>("/payments/create-intent", data);
  },

  createGuestIntent(data: CreatePaymentIntentRequest) {
    return apiClient.post<PaymentIntent>("/public/payments/create-intent", data);
  },

  getStatus(id: string) {
    return apiClient.get<PaymentStatus>(`/payments/${id}/status`);
  },

  verifyGuestPayment(data: VerifyPaymentRequest) {
    return apiClient.post<PaymentStatus>("/public/payments/verify", data);
  },

  // Recurring monthly donations — authenticated only.
  createRecurringDonation(data: CreateRecurringDonationRequest) {
    return apiClient.post<CreatedRecurringDonation>("/recurring-donations", data);
  },

  listMyRecurringDonations() {
    return apiClient.get<{ items: RecurringDonation[] }>("/recurring-donations/me");
  },

  cancelRecurringDonation(id: string) {
    return apiClient.post<{ id: string; status: string }>(
      `/recurring-donations/${id}/cancel`,
    );
  },
};
