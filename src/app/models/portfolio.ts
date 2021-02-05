import { Asset } from "./asset";
import { Exchange } from "./exchange";

export interface Portfolio {
  uuid: string;
  name: string;
  exchange: Exchange;
  assets: Asset[];
}
