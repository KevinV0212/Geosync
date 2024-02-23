import React, { useState } from "react";
import { useForm, Form } from "../useForm";
import Controls from "../controls/Controls";

import { useLocalStorage } from "usehooks-ts";

const latitudeItems = [
   { id: "north", title: "N" },
   { id: "south", title: "S" },
];
const longitudeItems = [
   { id: "east", title: "E" },
   { id: "west", title: "W" },
];

const pmesiiItems = [
   { id: "political", title: "Political" },
   { id: "military", title: "Military" },
   { id: "economic", title: "Economic" },
   { id: "social", title: "Social" },
   { id: "information", title: "Information" },
   { id: "infrastructure", title: "Infrastructure" },
];

const initialFormValues = {
   title: "",
   description: "",
   latitude: 0,
   longitude: 0,
   pmesiiCat: "",
};
// form for adding map pin to current country
export default function MapPinForm(props) {
   const { addOrEdit, recordForEdit } = props;

   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("title" in fieldData)
         temp.countryName = fieldData.countryName
            ? ""
            : "This field is required.";
      if ("description" in fieldData)
         temp.description = fieldData.description
            ? ""
            : "This field is required.";
      if ("latitude" in fieldData)
         temp.latitude =
            typeof +fieldData.latitude === "number"
               ? ""
               : "This Should Be a Number";
      if ("longitude" in fieldData)
         temp.longitude =
            typeof +fieldData.longitude === "number"
               ? ""
               : "This Should Be a Number";
      if ("latDir" in fieldData)
         temp.latDir = fieldData.latDir ? "" : "Select a direction.";
      if ("longDir" in fieldData)
         temp.longDir = fieldData.longDir ? "" : "Select a direction.";
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

   // get information of current country
   const [currentCountry, setCurrentCountry] = useLocalStorage(
      "current_country",
      null
   );
   let countryName = currentCountry ? currentCountry.countryName : null;
   let countryID = currentCountry ? currentCountry.countryID : null;

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
      // };

      // requestBody[formData.pmesiiCat] = true;
      // addMapPin(requestBody);
      window.alert("Pin Added");
   };

   // callback for when states of form components change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   return (
      <div>
         <Form onSubmit={handleSubmit}>
            <Controls.Input
               name="title"
               label="Title"
               value={formData.title}
               onChange={handleInputChange}
               error={errors.title}
            />
            <Controls.Input
               name="description"
               label="Description"
               value={formData.description}
               onChange={handleInputChange}
               error={errors.description}
            />
            <Controls.Input
               name="latitude"
               label="Latitude"
               value={formData.latitude}
               onChange={handleInputChange}
               error={errors.latitude}
            />
            <Controls.RadioGroup
               name="latDir"
               label="Latitude Direction"
               value={formData.latDir}
               onChange={handleInputChange}
               items={latitudeItems}
               error={errors.latDir}
            />
            <Controls.Input
               name="longitude"
               label="Longitude"
               value={formData.longitude}
               onChange={handleInputChange}
               error={errors.longitude}
            />
            <Controls.RadioGroup
               name="longDir"
               label="Longitude Direction"
               value={formData.longDir}
               onChange={handleInputChange}
               items={longitudeItems}
               error={errors.longDir}
            />
            <Controls.RadioGroup
               name="pmesiiCat"
               label="PMESII Category"
               value={formData.pmesiiCat}
               onChange={handleInputChange}
               items={pmesiiItems}
               error={errors.pmesiiCat}
            />
            <div>
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
