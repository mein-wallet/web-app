import React, { Dispatch } from "react";
import { mount, ReactWrapper } from "enzyme";
import Welcome from "./Welcome";
import englishMessages from "../../translations/messages/en_US.json";
import { IntlProvider } from "react-intl";
import THEME from "../../../tests/theme-mock";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import settingsContext from "../../context/settings-context";
import { Action, ActionTypes } from "../../context/reducers/settings-reducer";

let mockUseSettingsDispatch: () => Dispatch<Action>;

const setupComponent = (): ReactWrapper => {
  mockUseSettingsDispatch = jest.fn().mockReturnValue(jest.fn());
  settingsContext.useSettingsDispatch = mockUseSettingsDispatch;

  return mount(
    <MuiThemeProvider theme={THEME}>
      <IntlProvider locale={"en"} messages={englishMessages}>
        <Welcome />
      </IntlProvider>
    </MuiThemeProvider>
  );
};

describe("<Welcome />", () => {
  it("renders the welcome title", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.welcome);
  });

  it("renders the welcome subtitle", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.welcome_description);
  });

  it("renders the why reasons", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.why_mein_wallet);
    expect(wrapper.text()).toContain(englishMessages.why_mein_wallet_2);
    expect(wrapper.text()).toContain(englishMessages.why_mein_wallet_3);
  });

  it("renders the free of use message", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.free_to_use);
  });

  it("renders a button component", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Button).length).toEqual(1);
  });

  it("trigger the action setWelcome and disable the welcome screen on button click", () => {
    const wrapper = setupComponent();
    const button = wrapper.find(Button);
    button.simulate("click");

    expect(mockUseSettingsDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.setWelcome,
      payload: false,
    });
  });
});
