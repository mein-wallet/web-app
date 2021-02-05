import reducer, { ActionTypes, State } from "./settings-reducer";

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
