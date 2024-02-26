import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./MapFragment.css";
import { useLocalStorage } from "usehooks-ts";
import MapPinForm from "../forms/MapPinForm.js";
import {
   addCountry,
   deleteCountry,
   getAllCountries,
   updateCountry,
} from "../../utils/country/countryUtil.js";
import {
   addMapPin,
   deleteMapPin,
   getMapPins,
   updateMapPin,
} from "../../utils/map/mapUtil.js";
import CountryForm from "../forms/CountryForm.js";
import MapComponent from "../MapComponent.js";
import Controls from "../controls/Controls.js";
import { Stack } from "@mui/material";

export default function Map() {
   const [currentCountry, setCurrentCountry] = useLocalStorage(
      "current_country",
      null
   );
   useEffect(() => {
      loadCountries();
      loadMapPins();
   }, [currentCountry]);

   // Country selector
   const [countries, setCountries] = useState([]);
   let listOptions = countries.map((country) => ({
      value: country.id,
      label: country.countryName,
   }));

   // function that loads a list of countries in the format below
   function loadCountries() {
      getAllCountries().then((countries) => {
         if (countries === null) {
            return;
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
         if (pinList === null) {
            return;
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

   const [openCountryForm, setOpenCountryForm] = useState(false);
   const [countryFormTitle, setCountryFormTitle] = useState("Add Country");
   const [recordForCountry, setRecordForCountry] = useState(null);

   const [currentPin, setCurrentPin] = useState(null);
   const [openPinForm, setOpenPinForm] = useState(false);
   const [pinFormTitle, setPinFormTitle] = useState("Add Pin");
   const [recordForPin, setRecordForPin] = useState(null);

   // Map Operations ---------------------------------------------------------

   // opens current country's information in form to edit
   const openCountryInForm = () => {
      setRecordForCountry({
         ...currentCountry,
      });
      setCountryFormTitle("Edit Country");
      setOpenCountryForm(true);
   };

   // either adds or edit country depending on if the entry already has an id
   const addOrEditCountry = async (country, resetForm) => {
      const requestBody = {
         countryID: country.countryID || null,
         countryName: country.countryName,
         latitude: +country.latitude,
         longitude: +country.longitude,
      };
      if (country.countryID) {
         await updateCountry(requestBody);
      } else {
         const newCountry = await addCountry(requestBody);
         if (newCountry && currentCountry == null) {
            setCurrentCountry({
               countryID: newCountry.id,
               countryName: newCountry.countryName,
               latitude: +newCountry.latitude,
               longitude: +newCountry.longitude,
            });
         }
      }
      resetForm();
      loadCountries();
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };

   // handles deleting the country
   const handleCountryDelete = async (country) => {
      if (!window.confirm("Are you sure you want to delete this country?")) {
         return;
      }
      await deleteCountry(country.countryID);
      loadCountries();
      loadMapPins();
      setCurrentCountry(null);
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };

   // Pin Operations--------------------------------------------------------------

   // opens currently selected map pin's information in form to edit
   const openPinInForm = () => {
      setRecordForCountry({
         ...currentPin,
      });
      setPinFormTitle("Edit Map Pin");
      setOpenPinForm(true);
   };

   // either adds or edit country depending on if the pin already has an id
   const addOrEditPin = async (pin, resetForm) => {
      let requestBody = {
         countryID: currentCountry.countryID,
         title: pin.title,
         description: pin.description,
         longitude: +pin.longitude,
         latitude: +pin.latitude,
         political: false,
         military: false,
         economic: false,
         social: false,
         information: false,
         infrastructure: false,
      };

      requestBody[pin.pmesiiCat] = true;

      if (pin.id) {
         await updateMapPin(requestBody);
      } else {
         await addMapPin(requestBody);
      }
      resetForm();
      loadMapPins();
      setCurrentPin(null);
      setRecordForPin(null);
      setOpenPinForm(false);
   };

   // handles deleting map pin
   const handlePinDelete = async (pin) => {
      if (!window.confirm("Are you sure you want to delete this map pin?")) {
         return;
      }
      await deleteMapPin(pin.id);
      setCurrentPin(null);
      loadMapPins();
      setRecordForPin(null);
      setOpenPinForm(false);
   };

   // renders manager specific controls
   const renderManagerControls = () => {
      if (managerView) {
         return (
            <>
               <Controls.Button
                  text="Add Country"
                  onClick={() => {
                     setRecordForCountry(null);
                     setCountryFormTitle("Add Country");
                     setOpenCountryForm(true);
                  }}
               />
               <Controls.Button
                  text="Edit Country"
                  onClick={openCountryInForm}
                  disabled={currentCountry == null}
               />
               <Controls.Popup
                  title={countryFormTitle}
                  openPopup={openCountryForm}
                  setOpenPopup={setOpenCountryForm}
               >
                  <CountryForm
                     addOrEdit={addOrEditCountry}
                     recordForEdit={recordForCountry}
                     handleCountryDelete={handleCountryDelete}
                  />
               </Controls.Popup>

               <Controls.Button
                  text="Add Map Pin"
                  onClick={() => {
                     setOpenPinForm(true);
                  }}
                  disabled={currentCountry == null}
               />
               <Controls.Popup
                  title={pinFormTitle}
                  openPopup={openPinForm}
                  setOpenPopup={setOpenPinForm}
               >
                  <MapPinForm
                     addOrEdit={addOrEditPin}
                     recordForEdit={recordForPin}
                     handlePinDelete={handlePinDelete}
                  />
               </Controls.Popup>
            </>
         );
      }
   };

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
