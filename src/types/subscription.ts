import type { UserProps } from "./user";

export type SubscriptionType = "monthly" | "yearly" | "lifetime";

export type SubscriptionTier = "free" | "basic" | "premium" | "business";

export type SubscriptionStatus = "active" | "canceled" | "expired" | "trialing";

export type InvoiceStatus = "paid" | "failed" | "void";

export interface SubscriptionProps {
  id: string;
  name: string;
  description?: string;
  type: SubscriptionType;
  tier: SubscriptionTier;
  price: number;
  currency: string;
  billing_cycle_days: number;
  trial_period_days: number;
  features?: Record<string, unknown>;
  max_projects: number;
  max_skills: number;
  max_experiences: number;
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserSubscriptionProps {
  id: string;
  user_id: string;
  user?: UserProps;
  subscription_id: string;
  subscription?: SubscriptionProps;
  paystack_customer_id?: string;
  paystack_subscription_id?: string;
  payment_method_id?: string;
  last_payment_amount?: number;
  last_payment_date?: string;
  status: SubscriptionStatus;
  is_active: boolean;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  trial_start?: string;
  trial_end?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInvoiceProps {
  id: string;
  user_subscription_id: string;
  user_subscription?: UserSubscriptionProps;
  paystack_reference: string;
  amount_paid: number;
  currency: string;
  status: InvoiceStatus;
  invoice_pdf?: string;
  period_start: string;
  period_end: string;
  paid_at?: string;
  created_at: string;
}

export interface PaystackPlanProps {
  id: string;
  subscription_id: string;
  subscription?: SubscriptionProps;
  plan_code: string;
  paystack_plan_id: number;
  interval: "monthly" | "yearly";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
