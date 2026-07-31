import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d63384",
    },
    secondary: {
      main: "#f8d7e8",
    },
    background: {
      default: "#fff8fb",
    },
  },

  typography: {
    fontFamily: "Poppins",

    h2: {
      fontFamily: "Playfair Display",
      fontWeight: 700,
    },

    h3: {
      fontFamily: "Playfair Display",
      fontWeight: 700,
    },

    h4: {
      fontFamily: "Playfair Display",
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 16,
  },
});

export default theme;