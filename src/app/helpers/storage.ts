import { Wallet } from "../models/wallet";
import { Settings } from "../models/settings";
import { SETTINGS, WALLET } from "../models/storage-keys";

export function saveWallet(wallet: Wallet) {
  return localStorage.setItem(WALLET, JSON.stringify(wallet));
}

export function saveSettings(settings: Settings) {
  return localStorage.setItem(SETTINGS, JSON.stringify(settings));
}

export function loadWallet(): Wallet | null {
  const wallet = localStorage.getItem(WALLET);
  if (wallet !== null) {
    return JSON.parse(wallet) as Wallet;
  }
  return null;
}

export function loadSettings(): Settings | null {
  const settings = localStorage.getItem(SETTINGS);
  if (settings !== null) {
    return JSON.parse(settings) as Settings;
  }
  return null;
}
