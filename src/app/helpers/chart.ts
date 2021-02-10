import { Asset } from "../models/asset";
import { ChartData } from "../models/chart-data";
import { Exchange } from "../models/exchange";
import { Prices } from "../models/prices";
import { getPercentage, normalizePrice } from "./convertions";

export function buildDataForChart(
  asset: Asset,
  prices: Prices,
  total: number,
  exchange: Exchange
): ChartData {
  const price =
    typeof prices[asset.currency.id] !== "undefined"
      ? prices[asset.currency.id][exchange]
      : 0;

  const assetValue = getPercentage(total, asset.amount * price);

  return {
    x: `${asset.currency.symbol.toUpperCase()}`,
    y: assetValue,
    name: asset.currency.name,
    total: `${normalizePrice(asset.amount * price)} ${exchange.toUpperCase()}`,
    amount: asset.amount,
    price: `${normalizePrice(price)} ${exchange.toUpperCase()}`,
    percentage: `${getPercentage(total, asset.amount * price)}%`,
  };
}
