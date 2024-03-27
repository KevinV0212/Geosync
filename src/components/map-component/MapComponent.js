import React from "react";
import Graphic from "@arcgis/core/Graphic";
import { loadModules } from "esri-loader";
import { useEffect, useRef } from "react";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

const pinIcons = {
   political: "https://static.thenounproject.com/png/955295-200.png",
   military: "https://static.thenounproject.com/png/2005533-200.png",
   economic: "https://static.thenounproject.com/png/3734368-200.png",
   social: "https://static.thenounproject.com/png/3583844-200.png",
   information: "https://static.thenounproject.com/png/38005-200.png",
   infrastructure: "https://static.thenounproject.com/png/2496421-200.png",
};
export default function MapComponent(props) {
   const { mapPins, latitude, longitude, deletePin, openPinInForm } = props;
   const mapDiv = useRef(null);

   // function that creates a pointGraphic from a latitude, longitude, and color
   const createPointGraphic = (latitude, longitude, elem, template, filter) => {
      const point = {
         type: "point",
         latitude: latitude,
         longitude: longitude,
      };
      // Set symbol URL based on the filter
      const symbolUrl = pinIcons[filter];

      const pointGraphic = new Graphic({
         geometry: point,
         attributes: elem,
         popupTemplate: template,
         symbol: {
            type: "picture-marker",
            url: symbolUrl,
            width: "30px",
            height: "30px",
         },
      });

      return pointGraphic;
   };

   useEffect(() => {
      if (mapDiv.current) {
         /**
          * Initialize application
          */
         let view;
         loadModules(
            [
               "esri/views/MapView",
               "esri/WebMap",
               "esri/Graphic",
               "esri/layers/GraphicsLayer",
               "esri/layers/FeatureLayer",
            ],
            { css: true }
         ).then(
            ([
               MapView,
               WebMap,
               Graphic,
               GraphicsLayer,
               FeatureLayer,
               Legend,
            ]) => {
               const webmap = new WebMap({
                  basemap: "gray-vector",
               });

               const view = new MapView({
                  map: webmap, // An instance of a Map object to display in the view.
                  center: [longitude, latitude],
                  zoom: 3, // Represents the map scale at the center of the view.
                  container: mapDiv.current, // The id or node representing the DOM element containing the view.
               });

               // Edit button
               const editMapPin = {
                  title: "EDIT",
                  id: "edit",
                  className: "esri-icon-edit",
               };

               // Delete button
               const delMapPin = {
                  title: "DELETE",
                  id: "del",
                  className: "esri-icon-trash",
               };

               const pinsPopup = {
                  title: "{title}",
                  content: "<b>Description:</b> {description}",
                  actions: [editMapPin, delMapPin],
               };

               const graphicsArray = [];
               console.log(mapPins);
               if (mapPins) {
                  let len = mapPins.length;
                  for (let i = 0; i < len; i++) {
                     let long = mapPins[i]["longitude"];
                     let lat = mapPins[i]["latitude"];
                     let flag = "";
                     if (mapPins[i]["political"]) {
                        flag = "political";
                     } else if (mapPins[i]["military"]) {
                        flag = "military";
                     } else if (mapPins[i]["economic"]) {
                        flag = "economic";
                     } else if (mapPins[i]["social"]) {
                        flag = "social";
                     } else if (mapPins[i]["information"]) {
                        flag = "information";
                     } else if (mapPins[i]["infrastructure"]) {
                        flag = "infrastructure";
                     }
                     const pointGraphic = createPointGraphic(
                        lat,
                        long,
                        mapPins[i],
                        pinsPopup,
                        flag
                     );
                     graphicsArray.push(pointGraphic);
                  }
               }
               const graphicsLayer = new GraphicsLayer({
                  graphics: graphicsArray,
               });
               if (mapPins) {
                  graphicsLayer.when(function () {
                     view
                        .goTo(graphicsLayer.graphics.toArray())
                        .then(function () {
                           view.zoom = view.zoom - 1;
                        });
                  });
                  webmap.add(graphicsLayer);
               }

               // define edit and delete functions above
               reactiveUtils.on(
                  () => view.popup,
                  "trigger-action",
                  (event) => {
                     const pin = view.popup.selectedFeature.attributes;
                     let pmesiiCat;
                     for (const property in pin) {
                        if (pin[property] === true) pmesiiCat = property;
                     }
                     if (pin)
                        if (event.action.id === "edit") {
                           //call edit function here
                           openPinInForm({ ...pin, pmesiiCat: pmesiiCat });
                        } else if (event.action.id === "del") {
                           //delete function here
                           deletePin(pin);
                        }
                  }
               );
            }
         );

         return () => view && view.destroy();
      }
   }, [mapPins]);
   return (
      <div
         className="mapDiv"
         ref={mapDiv}
         style={{
            flexGrow: 1,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "4px",
         }}
      ></div>
   );
}
