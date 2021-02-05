import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Donate from "./Donate";
import MyAddresses from "../myAddresses/MyAddresses";
import englishMessages from "../../translations/messages/en_US.json";
import { IntlProvider } from "react-intl";
import THEME from "../../../tests/themeMock";
import { MuiThemeProvider } from "@material-ui/core/styles";

const setupComponent = (): ReactWrapper => {
  return mount(
    <MuiThemeProvider theme={THEME}>
      <IntlProvider locale={"en"} messages={englishMessages}>
        <Donate />
      </IntlProvider>
    </MuiThemeProvider>
  );
};

describe("<Donate />", () => {
  it("renders the donate title", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.donate_title);
  });

  it("renders the donate subtitle", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.donate_description_1);
  });

  it("renders the donate description", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.donate_description_2);
    expect(wrapper.text()).toContain(englishMessages.donate_description_3);
    expect(wrapper.text()).toContain(englishMessages.donate_description_4);
  });

  it("renders the free of use message", () => {
    const wrapper = setupComponent();
    expect(wrapper.text()).toContain(englishMessages.free_to_use);
  });

  it("renders MyAddresses component", () => {
    const wrapper = setupComponent();
    wrapper.update();
    expect(wrapper.find(MyAddresses).length).toEqual(1);
  });
});
