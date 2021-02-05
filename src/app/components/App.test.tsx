import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import App from "./App";
import Header from "../components/header/Header";
import Menu from "../components/menu/Menu";
import settingsContext, {
  defaultState as SettingsDefaultState,
} from "../context/settings-context";
import { State as SettingsState } from "../context/reducers/settings-reducer";
import cryptoContext, {
  defaultState as CryptoDefaultState,
} from "../context/crypto-context";
import { State as CryptoState } from "../context/reducers/crypto-reducer";
import Welcome from "./welcome/Welcome";
import AppViewport from "./appViewport/AppViewport";

let mockUseSettingsState: () => SettingsState;
let mockUseCryptoState: () => CryptoState;
let mockUseCryptoDispatch = jest.fn();

const setupComponent = (welcome: boolean = true): ShallowWrapper => {
  mockUseSettingsState = jest
    .fn()
    .mockReturnValue({ ...SettingsDefaultState, welcome });
  mockUseCryptoState = jest.fn().mockReturnValue({ ...CryptoDefaultState });
  settingsContext.useSettingsState = mockUseSettingsState;
  cryptoContext.useCryptoState = mockUseCryptoState;
  cryptoContext.useCryptoDispatch = mockUseCryptoDispatch;
  return shallow(<App />);
};

describe("<App />", () => {
  it("renders a Header components", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Header).length).toEqual(1);
  });

  it("renders a Menu components", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Menu).length).toEqual(1);
  });

  it("renders a Welcome component when welcome state is true", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Welcome).length).toEqual(1);
  });

  it("renders a AppViewport component when welcome state is false", () => {
    const wrapper = setupComponent(false);
    expect(wrapper.find(AppViewport).length).toEqual(1);
  });
});
