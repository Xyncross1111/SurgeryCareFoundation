export interface CreatePaymentIntentRequest {
  campaignId: string;
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  isAnonymous?: boolean;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
  gatewayOrderId: string;
}

export interface PaymentStatus {
  id: string;
  status: string;
  donationId: string;
}
