import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/system";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#08415c",
  //     light: "#174c66",
  //     dark: "#052D40",
  //   },
  //   secondary: {
  //     main: "#e55934",
  //     light: "#E86B4A",
  //     dark: "#cc472a",
  //   },
  //   background: {
  //     default: "#08415c",
  //     paper: "#08415C",
  //   },
  //   text: {
  //     primary: "#eadcd7",
  //     secondary: "#d3ae94",
  //     disabled: "#b47a4f",
  //   },
  //   warning: {
  //     main: "#f39b2d",
  //     light: "#fb893c",
  //     dark: "#AA6C1F",
  //   },
  //   info: {
  //     main: "#5BC0EB",
  //     light: "#7bccef",
  //     dark: "#4BB5E7",
  //   },
  //   dandelion: {
  //     main: "#FDE74C",
  //   },
  // },
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
    dandelion: {
      main: "#FDE74C",
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
    },
  },
});

export default theme;

/*
variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: `var(--variant-containedColor)`,
            backgroundColor: `var(--variant-containedBg)`,
            boxShadow: (theme.vars || theme).shadows[2],
            '&:hover': {
              boxShadow: (theme.vars || theme).shadows[4],
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                boxShadow: (theme.vars || theme).shadows[2],
              },
            },
            '&:active': {
              boxShadow: (theme.vars || theme).shadows[8],
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: (theme.vars || theme).shadows[6],
            },
            [`&.${buttonClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
              boxShadow: (theme.vars || theme).shadows[0],
              backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            padding: '5px 15px',
            border: '1px solid currentColor',
            borderColor: `var(--variant-outlinedBorder, currentColor)`,
            backgroundColor: `var(--variant-outlinedBg)`,
            color: `var(--variant-outlinedColor)`,
            [`&.${buttonClasses.disabled}`]: {
              border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
          },
        },
        {
          props: { variant: 'text' },
          style: {
            padding: '6px 8px',
            color: `var(--variant-textColor)`,
            backgroundColor: `var(--variant-textBg)`,
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color },
            style: {
              '--variant-textColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedColor': (theme.vars || theme).palette[color].main,
              '--variant-outlinedBorder': theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / 0.5)`
                : alpha(theme.palette[color].main, 0.5),
              '--variant-containedColor': (theme.vars || theme).palette[color].contrastText,
              '--variant-containedBg': (theme.vars || theme).palette[color].main,
              '@media (hover: hover)': {
                '&:hover': {
                  '--variant-containedBg': (theme.vars || theme).palette[color].dark,
                  '--variant-textBg': theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                  '--variant-outlinedBorder': (theme.vars || theme).palette[color].main,
                  '--variant-outlinedBg': theme.vars
                    ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                    : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
                },
              },
            },
          })),
        {
          props: {
            color: 'inherit',
          },
          style: {
            color: 'inherit',
            borderColor: 'currentColor',
            '--variant-containedBg': theme.vars
              ? theme.vars.palette.Button.inheritContainedBg
              : inheritContainedBackgroundColor,
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': theme.vars
                  ? theme.vars.palette.Button.inheritContainedHoverBg
                  : inheritContainedHoverBackgroundColor,
                '--variant-textBg': theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
                '--variant-outlinedBg': theme.vars
                  ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})`
                  : alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
              },
            },
          },
        },
        {
          props: {
            size: 'small',
            variant: 'text',
          },
          style: {
            padding: '4px 5px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'text',
          },
          style: {
            padding: '8px 11px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'outlined',
          },
          style: {
            padding: '3px 9px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'outlined',
          },
          style: {
            padding: '7px 21px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            size: 'small',
            variant: 'contained',
          },
          style: {
            padding: '4px 10px',
            fontSize: theme.typography.pxToRem(13),
          },
        },
        {
          props: {
            size: 'large',
            variant: 'contained',
          },
          style: {
            padding: '8px 22px',
            fontSize: theme.typography.pxToRem(15),
          },
        },
        {
          props: {
            disableElevation: true,
          },
          style: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.focusVisible}`]: {
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
            },
            [`&.${buttonClasses.disabled}`]: {
              boxShadow: 'none',
            },
          },
        },
        {
          props: { fullWidth: true },
          style: { width: '100%' },
        },
        {
          props: {
            loadingPosition: 'center',
          },
          style: {
            transition: theme.transitions.create(
              ['background-color', 'box-shadow', 'border-color'],
              {
                duration: theme.transitions.duration.short,
              },
            ),
            [`&.${buttonClasses.loading}`]: {
              color: 'transparent',
            },
          },
        },
      ],
*/
