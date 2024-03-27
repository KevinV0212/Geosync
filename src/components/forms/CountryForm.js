import React, { useEffect } from "react";
import { useForm, Form } from "./useForm";
import Controls from "../reusable/Controls";
import { Divider, InputAdornment, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TitleIcon from "@mui/icons-material/Title";
import PinDropIcon from "@mui/icons-material/PinDrop";

const initialFormValues = {
   id: null,
   countryName: "",
   longitude: 0,
   latitude: 0,
};

// Form for a new country
export default function CountryForm(props) {
   const { addOrEdit, recordForEdit, deleteCountry } = props;

   // validates formData and records any errors that show up
   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("countryName" in fieldData)
         temp.countryName = fieldData.countryName
            ? ""
            : "This field is required.";
      if ("latitude" in fieldData) {
         if (!fieldData.latitude && fieldData.latitude !== 0)
            temp.latitude = "This field is required.";
         else if (fieldData.latitude < -90 || fieldData.latitude > 90)
            temp.latitude = "Valid Range: [-90,90]";
         else temp.latitude = "";
      }
      if ("longitude" in fieldData) {
         if (!fieldData.longitude && fieldData.longitude !== 0)
            temp.longitude = "This field is required.";
         else if (fieldData.longitude < -180 || fieldData.longitude > 180)
            temp.longitude = "Valid Range: [-180,180]";
         else temp.longitude = "";
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
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <TitleIcon />
                     </InputAdornment>
                  ),
                  endAdornment: (
                     <InputAdornment position="end">
                        {`${formData.countryName.length} / 100`}
                     </InputAdornment>
                  ),
               }}
               inputProps={{
                  maxLength: 100,
               }}
               onChange={handleInputChange}
               error={errors.countryName}
               required
               fullWidth
            />
            <Stack direction="row" alignItems="center">
               <Controls.Input
                  name="latitude"
                  label="Latitude"
                  value={formData.latitude}
                  InputProps={{
                     type: "number",
                     step: "any",
                     startAdornment: (
                        <InputAdornment position="start">
                           <PinDropIcon />
                        </InputAdornment>
                     ),
                     endAdornment: (
                        <InputAdornment position="end">{`deg (${formData.latitude >= 0 ? "North" : "South"})`}</InputAdornment>
                     ),
                  }}
                  onChange={handleInputChange}
                  error={errors.latitude}
                  required
                  fullWidth
               />
            </Stack>
            <Stack direction="row" alignItems="center">
               <Controls.Input
                  name="longitude"
                  label="Longitude"
                  value={formData.longitude}
                  InputProps={{
                     type: "number",
                     step: "any",
                     startAdornment: (
                        <InputAdornment position="start">
                           <PinDropIcon />
                        </InputAdornment>
                     ),
                     endAdornment: (
                        <InputAdornment position="end">{`deg (${formData.longitude >= 0 ? "East" : "West"})`}</InputAdornment>
                     ),
                  }}
                  onChange={handleInputChange}
                  error={errors.longitude}
                  required
                  fullWidth
               />
            </Stack>

            <Stack
               direction="row"
               spacing={2}
               alignItems="center"
               justifyContent="center"
               divider={<Divider orientation="vertical" flexItem />}
            >
               {formData.id != null ? (
                  <Controls.Button
                     text="Delete"
                     startIcon={<DeleteIcon />}
                     onClick={() => deleteCountry(recordForEdit)}
                     disabled={formData.id == null}
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
                  onClick={() =>
                     setFormData({
                        ...formData,
                        countryName: "",
                        longitude: 0,
                        latitude: 0,
                     })
                  }
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
