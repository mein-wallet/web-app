import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Paper,
  TextField,
  FormHelperText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import cryptoContext from "../../context/crypto-context";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import { Exchange } from "../../models/exchange";
import { Portfolio } from "../../models/portfolio";
import { makeStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import settingsContext from "../../context/settings-context";

type Props = {
  portfolio: Portfolio;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 16,
    color: "white",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PortfolioEdit({ portfolio }: Props) {
  const classes = useStyles();
  const dispatch = cryptoContext.useCryptoDispatch();
  const [newPortfolio, setNewPortfolio] = React.useState(portfolio);
  const { autosave } = settingsContext.useSettingsState();

  function deletePortfolio() {
    dispatch({
      type: ActionTypes.removePortfolio,
      payload: portfolio,
    });
  }

  function savePortfolio() {
    dispatch({
      type: ActionTypes.editPortfolio,
      payload: newPortfolio,
    });
  }

  React.useEffect(() => {
    if (autosave) {
      dispatch({
        type: ActionTypes.editPortfolio,
        payload: newPortfolio,
      });
    }
  }, [dispatch, autosave, newPortfolio]);

  function changeName(name: string) {
    setNewPortfolio({ ...newPortfolio, name });
  }

  function changeCurrency(exchange: Exchange) {
    setNewPortfolio({ ...newPortfolio, exchange });
  }

  return (
    <PorfolioEditContainer>
      <Paper className={classes.root}>
        <FormattedMessage id="portfolio_name">
          {(msg) => (
            <TextField
              margin="dense"
              id="name"
              label={msg}
              type="text"
              fullWidth
              value={newPortfolio.name}
              onChange={(e) => changeName(e.target.value)}
            />
          )}
        </FormattedMessage>

        <FormHelperText>
          <FormattedMessage id="portfolio_change_name" />
        </FormHelperText>
        <FormControl>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            <FormattedMessage id="currency" />
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={newPortfolio.exchange}
            onChange={(e) => changeCurrency(e.target.value as Exchange)}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value={"btc"}>BTC</MenuItem>
            <MenuItem value={"eur"}>EUR</MenuItem>
            <MenuItem value={"usd"}>USD </MenuItem>
          </Select>
          <FormHelperText>
            <FormattedMessage id="currency_hint" />
          </FormHelperText>
        </FormControl>
      </Paper>
      <ButtonsContainer>
        <Button
          onClick={() => deletePortfolio()}
          color="secondary"
          variant="contained"
        >
          <FormattedMessage id="remove_porfolio" />
        </Button>
        {!autosave && (
          <Button
            onClick={() => savePortfolio()}
            color="primary"
            variant="contained"
          >
            <FormattedMessage id="save_porfolio" />
          </Button>
        )}
      </ButtonsContainer>
    </PorfolioEditContainer>
  );
}

const PorfolioEditContainer = styled.div`
  margin-bottom: 48;
  text-align: left;
`;

const ButtonsContainer = styled.div`
  margin: 16px 0;
  text-align: right;
  width: 100%;
  button {
    margin-left: 8px;
  }
`;
