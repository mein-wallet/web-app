import { SortDirection } from "@material-ui/core";
import { HeaderKey } from "../components/assetsTable/TableHeader";
import { Asset } from "./asset";
import { Exchange } from "./exchange";

export interface Portfolio {
  uuid: string;
  name: string;
  exchange: Exchange;
  assets: Asset[];
  orderDirection?: SortDirection;
  orderBy?: HeaderKey;
}
