import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import cryptoContext from "../../context/crypto-context";
import AppLogo from "./logo.png";
import styled from "styled-components";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appName: {
      display: "block",
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    toolbar: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function Header() {
  const dispatch = cryptoContext.useCryptoDispatch();
  const { menuOppened } = cryptoContext.useCryptoState();
  const classes = useStyles();

  const handleDrawerOpen = () => {
    dispatch({ type: ActionTypes.setMenuOppened, payload: true });
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: menuOppened,
      })}
    >
      <Toolbar>
        <ToolbarContent>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: menuOppened,
            })}
          >
            <MenuIcon />
          </IconButton>
          <LeftContainer>
            <AppLogoContainer alt="mein-wallet Logo " src={AppLogo} />
            <Typography
              className={clsx(classes.appName, {
                [classes.hide]: menuOppened,
              })}
              variant="h6"
            >
              mein-wallet
            </Typography>
          </LeftContainer>
        </ToolbarContent>
      </Toolbar>
    </AppBar>
  );
}

export const AppLogoContainer = styled.img`
  height: 40px;
  display: block;
  margin-right: 10px;
`;

const ToolbarContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const LeftContainer = styled.div`
  margin-top: 4px;
  display: flex;

  h6 {
    line-height: 40px;
  }
`;
