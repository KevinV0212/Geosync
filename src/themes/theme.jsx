import { createTheme } from "@mui/material";

const theme = createTheme({
   palette: {
      primary: {
         main: "#000000",
      },
      secondary: {
         main: "#690005",
         light: "#FFFFFF",
      },
      warning: {
         main: "#FFCC01",
      },
      white: {
         main: "#FFFFFF",
         light: "#FFFFFF",
         dark: "#D5D5D7",
         contrastText: "#FFFFFF",
      },
      lightGray: {
         main: "#D5D5D7",
         light: "#FFFFFF",
         dark: "#FFFFFF",
         contrastText: "#D5D5D7",
      },
   },
   breakpoints: {
      values: {
         xs: 0,
         sm: 320,
         md: 720,
         lg: 1000,
         xl: 1440,
      },
   },
   components: {},
});

export const navTheme = createTheme({
   palette: {
      ...theme.palette,
      text: "#fff",
   },
   breakpoints: {
      ...theme.breakpoints,
   },
   components: {
      MuiOutlinedInput: {
         styleOverrides: {
            notchedOutline: {
               borderColor: "#fff",
            },
         },
      },
   },
});

export const getDesignTokens = (mode) => ({
   palette: {
      mode,
      ...(mode === "light"
         ? {
              // palette values for light mode
              ...theme.palette,
              adornment: {
                 main: "#3F3F3F",
                 light: "#3F3F3F",
                 dark: "#3F3F3F",
                 constrast: "#3F3F3F",
              },
              background: {
                 default: "#FFFFFF",
                 paper: "#D5D5D7",
              },
              text: {
                 primary: "#3F3F3F",
              },
           }
         : {
              // palette values for dark mode
              ...theme.palette,
              secondary: {
                 main: "#fff",
              },
              adornment: {
                 main: "#FFFFFF",
                 light: "#FFFFFF",
                 dark: "#FFFFFF",
                 constrast: "#FFFFFF",
              },
              background: {
                 default: "#000000",
                 paper: "#3F3F3F",
              },
              text: {
                 primary: "#FFFFFF",
              },
           }),
   },
   components: {
      mode,
      ...(mode === "light"
         ? {
              ...theme.components,
           }
         : {
              ...theme.components,
              MuiOutlinedInput: {
                 styleOverrides: {
                    notchedOutline: {
                       borderColor: "#E1E1E1",
                    },
                 },
              },
              MuiFormLabel: {
                 styleOverrides: {
                    root: {
                       color: "#D5D5D7",
                    },
                 },
              },
              MuiFormHelperText: {
                 styleOverrides: {
                    root: {
                       color: "#D5D5D7",
                    },
                 },
              },
              // MuiButton: {
              //   styleOverrides: {
              //     root: {
              //       color: "#000",
              //     },
              //   },
              // },
           }),
   },
});

export default theme;
