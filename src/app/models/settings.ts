import { Exchange } from "./exchange";
import { Locale } from "./locale";

export interface Settings {
  locale: Locale;
  exchange: Exchange;
  welcome: boolean;
  autosave: boolean;
}
