import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const THEME = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f9d42f",
    },
    secondary: red,
  },
});

export default THEME;
