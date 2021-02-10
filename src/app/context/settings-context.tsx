/* eslint-disable import/no-anonymous-default-export */
import * as React from "react";
import { Locale } from "../models/locale";
import { Settings } from "../models/settings";
import reducer, { State, Dispatch } from "./reducers/settings-reducer";

export const defaultState: State = {
  exchange: "eur",
  locale: "en",
  welcome: true,
  autosave: true,
  balanceHidden: false,
};

type SettingsProviderProps = {
  children: React.ReactNode;
  settings: Settings | null;
};

const SettingsStateContext = React.createContext<State | undefined>(undefined);

const SettingsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function Provider({ children, settings }: SettingsProviderProps) {
  let startState = defaultState;
  const languages = navigator.languages;
  let locale: Locale = "en";
  for (let i = 0; i < languages.length; i++) {
    if (languages[i] === "en" || languages[i] === "en-US") {
      locale = "en";
      break;
    }
    if (languages[i] === "es" || languages[i] === "es-ES") {
      locale = "es";
      break;
    }

    if (languages[i] === "de" || languages[i] === "de-DE") {
      locale = "de";
      break;
    }
  }
  startState = { ...startState, locale };
  if (settings !== null) {
    startState = settings;
  }

  const [state, dispatch] = React.useReducer(reducer, startState);

  return (
    <SettingsStateContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsStateContext.Provider>
  );
}

function useSettingsState() {
  const context = React.useContext(SettingsStateContext);

  if (context === undefined) {
    throw new Error("useSettingsState must be used within a Provider");
  }

  return context;
}

function useSettingsDispatch() {
  const context = React.useContext(SettingsDispatchContext);

  if (context === undefined) {
    throw new Error("useSettingsDispatch must be used within a Provider");
  }

  return context;
}

export default { Provider, useSettingsState, useSettingsDispatch };
