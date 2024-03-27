import { Stack } from "@mui/material";
import React, { useState } from "react";

export function useForm(initialFormData, validateOnChange = false, validate) {
   const [formData, setFormData] = useState(initialFormData);
   const [errors, setErrors] = useState({});

   // handles input changes
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (validateOnChange) {
         validate({ [name]: value });
      }
   };

   const resetForm = () => {
      setFormData(initialFormData);
      setErrors({});
   };
   return [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ];
}

export function Form(props) {
   const { children, ...other } = props;
   return (
      <form
         autoComplete="off"
         {...other}
         style={{ padding: "0px", margin: "0px" }}
      >
         <Stack direction="column" spacing={2}>
            {props.children}
         </Stack>
      </form>
   );
}
