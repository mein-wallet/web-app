import React from "react";
import { makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Tabs,
  Tab,
  Typography,
  Box,
  Dialog,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Tooltip,
} from "@material-ui/core";
import Portfolio from "./Portfolio";
import cryptoContext from "../../context/crypto-context";
import settingContext from "../../context/settings-context";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import { ActionTypes as SettingsActionTypes } from "../../context/reducers/settings-reducer";
import { generateUUID } from "../../helpers/uuid";
import { FormattedMessage } from "react-intl";
import { Exchange } from "../../models/exchange";
import { saveWallet, saveSettings } from "../../helpers/storage";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={isSmall ? 0 : 2}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 220,
    pointerEvents: "all",
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: "white",
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Portfolios() {
  const classes = useStyles();
  const dispatch = cryptoContext.useCryptoDispatch();
  const settings = settingContext.useSettingsState();
  const settingsDispatch = settingContext.useSettingsDispatch();
  const { portfolios } = cryptoContext.useCryptoState();
  const {
    exchange,
    autosave,
    defaultPortfolio,
  } = settingContext.useSettingsState();
  let startIndex = 0;
  if (defaultPortfolio!!) {
    startIndex = portfolios.findIndex((x) => x.uuid === defaultPortfolio);
  }
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = React.useState(
    startIndex
  );
  const [portfolioHintOpen, setPortfolioHintOpen] = React.useState(
    portfolios.length < 1
  );
  const [newPortfolioName, setNewPortfolioName] = React.useState("");
  const [newPortfolioExchange, setNewPortfolioExchange] = React.useState(
    exchange
  );
  const [addPorfolioOpen, setAddPorfolioOpen] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<{}>, index: number) => {
    setCurrentPortfolioIndex(index);
  };

  React.useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  React.useEffect(() => {
    if (autosave) {
      saveWallet({ portfolios });

      if (portfolios.findIndex((x) => x.uuid === defaultPortfolio) < 0) {
        settingsDispatch({
          type: SettingsActionTypes.removeDefaultPortfolio,
          payload: null,
        });
      }
    }
  }, [portfolios, autosave, defaultPortfolio, settingsDispatch]);

  function addPorfolio() {
    if (newPortfolioName !== "") {
      dispatch({
        type: ActionTypes.addPortfolio,
        payload: {
          name: newPortfolioName,
          uuid: generateUUID(),
          assets: [],
          exchange: newPortfolioExchange,
        },
      });
    }
    setAddPorfolioOpen(false);
    setNewPortfolioName("");
    setNewPortfolioExchange(exchange);
  }

  function handleClickOpen() {
    setAddPorfolioOpen(true);
  }

  function handleClose() {
    setAddPorfolioOpen(false);
    setNewPortfolioName("");
    setNewPortfolioExchange(exchange);
  }

  function closePorfolioHint() {
    setPortfolioHintOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={currentPortfolioIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {portfolios.map((portfolio, index) => (
            <Tab
              key={portfolio.uuid}
              label={portfolio.name}
              {...a11yProps(index)}
            />
          ))}

          <HtmlTooltip
            arrow
            placement="bottom-end"
            open={portfolioHintOpen}
            title={
              <React.Fragment>
                <Typography color="inherit">
                  <FormattedMessage id="add_portfolio" />
                </Typography>
                <CloseHintContainer>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => closePorfolioHint()}
                  >
                    <FormattedMessage id="understood" />
                  </Button>
                </CloseHintContainer>
              </React.Fragment>
            }
          >
            <Button onClick={() => handleClickOpen()} color="primary">
              <AddBoxIcon />
            </Button>
          </HtmlTooltip>
        </Tabs>
      </AppBar>
      {portfolios.map((portfolio, index) => (
        <TabPanel
          key={portfolio.uuid}
          value={currentPortfolioIndex}
          index={index}
        >
          <Portfolio portfolio={portfolio} />
        </TabPanel>
      ))}
      {portfolios.length < 1 && (
        <CenterContainer>
          <Typography variant="h4" component="h4">
            <FormattedMessage id="create_portfolio_hint" />
          </Typography>
        </CenterContainer>
      )}
      <Dialog
        open={addPorfolioOpen}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage id="new_portfolio_title" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="new_portfolio_description" />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Porfolio Name"
            type="text"
            fullWidth
            value={newPortfolioName}
            onChange={(e) => setNewPortfolioName(e.target.value)}
          />
          <FormHelperText>
            <FormattedMessage id="portfolio_name_hint" />
          </FormHelperText>
          <FormControl>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              <FormattedMessage id="currency" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={newPortfolioExchange}
              onChange={(e) =>
                setNewPortfolioExchange(e.target.value as Exchange)
              }
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={"btc"}>BTC</MenuItem>
              <MenuItem value={"eur"}>EUR</MenuItem>
              <MenuItem value={"usd"}>USD </MenuItem>
            </Select>
            <FormHelperText>
              <FormattedMessage id="currency_hint" />
            </FormHelperText>
          </FormControl>
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
            onClick={() => addPorfolio()}
            variant="contained"
            color="primary"
            disabled={newPortfolioName === ""}
          >
            <FormattedMessage id="new_portfolio_submit" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const CloseHintContainer = styled.div`
  text-align: right;
`;

const CenterContainer = styled.div`
  text-align: center;
  padding: 20px;
  position: relative;
  margin-top: 120px;
`;
