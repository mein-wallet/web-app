import React from "react";
import AnimatedNumber from "react-animated-number";
import { normalizePrice } from "../../helpers/convertions";
import { Exchange } from "../../models/exchange";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import settingContext from "../../context/settings-context";
import { ActionTypes } from "../../context/reducers/settings-reducer";

export type Props = {
  balance: number | null;
  exchange: Exchange;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: "pointer",
      fontSize: 64,
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: 40,
        margin: 16,
      },
    },
  })
);

export default function Balance({ balance, exchange }: Props) {
  const classes = useStyles();
  const { balanceHidden } = settingContext.useSettingsState();
  const dispatch = settingContext.useSettingsDispatch();

  function prettyValue(value: any) {
    return `${normalizePrice(value)} ${exchange.toUpperCase()}`;
  }

  function toggleBalanceHidden() {
    dispatch({
      type: ActionTypes.setBalanceHidden,
      payload: !balanceHidden,
    });
  }

  return (
    <Typography
      onClick={() => toggleBalanceHidden()}
      className={classes.root}
      variant="h1"
      component="h1"
    >
      {balance !== null ? (
        <AnimatedNumber
          component="span"
          value={balance}
          style={{
            transition: "0.8s ease-out",
            transitionProperty: "background-color, color, opacity",
          }}
          frameStyle={(perc: any) =>
            perc === 100 ? {} : { backgroundColor: "#424242" }
          }
          duration={300}
          formatValue={(n: any) =>
            !balanceHidden
              ? prettyValue(n)
              : `###.### ${exchange.toUpperCase()}`
          }
        />
      ) : (
        <div>Loading...</div>
      )}
    </Typography>
  );
}
