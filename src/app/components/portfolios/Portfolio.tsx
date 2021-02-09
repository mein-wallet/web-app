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
import { Typography, Grid, Drawer, Button, Tooltip } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { Close } from "@material-ui/icons";

type Props = {
  portfolio: PortfolioModel;
};

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 220,
    pointerEvents: "all",
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: "100%",
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      height: 400,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      height: 0,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
  })
);

export default function Portfolio({ portfolio }: Props) {
  const dispatch = cryptoContext.useCryptoDispatch();
  const { assets, exchange } = portfolio;
  const [balance, setBalance] = React.useState<number | null>(null);
  const [prices, setPrices] = React.useState<Prices | null>(null);
  const [configOpened, setConfigOpened] = React.useState(false);
  const classes = useStyles();
  const [assetsHintOpen, setAssetsHintOpen] = React.useState(
    portfolio.assets.length < 1
  );

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

  function closeAssetHint() {
    setAssetsHintOpen(false);
  }

  return (
    <Grid container>
      {prices !== null ? (
        <Grid item md={12} alignItems="center" justify="center">
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              alignItems="center"
              justify="center"
            >
              <Balance balance={balance} exchange={exchange} />
            </Grid>
            <Grid item md={12} alignItems="center" justify="center">
              <Chart prices={prices} assets={assets} exchange={exchange} />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onClick={() => setConfigOpened(true)}
          >
            <FormattedMessage id="edit_portfolio_button" />
          </Button>
        </Grid>
      ) : (
        <Grid item md={12}>
          <CenterContainer>
            {assets.length > 0 ? (
              <Typography component="p">
                <FormattedMessage id="loading" />
              </Typography>
            ) : (
              <Typography component="p">
                <FormattedMessage id="add_assets_hint" />
              </Typography>
            )}
          </CenterContainer>
          <ButtonContainer>
            <HtmlTooltip
              arrow
              placement="top-start"
              open={assetsHintOpen}
              title={
                <React.Fragment>
                  <Typography color="inherit">
                    <FormattedMessage id="edit_portfolio" />
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
                variant="contained"
                color="primary"
                onClick={() => setConfigOpened(true)}
              >
                <FormattedMessage id="edit_portfolio_button" />
              </Button>
            </HtmlTooltip>
          </ButtonContainer>
        </Grid>
      )}
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: configOpened,
          [classes.drawerClose]: !configOpened,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: configOpened,
            [classes.drawerClose]: !configOpened,
          }),
        }}
        anchor="bottom"
        open={configOpened}
        onClose={() => setConfigOpened(false)}
      >
        <Button
          variant="contained"
          color="default"
          onClick={() => setConfigOpened(false)}
          startIcon={<Close />}
        >
          <FormattedMessage id="close" />
        </Button>
        <Sidebar portfolio={portfolio} prices={prices} />
      </Drawer>
    </Grid>
  );
}

const CenterContainer = styled.div`
  text-align: center;
  padding: 20px;
  position: relative;
`;

const CloseHintContainer = styled.div`
  text-align: right;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
