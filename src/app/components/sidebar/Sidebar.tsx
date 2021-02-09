import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import cryptoContext from "../../context/crypto-context";
import { Theme, withStyles } from "@material-ui/core/styles";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import { Asset } from "../../models/asset";
import { Prices } from "../../models/prices";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Button,
  Typography,
  Dialog,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  FormControl,
  FormHelperText,
  Tooltip,
} from "@material-ui/core";
import { Currency } from "../../models/currency";
import AssetsTable from "../assetsTable/AssetsTable";
import { Portfolio } from "../../models/portfolio";
import PortfolioEdit from "../portfolioEdit/PortfolioEdit";

type Props = {
  prices: Prices | null;
  portfolio: Portfolio;
};

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 220,
    pointerEvents: "all",
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

export default function Sidebar({ prices, portfolio }: Props) {
  const { uuid, exchange, assets } = portfolio;
  const { availableCurrencies } = cryptoContext.useCryptoState();
  const dispatch = cryptoContext.useCryptoDispatch();
  const [newCurrency, setNewCurrency] = React.useState<Currency | null>(null);
  const [addAssetOpen, setAddAssetOpen] = React.useState(false);
  const [newAssetAmount, setNewAssetAmount] = React.useState(0);
  const [assetsHintOpen, setAssetsHintOpen] = React.useState(assets.length < 1);

  function addAsset() {
    setAddAssetOpen(false);
    setNewCurrency(null);
    setNewAssetAmount(0);

    dispatch({
      type: ActionTypes.addAsset,
      payload: {
        uuid,
        asset: { currency: newCurrency, amount: newAssetAmount } as Asset,
      },
    });
  }

  function handleClickOpen() {
    setAddAssetOpen(true);
  }

  function handleClose() {
    setAddAssetOpen(false);
    setNewCurrency(null);
    setNewAssetAmount(0);
  }

  function closeAssetHint() {
    setAssetsHintOpen(false);
  }

  return (
    <SidebarContainer>
      <Typography variant="h4" component="h4">
        <FormattedMessage id="my_portfolio" />
      </Typography>
      <PortfolioEdit portfolio={portfolio} />
      <Typography variant="h4" component="h4">
        <FormattedMessage id="my_assets" />
      </Typography>
      <AssetsTable
        exchange={exchange}
        assets={assets}
        prices={prices}
        portfolioUuid={uuid}
      />
      <AddButtonContainer>
        <HtmlTooltip
          arrow
          placement="top-start"
          open={assetsHintOpen}
          title={
            <React.Fragment>
              <Typography color="inherit">
                <FormattedMessage id="add_asset" />
              </Typography>
              <CloseHintContainer>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => closeAssetHint()}
                >
                  <FormattedMessage id="understood" />
                </Button>
              </CloseHintContainer>
            </React.Fragment>
          }
        >
          <Button
            onClick={() => handleClickOpen()}
            color="primary"
            variant="contained"
          >
            <FormattedMessage id="add" />
          </Button>
        </HtmlTooltip>
      </AddButtonContainer>
      <Dialog
        open={addAssetOpen}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage id="add_asset_title" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="add_asset_description" />
          </DialogContentText>
          <FormControl>
            <Autocomplete
              id="combo-box-demo"
              onChange={(e: any, selectedCurrency: Currency | null) => {
                setNewCurrency(selectedCurrency);
              }}
              value={newCurrency}
              options={availableCurrencies}
              getOptionLabel={(option: Currency) => option.name}
              style={{ width: 250 }}
              renderInput={(params: any) => (
                <FormattedMessage id="asset_currency">
                  {(msg) => (
                    <TextField {...params} label={msg} variant="outlined" />
                  )}
                </FormattedMessage>
              )}
            />
          </FormControl>
          <FormattedMessage id="asset_amount">
            {(msg) => (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={msg}
                type="number"
                fullWidth
                value={newAssetAmount}
                onChange={(e) =>
                  setNewAssetAmount(Number.parseFloat(e.target.value))
                }
              />
            )}
          </FormattedMessage>
          <FormHelperText>
            <FormattedMessage id="add_asset_amount_hint" />
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            variant="contained"
            color="secondary"
          >
            <FormattedMessage id="cancel" />
          </Button>
          <Button
            onClick={() => addAsset()}
            variant="contained"
            color="primary"
            disabled={newCurrency === null}
          >
            <FormattedMessage id="add_asset_submit" />
          </Button>
        </DialogActions>
      </Dialog>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  background-color: #262626;
  padding: 8px 16px;
  h2 {
    margin: 20px;
  }
`;

const CloseHintContainer = styled.div`
  text-align: right;
`;

const AddButtonContainer = styled.div`
  margin: 16px 0;
  text-align: right;
`;
