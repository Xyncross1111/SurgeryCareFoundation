import { apiClient } from "@/lib/api-client";
import type {
  CreatePaymentIntentRequest,
  PaymentIntent,
  PaymentStatus,
} from "@/types/payment";

export const paymentService = {
  createIntent(data: CreatePaymentIntentRequest) {
    return apiClient.post<PaymentIntent>("/payments/create-intent", data);
  },

  getStatus(id: string) {
    return apiClient.get<PaymentStatus>(`/payments/${id}/status`);
  },
};
