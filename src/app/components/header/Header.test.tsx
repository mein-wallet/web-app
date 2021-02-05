import React, { Dispatch } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Header, { LeftContainer, AppLogoContainer } from "./Header";
import cryptoContext, {
  defaultState as CryptoDefaultState,
} from "../../context/crypto-context";
import { State as CryptoState } from "../../context/reducers/crypto-reducer";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Action, ActionTypes } from "../../context/reducers/crypto-reducer";

let mockUseCryptoState: () => CryptoState;
let mockUseCryptoDispatch: () => Dispatch<Action>;

const setupComponent = (): ShallowWrapper => {
  mockUseCryptoState = jest.fn().mockReturnValue({ ...CryptoDefaultState });
  mockUseCryptoDispatch = jest.fn().mockReturnValue(jest.fn());

  cryptoContext.useCryptoState = mockUseCryptoState;
  cryptoContext.useCryptoDispatch = mockUseCryptoDispatch;
  return shallow(<Header />);
};

describe("<Header />", () => {
  it("is an AppBar", () => {
    const wrapper = setupComponent();
    expect(wrapper.is(AppBar)).toBeTruthy();
  });

  it("renders one Toolbar components", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Toolbar).length).toEqual(1);
  });

  it("renders one LeftContainer components", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(LeftContainer).length).toEqual(1);
  });

  it("renders one AppLogoContainer components", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(AppLogoContainer).length).toEqual(1);
  });

  it("trigger an action 'setMenuOppened' to open the menu when the drawer is clicked", () => {
    const wrapper = setupComponent();

    const button = wrapper.find(IconButton);
    button.simulate("click");

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.setMenuOppened,
      payload: true,
    });
  });
});
