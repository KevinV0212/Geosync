import React, { useEffect } from "react";
import { useForm, Form } from "../useForm";
import Controls from "../controls/Controls";

import { useLocalStorage } from "usehooks-ts";
import { Typography } from "@mui/material";

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

   // get information of current country
   // const [currentCountry, setCurrentCountry] = useLocalStorage(
   //    "current_country",
   //    null
   // );
   // let countryName = currentCountry ? currentCountry.countryName : null;
   // let countryID = currentCountry ? currentCountry.countryID : null;

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

      if (validate) {
         addOrEdit(formData, resetForm);
      }
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
