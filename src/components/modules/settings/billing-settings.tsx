"use client";

import React from "react";
import {
  RiVipCrownLine,
  RiBankCardLine,
  RiFileList3Line,
  RiCheckLine,
  RiArrowRightLine,
  RiStarFill,
} from "@remixicon/react";

import { useGetSubscriptionsQuery, useGetUserSubscriptionsQuery } from "@/api/subscription";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user";
import { cn } from "@/lib";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: ["Basic profile", "Apply to 10 jobs/month", "Standard support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    interval: "month",
    popular: true,
    features: [
      "Everything in Free",
      "Unlimited job applications",
      "Priority in search results",
      "Resume analytics",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 29.99,
    interval: "month",
    features: ["Everything in Pro", "Custom branding", "API access", "Dedicated account manager", "24/7 phone support"],
  },
];

const invoices = [
  { id: "INV-001", date: "2024-01-15", amount: 9.99, status: "paid" },
  { id: "INV-002", date: "2023-12-15", amount: 9.99, status: "paid" },
  { id: "INV-003", date: "2023-11-15", amount: 9.99, status: "paid" },
];

export const BillingSettings = () => {
  const { user } = useUserStore();
  const currentPlan = user?.is_premium ? "pro" : "free";

  const {} = useGetSubscriptionsQuery({ page: 1, size: 10 });
  const {} = useGetUserSubscriptionsQuery({ page: 1, size: 10 });

  return (
    <div className="space-y-8">
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiVipCrownLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Current Plan</h3>
              <p className="text-sm text-gray-400">Manage your subscription</p>
            </div>
          </div>
          {user?.is_premium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-sm font-bold">
              <RiStarFill className="mr-1 size-3" />
              PRO
            </Badge>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative border p-5 transition-all",
                currentPlan === plan.id
                  ? "border-primary-400 bg-primary-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/20",
              )}
            >
              {plan.popular && (
                <Badge className="bg-primary-400 absolute -top-2 right-4 text-black">Most Popular</Badge>
              )}
              <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-400">/{plan.interval}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <RiCheckLine className="size-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4 w-full"
                variant={currentPlan === plan.id ? "outline" : "default"}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
              </Button>
            </div>
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

        <div className="flex items-center justify-between border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center bg-blue-500/20">
              <RiBankCardLine className="size-6 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-400">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="mt-4">
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
