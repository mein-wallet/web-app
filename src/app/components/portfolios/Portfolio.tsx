import React from "react";
import Balance from "../balance/Balance";
import Sidebar from "../sidebar/Sidebar";
import Chart from "../chart/Chart";
import cryptoContext from "../../context/crypto-context";
import styled from "styled-components";
import { getTotalBalance } from "../../helpers/convertions";
import { Portfolio as PortfolioModel } from "../../models/portfolio";
import { getCryptosPrices } from "../../helpers/api";
import { Prices } from "../../models/prices";
import { Typography, Grid } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

type Props = {
  portfolio: PortfolioModel;
};

export default function Portfolio({ portfolio }: Props) {
  const dispatch = cryptoContext.useCryptoDispatch();
  const { assets, exchange } = portfolio;
  const [balance, setBalance] = React.useState<number | null>(null);
  const [prices, setPrices] = React.useState<Prices | null>(null);

  React.useEffect(() => {
    async function fetchPrices() {
      if (assets.length > 0) {
        const prices = await getCryptosPrices(assets);
        setPrices(prices);
      }
    }
    const interval = setInterval(fetchPrices, 15000);
    fetchPrices();

    return () => {
      clearInterval(interval);
    };
  }, [assets, dispatch]);

  React.useEffect(() => {
    if (prices !== null) {
      setBalance(getTotalBalance(exchange, prices, assets));
    }
  }, [prices, exchange, assets]);

  return (
    <Grid container style={{ minHeight: "calc(100vh - 160px)" }}>
      {prices !== null ? (
        <Grid item sm={12} md={8} alignItems="center" justify="center">
          <Grid container>
            <Grid
              item
              sm={12}
              md={12}
              xs={12}
              alignItems="center"
              justify="center"
            >
              <Balance balance={balance} exchange={exchange} />
            </Grid>
            <Grid item sm={12} md={12} alignItems="center" justify="center">
              <Chart prices={prices} assets={assets} exchange={exchange} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item sm={12} md={8}>
          <CenterContainer>
            {assets.length > 0 ? (
              <Typography variant="h4" component="h4">
                <FormattedMessage id="loading" />
              </Typography>
            ) : (
              <Typography variant="h4" component="h4">
                <FormattedMessage id="add_assets_hint" />
              </Typography>
            )}
          </CenterContainer>
        </Grid>
      )}
      <Grid item sm={12} md={4}>
        <Sidebar portfolio={portfolio} prices={prices} />
      </Grid>
    </Grid>
  );
}

const CenterContainer = styled.div`
  text-align: center;
  padding: 20px;
  position: relative;
`;
