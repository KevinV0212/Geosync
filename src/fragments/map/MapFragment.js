import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSessionStorage } from "usehooks-ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

import { Stack } from "@mui/material";
import Section from "../../components/section/Section.js";

export default function MapFragment() {
   const politicalSymbol =
      "https://static.thenounproject.com/png/955295-200.png";
   const militarySymbol =
      "https://static.thenounproject.com/png/2005533-200.png";
   const economySymbol =
      "https://static.thenounproject.com/png/3734368-200.png";
   const socialSymbol = "https://static.thenounproject.com/png/3583844-200.png";
   const informationSymbol =
      "https://static.thenounproject.com/png/38005-200.png";
   const infrastructureSymbol =
      "https://static.thenounproject.com/png/2496421-200.png";

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
      "Political",
      "Military",
      "Economic",
      "Social",
      "Information",
      "Infrastructure",
   ];
   const [checkboxes, setCheckboxes] = useState({
      Political: true,
      Military: true,
      Economic: true,
      Social: true,
      Information: true,
      Infrastructure: true,
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
      const countryID = currentCountry.countryID;
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
         id: country.countryID || null,
         countryName: country.countryName,
         latitude: +country.latitude,
         longitude: +country.longitude,
      };
      console.log(requestBody);

      if (requestBody.id) {
         await updateCountry(requestBody);
         const newCountry = await addCountry(requestBody);
         if (newCountry) {
            setCurrentCountry({
               countryID: requestBody.id,
               countryName: newCountry.countryName,
               latitude: +newCountry.latitude,
               longitude: +newCountry.longitude,
            });
         }
      } else {
         const newCountry = await addCountry(requestBody);
         if (newCountry && currentCountry == null) {
            setCurrentCountry({
               countryID: requestBody.id,
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

   // Function that sends request to delete country passed in as a parameter
   // After deleting, it closes country form and refreshes country lists
   const deleteCountry = async (country) => {
      if (!window.confirm("Are you sure you want to delete this country?")) {
         return;
      }
      await delCountry(country.countryID);
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
         id: pin.id || null,
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
         console.log(requestBody);
      } else {
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
         countryID: countryInfo.id,
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
            <Section padding={2} sx={{ flexBasis: 0, flexGrow: 1 }}>
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
         alignItems="stretch"
         sx={{ height: "100%" }}
      >
         <Stack direction="column" spacing={2} useFlexGap>
            {renderManagerControls()}

            <Section
               title="Filters"
               padding={2}
               sx={{ flexBasis: 0, flexGrow: 2 }}
            >
               <Stack direction="column" spacing={0}>
                  {pmessiCats.map((cat, index) => (
                     <Controls.Checkbox
                        key={index}
                        text={cat}
                        checked={checkboxes[cat]}
                        onChange={() => handleCheckboxChange(cat)}
                     />
                  ))}
               </Stack>
            </Section>

            <Section
               title="Map Key"
               padding={2}
               sx={{ flexBasis: 0, flexGrow: 2 }}
            >
               <Stack direction="column" spacing={1}>
                  <Stack direction="row" spacing={0} alignItems="center">
                     <Box
                        component="img"
                        src={politicalSymbol}
                        sx={{
                           width: "40px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                        }}
                        alt="Political logo"
                     />
                     <Typography>Political</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0} alignItems="center">
                     <Box
                        component="img"
                        src={militarySymbol}
                        sx={{
                           width: "40px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                        }}
                        alt="Military logo"
                     />
                     <Typography>Military</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0} alignItems="center">
                     <Box
                        component="img"
                        src={economySymbol}
                        sx={{
                           width: "40px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                        }}
                        alt="Economy logo"
                     />
                     <Typography>Economic</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0} alignItems="center">
                     <Box
                        component="img"
                        src={socialSymbol}
                        sx={{
                           width: "40px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                        }}
                        alt="Social logo"
                     />
                     <Typography>Social</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0} alignItems="center">
                     <Box
                        component="img"
                        src={informationSymbol}
                        sx={{
                           width: "40px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                        }}
                        alt="Information logo"
                     />
                     <Typography>Information</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0} alignItems="center">
                     <Box
                        component="img"
                        src={infrastructureSymbol}
                        sx={{
                           width: "40px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                        }}
                        alt="Infrastructure logo"
                     />
                     <Typography>Infrastructure</Typography>
                  </Stack>
               </Stack>
            </Section>
            <Controls.Button
               variant="outlined"
               text={`${managerView ? "User view" : "Manager view"}`}
               onClick={handleViewChange}
            ></Controls.Button>
         </Stack>

         <Section padding={2} sx={{ minWidth: "500px", flexGrow: 1 }}>
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
