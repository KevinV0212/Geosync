import React from "react";
import Graphic from "@arcgis/core/Graphic";
import Search from "@arcgis/core/widgets/Search";
import { loadModules } from "esri-loader";
import { useEffect, useRef } from "react";
import { useSessionStorage } from "usehooks-ts";

export default function MapComponent({ mapPins, latitude, longitude }) {
   const mapDiv = useRef(null);

   // function that creates a pointGraphic from a latitude, longitude, and color
   const createPointGraphic = (latitude, longitude, elem, template, filter) => {
      const point = {
         type: "point",
         latitude: latitude,
         longitude: longitude,
      };
      // Set symbol URL based on the filter
      let symbolUrl;
      switch (filter) {
         case "political":
            symbolUrl = "https://static.thenounproject.com/png/955295-200.png";
            break;
         case "military":
            symbolUrl = "https://static.thenounproject.com/png/2005533-200.png";
            break;
         case "economy":
            symbolUrl = "https://static.thenounproject.com/png/3734368-200.png";
            break;
         case "social":
            symbolUrl = "https://static.thenounproject.com/png/3583844-200.png";
            break;
         case "information":
            symbolUrl = "https://static.thenounproject.com/png/38005-200.png";
            break;
         case "infrastructure":
            symbolUrl = "https://static.thenounproject.com/png/2496421-200.png";
            break;
         default:
            // Default symbol URL
            symbolUrl = "https://static.thenounproject.com/png/368360-200.png";
            break;
      }

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
         ).then(([MapView, WebMap, Graphic, GraphicsLayer, FeatureLayer]) => {
            const webmap = new WebMap({
               basemap: "gray-vector",
            });

            const view = new MapView({
               map: webmap, // An instance of a Map object to display in the view.
               center: [longitude, latitude],
               zoom: 2, // Represents the map scale at the center of the view.
               container: mapDiv.current, // The id or node representing the DOM element containing the view.
            });

            const pinsPopup = {
               title: "{title}",
               content:
                  '<b>Description:</b> {description}<br><Button variant="contained">Edit</Button>',
            };

            const graphicsArray = [];
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
                  } else if (mapPins[i]["economy"]) {
                     flag = "economy";
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
                  view.goTo(graphicsLayer.graphics.toArray()).then(function () {
                     view.zoom = view.zoom - 1;
                  });
               });
               webmap.add(graphicsLayer);
            }
         });

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
