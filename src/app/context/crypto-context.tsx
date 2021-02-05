/* eslint-disable import/no-anonymous-default-export */
import * as React from "react";
import { Portfolio } from "../models/portfolio";
import reducer, { State, Dispatch } from "./reducers/crypto-reducer";

export const defaultState: State = {
  availableCurrencies: [],
  portfolios: [],
  balance: 0.0,
  prices: null,
  menuOppened: false,
  view: "dashboard",
};

type CryptoProviderProps = {
  children: React.ReactNode;
  portfolios: Portfolio[] | null;
};

const CryptoStateContext = React.createContext<State | undefined>(undefined);

const CryptoDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function Provider({ children, portfolios }: CryptoProviderProps) {
  let startState = defaultState;
  if (portfolios !== null) {
    startState = { ...startState, portfolios };
  }
  const [state, dispatch] = React.useReducer(reducer, startState);

  return (
    <CryptoStateContext.Provider value={state}>
      <CryptoDispatchContext.Provider value={dispatch}>
        {children}
      </CryptoDispatchContext.Provider>
    </CryptoStateContext.Provider>
  );
}

function useCryptoState() {
  const context = React.useContext(CryptoStateContext);

  if (context === undefined) {
    throw new Error("useCryptoState must be used within a Provider");
  }

  return context;
}

function useCryptoDispatch() {
  const context = React.useContext(CryptoDispatchContext);

  if (context === undefined) {
    throw new Error("useCryptoDispatch must be used within a Provider");
  }

  return context;
}

export default { Provider, useCryptoState, useCryptoDispatch };
