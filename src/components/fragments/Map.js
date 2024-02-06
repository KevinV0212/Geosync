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
   let mapPins = [];

   const [managerView, setManagerView] = useState(true);

   const handleViewChange = () => setManagerView(!managerView);

   const renderManagerControls = () => {
      if (managerView) {
         return (
            <>
               <IconButton
                  aria-label="add"
                  sx={{ marginTop: 1, position: "absolute", top: 0, left: 0 }}
               >
                  <AddIcon />
               </IconButton>
               <Button variant="outlined" size="small" sx={{ marginTop: 1.5 }}>
                  Edit
               </Button>
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
   // Map
   const mapElem = useRef(null);

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

      getMapPins(countryID, filters).then((pinList) => {
         mapPins = pinList;
         console.log(mapPins);
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

      let view;
      loadModules(
         [
            "esri/views/MapView",
            "esri/WebMap",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
         ],
         { css: true }
      ).then(([MapView, WebMap, Graphic, GraphicsLayer]) => {
         const webmap = new WebMap({
            basemap: "topo-vector",
         });
         view = new MapView({
            map: webmap,
            center: [0, 0],
            zoom: 2,
            container: mapElem.current,
         });
         // Map pins
         const graphicsLayer = new GraphicsLayer();
         webmap.add(graphicsLayer);
         let len = mapPins.length;
         for (let i = 0; i < len; i++) {
            let long = mapPins[i]["longitude"];
            let lat = mapPins[i]["latitude"];
            let color = [0, 0, 0];
            if (mapPins[i]["political"]) {
               color[0] = 255;
            } else if (mapPins[i]["military"]) {
               color[2] = 255;
            } else if (mapPins[i]["economy"]) {
               color[1] = 255;
            } else if (mapPins[i]["social"]) {
               color = [255, 0, 255];
            } else if (mapPins[i]["information"]) {
               color[1] = 139;
               color[2] = 139;
            } else if (mapPins[i]["infrastructure"]) {
               color[0] = 255;
               color[1] = 203;
               color[2] = 5;
            }
            const point = {
               type: "point",
               longitude: long,
               latitude: lat,
            };
            const simpleMarkerSymbol = {
               type: "simple-marker",
               size: 5,
               color: color,
               outline: null,
            };
            const pointGraphic = new Graphic({
               geometry: point,
               symbol: simpleMarkerSymbol,
            });
            graphicsLayer.add(pointGraphic);
         }
      });
      return () => {
         if (!!view) {
            view.destroy();
            view = null;
         }
      };
   }, [currentCountry]);
   return (
      <div className="home">
         <div className="filters-container">
            {renderManagerControls()}
            <Button onClick={handleViewChange}>
               Change to {managerView ? "user view" : "manager view"}
            </Button>

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
            <div className="map" ref={mapElem}></div>
         </div>
      </div>
   );
}

export default Map;
