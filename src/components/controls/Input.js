import { TextField } from "@mui/material";
import React from "react";

export default function Input(props) {
   const { name, label, value, error = null, onChange } = props;
   return (
      <TextField
         name={name}
         label={label}
         value={value}
         variant="outlined"
         onChange={onChange}
         margin="normal"
         {...(error && { error: true, helperText: error })}
      />
   );
}
