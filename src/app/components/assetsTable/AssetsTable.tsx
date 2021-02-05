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
} from "@material-ui/core";
import { Asset } from "../../models/asset";
import { Prices } from "../../models/prices";
import { Delete } from "@material-ui/icons";
import cryptoContext from "../../context/crypto-context";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import { Exchange } from "../../models/exchange";
import { normalizePrice } from "../../helpers/convertions";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    container: {
      maxHeight: 440,
    },
    notMobile: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

type Props = {
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

  function removeAsset(asset: Asset) {
    dispatch({
      type: ActionTypes.removeAsset,
      payload: { portfolioUuid, asset },
    });
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

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage id="asset_currency" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="asset_amount" />
              </TableCell>
              <TableCell className={classes.notMobile}>
                <FormattedMessage id="asset_price_per_unit" />
              </TableCell>
              <TableCell className={classes.notMobile}>
                <FormattedMessage id="asset_total_amount" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="asset_actions" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset: Asset) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={asset.currency.id}
                >
                  <TableCell>{asset.currency.name}</TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => changeAmount(e.target.value, asset)}
                      id={asset.currency.id}
                      value={asset.amount}
                      type="number"
                    />
                  </TableCell>
                  <TableCell className={classes.notMobile}>
                    {prices !== null &&
                    typeof prices[asset.currency.id] !== "undefined"
                      ? prices[asset.currency.id][exchange]
                      : "?"}
                  </TableCell>
                  <TableCell className={classes.notMobile}>
                    {prices !== null &&
                    typeof prices[asset.currency.id] !== "undefined"
                      ? `${normalizePrice(
                          prices[asset.currency.id][exchange] * asset.amount
                        )}`
                      : "?"}
                  </TableCell>{" "}
                  <TableCell>
                    <IconButton
                      onClick={() => removeAsset(asset)}
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
