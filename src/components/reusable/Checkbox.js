import React from "react";

import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

export default function Checkbox(props) {
   const { text, size, color, onClick, ...other } = props;
   return (
      <FormControlLabel
         control={
            <MuiCheckbox
               size={size || "medium"}
               color={color || "secondary"}
               onClick={onClick}
               {...other}
            />
         }
         label={text || ""}
         sx={{ marginRight: 0 }}
      ></FormControlLabel>
   );
}
