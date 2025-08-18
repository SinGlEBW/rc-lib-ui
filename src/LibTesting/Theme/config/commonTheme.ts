
import { blueGrey, teal } from "@mui/material/colors/index.js";
import { alpha, createTheme, getContrastRatio } from "@mui/material/styles/index.js";


type NameColor_OR = "info" | "ochre" | "profile1" | "violet" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | "gray";
declare module "@mui/material/styles" {
  type B = { [key in NameColor_OR]: Palette["primary"] };
  interface Palette extends Partial<B> {}
  interface PaletteOptions extends Partial<B> {}
  interface BreakpointOverrides {
    xxs: true;
  }

  interface ScrollConfig_P {
    scrollConfig?: {
      color?: string;
    };
  }
  interface Theme extends ScrollConfig_P {}
  interface ThemeOptions extends ScrollConfig_P {}
  type ColorsPalette_OR = NameColor_OR;
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides extends Record<NameColor_OR, true> {}
  interface AppBarPropsColorOverrides extends Record<NameColor_OR, true> {}
}




// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     dashed: true;
//   }
// }

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

export const commonTheme = createTheme({
  
  breakpoints: {
    values: {
      xs: 0,
      xxs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
    secondary: {
      main: "#f50057",
    },
    ochre: {
      main: "#E3D026",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
    common: {
      black: "#1B1D21",
      white: "#ffffff",
    },
    profile1: {
      main: "#5869ce",
      contrastText: "#f50057",
      light: "#757ce8",
      dark: "#002884",
    },
    success: {
      main: teal[500],
      contrastText: "#f50058",
      light: teal[200],
      dark: teal[600],
    },
    gray: {
      main: blueGrey[500],
      contrastText: '#f50057',
      light: blueGrey[200],
      dark: blueGrey[700],
    }
  },

  components: {
    MuiButton: {
      // variants: [
      //   {
      //     props: { variant: 'dashed' },
      //     style: {
      //       textTransform: 'none',
      //       border: `2px dashed grey${blue[500]}`,
      //     },
      //   },
      // ]
    },
  },
});
