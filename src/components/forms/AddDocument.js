// import React, { useState } from "react";
// import { Button, FormControl } from "@mui/base";
// import {
//    TextField,
//    FormControlLabel,
//    FormGroup,
//    FormLabel,
//    Radio,
//    RadioGroup,
// } from "@mui/material";
// import { addMapPin } from "../../utils/mapUtil";
// import { useLocalStorage } from "usehooks-ts";

// // form for adding map pin to current country
// function AddPin() {
//    const [formData, setFormData] = useState({
//       title: "",
//       description: "",
//       longitude: "",
//       latitude: "",
//       pmessiCat: "",
//    });

//    // submits a request to add new map pin to current country
//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       if (!currentCountry) {
//          return;
//       }

//       // requestBody for API request
//       let requestBody = {};

//       requestBody[formData.pmessiCat] = true;
//       addMapPin(requestBody);
//    };

//    // callback for when states of form components change
//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//    };

//    return (
//       <div>
//          <form onSubmit={handleSubmit}>
//             <h1>Add Map Pin </h1>
//             <h2>{countryName}</h2>
//             <FormGroup>
//                <FormControl>
//                   <TextField
//                      label="title"
//                      name="title"
//                      value={formData.title}
//                      variant="outlined"
//                      margin="normal"
//                      onChange={handleChange}
//                      required
//                   />
//                </FormControl>
//                <FormControl>
//                   <TextField
//                      label="description"
//                      name="description"
//                      value={formData.description}
//                      variant="outlined"
//                      margin="normal"
//                      onChange={handleChange}
//                      required
//                   />
//                </FormControl>
//                <FormControl>
//                   <TextField
//                      label="longitude"
//                      name="longitude"
//                      value={formData.longitude}
//                      variant="outlined"
//                      margin="normal"
//                      onChange={handleChange}
//                      required
//                   />
//                </FormControl>
//                <FormControl>
//                   <TextField
//                      label="latitude"
//                      name="latitude"
//                      value={formData.latitude}
//                      variant="outlined"
//                      margin="normal"
//                      onChange={handleChange}
//                      required
//                   />
//                </FormControl>
//                <FormControl>
//                   <FormLabel id="pmessiCat">Choose a PMESII Category</FormLabel>
//                   <RadioGroup required name="pmessiCat" row>
//                      <FormControlLabel
//                         value="political"
//                         control={<Radio onChange={handleChange} />}
//                         label="Political"
//                      />
//                      <FormControlLabel
//                         value="military"
//                         control={<Radio onChange={handleChange} />}
//                         label="Military"
//                      />
//                      <FormControlLabel
//                         value="economic"
//                         control={<Radio onChange={handleChange} />}
//                         label="Economic"
//                      />
//                      <FormControlLabel
//                         value="social "
//                         control={<Radio onChange={handleChange} />}
//                         label="Social"
//                      />
//                      <FormControlLabel
//                         value="information"
//                         control={<Radio onChange={handleChange} />}
//                         label="Information"
//                      />
//                      <FormControlLabel
//                         value="infrastructure"
//                         control={<Radio onChange={handleChange} />}
//                         label="Infrastructure"
//                      />
//                   </RadioGroup>
//                </FormControl>
//                <Button type="submit" variant="contained" onClick={handleSubmit}>
//                   Submit
//                </Button>
//             </FormGroup>
//          </form>
//       </div>
//    );
// }

// export default AddPin;
