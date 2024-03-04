import React, { useEffect } from "react";
import { useForm, Form } from "../useForm";
import Controls from "../controls/Controls";
import { Divider, Stack, Typography } from "@mui/material";
import styles from "./forms.module.css";

import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

const initialFormValues = {
   countryID: null,
   countryName: "",
   longitude: 0,
   latitude: 0,
};

// Form for a new country
export default function CountryForm(props) {
   const { addOrEdit, recordForEdit, handleCountryDelete } = props;

   // validates formData and records any errors that show up
   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("countryName" in fieldData)
         temp.countryName = fieldData.countryName
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

   useEffect(() => {
      if (recordForEdit != null) {
         setFormData({ ...recordForEdit });
      }
   }, [recordForEdit]);

   // handles submission of form to callback from parent component
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (validate()) {
         addOrEdit(formData, resetForm);
      }
   };

   return (
      <>
         <Form onSubmit={handleSubmit}>
            <Controls.Input
               name="countryName"
               label="Country Name"
               value={formData.countryName}
               onChange={handleInputChange}
               error={errors.countryName}
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

            <Stack
               direction="row"
               spacing={2}
               alignItems="center"
               justifyContent="center"
               divider={<Divider orientation="vertical" flexItem />}
            >
               {formData.countryID != null ? (
                  <Controls.Button
                     text="Delete"
                     startIcon={<DeleteIcon />}
                     onClick={() => handleCountryDelete(recordForEdit)}
                     disabled={formData.countryID == null}
                     sx={{ flexGrow: 1 }}
                     fullWidth
                  />
               ) : (
                  ""
               )}
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
