import { VictoryPie, VictoryTheme } from "victory";
import React from "react";
import { getTotalBalance } from "../../helpers/convertions";
import { Asset } from "../../models/asset";
import { Prices } from "../../models/prices";
import { Exchange } from "../../models/exchange";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styled from "styled-components";
import settingContext from "../../context/settings-context";
import { buildDataForChart } from "../../helpers/chart";
import { ChartData } from "../../models/chart-data";
import { Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
type Props = {
  assets: Asset[];
  prices: Prices;
  exchange: Exchange;
};

export default function Chart({ assets, prices, exchange }: Props) {
  const [data, setData] = React.useState<ChartData[]>([] as ChartData[]);
  const [selectedAsset, setSelectedAsset] = React.useState<ChartData | null>(
    null
  );

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const { balanceHidden } = settingContext.useSettingsState();

  React.useEffect(() => {
    const total = getTotalBalance(exchange, prices, assets);

    if (prices !== null) {
      const dataToSet = assets.map((asset: Asset) => {
        return buildDataForChart(asset, prices, total, exchange);
      });

      setData(dataToSet);
    }
  }, [assets, prices, exchange]);

  return (
    <PieContainer>
      <Grid
        md={12}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={7} md={8}>
          <VictoryPie
            theme={VictoryTheme.material}
            labelRadius={isSmall && selectedAsset !== null ? 90 : 138}
            innerRadius={20}
            data={data}
            height={isSmall && selectedAsset !== null ? 250 : 350}
            animate={{
              duration: 2000,
            }}
            style={{
              labels: {
                fill: "white",
              },
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: ({ datum }) => {
                          setSelectedAsset(datum);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </Grid>
        {selectedAsset && (
          <Grid item xs={12} md={4}>
            <AssetDataContainer>
              <CloseIconContainer>
                <CloseIcon onClick={() => setSelectedAsset(null)} />
              </CloseIconContainer>
              <Typography variant="h4" component="h4">
                {selectedAsset.name}
              </Typography>
              <Typography component="p">
                <strong>Price: </strong> {selectedAsset.price}
              </Typography>
              <Typography component="p">
                <strong>Percentage: </strong> {selectedAsset.percentage}
              </Typography>
              <Typography component="p">
                <strong>
                  Amount: {balanceHidden ? "#####" : selectedAsset.amount}
                </strong>
              </Typography>

              <Typography component="p">
                <strong>Total: </strong>
                {balanceHidden ? "#####" : selectedAsset.total}{" "}
              </Typography>
            </AssetDataContainer>
          </Grid>
        )}
      </Grid>
    </PieContainer>
  );
}

const PieContainer = styled.div`
  height: calc(100vh - 224px);
`;

const AssetDataContainer = styled.div`
  background-color: #212121;
  position: relative;
  padding: 16px;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;
