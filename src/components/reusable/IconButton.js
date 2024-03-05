import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";
export default function Button(props) {
   const { children, size, color, variant, onClick, ...other } = props;

   return (
      <MuiIconButton
         variant={variant || "contained"}
         size={size || "large"}
         color={color || "secondary"}
         onClick={onClick}
         {...other}
      >
         {children}
      </MuiIconButton>
   );
}
