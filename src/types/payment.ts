import type { UserSubscriptionProps } from "./subscription";

export interface InitializePaymentDto {
  subscription_tier_id: string;
  callback_url: string;
}

export interface InitializePaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface PaymentMethodProps {
  id: string;
  authorization_code: string;
  card_type: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  bank: string;
  brand: string;
  is_default: boolean;
  reusable: boolean;
}

export interface InvoiceProps {
  id: string;
  user_subscription_id: string;
  user_subscription: UserSubscriptionProps;
  paystack_reference: string;
  amount_paid: number;
  currency: string;
  status: string;
  invoice_pdf: string;
  period_start: string;
  period_end: string;
  paid_at: string;
  created_at: string;
}
