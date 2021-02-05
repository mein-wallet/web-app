import React from "react";
import Welcome from "./welcome/Welcome";
import { IntlProvider } from "react-intl";
import cryptoContext from "../context/crypto-context";
import { ActionTypes } from "../context/reducers/crypto-reducer";
import settingsContext from "../context/settings-context";
import translations from "../translations/translations";
import styled from "styled-components";
import { Reset } from "styled-reset";
import AppViewport from "./appViewport/AppViewport";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import { getAvailableCurrencies } from "../helpers/api";
import { saveSettings } from "../helpers/storage";

const THEME = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f9d42f",
    },
    secondary: red,
  },
});

function App() {
  const settings = settingsContext.useSettingsState();
  const { locale, welcome, autosave } = settings;
  const dispatch = cryptoContext.useCryptoDispatch();

  React.useEffect(() => {
    if (autosave) {
      saveSettings(settings);
    }
  }, [settings, autosave]);

  React.useEffect(() => {
    async function fetchCurrencies() {
      const assets = await getAvailableCurrencies();
      dispatch({ type: ActionTypes.setAvailableCurrencies, payload: assets });
    }
    fetchCurrencies();
  }, [dispatch]);
  return (
    <IntlProvider locale={locale} messages={translations[locale]}>
      <Reset />
      <MuiThemeProvider theme={THEME}>
        <AppContainer>
          <Header />
          <Menu />
          {welcome ? <Welcome /> : <AppViewport />}
        </AppContainer>
      </MuiThemeProvider>
    </IntlProvider>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
`;
