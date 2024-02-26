import {
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup as MuiRadioGroup,
   FormHelperText,
   FormControl,
} from "@mui/material";
import React from "react";

export default function RadioGroup(props) {
   const {
      name,
      label,
      value,
      error = null,
      onChange,
      items,
      ...other
   } = props;
   return (
      <FormControl {...(error && { error: true })} {...other}>
         <FormLabel>{label}</FormLabel>
         <MuiRadioGroup name={name} value={value} onChange={onChange} row>
            {items.map((item, index) => (
               <FormControlLabel
                  label={item.title}
                  value={item.id}
                  control={<Radio />}
                  key={index}
               />
            ))}
         </MuiRadioGroup>
         {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
   );
}
