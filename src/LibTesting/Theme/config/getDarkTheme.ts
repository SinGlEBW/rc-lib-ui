import type { ThemeOptions, Theme } from "@mui/material";
import {
  grey,
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  pink,
  orange,
  red,
  yellow,
  purple,
  lime,
  teal,
} from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";

export const getDarkTheme = (theme: Theme) => {
  return {
    scrollConfig: {
      color: indigo[400]
    },
    palette: {
      mode: "dark",
      background: {
        paper:  grey[900] ,
        default: '#2F2F2F',//blueGrey[900],
        // default:  grey[900] ,
        // paper: '#2F2F2F'//blueGrey[900],
      },

      text: {
        primary: "#fff",
        secondary: "#9457EB",
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: ({ theme, ...props }) => {
            return {
              "& .MuiOutlinedInput-notchedOutline": {
                // color:  theme.palette.grey[500],
                borderColor: grey[700],
              },
              "& .MuiSelect-icon": {
                color: grey[400],
              },
            };
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: grey[400],
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: grey[400],
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            // backgroundColor: '#1b1d21'
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#21252a",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            ":disabled": {
              color: "rgba(255,255,255, 0.7)",
            },
          },
        },
      },
      // MuiToolbar: {
      //   styleOverrides: {
      //     root: {
      //       // backgroundColor: '#121212'
      //     }
      //   }
      // },
    },
  } as ThemeOptions;
};
