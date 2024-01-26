import React, { useState, useRef, useEffect } from "react";
import { loadModules } from "esri-loader";
import Select from "react-select";
import "./Map.css";
import buildPath from "../Path.js";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";
import AddPin from "../forms/AddPin.js";
function Map() {
   // Country selector
   const [currentCountry, setCurrentCountry] = useLocalStorage(
      "current_country",
      ""
   );
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      let view;
      loadModules(["esri/views/MapView", "esri/WebMap"], { css: true }).then(
         ([MapView, WebMap]) => {
            const webmap = new WebMap({
               basemap: "topo-vector",
            });
            view = new MapView({
               map: webmap,
               center: [0, 0],
               zoom: 2,
               container: mapElem.current,
            });
         }
      );
      loadCountries();
      return () => {
         if (!!view) {
            view.destroy();
            view = null;
         }
      };
   }, []);

   // Callback function to handle selecting country
   const handleCountrySelect = (country) => {
      setCurrentCountry(country);
   };

   // Loads list of countries
   const loadCountries = async () => {
      let url = buildPath("/all_countries");
      axios
         .get(url, {
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept",
            },
         })
         .then(function (res) {
            if (res.error) {
               console.log(res.error);
            } else {
               // convert list of country objects to an of country names (strings)
               let countries = res.data;
               let countryNames = countries.map((country) => ({
                  value: country.id,
                  label: country.countryName,
               }));

               setCountries(countryNames);
            }
         })
         .catch(function (error) {
            console.log(error);
         });
   };

   // Map
   const mapElem = useRef(null);

   // PMESII-PT filters
   const [checkboxes, setCheckboxes] = useState({
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
      checkbox4: true,
      checkbox5: true,
      checkbox6: true,
   });

   const handleCheckboxChange = (checkboxName) => {
      setCheckboxes((prevCheckboxes) => ({
         ...prevCheckboxes,
         [checkboxName]: !prevCheckboxes[checkboxName],
      }));
   };

   return (
      <div className="home">
         <div className="filters-container">
            <h3>PMESII Filters</h3>
            <form className="filters-form">
               <div className="filter">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox1}
                        onChange={() => handleCheckboxChange("checkbox1")}
                     />
                     Political
                  </label>
               </div>
               <div className="filter">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox2}
                        onChange={() => handleCheckboxChange("checkbox2")}
                     />
                     Military
                  </label>
               </div>
               <div className="filter">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox3}
                        onChange={() => handleCheckboxChange("checkbox3")}
                     />
                     Economic
                  </label>
               </div>
               <div className="filter">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox4}
                        onChange={() => handleCheckboxChange("checkbox4")}
                     />
                     Social
                  </label>
               </div>
               <div className="filter">
                  <label>
                     <input
                        type="checkbox"
                        checked={checkboxes.checkbox5}
                        onChange={() => handleCheckboxChange("checkbox5")}
                     />
                     Information
                  </label>
               </div>
               <div className="filter">
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
               value={currentCountry}
               onChange={handleCountrySelect}
            />
            <div className="map" ref={mapElem}></div>
         </div>
         <AddPin />
      </div>
   );
}

export default Map;
