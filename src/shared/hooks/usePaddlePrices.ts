import type { Paddle, PricePreviewParams, PricePreviewResponse } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

import { subscriptionPlans } from "@entities/Subscription/lib/constants";

import { TNullable } from "@shared/types/common";

export type PaddlePrices = Record<string, string>;

function getLineItems(): PricePreviewParams["items"] {
  const priceId = subscriptionPlans.map((tier) => [tier.priceId.month, tier.priceId.annual]);
  return priceId.flat().map((priceId) => ({ priceId, quantity: 1 }));
}

function getPriceAmounts(prices: PricePreviewResponse) {
  return prices.data.details.lineItems.reduce((acc, item) => {
    acc[item.price.id] = item.formattedTotals.total;
    return acc;
  }, {} as PaddlePrices);
}

export function usePaddlePrices(
  paddle: TNullable<Paddle>,
  country: string
): { prices: PaddlePrices; loading: boolean } {
  const [prices, setPrices] = useState<PaddlePrices>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const paddlePricePreviewRequest: Partial<PricePreviewParams> = {
      items: getLineItems(),
      ...(country !== "OTHERS" && { address: { countryCode: country } }),
    };

    setLoading(true);

    paddle
      ?.PricePreview(paddlePricePreviewRequest as PricePreviewParams)
      .then((prices) => {
        setPrices((prevState) => ({ ...prevState, ...getPriceAmounts(prices) }));
      })
      .finally(() => setLoading(false));
  }, [country, paddle]);
  return { prices, loading };
}
