import React, { useEffect, useState } from "react";
import { Form, useForm } from "./useForm";
import Controls from "../reusable/Controls";

import { Divider, InputAdornment, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TitleIcon from "@mui/icons-material/Title";
import MessageIcon from "@mui/icons-material/Message";

const pmesiiItems = [
   { id: "political", title: "Political" },
   { id: "military", title: "Military" },
   { id: "economic", title: "Economic" },
   { id: "social", title: "Social" },
   { id: "information", title: "Information" },
   { id: "infrastructure", title: "Infrastructure" },
];

const ascopeItems = [
   { id: "areas", title: "Areas" },
   { id: "structures", title: "Structures" },
   { id: "capabilities", title: "Capabilities" },
   { id: "organizations", title: "Organizations" },
   { id: "people", title: "People" },
   { id: "events", title: "Events" },
];

const initialFormValues = {
   id: null,
   title: "",
   description: "",
   latitude: 0,
   longitude: 0,
   pmesiiCat: "",
   ascopeCat: "",
};

export default function EntryForm(props) {
   const { addOrEdit, recordForEdit, handleCountryDelete } = props;
   // validates formData and records any errors that show up
   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("title" in fieldData)
         temp.title = fieldData.title ? "" : "This field is required.";
      if ("description" in fieldData)
         temp.description = fieldData.description
            ? ""
            : "This field is required.";
      if ("pmesiiCat" in fieldData)
         temp.pmesiiCat = fieldData.pmesiiCat
            ? ""
            : "Select a PMESII Category.";
      if ("ascopeCat" in fieldData)
         temp.ascopeCat = fieldData.ascopeCat
            ? ""
            : "Select an ASCOPE Category.";

      setErrors({
         ...temp,
      });
      if (fieldData === formData)
         return Object.values(temp).every((x) => x === "");
   };

   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormValues, true, validate);

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (validate()) {
         // addOrEdit(formData, resetForm);
         console.log(formData);
      }
   };

   useEffect(() => {
      if (recordForEdit != null) {
         setFormData({ ...recordForEdit });
      }
   }, [recordForEdit]);

   return (
      <>
         <Form onSubmit={handleSubmit}>
            <Controls.Input
               name="title"
               label="Title"
               value={formData.title}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <TitleIcon />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {`${formData.title.length} / 100`}
                     </InputAdornment>
                  ),
               }}
               inputProps={{
                  maxlength: "100",
               }}
               onChange={handleInputChange}
               error={errors.title}
               required
               fullWidth
            />
            <Controls.Input
               name="description"
               label="Description"
               value={formData.description}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <MessageIcon />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {`${formData.description.length} / 1000`}
                     </InputAdornment>
                  ),
               }}
               inputProps={{
                  maxlength: "1000",
               }}
               onChange={handleInputChange}
               error={errors.description}
               multiline
               required
               fullWidth
            />
            <Controls.RadioGroup
               name="pmesiiCat"
               label="PMESII Category"
               value={formData.pmesiiCat}
               onChange={handleInputChange}
               items={pmesiiItems}
               error={errors.pmesiiCat}
               required
            />
            <Controls.RadioGroup
               name="ascopeCat"
               label="Ascope Category"
               value={formData.ascopeCat}
               onChange={handleInputChange}
               items={ascopeItems}
               error={errors.ascopeCat}
               required
            />

            <Stack
               direction="row"
               spacing={2}
               alignItems="center"
               justifyContent="center"
               divider={<Divider orientation="vertical" flexItem />}
            >
               <Controls.Button
                  variant="outlined"
                  text="Clear"
                  startIcon={<CancelIcon />}
                  onClick={resetForm}
                  fullWidth
               />
               <Controls.Button
                  type="submit"
                  text="Submit"
                  startIcon={<CheckIcon />}
                  fullWidth
               />
            </Stack>
         </Form>
      </>
   );
}
