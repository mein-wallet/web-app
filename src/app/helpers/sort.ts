import { SortDirection } from "@material-ui/core";
import { HeaderKey } from "../components/assetsTable/TableHeader";
import { Asset } from "../models/asset";
import { RenderAsset } from "../models/renderAsset";

function descendingComparator(
  a: any,
  b: any,
  orderBy: HeaderKey,
  isNumber: boolean
) {
  const bEvaluate = isNumber ? Number.parseFloat(b[orderBy]) : b[orderBy];
  const aEvaluate = isNumber ? Number.parseFloat(a[orderBy]) : a[orderBy];

  if (bEvaluate < aEvaluate) {
    return -1;
  }
  if (bEvaluate > aEvaluate) {
    return 1;
  }
  return 0;
}

export function getComparator(
  orderDirection: SortDirection,
  orderBy: HeaderKey,
  isNumber: boolean
) {
  return orderDirection === "desc"
    ? (a: Asset, b: Asset) => descendingComparator(a, b, orderBy, isNumber)
    : (a: Asset, b: Asset) => -descendingComparator(a, b, orderBy, isNumber);
}

export function sortAssets(
  array: RenderAsset[],
  comparator: any
): RenderAsset[] {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]) as RenderAsset[];
}
