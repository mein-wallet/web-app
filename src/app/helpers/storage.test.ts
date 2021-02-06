import { saveWallet, saveSettings, loadSettings, loadWallet } from "./storage";
import { WALLET, SETTINGS } from "../models/storage-keys";
import { Locale } from "../models/locale";
import { Exchange } from "../models/exchange";

const mockWallet = { portfolios: [] };

const mockSettings = {
  locale: "en" as Locale,
  exchange: "eur" as Exchange,
  welcome: true,
  autosave: true,
};

describe("uuid helper functions", () => {
  it("returns a null wallet when the storage is empty", () => {
    const loadedWallet = loadWallet();
    expect(loadedWallet).toEqual(null);
  });

  it("returns a null settings when the storage is empty", () => {
    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(null);
  });

  it("save the wallet into the storage when saveWallet is called", () => {
    saveWallet(mockWallet);
    expect(localStorage.getItem(WALLET)).toEqual(JSON.stringify(mockWallet));
  });

  it("save the settings into the storage when saveSettings is called", () => {
    saveSettings(mockSettings);
    expect(localStorage.getItem(SETTINGS)).toEqual(
      JSON.stringify(mockSettings)
    );
  });

  it("load the wallet from the storage when loadWallet is called", () => {
    const loadedWallet = loadWallet();
    expect(loadedWallet).toEqual(mockWallet);
  });

  it("load the settings from the storage when loadSettings is called", () => {
    const loadedSettings = loadSettings();
    expect(loadedSettings).toEqual(mockSettings);
  });
});
