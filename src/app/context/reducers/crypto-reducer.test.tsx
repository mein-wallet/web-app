import reducer, { ActionTypes, State } from "./crypto-reducer";
import prices from "../../../tests/prices-mock";
import portfolios from "../../../tests/portfolios-mock";
import currencies from "../../../tests/currencies-mock";
import assets from "../../../tests/assets-mock";
import { getTotalBalance } from "../../helpers/convertions";
import { Asset } from "../../models/asset";
import { Portfolio } from "../../models/portfolio";

describe("Crypto Reducer", () => {
  let state: State;

  beforeEach(() => {
    const portfolioToSet = [...portfolios];
    const pricesToSet = { ...prices };

    state = {
      availableCurrencies: [],
      portfolios: portfolioToSet,
      balance: getTotalBalance("eur", pricesToSet, portfolioToSet[0].assets),
      prices: null,
      menuOppened: false,
      view: "dashboard",
    };
  });

  test("addAsset action works", () => {
    const newAsset: Asset = {
      currency: { id: "ethereum-gold", symbol: "etg", name: "Ethereum Gold" },
      amount: 100,
    };
    state = reducer(state, {
      type: ActionTypes.addAsset,
      payload: { uuid: portfolios[0].uuid, asset: newAsset },
    });
    expect(state.portfolios[0].assets.includes(newAsset)).toBeTruthy();
  });

  test("addPortfolio action works", () => {
    const newPortfolio: Portfolio = {
      uuid: "1232-dasd-21331-4weqeqw-eeqed",
      name: "Test 2 Portfolio",
      exchange: "usd",
      assets: assets,
    };

    state = reducer(state, {
      type: ActionTypes.addPortfolio,
      payload: newPortfolio,
    });

    expect(state.portfolios.includes(newPortfolio)).toBeTruthy();
  });

  test("editAsset action works", () => {
    const editedAsset: Asset = assets[0];
    const newAmount = 1034123;
    state = reducer(state, {
      type: ActionTypes.editAsset,
      payload: {
        portfolioUuid: portfolios[0].uuid,
        asset: editedAsset,
        value: newAmount,
      },
    });
    expect(state.portfolios[0].assets[0].amount).toEqual(newAmount);
  });

  test("editPortfolio action works", () => {
    const editedPortfolio = { ...portfolios[0] };
    const newName = "new portfolio name";
    editedPortfolio.name = newName;

    state = reducer(state, {
      type: ActionTypes.editPortfolio,
      payload: editedPortfolio,
    });
    expect(state.portfolios[0].name).toEqual(newName);
  });

  test("removeAsset action works", () => {
    const assetToRemove = portfolios[0].assets[0];
    expect(state.portfolios[0].assets.includes(assetToRemove)).toBeTruthy();
    state = reducer(state, {
      type: ActionTypes.removeAsset,
      payload: {
        asset: assetToRemove,
        portfolioUuid: portfolios[0].uuid,
      },
    });
    expect(state.portfolios[0].assets.includes(assetToRemove)).toBeFalsy();
  });

  test("removePortfolio action works", () => {
    state = reducer(state, {
      type: ActionTypes.removePortfolio,
      payload: portfolios[0],
    });
    expect(state.portfolios.length).toEqual(0);
  });

  test("setAvailableCurrencies action works", () => {
    state = reducer(state, {
      type: ActionTypes.setAvailableCurrencies,
      payload: currencies,
    });
    expect(state.availableCurrencies).toEqual(currencies);
  });

  test("setBalance action works", () => {
    const newBalance = 2131.123;
    state = reducer(state, {
      type: ActionTypes.setBalance,
      payload: newBalance,
    });
    expect(state.balance).toEqual(newBalance);
  });

  test("setMenuOppened action works", () => {
    state = reducer(state, {
      type: ActionTypes.setMenuOppened,
      payload: true,
    });
    expect(state.menuOppened).toEqual(true);
  });

  test("setPrices action works", () => {
    state = reducer(state, {
      type: ActionTypes.setPrices,
      payload: prices,
    });
    expect(state.prices).toEqual(prices);
  });

  test("setView action works", () => {
    const newView = "settings";
    state = reducer(state, {
      type: ActionTypes.setView,
      payload: newView,
    });
    expect(state.view).toEqual(newView);
  });

  test("does not allow invalid action and throw an error", () => {
    const invalidAction = () => {
      reducer(state, {
        type: "i dont exists" as any,
        payload: "",
      });
    };
    expect(invalidAction).toThrowError("Unhandled action type");
  });
});
