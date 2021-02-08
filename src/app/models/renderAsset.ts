import { Asset } from "./asset";

export interface RenderAsset {
  currency: string;
  amount: number;
  id: string;
  pricePerUnit: string | number;
  totalValue: string | number;
  _asset: Asset;
}
