import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Table,
  Paper,
  IconButton,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  SortDirection,
} from "@material-ui/core";
import { Asset } from "../../models/asset";
import { RenderAsset } from "../../models/renderAsset";
import { Prices } from "../../models/prices";
import { Delete } from "@material-ui/icons";
import cryptoContext from "../../context/crypto-context";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import { Exchange } from "../../models/exchange";
import { normalizePrice } from "../../helpers/convertions";
import { FormattedMessage } from "react-intl";
import TableHeader, { HeaderKey } from "./TableHeader";
import { sortAssets, getComparator } from "../../helpers/sort";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    notMobile: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

export type Props = {
  assets: Asset[];
  prices: Prices | null;
  portfolioUuid: string;
  exchange: Exchange;
};

export default function AssetsTable({
  assets,
  prices,
  portfolioUuid,
  exchange,
}: Props) {
  const classes = useStyles();
  const dispatch = cryptoContext.useCryptoDispatch();
  const [orderDirection, setOrderDirection] = React.useState<SortDirection>(
    "asc"
  );
  const [orderBy, setOrderBy] = React.useState<HeaderKey>("currency");
  const [orderTypeNumber, setOrderTypeNumber] = React.useState(false);

  function removeAsset(asset: Asset) {
    dispatch({
      type: ActionTypes.removeAsset,
      payload: { portfolioUuid, asset },
    });
  }

  function handleRequestSort(property: HeaderKey, isNumber: boolean) {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setOrderTypeNumber(isNumber);
  }

  function changeAmount(value: any, asset: Asset) {
    dispatch({
      type: ActionTypes.editAsset,
      payload: {
        portfolioUuid,
        asset,
        value,
      },
    });
  }

  const buildedAssets: RenderAsset[] = assets.map((asset: Asset) => {
    return {
      id: asset.currency.id,
      currency: asset.currency.name,
      amount: asset.amount,
      pricePerUnit:
        prices !== null && typeof prices[asset.currency.id] !== "undefined"
          ? prices[asset.currency.id][exchange]
          : "?",
      totalValue:
        prices !== null && typeof prices[asset.currency.id] !== "undefined"
          ? `${normalizePrice(
              prices[asset.currency.id][exchange] * asset.amount
            )}`
          : "?",
      _asset: asset,
    };
  });

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableHeader
                id="currency"
                label="asset_currency"
                orderBy={orderBy}
                orderDirection={orderDirection}
                onClick={() => handleRequestSort("currency", false)}
              />
              <TableHeader
                id="amount"
                label="asset_amount"
                orderBy={orderBy}
                orderDirection={orderDirection}
                onClick={() => handleRequestSort("amount", true)}
              />
              <TableHeader
                id="pricePerUnit"
                extraClass={classes.notMobile}
                label="asset_price_per_unit"
                orderBy={orderBy}
                orderDirection={orderDirection}
                onClick={() => handleRequestSort("pricePerUnit", true)}
              />
              <TableHeader
                id="totalValue"
                extraClass={classes.notMobile}
                label="asset_total_amount"
                orderBy={orderBy}
                orderDirection={orderDirection}
                onClick={() => handleRequestSort("totalValue", true)}
              />
              <TableCell>
                <FormattedMessage id="asset_actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortAssets(
              buildedAssets,
              getComparator(orderDirection, orderBy, orderTypeNumber)
            ).map((renderAsset) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={renderAsset.id}
                >
                  <TableCell>{renderAsset.currency}</TableCell>
                  <TableCell>
                    <TextField
                      data-test-id="change-asset-amount"
                      onChange={(e) =>
                        changeAmount(e.target.value, renderAsset._asset)
                      }
                      id={renderAsset.id}
                      value={renderAsset.amount}
                      type="number"
                    />
                  </TableCell>
                  <TableCell className={classes.notMobile}>
                    {renderAsset.pricePerUnit}
                  </TableCell>
                  <TableCell className={classes.notMobile}>
                    {renderAsset.totalValue}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      data-test-id="remove-asset"
                      onClick={() => removeAsset(renderAsset._asset)}
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
