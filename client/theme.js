import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  typography: {
    useNextVariables: true,
  },
  palette: {
    primary: "#5c67a3",
    main: "#37f471",
    dark: "#2e355b",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ff79b0",
    main: "#ff4081",
    dark: "#c60055",
    contrastText: "#000",
  },
  openTitle: "#3f4771",
  protectedTitle: grey("500"),
  type: "light",
});

export default theme;
