import React, { useState } from "react";
import { addCountry } from "../../utils/country/countryUtil";
import { useForm, Form } from "../useForm";
import Controls from "../controls/Controls";

const latitudeItems = [
   { id: "north", title: "N" },
   { id: "south", title: "S" },
];
const longitudeItems = [
   { id: "east", title: "E" },
   { id: "west", title: "W" },
];

const initialFormValues = {
   countryName: "",
   longitude: 0,
   latitude: 0,
   latDir: "",
   longDir: "",
};

// form for adding map pin to current country
export default function AddCountry() {
   const validate = (fieldData = formData) => {
      let temp = { ...errors };
      if ("countryName" in fieldData)
         temp.countryName = fieldData.countryName
            ? ""
            : "This field is required.";
      if ("latitude" in fieldData)
         temp.latitude = fieldData.latitude ? "" : "This field is required.";
      if ("longitude" in fieldData)
         temp.longitude = fieldData.longitude ? "" : "This field is required.";
      if ("latDir" in fieldData)
         temp.latDir = fieldData.latDir ? "" : "Select a direction.";
      if ("longDir" in fieldData)
         temp.longDir = fieldData.longDir ? "" : "Select a direction.";

      setErrors({
         ...temp,
      });

      if (fieldData === formData)
         return Object.values(temp).every((x) => x === "");
   };

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      // // requestBody for API request
      // let requestBody = {
      //    countryName: formData.countryName,
      //    longitude: formData.longitude,
      //    latitude: formData.latitude,
      // };

      // addCountry(requestBody);
      if (validate()) {
         window.alert("submitted");
      }
   };
   const [
      formData,
      setFormData,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
   ] = useForm(initialFormValues, true, validate);

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
