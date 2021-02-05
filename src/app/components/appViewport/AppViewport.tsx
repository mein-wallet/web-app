import React from "react";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import Portfolios from "../portfolios/Portfolios";
import Donate from "../donate/Donate";
import cryptoContext from "../../context/crypto-context";
import Settings from "../settings/Settings";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
    },
    root: {
      flexGrow: 1,
      minHeight: "100vh",
      backgroundColor: theme.palette.background.paper,
      color: "white",
    },
  })
);

export default function AppViewport() {
  const { view } = cryptoContext.useCryptoState();
  const classes = useStyles();

  return (
    <AppViewportContainer className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {view === "dashboard" && <Portfolios />}
        {view === "settings" && <Settings />}
        {view === "donate" && <Donate />}
      </main>
    </AppViewportContainer>
  );
}

const AppViewportContainer = styled.div`
  display: flex;
  width: 100%;
`;
