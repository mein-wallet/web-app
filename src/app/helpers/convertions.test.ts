import { Asset } from "../models/asset";
import { Prices } from "../models/prices";
import {
  normalizePrice,
  getAssetValue,
  getPercentage,
  getTotalBalance,
} from "./convertions";

const ethereumAmount = 5;
const bitcoinAmount = 1;
const theGraphAmount = 10000;

const prices: Prices = {
  ethereum: { eur: 1100, btc: 0.3, usd: 1400 },
  bitcoin: { eur: 30000, btc: 1, usd: 36000 },
  "the-graph": { eur: 0.7, btc: 0.000003, usd: 0.9 },
};

const assets: Asset[] = [
  {
    currency: {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
    },
    amount: bitcoinAmount,
  },
  {
    currency: {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
    },
    amount: ethereumAmount,
  },
  {
    currency: {
      id: "the-graph",
      symbol: "grt",
      name: "The Graph",
    },
    amount: theGraphAmount,
  },
];

describe("convertions helper functions", () => {
  it("normalizePrice - returns a normalized number with maximun 3 decimal digits", () => {
    const normalizedPrice = normalizePrice(100.44322);
    expect(normalizedPrice).toEqual(100.443);
  });

  it("normalizePrice - rounds the number up when the rest ist bigger that 0,5", () => {
    const normalizedPrice = normalizePrice(100.4437);
    expect(normalizedPrice).toEqual(100.444);
  });

  it("normalizePrice - rounds the number down when the rest ist smaller that 0,5", () => {
    const normalizedPrice = normalizePrice(100.4434);
    expect(normalizedPrice).toEqual(100.443);
  });

  it("getAssetValue - return the expected balance normalized", () => {
    const amount = 4.53423;
    const price = 200.3534;
    const assetValue = getAssetValue(amount, price);
    expect(assetValue).toEqual(normalizePrice(amount * price));
  });

  it("getPercentage - return the expected percentage for the asset in the balance", () => {
    const value = 200;
    const totalBalance = 1000;
    const percentage = getPercentage(totalBalance, value);
    expect(percentage).toEqual(20);
  });

  it("getTotalBalance - return the total balance in eur for a group of assets", () => {
    const totalBalace = getTotalBalance("eur", prices, assets);
    const expectedBalance = normalizePrice(
      prices.ethereum.eur * ethereumAmount +
        prices["the-graph"].eur * theGraphAmount +
        prices.bitcoin.eur * bitcoinAmount
    );
    expect(totalBalace).toEqual(expectedBalance);
  });

  it("getTotalBalance - return the total balance in btc for a group of assets", () => {
    const totalBalace = getTotalBalance("btc", prices, assets);
    const expectedBalance = normalizePrice(
      prices.ethereum.btc * ethereumAmount +
        prices["the-graph"].btc * theGraphAmount +
        prices.bitcoin.btc * bitcoinAmount
    );
    expect(totalBalace).toEqual(expectedBalance);
  });

  it("getTotalBalance - return the total balance in usd for a group of assets", () => {
    const totalBalace = getTotalBalance("usd", prices, assets);
    const expectedBalance = normalizePrice(
      prices.ethereum.usd * ethereumAmount +
        prices["the-graph"].usd * theGraphAmount +
        prices.bitcoin.usd * bitcoinAmount
    );
    expect(totalBalace).toEqual(expectedBalance);
  });

  it("getTotalBalance - use 0 when the price of an asset is still not loaded from the server", () => {
    const notCompletedPrices: Prices = {
      "the-graph": { eur: 0.7, btc: 0.000003, usd: 0.9 },
    };
    const totalBalace = getTotalBalance("usd", notCompletedPrices, assets);

    const expectedBalance = normalizePrice(
      prices["the-graph"].usd * theGraphAmount
    );
    expect(totalBalace).toEqual(expectedBalance);
  });
});
