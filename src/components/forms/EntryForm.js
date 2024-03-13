import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Form, useForm } from "./useForm";
import Controls from "../reusable/Controls";

import { Button, FormControl } from "@mui/base";
import {
   Divider,
   FormControlLabel,
   FormGroup,
   FormLabel,
   Radio,
   RadioGroup,
   Stack,
   TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

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

   // const [currentCountry, setCurrentCountry] = useLocalStorage(
   //    "current_country",
   //    null
   // );
   // let countryName = currentCountry ? currentCountry.countryName : null;
   // let countryID = currentCountry ? currentCountry.countryID : null

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
      <div>
         <Form onSubmit={handleSubmit}>
            <Controls.Input
               name="title"
               label="Title"
               value={formData.title}
               inputProps={{
                  maxlength: "100",
               }}
               onChange={handleInputChange}
               error={errors.title}
               fullWidth
            />
            <Controls.Input
               name="description"
               label="Description"
               value={formData.description}
               inputProps={{
                  maxlength: "65535",
               }}
               onChange={handleInputChange}
               error={errors.description}
               multiline
               fullWidth
            />
            <Controls.RadioGroup
               name="pmesiiCat"
               label="PMESII Category"
               value={formData.pmesiiCat}
               onChange={handleInputChange}
               items={pmesiiItems}
               error={errors.pmesiiCat}
            />
            <Controls.RadioGroup
               name="ascopeCat"
               label="Ascope Category"
               value={formData.ascopeCat}
               onChange={handleInputChange}
               items={ascopeItems}
               error={errors.ascopeCat}
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
      </div>
   );
}
