"use client";

import {
  RiVipCrownLine,
  RiBankCardLine,
  RiFileList3Line,
  RiArrowRightLine,
  RiStarFill,
  RiCheckLine,
  RiCloseLine,
  RiSparklingLine,
  RiLoader4Line,
} from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { useAddPaymentMethodMutation, useGetInvoicesQuery, useGetPaymentMethodsQuery } from "@/api/payment";
import { useGetUserSubscriptionsQuery, useSubscribeMutation } from "@/api/subscription";
import type { SubscriptionProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib";
import { useUserStore } from "@/store/user";
import { SUBSCRIPTIONS } from "@/constants";

const invoices: {
  id: string;
  date: string;
  amount: number;
  status: string;
}[] = [];

const FeatureItem = ({ feature, value }: { feature: string; value: string | boolean | number }) => {
  const isEnabled =
    value === true || (typeof value === "string" && value !== "false") || (typeof value === "number" && value > 0);
  const displayValue = typeof value === "boolean" ? null : value;

  const formatFeatureName = (name: string) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {isEnabled ? (
        <RiCheckLine className="size-4 shrink-0 text-green-400" />
      ) : (
        <RiCloseLine className="size-4 shrink-0 text-gray-500" />
      )}
      <span className={cn(isEnabled ? "text-gray-300" : "text-gray-500")}>
        {formatFeatureName(feature)}
        {displayValue && <span className="ml-1 text-gray-400">({displayValue})</span>}
      </span>
    </div>
  );
};

const SubscriptionCard = ({
  subscription,
  isCurrentPlan,
  onSelectPlan,
  isLoading,
  currentTier,
}: {
  subscription: SubscriptionProps;
  isCurrentPlan: boolean;
  onSelectPlan: (subscription: SubscriptionProps) => void;
  isLoading: boolean;
  currentTier: string;
}) => {
  const isUpgrade = subscription.tier === "premium" && currentTier === "free";
  const isDowngrade = subscription.tier === "free" && currentTier === "premium";

  const getButtonText = () => {
    if (isCurrentPlan) return "Current Plan";
    if (isUpgrade) return "Upgrade";
    if (isDowngrade) return "Downgrade";
    return "Select Plan";
  };

  const getPriceDisplay = () => {
    if (subscription.price === 0) return "Free";
    const price = formatCurrency(subscription.price, subscription.currency);
    const period = subscription.type === "yearly" ? "/year" : "/month";
    return `${price}${period}`;
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border p-6 transition-all",
        isCurrentPlan ? "border-primary-400 bg-primary-400/5" : "border-white/10 bg-white/5 hover:border-white/20",
        subscription.is_popular && "ring-2 ring-amber-500/50",
      )}
    >
      {subscription.is_popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold shadow-lg">
            <RiSparklingLine className="mr-1 size-3" />
            POPULAR
          </Badge>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <Badge className="border-primary-400/30 bg-primary-400/20 text-primary-400 px-2 py-0.5 text-xs">
            Current
          </Badge>
        </div>
      )}
      <div className="mb-4 pt-2">
        <h4 className="text-lg font-semibold text-white">{subscription.name}</h4>
        {subscription.description && <p className="mt-1 text-sm text-gray-400">{subscription.description}</p>}
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-primary-400 text-3xl font-bold">{getPriceDisplay()}</span>
        </div>
        {subscription.trial_period_days > 0 && (
          <p className="mt-1 text-sm text-green-400">{subscription.trial_period_days} days free trial</p>
        )}
        {subscription.type === "yearly" && <p className="mt-1 text-sm text-amber-400">Save 20% vs monthly</p>}
      </div>
      <div className="mb-6 flex-1 space-y-2">
        {subscription.features &&
          Object.entries(subscription.features).map(([key, value]) => (
            <FeatureItem key={key} feature={key} value={value} />
          ))}
        <div className="mt-3 border-t border-white/10 pt-3">
          <FeatureItem feature="Projects" value={subscription.max_projects} />
          <FeatureItem feature="Skills" value={subscription.max_skills} />
          <FeatureItem feature="Experiences" value={subscription.max_experiences} />
        </div>
      </div>
      <Button
        className="w-full"
        variant={isCurrentPlan ? "outline" : isUpgrade ? "default" : "outline"}
        disabled={isCurrentPlan || isLoading}
        onClick={() => onSelectPlan(subscription)}
      >
        {isLoading ? (
          <>
            <RiLoader4Line className="mr-2 size-4 animate-spin" />
            Processing...
          </>
        ) : isUpgrade ? (
          <>
            <RiStarFill className="mr-2 size-4" />
            {getButtonText()}
          </>
        ) : (
          getButtonText()
        )}
      </Button>
      {isDowngrade && !isCurrentPlan && (
        <p className="mt-2 text-center text-xs text-amber-400">You will lose premium features</p>
      )}
    </div>
  );
};

