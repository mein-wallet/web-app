import { Exchange } from "./exchange";

export type Price = Record<Exchange, number>;
export type Prices = Record<string, Price>;
