"use client";

import { RiVipCrownLine, RiBankCardLine, RiFileList3Line, RiArrowRightLine, RiStarFill } from "@remixicon/react";
import React from "react";

import { useGetSubscriptionsQuery, useGetUserSubscriptionsQuery } from "@/api/subscription";
import { useGetInvoicesQuery, useGetPaymentMethodsQuery } from "@/api/payment";
import { cn, formatCurrency, fromSnakeCase, getTrueValue } from "@/lib";
import { AddPaymentMethod } from "./add-payment-method";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/user";

const invoices: {
  id: string;
  date: string;
  amount: number;
  status: string;
}[] = [];

export const BillingSettings = () => {
  const { user } = useUserStore();
  const currentPlan = user?.is_premium ? "pro" : "free";

  const { data: subscriptions } = useGetSubscriptionsQuery({ page: 1, size: 10 });
  const {} = useGetUserSubscriptionsQuery({ page: 1, size: 10 });
  const {} = useGetInvoicesQuery({ page: 1, size: 10 });
  const { data: paymentMethods } = useGetPaymentMethodsQuery(null);

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
          {subscriptions?.data.data.map((subscription) => (
            <div
              key={subscription.id}
              className={cn(
                "relative space-y-4 border p-5 transition-all",
                currentPlan === subscription.id
                  ? "border-primary-400 bg-primary-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/20",
              )}
            >
              <Button className="w-full" size="sm" variant="default-outline"></Button>
              <div>
                <p className="">{subscription.name}</p>
                <p className="text-primary-400 text-4xl">{formatCurrency(subscription.price, subscription.currency)}</p>
                {subscription.features && (
                  <div className="space-y-2">
                    {Object.entries(subscription.features).map(([key, value]) => (
                      <p className="capitalize" key={key}>
                        {fromSnakeCase(key)}: {getTrueValue(value)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
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
        <AddPaymentMethod />
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
