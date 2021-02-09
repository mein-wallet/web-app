import React from "react";
import {
  Drawer,
  IconButton,
  Divider,
  ListItem,
  ListItemIcon,
  List,
  ListItemText,
} from "@material-ui/core";
import {
  ChevronLeft as ChevronLeftIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  AttachMoney as DonateIcon,
} from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { ActionTypes } from "../../context/reducers/crypto-reducer";
import cryptoContext from "../../context/crypto-context";
import { FormattedMessage } from "react-intl";
import { View } from "../../models/view";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: 0,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

export default function Menu() {
  const dispatch = cryptoContext.useCryptoDispatch();
  const { menuOppened } = cryptoContext.useCryptoState();
  const classes = useStyles();

  const handleDrawerClose = () => {
    dispatch({ type: ActionTypes.setMenuOppened, payload: false });
  };

  const setView = (view: View) => {
    dispatch({ type: ActionTypes.setView, payload: view });
    dispatch({ type: ActionTypes.setMenuOppened, payload: false });
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: menuOppened,
        [classes.drawerClose]: !menuOppened,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: menuOppened,
          [classes.drawerClose]: !menuOppened,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          data-test-id="dashboard"
          onClick={() => setView("dashboard")}
          button
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="menu_dashboard" />
          </ListItemText>
        </ListItem>
        <ListItem
          data-test-id="settings"
          onClick={() => setView("settings")}
          button
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="menu_settings" />
          </ListItemText>
        </ListItem>
        <ListItem
          data-test-id="donate"
          onClick={() => setView("donate")}
          button
        >
          <ListItemIcon>
            <DonateIcon />
          </ListItemIcon>
          <ListItemText>
            <FormattedMessage id="menu_donate" />
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
