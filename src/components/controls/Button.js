import React from "react";
import { Button as MuiButton, ThemeProvider } from "@mui/material";
import theme from "./Theme";

export default function Button(props) {
   const { text, size, color, variant, onClick, ...other } = props;

   return (
      <ThemeProvider theme={theme}>
         <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
         >
            {text}
         </MuiButton>
      </ThemeProvider>
   );
}
