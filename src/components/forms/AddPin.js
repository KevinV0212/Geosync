import { Button, FormControl, Input } from "@mui/base";
import {
   Checkbox,
   FormControlLabel,
   FormGroup,
   InputLabel,
   checkboxClasses,
} from "@mui/material";
import React, { useState } from "react";
import buildPath from "../Path";
import axios from "axios";

const AddPin = () => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [longitutde, setLongitude] = useState(0);
   const [latitude, setLatitude] = useState(0);

   // filters
   const [political, setPolitical] = useState(false);
   const [military, setMilitary] = useState(false);
   const [economic, setEconomic] = useState(false);
   const [social, setSocial] = useState(false);
   const [information, setInformation] = useState(false);
   const [infrastructure, setInfrastructure] = useState(false);

   // handles toggling of a checkbox
   const handleChangePolitical = (e) => setPolitical(true);
   const handleChangeMilitary = (e) => setMilitary(true);
   const handleChangeEconomic = (e) => setEconomic(true);
   const handleChangeSocial = (e) => setSocial(true);
   const handleChangeInformation = (e) => setInformation(true);
   const handleChangeInfrastructure = (e) => setInfrastructure(true);

   const handleSubmit = async () => {
      const url = buildPath("/add_mappin");
      let obj = {
         title: title,
         description: description,
         longitude: longitutde,
         latitude: latitude,
         political: political,
         military: military,
         economic: economic,
         social: social,
         information: information,
         infrastructure: infrastructure,
      };
      let js = JSON.stringify(obj);

      let config = {
         method: "post",
         url: url,
         headers: {
            "Content-Type": "application/json",
         },
         data: js,
      };
      console.log(js);
      // call axios with data to url
      // axios(config)
      //    .then((response) => {
      //       let res = response.data;
      //       if (res.error) {
      //          console.log(res.error);
      //       } else {
      //          console.log("Login Successful! User's Token: " + res.token);
      //       }
      //    })
      //    .catch((error) => {
      //       console.log(error);
      //    });
   };

   return (
      <div>
         <h1>Add Map Pin</h1>
         <FormGroup>
            <FormControl>
               <InputLabel>Title</InputLabel>
               <Input />
            </FormControl>
            <FormControl>
               <InputLabel>Description</InputLabel>
               <Input />
            </FormControl>
            <FormControl>
               <InputLabel>Longitude</InputLabel>
               <Input />
            </FormControl>
            <FormControl>
               <InputLabel>Latitude</InputLabel>
               <Input />
            </FormControl>
            <FormControl>
               <FormControlLabel
                  control={<Checkbox onChange={handleChangePolitical} />}
                  label="Political"
               />
               <FormControlLabel
                  control={<Checkbox onChange={handleChangeMilitary} />}
                  label="Military"
               />
               <FormControlLabel
                  control={<Checkbox onChange={handleChangeEconomic} />}
                  label="Economic"
               />
               <FormControlLabel
                  control={<Checkbox onChange={handleChangeSocial} />}
                  label="Social"
               />
               <FormControlLabel
                  control={<Checkbox onChange={handleChangeInformation} />}
                  label="Information"
               />
               <FormControlLabel
                  control={<Checkbox onChange={handleChangeInfrastructure} />}
                  label="Infrastructure"
               />
            </FormControl>
            <Button onClick={handleSubmit}>Submit</Button>
         </FormGroup>
      </div>
   );
};

export default AddPin;
