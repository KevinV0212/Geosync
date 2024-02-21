import React, { useState, useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import Select from "react-select";
import "./Map.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useLocalStorage } from "usehooks-ts";
import AddPin from "../forms/AddPin.js";
import { getAllCountries } from "../../utils/countryUtil.js";
import { getMapPins } from "../../utils/mapUtil.js";
import AddCountry from "../forms/AddCountry.js";
import BasicModal from "./BasicModal.js";
import EditCountry from "../forms/EditCountry.js";
import MapComponent from "../MapComponent.js";
function Map() {
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
               <BasicModal buttonText="Edit Country">
                  <EditCountry />
               </BasicModal>
               <BasicModal buttonText="Add Country">
                  <AddCountry />
               </BasicModal>
               <BasicModal buttonText="Add Pin">
                  <AddPin />
               </BasicModal>
            </>
         );
      }
   };

   // function that loads a list of countries in the format below
   function loadCountries() {
      getAllCountries().then((countries) => {
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

      let mapPins = [];
      getMapPins(countryID, filters).then((pinList) => {
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
            {renderManagerControls()}
            <Button variant="outlined" size="small" sx={{ marginTop: 0.5, color: '#690005', border: '1px solid #690005', width: '126.37px' }} onClick={handleViewChange}>
               {managerView ? "user view" : "manager view"}
            </Button>
            <h3>PMESII Filters {mapPins.length}</h3>
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
