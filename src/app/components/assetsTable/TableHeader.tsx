import { TableCell, TableSortLabel, SortDirection } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

export type HeaderKey = "currency" | "amount" | "pricePerUnit" | "totalValue";

export type TableHeaderProps = {
  label: any;
  id: HeaderKey;
  orderBy: HeaderKey;
  orderDirection: SortDirection;
  onClick: Function;
  extraClass?: string;
};

export default function TableHeader({
  label,
  id,
  orderBy,
  orderDirection,
  onClick,
  extraClass,
}: TableHeaderProps) {
  return (
    <TableCell
      className={extraClass}
      sortDirection={orderBy === id ? orderDirection : undefined}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={
          (orderBy === id ? orderDirection : undefined) as
            | "desc"
            | "asc"
            | undefined
        }
        onClick={() => onClick()}
      >
        <FormattedMessage id={label} />
      </TableSortLabel>
    </TableCell>
  );
}
