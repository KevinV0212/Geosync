import { Button as MuiButton } from "@mui/material";
import React from "react";

export default function Button(props) {
   const { text, size, color, variant, onClick, ...other } = props;

   return (
      <MuiButton
         variant={variant || "contained"}
         size={size || "medium"}
         color={color || "secondary"}
         onClick={onClick}
         {...other}
         sx={{ textTransform: "uppercase" }}
      >
         {text}
      </MuiButton>
   );
}
