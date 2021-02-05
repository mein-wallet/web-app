import { FormattedMessage } from "react-intl";
import MyAddresses from "../myAddresses/MyAddresses";
import { Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "calc(100vh - 112px)",
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      color: "white",
      padding: 24,
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
  })
);

export default function Donate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h2" component="h1">
        <FormattedMessage id="donate_title" />
      </Typography>
      <Typography gutterBottom variant="h4" component="h4">
        <FormattedMessage id="donate_description_1" />
      </Typography>
      <Typography gutterBottom component="p">
        <FormattedMessage id="donate_description_2" />
      </Typography>
      <Typography gutterBottom component="p">
        <FormattedMessage id="donate_description_3" />
      </Typography>
      <Typography gutterBottom component="p">
        <FormattedMessage id="donate_description_4" />
      </Typography>
      <Typography gutterBottom component="p">
        <FormattedMessage id="free_to_use" />
      </Typography>
      <MyAddresses />
    </div>
  );
}
