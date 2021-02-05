import React, { Dispatch } from "react";
import { mount, ReactWrapper } from "enzyme";
import Menu from "./Menu";
import cryptoContext, {
  defaultState as CryptoDefaultState,
} from "../../context/crypto-context";
import { State as CryptoState } from "../../context/reducers/crypto-reducer";
import { Drawer, ListItem, IconButton } from "@material-ui/core";
import { Action, ActionTypes } from "../../context/reducers/crypto-reducer";
import { IntlProvider } from "react-intl";
import englishMessages from "../../translations/messages/en_US.json";

let mockUseCryptoState: () => CryptoState;
let mockUseCryptoDispatch: () => Dispatch<Action>;

const setupComponent = (): ReactWrapper => {
  mockUseCryptoState = jest.fn().mockReturnValue({ ...CryptoDefaultState });
  mockUseCryptoDispatch = jest.fn().mockReturnValue(jest.fn());

  cryptoContext.useCryptoState = mockUseCryptoState;
  cryptoContext.useCryptoDispatch = mockUseCryptoDispatch;
  return mount(
    <IntlProvider locale={"en"} messages={englishMessages}>
      <Menu />
    </IntlProvider>
  );
};

describe("<Menu />", () => {
  it("is an Drawer", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Drawer).length).toEqual(1);
  });

  it("renders 3 list items", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(ListItem).length).toEqual(3);
  });

  it("renders a dashboard item", () => {
    const wrapper = setupComponent();
    expect(
      wrapper.find({ "data-test-id": "dashboard" }).length
    ).toBeGreaterThan(0);
  });

  it("renders a settings item", () => {
    const wrapper = setupComponent();
    expect(wrapper.find({ "data-test-id": "settings" }).length).toBeGreaterThan(
      0
    );
  });

  it("renders a donate item", () => {
    const wrapper = setupComponent();
    expect(wrapper.find({ "data-test-id": "donate" }).length).toBeGreaterThan(
      0
    );
  });

  it("trigger an action 'setMenuOppened' to close the menu when the Chevron is clicked", () => {
    const wrapper = setupComponent();

    const button = wrapper.find(IconButton);
    button.simulate("click");

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.setMenuOppened,
      payload: false,
    });
  });

  it("trigger an action 'setView' when dashboard is clicked", () => {
    const wrapper = setupComponent();
    const button = wrapper.find(ListItem).at(0);
    button.simulate("click");

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.setView,
      payload: "dashboard",
    });
  });

  it("trigger an action 'setView' when settings is clicked", () => {
    const wrapper = setupComponent();
    const button = wrapper.find(ListItem).at(1);
    button.simulate("click");

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.setView,
      payload: "settings",
    });
  });

  it("trigger an action 'setView' when donate is clicked", () => {
    const wrapper = setupComponent();
    const button = wrapper.find(ListItem).at(2);
    button.simulate("click");

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.setView,
      payload: "donate",
    });
  });
});
