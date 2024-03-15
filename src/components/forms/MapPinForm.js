import React, { useEffect } from "react";
import { useForm, Form } from "./useForm";
import Controls from "../reusable/Controls";

import { Divider, InputAdornment, Stack, Typography } from "@mui/material";
import styles from "./forms.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TitleIcon from "@mui/icons-material/Title";
import MessageIcon from "@mui/icons-material/Message";
import PinDropIcon from "@mui/icons-material/PinDrop";

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
   const { addOrEdit, recordForEdit, deletePin } = props;

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
            <Controls.RadioGroup
               name="pmesiiCat"
               label="PMESII Category"
               value={formData.pmesiiCat}
               onChange={handleInputChange}
               items={pmesiiItems}
               error={errors.pmesiiCat}
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
      </div>
   );
}
