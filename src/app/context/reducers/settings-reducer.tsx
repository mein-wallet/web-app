import { Reducer } from "react";
import { Settings } from "../../models/settings";

export type State = Settings;

export enum ActionTypes {
  setAutosave,
  setExchange,
  setLocale,
  setWelcome,
  setDefaultPortfolio,
  removeDefaultPortfolio,
  setBalanceHidden,
}

export type Action = { type: ActionTypes; payload: any };
export type Dispatch = (action: Action) => void;

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.setAutosave: {
      return { ...state, autosave: payload };
    }

    case ActionTypes.setBalanceHidden: {
      return { ...state, balanceHidden: payload };
    }

    case ActionTypes.setExchange: {
      return { ...state, exchange: payload };
    }

    case ActionTypes.setLocale: {
      return { ...state, locale: payload };
    }

    case ActionTypes.setDefaultPortfolio: {
      return { ...state, defaultPortfolio: payload };
    }

    case ActionTypes.setWelcome: {
      return { ...state, welcome: payload };
    }

    case ActionTypes.removeDefaultPortfolio: {
      const newState = { ...state };
      delete newState.defaultPortfolio;
      return { ...newState };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export default reducer;
