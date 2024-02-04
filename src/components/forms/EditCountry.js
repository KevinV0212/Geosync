import React, { useEffect, useState } from "react";
import { Button, FormControl } from "@mui/base";
import { TextField, FormGroup } from "@mui/material";
import { updateCountry, deleteCountry } from "../../utils/countryUtil";
import { useLocalStorage } from "usehooks-ts";

// form for adding map pin to current country
function EditCountry() {
   const [currentCountry, setCurrentCountry] = useLocalStorage(
      "current_country",
      null
   );

   let countryID = currentCountry ? currentCountry.countryID : "";
   let countryName = currentCountry ? currentCountry.countryName : "";
   let latitude = currentCountry ? currentCountry.latitude : "";
   let longitude = currentCountry ? currentCountry.longitude : "";

   const [formData, setFormData] = useState({
      countryName: countryName,
      latitude: latitude,
      longitude: longitude,
   });

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      // requestBody for API request
      let requestBody = {
         id: countryID,
         countryName: formData.countryName,
         longitude: formData.longitude,
         latitude: formData.latitude,
      };
      updateCountry(requestBody).then((newInfo) => {
         setCurrentCountry({
            countryID: newInfo.id,
            countryName: newInfo.countryName,
            latitude: newInfo.latitude,
            longitude: newInfo.longitude,
         });
      });
   };

   // callback for when states of form components change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   // ensures that edit form is populated with current country info
   useEffect(() => {
      setFormData({
         countryName: countryName,
         latitude: latitude,
         longitude: longitude,
      });
   }, [currentCountry]);

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h1>Edit Country ({countryName})</h1>

            <FormGroup>
               <FormControl>
                  <TextField
                     label="Country Name"
                     name="countryName"
                     value={formData.countryName}
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
               <Button type="submit" variant="contained" onClick={handleSubmit}>
                  Submit
               </Button>
            </FormGroup>
         </form>
      </div>
   );
}

export default EditCountry;
