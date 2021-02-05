import React, { Dispatch } from "react";
import { mount, ReactWrapper } from "enzyme";
import AssetsTable, { Props } from "./AssetsTable";
import englishMessages from "../../translations/messages/en_US.json";
import { IntlProvider } from "react-intl";
import THEME from "../../../tests/theme-mock";
import { MuiThemeProvider } from "@material-ui/core/styles";
import cryptoContext from "../../context/crypto-context";
import { State as CryptoState } from "../../context/reducers/crypto-reducer";
import assets from "../../../tests/assets-mock";
import prices from "../../../tests/prices-mock";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { Action, ActionTypes } from "../../context/reducers/crypto-reducer";
import { Prices } from "../../models/prices";

let mockUseCryptoState: () => CryptoState;
let mockUseCryptoDispatch: () => Dispatch<Action>;

const defaultProps: Props = {
  assets,
  prices: prices,
  portfolioUuid: "213431412-14332312-43523131",
  exchange: "eur",
};

const setupComponent = (forcedPrices: Prices | null = prices): ReactWrapper => {
  mockUseCryptoDispatch = jest.fn().mockReturnValue(jest.fn());
  cryptoContext.useCryptoState = mockUseCryptoState;
  cryptoContext.useCryptoDispatch = mockUseCryptoDispatch;

  const props = { ...defaultProps, prices: forcedPrices };
  return mount(
    <MuiThemeProvider theme={THEME}>
      <IntlProvider locale={"en"} messages={englishMessages}>
        <AssetsTable {...props} />
      </IntlProvider>
    </MuiThemeProvider>
  );
};

describe("<AssetsTable />", () => {
  it("renders a Table", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(Table).length).toEqual(1);
  });

  it("has in the TableHead 5 TableCells", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(TableHead).find(TableCell).length).toEqual(5);
  });

  it("has in the TableBody, many TableRow like the number of assets passed in the props", () => {
    const wrapper = setupComponent();
    expect(wrapper.find(TableBody).find(TableRow).length).toEqual(
      assets.length
    );
  });

  it("trigger the remove function when you click the remove asset button", () => {
    const wrapper = setupComponent();

    const button = wrapper.find({ "data-test-id": "remove-asset" }).at(0);
    button.simulate("click");

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.removeAsset,
      payload: {
        portfolioUuid: defaultProps.portfolioUuid,
        asset: defaultProps.assets[0],
      },
    });
  });

  it("trigger the editAsset function when you change the amount of an asset", () => {
    const wrapper = setupComponent();
    const value = 1234;
    const input = wrapper
      .find({ "data-test-id": "change-asset-amount" })
      .at(0)
      .find("input");
    const event = {
      preventDefault() {},
      target: { value },
    };

    input.simulate("change", event);

    expect(mockUseCryptoDispatch()).toHaveBeenCalledWith({
      type: ActionTypes.editAsset,
      payload: {
        portfolioUuid: defaultProps.portfolioUuid,
        asset: defaultProps.assets[0],
        value,
      },
    });
  });

  it("renders ? when prices are null", () => {
    const wrapper = setupComponent(null);
    expect(wrapper.text()).toContain("?");
  });
});
