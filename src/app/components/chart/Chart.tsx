import { VictoryPie, VictoryTheme } from "victory";
import styled from "styled-components";
import React from "react";
import { getPercentage, getTotalBalance } from "../../helpers/convertions";
import { Asset } from "../../models/asset";
import { Prices } from "../../models/prices";
import { Exchange } from "../../models/exchange";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

type DataType = { x: string; y: number };

type Props = {
  assets: Asset[];
  prices: Prices;
  exchange: Exchange;
};

export default function Chart({ assets, prices, exchange }: Props) {
  const [data, setData] = React.useState<DataType[]>([] as DataType[]);
  const total = getTotalBalance(exchange, prices, assets);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

  React.useEffect(() => {
    if (prices !== null) {
      const dataToSet = assets.map((asset: Asset) => {
        const price =
          typeof prices[asset.currency.id] !== "undefined"
            ? prices[asset.currency.id][exchange]
            : 0;

        const assetValue = getPercentage(total, asset.amount * price);

        return {
          x: asset.currency.symbol.toUpperCase(),
          y: assetValue,
        } as DataType;
      });

      setData(dataToSet);
    }
  }, [assets, prices, exchange, total]);

  return (
    <PieContainer>
      <VictoryPie
        theme={VictoryTheme.material}
        labelRadius={isSmall ? 60 : 135}
        innerRadius={20}
        data={data}
        style={{
          labels: {
            fill: isSmall ? "black" : "white",
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
        animate={{
          duration: 2000,
        }}
      />
    </PieContainer>
  );
}

const PieContainer = styled.div`
  height: calc(100vh - 300px);
`;
