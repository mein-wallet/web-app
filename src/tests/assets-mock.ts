import { Asset } from "../app/models/asset";

export const ethereumAmount = 5;
export const bitcoinAmount = 1;
export const theGraphAmount = 10000;

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

export default assets;
