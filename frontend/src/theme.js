import { createTheme } from "@mui/material/styles";
// import { lighten, darken } from "@mui/system";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e55934",
      light: "#E86B4A",
      dark: "#cc472a",
    },
    secondary: {
      main: "#eadcd7",
      light: "#EEE3DF",
      dark: "#A39A96",
    },
    background: {
      default: "#08415c",
      paper: "#08415c",
    },
    text: {
      primary: "#eadcd7",
      secondary: "rgba(234,220,215,0.7)",
      disabled: "rgba(234,220,215,0.5)",
    },
    warning: {
      main: "#f39b2d",
      light: "#fb893c",
      dark: "#AA6C1F",
    },
    info: {
      main: "#5BC0EB",
      light: "#7bccef",
      dark: "#4BB5E7",
    },
    core: {
      main: {
        cobalt: {
          main: "#08415c",
          light: "#174C66",
        },
        trust_tan: {
          main: "#EADCD7",
        },
      },
      secondary: {
        cinnabar: {
          main: "#e55934",
          light: "#E86B4A",
          dark: "#cc472a",
        },
        ember: {
          main: "#f39b2d",
          light: "#fb893c",
          dark: "#AA6C1F",
        },
        dandelion: {
          main: "#FDE74C",
        },
        breeze: {
          main: "#5BC0EB",
          light: "#7bccef",
          dark: "#4BB5E7",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 20,
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 300,
    fontWeightBold: 500,
    letterSpacing: 0,
  },
  components: {
    // Override MUI Buttom component styles
    MuiButton: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                borderColor: "#121212",
               
              }
            }
          ]
        },
      },
    },
  },
});

/*

.MuiAccordionDetails-root .yearly_value_form:nth-child(even) .MuiStack-root {
    background-color: lightgrey;
}
*/

export default theme;
