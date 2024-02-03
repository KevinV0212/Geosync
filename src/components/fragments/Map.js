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
function Map() {
   // Country selector
   const [currentCountry, setCurrentCountry] = useLocalStorage(
      "current_country",
      null
   );
   const [countries, setCountries] = useState([]);
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

   // Map
   const mapElem = useRef(null);

   // function that loads a list of countries in the format below
   function loadCountries() {
      getAllCountries().then((countries) =>
         setCountries(
            countries.map((country) => ({
               value: country.id,
               label: country.countryName,
            }))
         )
      );
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

   useEffect(() => {
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

         const point = {
            type: "point",
            longitude: -118.80657463861,
            latitude: 34.0005930608889,
         };
         const simpleMarkerSymbol = {
            type: "simple-marker",
            size: 4,
            color: [255, 0, 0],
            outline: null,
         };
         const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
         });
         graphicsLayer.add(pointGraphic);
      });
      loadCountries();
      loadMapPins();
      return () => {
         if (!!view) {
            view.destroy();
            view = null;
         }
      };
   }, [currentCountry]);

   // Callback function to handle selecting country
   const handleCountrySelect = (country) => {
      setCurrentCountry({
         countryID: country.value,
         countryName: country.label,
      });
   };

   const handleCheckboxChange = (checkboxName) => {
      setCheckboxes((prevCheckboxes) => ({
         ...prevCheckboxes,
         [checkboxName]: !prevCheckboxes[checkboxName],
      }));
   };
   return (
      <div className="home">
         <div className="filters-container">
            <IconButton
               aria-label="add"
               sx={{ marginTop: 1, position: "absolute", top: 0, left: 0 }}
            >
               <AddIcon />
            </IconButton>
            <Button variant="outlined" size="small" sx={{ marginTop: 1.5 }}>
               Edit
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
               options={countries}
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
         <AddPin />
         <AddCountry />
      </div>
   );
}

export default Map;
