import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import type { PricingProps } from "@/types";
import { formatCurrency } from "@/lib";

interface Props {
  pricing: PricingProps;
}

export const Pricing = ({ pricing }: Props) => {
  return (
    <div className="flex flex-col items-center rounded-md border p-4">
      <div className="mb-4 text-2xl font-semibold">{pricing.tier}</div>
      <div className="mb-2 text-3xl font-bold">{formatCurrency(pricing.price)}</div>
      <ul className="mb-4 space-y-2 text-center">
        {pricing.features.map((feature, index) => (
          <li key={index} className="text-sm">
            {feature}
          </li>
        ))}
      </ul>
      <Button asChild size="sm">
        <Link href={pricing.link}>{pricing.cta}</Link>
      </Button>
    </div>
  );
};
