import React, { useState } from "react";
import { Button, FormControl } from "@mui/base";
import {
   TextField,
   FormControlLabel,
   FormGroup,
   FormLabel,
   Radio,
   RadioGroup,
} from "@mui/material";
import { addMapPin } from "../../utils/mapUtil";
import { useLocalStorage } from "usehooks-ts";
import { addCountry } from "../../utils/countryUtil";

// form for adding map pin to current country
function AddCountry() {
   const [formData, setFormData] = useState({
      countryName: "",
      longitude: "",
      latitude: "",
   });

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      // requestBody for API request
      let requestBody = {
         countryName: formData.countryName,
         longitude: formData.longitude,
         latitude: formData.latitude,
      };

      addCountry(requestBody);
   };

   // callback for when states of form components change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h1>Add Country</h1>
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

export default AddCountry;
