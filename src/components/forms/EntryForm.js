import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Button, FormControl } from "@mui/base";
import {
   FormControlLabel,
   FormGroup,
   FormLabel,
   Radio,
   RadioGroup,
   TextField,
} from "@mui/material";
import { useForm } from "../useForm";

const initialFormValues = {
   id: null,
   title: "",
   description: "",
   latitude: 0,
   longitude: 0,
   pmessiCat: "",
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
      if ("pmesiiCat" in fieldData)
         temp.pmesiiCat = fieldData.pmesiiCat
            ? ""
            : "Select a PMESII Category.";
      if ("ascopeCat" in fieldData)
         temp.ascopeCat = fieldData.ascopeCat
            ? ""
            : "Select a ASCOPE Category.";

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

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      // if (!currentCountry) {
      //    return;
      // }

      // // requestBody for API request
      // let requestBody = {
      //    countryID: countryID,
      //    title: formData.title,
      //    description: formData.description,
      //    longitude: formData.longitude,
      //    latitude: formData.latitude,
      //    political: false,
      //    military: false,
      //    economic: false,
      //    social: false,
      //    information: false,
      //    infrastructure: false,
      //    areas: false,
      //    structures: false,
      //    capabilities: false,
      //    organizations: false,
      //    people: false,
      //    events: false,
      // };

      // requestBody[formData.pmessiCat] = true;
      // requestBody[formData.ascopeCat] = true;
      if (validate) {
         console.log(formData);
      }
   };

   // callback for when states of form components change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h1>Add Map Pin </h1>
            <h2>{countryName}</h2>
            <FormGroup>
               <FormControl>
                  <TextField
                     label="title"
                     name="title"
                     value={formData.title}
                     variant="outlined"
                     margin="normal"
                     onChange={handleChange}
                     required
                  />
               </FormControl>
               <FormControl>
                  <TextField
                     label="description"
                     name="description"
                     value={formData.description}
                     variant="outlined"
                     margin="normal"
                     onChange={handleChange}
                     required
                  />
               </FormControl>
               <FormControl>
                  <TextField
                     label="latitude"
                     name="latitude"
                     value={formData.latitude}
                     variant="outlined"
                     margin="normal"
                     onChange={handleChange}
                     required
                  />
               </FormControl>
               <FormControl>
                  <TextField
                     label="longitude"
                     name="longitude"
                     value={formData.longitude}
                     variant="outlined"
                     margin="normal"
                     onChange={handleChange}
                     required
                  />
               </FormControl>
               <FormControl>
                  <FormLabel id="pmessiCat">Choose a PMESII Category</FormLabel>
                  <RadioGroup required name="pmessiCat" row>
                     <FormControlLabel
                        value="political"
                        control={<Radio onChange={handleChange} />}
                        label="Political"
                     />
                     <FormControlLabel
                        value="military"
                        control={<Radio onChange={handleChange} />}
                        label="Military"
                     />
                     <FormControlLabel
                        value="economic"
                        control={<Radio onChange={handleChange} />}
                        label="Economic"
                     />
                     <FormControlLabel
                        value="social "
                        control={<Radio onChange={handleChange} />}
                        label="Social"
                     />
                     <FormControlLabel
                        value="information"
                        control={<Radio onChange={handleChange} />}
                        label="Information"
                     />
                     <FormControlLabel
                        value="infrastructure"
                        control={<Radio onChange={handleChange} />}
                        label="Infrastructure"
                     />
                  </RadioGroup>
               </FormControl>
               <FormControl>
                  <FormLabel id="ascopeCat">Choose a ASCOPE Category</FormLabel>
                  <RadioGroup required name="ascopeCat" row>
                     <FormControlLabel
                        value="areas"
                        control={<Radio onChange={handleChange} />}
                        label="Areas"
                     />
                     <FormControlLabel
                        value="structures"
                        control={<Radio onChange={handleChange} />}
                        label="Structures"
                     />
                     <FormControlLabel
                        value="capabilities"
                        control={<Radio onChange={handleChange} />}
                        label="Capabilities"
                     />
                     <FormControlLabel
                        value="organizations"
                        control={<Radio onChange={handleChange} />}
                        label="Organizations"
                     />
                     <FormControlLabel
                        value="people"
                        control={<Radio onChange={handleChange} />}
                        label="People"
                     />
                     <FormControlLabel
                        value="events"
                        control={<Radio onChange={handleChange} />}
                        label="Events"
                     />
                  </RadioGroup>
               </FormControl>
               <Button type="submit" variant="contained" onClick={handleSubmit}>
                  Submit
               </Button>
            </FormGroup>
         </form>
      </div>
   );
}
