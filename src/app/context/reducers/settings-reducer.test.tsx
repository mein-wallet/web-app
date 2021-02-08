import reducer, { ActionTypes, State } from "./settings-reducer";
import portfoliosMock from "../../../tests/portfolios-mock";

describe("Settings Reducer", () => {
  let state: State;

  beforeEach(() => {
    state = {
      locale: "en",
      exchange: "eur",
      welcome: false,
      autosave: true,
    };
  });

  test("setAutosave action works", () => {
    state = reducer(state, {
      type: ActionTypes.setAutosave,
      payload: false,
    });
    expect(state.autosave).toEqual(false);
  });

  test("setExchange action works", () => {
    const newExchange = "eur";
    state = reducer(state, {
      type: ActionTypes.setExchange,
      payload: newExchange,
    });
    expect(state.exchange).toEqual(newExchange);
  });

  test("setLocale action works", () => {
    const newLocale = "es";
    state = reducer(state, {
      type: ActionTypes.setLocale,
      payload: newLocale,
    });
    expect(state.locale).toEqual(newLocale);
  });

  test("setWelcome action works", () => {
    state = reducer(state, {
      type: ActionTypes.setWelcome,
      payload: false,
    });
    expect(state.welcome).toEqual(false);
  });

  test("setDefaultPortfolio action works", () => {
    const portfolio = portfoliosMock[0];
    state = reducer(state, {
      type: ActionTypes.setDefaultPortfolio,
      payload: portfolio.uuid,
    });
    expect(state.defaultPortfolio).toEqual(portfolio.uuid);
  });

  test("removeDefaultPortfolio action works", () => {
    const portfolio = portfoliosMock[0];
    state = reducer(state, {
      type: ActionTypes.setDefaultPortfolio,
      payload: portfolio.uuid,
    });

    state = reducer(state, {
      type: ActionTypes.removeDefaultPortfolio,
      payload: null,
    });

    expect(state.defaultPortfolio).toBeUndefined();
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
