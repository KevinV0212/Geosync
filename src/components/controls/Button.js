import React from "react";
import { Button as MuiButton, ThemeProvider } from "@mui/material";
import theme from "../../themes/Theme";

export default function Button(props) {
   const { text, size, color, variant, onClick, ...other } = props;

   return (
      <MuiButton
         variant={variant || "contained"}
         size={size || "medium"}
         color={color || "primary"}
         onClick={onClick}
         {...other}
         sx={{ textTransform: "uppercase" }}
      >
         {text}
      </MuiButton>
   );
}
