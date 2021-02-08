import styled from "styled-components";
import { Locale } from "../../models/locale";
import { ActionTypes } from "../../context/reducers/settings-reducer";
import settingsContenxt from "../../context/settings-context";
import { FormattedMessage } from "react-intl";
import { Exchange } from "../../models/exchange";
import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  FormLabel,
  FormGroup,
  Divider,
  FormControlLabel,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { saveSettings } from "../../helpers/storage";
import cryptoContext from "../../context/crypto-context";
import { Portfolio } from "../../models/portfolio";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      minHeight: "calc(100vh - 112px)",
      backgroundColor: theme.palette.background.paper,
      color: "white",
      padding: 24,
    },
    formControl: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export default function Settings() {
  const dispatch = settingsContenxt.useSettingsDispatch();
  const classes = useStyles();
  const settings = settingsContenxt.useSettingsState();
  const { portfolios } = cryptoContext.useCryptoState();
  const { locale, exchange, autosave, defaultPortfolio } = settings;

  function selectLanguage(language: Locale) {
    dispatch({ type: ActionTypes.setLocale, payload: language });
  }

  function selectDefaultPortfolio(portfolioUuid: Portfolio) {
    dispatch({ type: ActionTypes.setDefaultPortfolio, payload: portfolioUuid });
  }

  React.useEffect(() => {
    if (autosave) {
      saveSettings(settings);
    }
  }, [settings, autosave]);

  const toggleAutosave = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.setAutosave,
      payload: event.target.checked,
    });
  };

  function selectExchange(exchange: Exchange) {
    dispatch({ type: ActionTypes.setExchange, payload: exchange });
  }

  return (
    <div className={classes.root}>
      <ConfigurationList>
        <li>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>
              <FormattedMessage id="language" />
            </InputLabel>
            <Select
              value={locale}
              onChange={(e) => selectLanguage(e.target.value as Locale)}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={"de"}>
                <FormattedMessage id="german" />
              </MenuItem>
              <MenuItem value={"en"}>
                <FormattedMessage id="english" />
              </MenuItem>
              <MenuItem value={"es"}>
                <FormattedMessage id="spanish" />
              </MenuItem>
            </Select>
            <FormHelperText>
              <FormattedMessage id="language_hint" />
            </FormHelperText>
          </FormControl>
        </li>
        <li>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>
              <FormattedMessage id="currency" />
            </InputLabel>
            <Select
              value={exchange}
              onChange={(e) => selectExchange(e.target.value as Exchange)}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value={"btc"}>BTC</MenuItem>
              <MenuItem value={"eur"}>EUR</MenuItem>
              <MenuItem value={"usd"}>USD </MenuItem>
            </Select>
            <FormHelperText>
              <FormattedMessage id="currency_global_hint" />
            </FormHelperText>
          </FormControl>
        </li>
        <Divider />
        {portfolios.length > 0 && (
          <React.Fragment>
            <li>
              <FormControl className={classes.formControl}>
                <InputLabel shrink>
                  <FormattedMessage id="default_portfolio" />
                </InputLabel>
                <Select
                  value={defaultPortfolio}
                  onChange={(e) =>
                    selectDefaultPortfolio(e.target.value as Portfolio)
                  }
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  {portfolios.map((portfolio: Portfolio) => (
                    <MenuItem key={portfolio.uuid} value={portfolio.uuid}>
                      {portfolio.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  <FormattedMessage id="default_portfolio_hint" />
                </FormHelperText>
              </FormControl>
            </li>
            <Divider />
          </React.Fragment>
        )}
        <li>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Advanced</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={autosave}
                    onChange={(e) => toggleAutosave(e)}
                    name="autosave"
                  />
                }
                label="Autosave"
              />
            </FormGroup>
            <FormHelperText>
              <FormattedMessage id="autosave_global_hint" />
            </FormHelperText>
          </FormControl>
        </li>
      </ConfigurationList>
    </div>
  );
}

const ConfigurationList = styled.ul`
  width: calc(100% - 64px);
`;
