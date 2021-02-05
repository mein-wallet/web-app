import { Currency } from "./currency";

export interface Asset {
  currency: Currency;
  amount: number;
}
