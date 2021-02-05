import { Asset } from "../models/asset";
import { Exchange } from "../models/exchange";
import { Prices } from "../models/prices";

export function getPercentage(total: number, value: number): number {
  return normalizePrice((100 * value) / total);
}

export function getAssetValue(amout: number, price: number): number {
  return normalizePrice(amout * price);
}

export function normalizePrice(price: number): number {
  return parseFloat(price.toFixed(3));
}

export function getTotalBalance(
  exchange: Exchange,
  prices: Prices,
  assets: Asset[]
): number {
  let total = 0;
  assets.map((asset: Asset) => {
    const value =
      typeof prices[asset.currency.id] !== "undefined"
        ? asset.amount * prices[asset.currency.id][exchange]
        : 0;

    return (total += value);
  });

  return normalizePrice(total);
}
