import { Reducer } from "react";
import { Currency } from "../../models/currency";
import { Portfolio } from "../../models/portfolio";
import { Prices } from "../../models/prices";
import { View } from "../../models/view";
import { Asset } from "../../models/asset";

export type State = {
  availableCurrencies: Currency[];
  portfolios: Portfolio[];
  balance: number;
  prices: Prices | null;
  menuOppened: boolean;
  view: View;
};

export enum ActionTypes {
  addAsset,
  setAvailableCurrencies,
  addPortfolio,
  removePortfolio,
  editPortfolio,
  editAsset,
  removeAsset,
  modifyAmount,
  setPrices,
  setBalance,
  setMenuOppened,
  setView,
}

export type Action = { type: ActionTypes; payload: any };
export type Dispatch = (action: Action) => void;

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.setAvailableCurrencies: {
      return { ...state, availableCurrencies: payload };
    }

    case ActionTypes.setMenuOppened: {
      return { ...state, menuOppened: payload };
    }

    case ActionTypes.setView: {
      return { ...state, view: payload };
    }

    case ActionTypes.setPrices: {
      return { ...state, prices: payload };
    }

    case ActionTypes.setBalance: {
      return { ...state, balance: payload };
    }

    case ActionTypes.editAsset: {
      const newPortfolios = [...state.portfolios];
      const currentPortoflio: Portfolio = newPortfolios.filter(
        (portfolio) => portfolio.uuid === payload.portfolioUuid
      )[0];

      const index = currentPortoflio.assets.indexOf(payload.asset as Asset);
      if (index !== -1) {
        currentPortoflio.assets[index].amount = Number.parseFloat(
          payload.value
        );
      }

      return { ...state, portfolios: [...newPortfolios] };
    }

    case ActionTypes.addAsset: {
      const newPortfolios = [...state.portfolios];
      const currentPortoflio: Portfolio = newPortfolios.filter(
        (portfolio) => portfolio.uuid === payload.uuid
      )[0];

      currentPortoflio.assets.push(payload.asset);

      return { ...state, portfolios: [...newPortfolios] };
    }

    case ActionTypes.addPortfolio: {
      return { ...state, portfolios: [...state.portfolios, payload] };
    }

    case ActionTypes.removePortfolio: {
      const newPortfolios = [...state.portfolios];

      const index = newPortfolios.indexOf(payload as Portfolio);
      if (index !== -1) {
        newPortfolios.splice(index, 1);
      }

      return { ...state, portfolios: [...newPortfolios] };
    }

    case ActionTypes.editPortfolio: {
      const newPortfolios = [...state.portfolios];
      const currentPortoflio: Portfolio = newPortfolios.filter(
        (portfolio) => portfolio.uuid === payload.uuid
      )[0];

      const index = newPortfolios.indexOf(currentPortoflio as Portfolio);
      if (index !== -1) {
        newPortfolios[index] = payload;
      }

      return { ...state, portfolios: [...newPortfolios] };
    }

    case ActionTypes.removeAsset: {
      const newPortfolios = [...state.portfolios];
      const currentPortoflio: Portfolio = newPortfolios.filter(
        (portfolio) => portfolio.uuid === payload.portfolioUuid
      )[0];

      const index = currentPortoflio.assets.indexOf(payload.asset as Asset);
      if (index !== -1) {
        currentPortoflio.assets.splice(index, 1);
      }

      return { ...state, portfolios: [...newPortfolios] };
    }

    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

export default reducer;
