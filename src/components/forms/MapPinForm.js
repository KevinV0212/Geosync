import React, { useEffect } from "react";
import { useForm, Form } from "./useForm";
import Controls from "../reusable/Controls";

import { Divider, Stack, Typography } from "@mui/material";
import styles from "./forms.module.css";
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

const initialFormValues = {
   id: null,
   title: "",
   description: "",
   latitude: 0,
   longitude: 0,
   pmesiiCat: "",
};
// form for adding map pin to current country
export default function MapPinForm(props) {
   const { addOrEdit, recordForEdit, deleteMapPin } = props;

   // get information of current country
   // const [currentCountry, setCurrentCountry] = useLocalStorage(
   //    "current_country",
   //    null
   // );
   // let countryName = currentCountry ? currentCountry.countryName : null;
   // let countryID = currentCountry ? currentCountry.countryID : null;

   // validates formData and records any errors that show up
   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("title" in fieldData)
         temp.title = fieldData.title ? "" : "This field is required.";
      if ("description" in fieldData)
         temp.description = fieldData.description
            ? ""
            : "This field is required.";
      if ("latitude" in fieldData) {
         temp.latitude =
            fieldData.latitude || fieldData.latitude === 0
               ? ""
               : "This field is required.";
      }
      if ("longitude" in fieldData) {
         temp.longitude =
            fieldData.longitude || fieldData.longitude === 0
               ? ""
               : "This field is required.";
      }

      if ("pmesiiCat" in fieldData)
         temp.pmesiiCat = fieldData.pmesiiCat
            ? ""
            : "Select a PMESII Category.";

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

   // handles submission of form to callback from parent component
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (validate()) {
         addOrEdit(formData, resetForm);
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
               onChange={handleInputChange}
               error={errors.title}
               fullWidth
            />
            <Controls.Input
               name="description"
               label="Description"
               value={formData.description}
               onChange={handleInputChange}
               error={errors.description}
               multiline
               fullWidth
            />
            <Stack direction="row" alignItems="center">
               <Controls.Input
                  name="latitude"
                  label="Latitude"
                  value={formData.latitude}
                  inputProps={{
                     type: "number",
                     min: -90,
                     max: 90,
                     step: "any",
                  }}
                  onChange={handleInputChange}
                  error={errors.latitude}
                  fullWidth
               />
               <Typography
                  variant="h6"
                  component="h3"
                  className={styles.inputSideText}
               >
                  {formData.latitude >= 0 ? "North" : "South"}
               </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
               <Controls.Input
                  name="longitude"
                  label="Longitude"
                  value={formData.longitude}
                  inputProps={{
                     type: "number",
                     min: -180,
                     max: 180,
                     step: "any",
                  }}
                  onChange={handleInputChange}
                  error={errors.longitude}
                  fullWidth
               />
               <Typography
                  variant="h6"
                  component="h3"
                  className={styles.inputSideText}
               >
                  {formData.longitude >= 0 ? "East" : "West"}
               </Typography>
            </Stack>
            <Controls.RadioGroup
               name="pmesiiCat"
               label="PMESII Category"
               value={formData.pmesiiCat}
               onChange={handleInputChange}
               items={pmesiiItems}
               error={errors.pmesiiCat}
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
