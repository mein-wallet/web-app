import { Asset } from "../models/asset";

const API_URL = "https://api.coingecko.com/api/v3/";

export async function getCryptosPrices(assets: Asset[]) {
  const assetsIds: string[] = [];
  assets.map((asset) => {
    return assetsIds.push(asset.currency.id);
  });

  try {
    const response = await fetch(
      `${API_URL}simple/price?` +
        new URLSearchParams({
          ids: assetsIds.join(","),
          vs_currencies: ["EUR", "USD", "BTC"].join(","),
        })
    );
    const prices = response.json();
    return prices;
  } catch (e) {
    console.log("error while fetching");
    return [];
  }
}

export async function getAvailableCurrencies() {
  try {
    const response = await fetch(`${API_URL}coins/list`);
    const assets = response.json();
    return assets;
  } catch (e) {
    console.log("error while fetching");
    return [];
  }
}
