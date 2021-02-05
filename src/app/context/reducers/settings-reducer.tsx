import { Reducer } from "react";
import { Settings } from "../../models/settings";

export type State = Settings;

export enum ActionTypes {
  setAutosave,
  setExchange,
  setLocale,
  setWelcome,
}

export type Action = { type: ActionTypes; payload: any };
export type Dispatch = (action: Action) => void;

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.setAutosave: {
      return { ...state, autosave: payload };
    }
    case ActionTypes.setExchange: {
      return { ...state, exchange: payload };
    }

    case ActionTypes.setLocale: {
      return { ...state, locale: payload };
    }

    case ActionTypes.setWelcome: {
      return { ...state, welcome: payload };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export default reducer;
