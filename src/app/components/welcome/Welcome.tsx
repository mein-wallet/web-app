import { FormattedMessage } from "react-intl";
import settingsContext from "../../context/settings-context";
import { ActionTypes } from "../../context/reducers/settings-reducer";
import styled from "styled-components";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    card: {
      marginTop: 80,
      maxWidth: 600,
      textAlign: "center",
    },
  })
);

export default function Welcome() {
  const dispatch = settingsContext.useSettingsDispatch();
  const classes = useStyles();

  function onStart() {
    dispatch({ type: ActionTypes.setWelcome, payload: false });
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={0}
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h2" component="h1">
              <FormattedMessage id="welcome" />
            </Typography>
            <Typography variant="h5" component="h3">
              <FormattedMessage id="welcome_description" />
            </Typography>
            <Typography component="p">
              <FormattedMessage id="why_mein_wallet" />
            </Typography>
            <Typography component="p">
              <FormattedMessage id="why_mein_wallet_2" />
            </Typography>
            <Typography variant="h5" component="h3">
              <FormattedMessage id="why_mein_wallet_3" />
            </Typography>
            <Typography component="p">
              <FormattedMessage id="free_to_use" />
            </Typography>
          </CardContent>
          <CardActions>
            <SubmitContainer>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => onStart()}
              >
                <FormattedMessage id="start" />
              </Button>
            </SubmitContainer>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

const SubmitContainer = styled.div`
  width: 100%;
  text-align: center;
`;
