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
import { addMapPin } from "../../utils/map/mapUtil";
import { addTask } from "../../utils/document/taskDocUtil";
import { addMission } from "../../utils/document/missionDocUtil";

// form for adding map pin to current country
function AddPin({ onReload }) {
   const [formData, setFormData] = useState({
      link: "",
      docType: "",
   });

   // submits a request to add new map pin to current country
   const handleSubmit = async (e) => {
      e.preventDefault();

      // requestBody for API request
      let requestBody = formData;
      if (requestBody.docType === "mission") {
         addMission(requestBody);
      } else if (requestBody.docType === "task") {
         addTask(requestBody);
      }
      onReload();
   };

   // callback for when states of form components change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <h1>Add Document</h1>
            <FormGroup>
               <FormControl>
                  <TextField
                     label="Link"
                     name="link"
                     value={formData.link}
                     variant="outlined"
                     margin="normal"
                     onChange={handleChange}
                     required
                  />
               </FormControl>

               <FormControl>
                  <FormLabel id="pmessiCat">Choose a Document Type</FormLabel>
                  <RadioGroup required name="docType" row>
                     <FormControlLabel
                        value="mission"
                        control={<Radio onChange={handleChange} />}
                        label="Mission Statement"
                     />
                     <FormControlLabel
                        value="task"
                        control={<Radio onChange={handleChange} />}
                        label="Task"
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

export default AddPin;
