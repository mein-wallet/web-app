import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Balance, { Props } from "./Balance";
import { Exchange } from "../../models/exchange";
import THEME from "../../../tests/theme-mock";
import { MuiThemeProvider } from "@material-ui/core/styles";

const defaultProps: Props = {
  balance: 101.2323,
  exchange: "usd",
};

const setupComponent = (
  balance: number | null = defaultProps.balance,
  exchange: Exchange = defaultProps.exchange
): ReactWrapper => {
  const props = { ...defaultProps, exchange, balance };
  return mount(
    <MuiThemeProvider theme={THEME}>
      <Balance {...props} />
    </MuiThemeProvider>
  );
};

describe("<Balance />", () => {
  it("renders Loading... when balance is null", () => {
    const wrapper = setupComponent(null);
    expect(wrapper.text()).toContain("Loading...");
  });

  it("renders the balance passed in parameters", () => {
    const wrapper = setupComponent();
    wrapper.update();
    setTimeout(() => {
      expect(wrapper.text()).toContain(defaultProps.balance);
    }, 300);
  });

  it("renders at the begining 0", () => {
    const wrapper = setupComponent();
    wrapper.update();
    expect(wrapper.text()).toContain(0);
  });

  it("renders the exchange currency passed in parameters", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(defaultProps.exchange.toUpperCase());
  });
});
