import React, { Dispatch } from "react";
import { mount, ReactWrapper } from "enzyme";
import AppViewport from "./AppViewport";
import englishMessages from "../../translations/messages/en_US.json";
import { IntlProvider } from "react-intl";
import THEME from "../../../tests/theme-mock";
import { MuiThemeProvider } from "@material-ui/core/styles";
import cryptoContext, {
  defaultState as CryptoDefaultState,
} from "../../context/crypto-context";
import { State as CryptoState } from "../../context/reducers/crypto-reducer";
import Portfolios from "../portfolios/Portfolios";
import Donate from "../donate/Donate";
import Settings from "../settings/Settings";
import { View } from "../../models/view";
import { State as SettingsState } from "../../context/reducers/settings-reducer";
import settingsContext, {
  defaultState as SettingsDefaultState,
} from "../../context/settings-context";

let mockUseCryptoState: () => CryptoState;
let mockUseCryptoDispatch = jest.fn();
let mockUseSettingsState: () => SettingsState;
let mockUseSettingsDispatch = jest.fn();

const setupComponent = (view?: View): ReactWrapper => {
  mockUseCryptoState = jest
    .fn()
    .mockReturnValue({ ...CryptoDefaultState, view });
  cryptoContext.useCryptoState = mockUseCryptoState;
  cryptoContext.useCryptoDispatch = mockUseCryptoDispatch;
  mockUseSettingsState = jest.fn().mockReturnValue({ ...SettingsDefaultState });
  settingsContext.useSettingsState = mockUseSettingsState;
  settingsContext.useSettingsDispatch = mockUseSettingsDispatch;

  return mount(
    <MuiThemeProvider theme={THEME}>
      <IntlProvider locale={"en"} messages={englishMessages}>
        <AppViewport />
      </IntlProvider>
    </MuiThemeProvider>
  );
};

describe("<AppViewport />", () => {
  it("renders a main tag", () => {
    const wrapper = setupComponent();
    expect(wrapper.find("main")).toBeDefined();
  });

  it("renders Portfolios view the view is set to dashboard", () => {
    const wrapper = setupComponent("dashboard");
    expect(wrapper.find(Portfolios).length).toEqual(1);
  });

  it("renders Settings view the view is set to settings", () => {
    const wrapper = setupComponent("settings");
    expect(wrapper.find(Settings).length).toEqual(1);
  });

  it("renders Donate view the view is set to donate", () => {
    const wrapper = setupComponent("donate");
    expect(wrapper.find(Donate).length).toEqual(1);
  });
});
