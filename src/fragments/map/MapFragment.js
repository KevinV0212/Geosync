import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "usehooks-ts";

import "./MapFragment.css";
import {
   addCountry,
   deleteCountry as delCountry,
   getAllCountries,
   updateCountry,
} from "../../utils/country/countryUtil.js";
import {
   addMapPin,
   deleteMapPin as delMapPin,
   getMapPins,
   updateMapPin,
} from "../../utils/map/mapUtil.js";

import MapPinForm from "../../components/forms/MapPinForm.js";
import CountryForm from "../../components/forms/CountryForm.js";
import MapComponent from "../../components/map-component/MapComponent.js";
import Controls from "../../components/reusable/Controls.js";
import { forward, inverse, toPoint } from '../mgrs';

import { Box, Stack, Tooltip } from "@mui/material";
import Section from "../../components/section/Section.js";

const tooltipIcons = {
   political: "https://static.thenounproject.com/png/955295-200.png",
   military: "https://static.thenounproject.com/png/2005533-200.png",
   economic: "https://static.thenounproject.com/png/3734368-200.png",
   social: "https://static.thenounproject.com/png/3583844-200.png",
   information: "https://static.thenounproject.com/png/38005-200.png",
   infrastructure: "https://static.thenounproject.com/png/2496421-200.png",
};

