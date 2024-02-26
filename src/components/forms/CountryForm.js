import React, { useEffect } from "react";
import { useForm, Form } from "../useForm";
import Controls from "../controls/Controls";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <div>
         <Form onSubmit={handleSubmit}>
            <Controls.Input
               name="countryName"
               label="Country Name"
               value={formData.countryName}
               onChange={handleInputChange}
               error={errors.countryName}
            />
            <Controls.Input
               name="latitude"
               label="Latitude"
               value={formData.latitude}
               inputProps={{ type: "number", min: -90, max: 90, step: "any" }}
               onChange={handleInputChange}
               error={errors.latitude}
            />
            <Typography>
               {formData.latitude >= 0 ? "North" : "South"}
            </Typography>

            <Controls.Input
               name="longitude"
               label="Longitude"
               value={formData.longitude}
               inputProps={{ type: "number", min: -180, max: 180, step: "any" }}
               onChange={handleInputChange}
               error={errors.longitude}
            />
            <Typography>{formData.longitude >= 0 ? "East" : "West"}</Typography>
            <div>
               {formData.countryID != null ? (
                  <Controls.Button
                     text="Delete"
                     startIcon={<DeleteIcon />}
                     onClick={() => handleCountryDelete(recordForEdit)}
                     disabled={formData.countryID == null}
                  />
               ) : (
                  ""
               )}
               <Controls.Button
                  variant="outlined"
                  text="Cancel"
                  onClick={resetForm}
               />
               <Controls.Button type="submit" text="Submit" />
            </div>
         </Form>
      </div>
   );
}
