import React from "react";
import { mount, ReactWrapper } from "enzyme";
import MyAddresses, { CryptoList, CryptoItem } from "./MyAddresses";
import englishMessages from "../../translations/messages/en_US.json";
import { IntlProvider } from "react-intl";
import THEME from "../../../tests/theme-mock";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const setupComponent = (): ReactWrapper => {
  return mount(
    <MuiThemeProvider theme={THEME}>
      <IntlProvider locale={"en"} messages={englishMessages}>
        <MyAddresses />
      </IntlProvider>
    </MuiThemeProvider>
  );
};

describe("<Donate />", () => {
  it("renders the Addresses title", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.my_addresses);
  });

  it("renders a CryptoList", () => {
    const wrapper = setupComponent();
    wrapper.update();
    expect(wrapper.find(CryptoList).length).toEqual(1);
  });

  it("renders two CryptoItem", () => {
    const wrapper = setupComponent();
    wrapper.update();
    expect(wrapper.find(CryptoItem).length).toEqual(2);
  });

  it("render a copy button if the browser allows document.queryCommandSupported and trigger the copy", () => {
    const queryFunc = jest.fn().mockReturnValue(true);
    Object.defineProperty(global.document, "queryCommandSupported", {
      value: queryFunc,
    });

    const copyFunc = jest.fn().mockReturnValue(true);
    Object.defineProperty(global.document, "execCommand", {
      value: copyFunc,
    });

    const wrapper = setupComponent();
    const buttonBitcoin = wrapper.find(Button).at(0);
    buttonBitcoin.simulate("click");

    const buttonEthereum = wrapper.find(Button).at(1);
    buttonEthereum.simulate("click");

    wrapper.update();
    expect(wrapper.find(Button).length).toEqual(2);
    expect(copyFunc).toHaveBeenCalledTimes(2);
  });
});