export const BillingSettings = () => {
  const [, setSelectedPlan] = React.useState<string | null>(null);
  const { user } = useUserStore();
  const currentTier = user?.is_premium ? "premium" : "free";

  const [subscribe, { isLoading }] = useSubscribeMutation();
  const [addPaymentMethod] = useAddPaymentMethodMutation();

  const { data: userSubscriptions } = useGetUserSubscriptionsQuery({ page: 1, size: 10 });
  const { data: paymentMethods } = useGetPaymentMethodsQuery(null);
  const {} = useGetInvoicesQuery({ page: 1, size: 10 });

  const currentSubscription = userSubscriptions?.data?.data?.find((sub) => sub.is_active);

  const handleAddPaymentMethod = async () => {
    await addPaymentMethod("").unwrap();
  };

  const handleSelectPlan = async (subscription: SubscriptionProps) => {
    setSelectedPlan(subscription.id);
    try {
      if (subscription.tier === "free") {
        toast.info("To downgrade, please contact support.");
        setSelectedPlan(null);
        return;
      }
      toast.info(`Redirecting to checkout for ${subscription.name}...`);
      await subscribe(subscription.id).unwrap();
      setSelectedPlan(null);
    } catch {
      toast.error("Failed to process subscription. Please try again.");
      setSelectedPlan(null);
    }
  };

  const isCurrentPlan = (subscription: SubscriptionProps) => {
    if (currentSubscription) {
      return currentSubscription.subscription_id === subscription.id;
    }
    return subscription.tier === "free" && !user?.is_premium;
  };

  return (
    <div className="space-y-8">
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiVipCrownLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Subscription Plans</h3>
              <p className="text-sm text-gray-400">Choose the plan that works best for you</p>
            </div>
          </div>
          {user?.is_premium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-sm font-bold">
              <RiStarFill className="mr-1 size-3" />
              PRO
            </Badge>
          )}
        </div>
        {currentSubscription && (
          <div className="mb-6 rounded border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Current billing period</p>
                <p className="text-white">
                  {new Date(currentSubscription.current_period_start).toLocaleDateString()} -{" "}
                  {new Date(currentSubscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              {currentSubscription.cancel_at_period_end && (
                <Badge className="border-amber-500/30 bg-amber-500/20 text-amber-400">Cancels at period end</Badge>
              )}
            </div>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {SUBSCRIPTIONS.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              isCurrentPlan={isCurrentPlan(subscription)}
              onSelectPlan={handleSelectPlan}
              isLoading={isLoading}
              currentTier={currentTier}
            />
          ))}
        </div>
      </div>
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiBankCardLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Payment Method</h3>
            <p className="text-sm text-gray-400">Manage your payment details</p>
          </div>
        </div>
        <div className="w-full space-y-2">
          {paymentMethods?.data.map((method) => (
            <div className="flex items-center justify-between border border-white/10 bg-white/5 p-4" key={method.id}>
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center bg-blue-500/20">
                  <RiBankCardLine className="size-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">•••• •••• •••• {method.last4}</p>
                  <p className="text-sm text-gray-400">
                    Expires {method.exp_month}/{method.exp_year}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={handleAddPaymentMethod} className="mt-4">
          + Add Payment Method
        </Button>
      </div>
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiFileList3Line className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Billing History</h3>
              <p className="text-sm text-gray-400">View your past invoices</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Download All
          </Button>
        </div>
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-white">{invoice.id}</p>
                  <p className="text-sm text-gray-400">{new Date(invoice.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium text-white">${invoice.amount}</span>
                <Badge className="border-green-500/30 bg-green-500/20 text-green-400">Paid</Badge>
                <Button variant="ghost" size="sm">
                  <RiArrowRightLine className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