export default function MapFragment() {
   // Handling manager view
   const [managerView, setManagerView] = useState(true);
   const handleViewChange = () => setManagerView(!managerView);

   // Data for country
   const [currentCountry, setCurrentCountry] = useSessionStorage(
      "currentCountry",
      null
   );
   const [countries, setCountries] = useState([]);
   let listOptions = countries.map((country) => ({
      value: country.id,
      label: country.countryName,
   }));

   // Data for mapPins
   const [mapPins, setMapPins] = useState("mapPins", null);

   // Handling PMESII filters
   const pmessiCats = [
      "political",
      "military",
      "economic",
      "social",
      "information",
      "infrastructure",
   ];
   const [checkboxes, setCheckboxes] = useState({
      political: true,
      military: true,
      economic: true,
      social: true,
      information: true,
      infrastructure: true,
   });

   // Handling country form popup
   const [openCountryForm, setOpenCountryForm] = useState(false);
   const [countryFormTitle, setCountryFormTitle] = useState("Add Country");
   const [recordForCountry, setRecordForCountry] = useState(null);

   // Handling mapPin form popup
   const [currentPin, setCurrentPin] = useState(null);
   const [openPinForm, setOpenPinForm] = useState(false);
   const [pinFormTitle, setPinFormTitle] = useState("Add Pin");
   const [recordForPin, setRecordForPin] = useState(null);

   // Function that fetches list of all countries
   const loadCountries = async () => {
      const countries = await getAllCountries();
      if (countries == null) {
         return;
      }
      countries.sort((countryA, countryB) => {
         if (countryA.countryName < countryB.countryName) return -1;
         if (countryA.countryName > countryB.countryName) return 1;
         return 0;
      });
      setCountries([...countries]);
   };

   // Function that fetches list of all mapPins associated with currentCountry
   const loadMapPins = async () => {
      if (!currentCountry) {
         return;
      }
      const countryID = currentCountry.id;
      const filters = [];
      for (const checkbox in checkboxes) {
         filters.push(checkboxes[checkbox]);
      }

      const pinList = await getMapPins(countryID, filters);
      if (pinList === null) {
         return;
      }
      setMapPins([...pinList]);
   };

   // Function that opens country form with data of current country
   const openCountryInForm = () => {
      setRecordForCountry({
         ...currentCountry,
      });
      setCountryFormTitle("Edit Country");
      setOpenCountryForm(true);
   };

   // Function that sends request to add/edit country with data from country
   // After the request, it resets the form and refreshes the country lists
   const addOrEditCountry = async (country, resetForm) => {
      const requestBody = {
         countryName: country.countryName,
         latitude: +country.latitude,
         longitude: +country.longitude,
      };
      if (country.id) requestBody.id = country.id;

      if (requestBody.id) {
         await updateCountry(requestBody);
         const newCountry = await addCountry(requestBody);
         if (newCountry) {
            setCurrentCountry({
               id: requestBody.id,
               countryName: newCountry.countryName,
               latitude: +newCountry.latitude,
               longitude: +newCountry.longitude,
            });
         }
      } else {
         const newCountry = await addCountry(requestBody);
         if (newCountry && currentCountry == null) {
            setCurrentCountry({ ...newCountry });
         }
      }
      resetForm();
      loadCountries();
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };

   // Function that sends request to delete country passed in as a parameter
   // After deleting, it closes country form and refreshes country lists
   const deleteCountry = async (country) => {
      if (
         !country ||
         !window.confirm("Are you sure you want to delete this country?")
      ) {
         return;
      }
      await delCountry(country.id);
      loadCountries();
      loadMapPins();
      setCurrentCountry(null);
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };

   // Function that opens pin add/edit form with data of currently selected pin
   const openPinInForm = (item) => {
      setRecordForPin({
         ...item,
      });
      setPinFormTitle("Edit Map Pin");
      setOpenPinForm(true);
   };

   // Function that sends request to add/edit mapPin with data from pin
   // After the request, it resets the form, then refreshes pins and map
   const addOrEditPin = async (pin, resetForm) => {
      let requestBody = {
         countryID: currentCountry.id,
         title: pin.title,
         description: pin.description,
         longitude: +pin.longitude,
         latitude: +pin.latitude,
         //MGRS: 
         political: false,
         military: false,
         economic: false,
         social: false,
         information: false,
         infrastructure: false,
      };
      if (pin.id) requestBody.id = pin.id;
      requestBody[pin.pmesiiCat] = true;

      if (pin.id) {
         await updateMapPin(requestBody);
         console.log(requestBody);
      } else {
         console.log(requestBody);
         await addMapPin(requestBody);
      }
      resetForm();
      loadMapPins();
      setCurrentPin(null);
      setRecordForPin(null);
      setOpenPinForm(false);
   };

   // Function that sends request to delete document passed in as a parameter
   // After deleting, it closes that document's info box and refreshes document lists
   const deletePin = async (pin) => {
      if (!window.confirm("Are you sure you want to delete this map pin?")) {
         return;
      }
      await delMapPin(pin.id);
      setCurrentPin(null);
      loadMapPins();
      setRecordForPin(null);
      setOpenPinForm(false);
   };

   // Function to handle country selector
   const handleCountrySelect = (country) => {
      const countryInfo = countries.find(
         (targetCountry) => targetCountry.id === country.value
      );

      const temp = {
         id: countryInfo.id,
         countryName: countryInfo.countryName,
         latitude: countryInfo.latitude,
         longitude: countryInfo.longitude,
      };

      setCurrentCountry(temp);
   };

   // Function to handle PMESII checkbox filters
   const handleCheckboxChange = (checkboxName) => {
      setCheckboxes((prevCheckboxes) => ({
         ...prevCheckboxes,
         [checkboxName]: !prevCheckboxes[checkboxName],
      }));
   };

   // Function that renders manager specific controls
   const renderManagerControls = () => {
      if (managerView) {
         return (
            <Section padding={2}>
               <Stack className="manager-controls" spacing={1}>
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
                        deleteCountry={deleteCountry}
                     />
                  </Controls.Popup>

                  <Controls.Button
                     text="Add Map Pin"
                     onClick={() => {
                        setRecordForPin(null);
                        setPinFormTitle("Add Map Pin");
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
                        deletePin={deletePin}
                     />
                  </Controls.Popup>
               </Stack>
            </Section>
         );
      }
   };

   useEffect(() => {
      loadCountries();
      loadMapPins();
   }, [currentCountry, checkboxes]);

   return (
      <Stack
         id="pageContainer"
         direction="row"
         spacing={2}
         sx={{ height: "100%" }}
      >
         <Stack direction="column" spacing={2} useFlexGap>
            {renderManagerControls()}

            <Section
               title="Filters"
               padding={2}
               sx={{ flexBasis: 0, flexGrow: 2 }}
            >
               <Stack direction="column" spacing={0} alignItems="flex-start">
                  {pmessiCats.map((cat, index) => (
                     <Tooltip
                        title={
                           <Box
                              component="img"
                              src={tooltipIcons[cat]}
                              sx={{
                                 width: "30px",
                              }}
                              alt={`${cat} icon`}
                           />
                        }
                        placement="right-start"
                        key={index}
                     >
                        <div>
                           <Controls.Checkbox
                              text={cat}
                              checked={checkboxes[cat]}
                              onChange={() => handleCheckboxChange(cat)}
                           />
                        </div>
                     </Tooltip>
                  ))}
               </Stack>
            </Section>

            <Controls.Button
               variant="outlined"
               text={`${managerView ? "User view" : "Manager view"}`}
               onClick={handleViewChange}
            />
         </Stack>

         <Section
            padding={2}
            sx={{
               minWidth: "500px",
               flexGrow: 1,
               height: "100",
               overflowY: "auto",
            }}
         >
            <Select
               className="country-selector"
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
            <MapComponent
               mapPins={mapPins}
               latitude={currentCountry ? currentCountry.latitude : 0}
               longitude={currentCountry ? currentCountry.longitude : 0}
               deletePin={deletePin}
               openPinInForm={openPinInForm}
            />
         </Section>
      </Stack>
   );
}
