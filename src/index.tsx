import React from "react";
import ReactDOM from "react-dom";
import App from "./app/components/App";
import cryptoContext from "./app/context/crypto-context";
import settingsContext from "./app/context/settings-context";
import { loadSettings, loadWallet } from "./app/helpers/storage";
const wallet = loadWallet();
const portfolios =
  typeof wallet?.portfolios !== "undefined" ? wallet?.portfolios : null;

ReactDOM.render(
  <React.StrictMode>
    <cryptoContext.Provider portfolios={portfolios}>
      <settingsContext.Provider settings={loadSettings()}>
        <App />
      </settingsContext.Provider>
    </cryptoContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
