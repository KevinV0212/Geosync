import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./MapFragment.css";
import { useLocalStorage } from "usehooks-ts";
import MapPinForm from "../../forms/MapPinForm.js";
import {
   addCountry,
   getAllCountries,
   updateCountry,
} from "../../../utils/country/countryUtil.js";
import { getMapPins } from "../../../utils/map/mapUtil.js";
import CountryForm from "../../forms/CountryForm";
import BasicModal from "../BasicModal.js";
import MapComponent from "../../MapComponent";
import Controls from "../../controls/Controls.js";
import { Stack } from "@mui/material";
function Map() {
   // Forms
   const [openCountryForm, setOpenCountryForm] = useState(false);
   const [openPinForm, setOpenPinForm] = useState(false);
   const [recordForCountry, setRecordForCountry] = useState(null);
   // Country selector
   const [currentCountry, setCurrentCountry] = useLocalStorage(
      "current_country",
      null
   );
   const [countries, setCountries] = useState([]);
   let listOptions = countries.map((country) => ({
      value: country.id,
      label: country.countryName,
   }));

   // PMESII-PT filters
   const [checkboxes, setCheckboxes] = useState({
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
      checkbox4: true,
      checkbox5: true,
      checkbox6: true,
   });
   const [mapPins, setMapPins] = useState([]);

   const [managerView, setManagerView] = useState(true);

   const handleViewChange = () => setManagerView(!managerView);

   const renderManagerControls = () => {
      if (managerView) {
         return (
            <>
               <Controls.Button
                  text="Add Country"
                  onClick={() => {
                     setRecordForCountry(null);
                     setOpenCountryForm(true);
                  }}
               />
               <Controls.Button
                  text="Edit Country"
                  onClick={openCountryInForm}
               />
               <Controls.Popup
                  title="Add/Edit Country"
                  openPopup={openCountryForm}
                  setOpenPopup={setOpenCountryForm}
               >
                  <CountryForm
                     addOrEdit={addOrEditCountry}
                     recordForEdit={recordForCountry}
                  />
               </Controls.Popup>
               <Controls.Button
                  text="Add Map Pin"
                  onClick={() => {
                     setOpenPinForm(true);
                  }}
               />
               <Controls.Popup
                  title="Add/Edit MapPin"
                  openPopup={openPinForm}
                  setOpenPopup={setOpenPinForm}
               >
                  <MapPinForm
                  // addOrEdit={addOrEditCountry}
                  // recordForEdit={recordForCountry}
                  />
               </Controls.Popup>
            </>
         );
      }
   };
   const openCountryInForm = () => {
      setRecordForCountry({
         ...currentCountry,
         latDir: currentCountry.latitude >= 0 ? "north" : "south",
         longDir: currentCountry.longitude >= 0 ? "east" : "west",
      });
      setOpenCountryForm(true);
   };
   const addOrEditCountry = async (country, resetForm) => {
      if (country.countryID) {
         await updateCountry(document);
      } else {
         await addCountry(document);
      }
      resetForm();
      loadCountries();
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };
   // function that loads a list of countries in the format below
   function loadCountries() {
      getAllCountries().then((countries) => {
         if (!countries) {
            window.alert("There was a problem getting countries");
         }
         countries.sort((countryA, countryB) => {
            if (countryA.countryName < countryB.countryName) return -1;
            if (countryA.countryName > countryB.countryName) return 1;
            return 0;
         });
         setCountries(countries);
      });
   }

   // loads the mappins associated to the currently selected country
   function loadMapPins() {
      if (!currentCountry) {
         return;
      }
      const countryID = currentCountry.countryID;
      const filters = [];
      for (const checkbox in checkboxes) {
         filters.push(checkboxes[checkbox]);
      }

      getMapPins(countryID, filters).then((pinList) => {
         if (!pinList) {
            window.alert("There was a problem getting map pins");
         }
         setMapPins([...pinList]);
      });
   }

   // Callback function to handle selecting country
   const handleCountrySelect = (country) => {
      const countryInfo = countries.find(
         (targetCountry) => targetCountry.id === country.value
      );

      const temp = {
         countryID: countryInfo.id,
         countryName: countryInfo.countryName,
         latitude: countryInfo.latitude,
         longitude: countryInfo.longitude,
      };

      setCurrentCountry(temp);
   };

   const handleCheckboxChange = (checkboxName) => {
      setCheckboxes((prevCheckboxes) => ({
         ...prevCheckboxes,
         [checkboxName]: !prevCheckboxes[checkboxName],
      }));
   };

   useEffect(() => {
      loadCountries();
      loadMapPins();
   }, [currentCountry]);

   return (
      <div className="home">
         <div className="filters-container">
            <Stack spacing={1}>
               {renderManagerControls()}
               <Controls.Button
                  variant="outlined"
                  text={`Change to ${managerView ? "user view" : "manager view"}`}
                  onClick={handleViewChange}
               ></Controls.Button>
            </Stack>

            <h3>PMESII Filters</h3>
            <form className="filters-form">
               <div className="filterPMESII">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox1}
                        onChange={() => handleCheckboxChange("checkbox1")}
                     />
                     Political
                  </label>
               </div>
               <div className="filterPMESII">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox2}
                        onChange={() => handleCheckboxChange("checkbox2")}
                     />
                     Military
                  </label>
               </div>
               <div className="filterPMESII">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox3}
                        onChange={() => handleCheckboxChange("checkbox3")}
                     />
                     Economic
                  </label>
               </div>
               <div className="filterPMESII">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox4}
                        onChange={() => handleCheckboxChange("checkbox4")}
                     />
                     Social
                  </label>
               </div>
               <div className="filterPMESII">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox5}
                        onChange={() => handleCheckboxChange("checkbox5")}
                     />
                     Information
                  </label>
               </div>
               <div className="filterPMESII">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox6}
                        onChange={() => handleCheckboxChange("checkbox6")}
                     />
                     Infrastructure
                  </label>
               </div>
            </form>
         </div>
         <div className="map-container">
            <Select
               placeholder="Select a Country"
               options={listOptions}
               value={
                  currentCountry
                     ? {
                          value: currentCountry.countryID,
                          label: currentCountry.countryName,
                       }
                     : null
               }
               onChange={handleCountrySelect}
            />
            {/* <div className="map" ref={mapElem}></div> */}
            <MapComponent mapPins={mapPins} />
         </div>
      </div>
   );
}

export default Map;
