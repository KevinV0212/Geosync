import React from "react";
import Graphic from "@arcgis/core/Graphic";
import Search from "@arcgis/core/widgets/Search";
import { loadModules } from "esri-loader";
import { useEffect, useRef } from "react";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";

export default function MapComponent({ mapPins }) {
   const mapDiv = useRef(null);

   // function that creates a pointGraphic from a latitude, longitude, and color
   const createPointGraphic = (latitude, longitude, color, elem, template) => {
      const point = {
         type: "point",
         latitude: latitude,
         longitude: longitude,
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
         attributes: elem,
         popupTemplate: template,
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
               center: [0, 0],
               zoom: 1, // Represents the map scale at the center of the view.
               container: mapDiv.current, // The id or node representing the DOM element containing the view.
            });

            // Edit button
            const editMapPin = {
               title: "EDIT",
               id: "edit",
               className: "esri-icon-edit"
             };
            
            // Delete button
            const delMapPin = {
               title: "DELETE",
               id: "del",
               className: "esri-icon-trash"
            };

            const pinsPopup = {
               title: "{title}",
               content: '<b>Description:</b> {description}',
               actions: [editMapPin, delMapPin]
             };

            // const graphicsLayer = new GraphicsLayer();
            // graphicsLayer
            //    .when(() => {
            //       return graphicsLayer.queryExtent();
            //    })
            //    .then((response) => {
            //       view.goTo(response.extent);
            //    });
            // const searchWidget = new Search({
            //    view: view,
            // });
            // Adds the search widget below other elements in
            // the top left corner of the view
            // view.ui.add(searchWidget, {
            //    position: "top-left",
            //    index: 2,
            // });
            // webmap.add(graphicsLayer);

            const graphicsArray = [];
            if (mapPins) {
               let len = mapPins.length;
               console.log(mapPins);
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
                  const pointGraphic = createPointGraphic(lat, long, color, mapPins[i], pinsPopup);
                  graphicsArray.push(pointGraphic);
               }
            }
            const graphicsLayer = new GraphicsLayer({
               graphics: graphicsArray
             });
            webmap.add(graphicsLayer);

            function measureThis() {
               // const geom = view.popup.selectedFeature.geometry;
               // const initDistance = geometryEngine.geodesicLength(geom, "miles");
               // const distance = parseFloat(Math.round(initDistance * 100) / 100).toFixed(2);
               // view.popup.content =
               //   view.popup.selectedFeature.attributes.name +
               //   "<div style='background-color:DarkGray;color:white'>" +
               //   distance +
               //   " miles.</div>";
             }
             
            // Event handler that fires each time an action is clicked.
            reactiveUtils.on(
               () => view.popup,
               "trigger-action",
               (event) => {
                  if (event.action.id === "edit") {
                     measureThis(); // replace with edit pin function
                  }
                  else if (event.action.id === "del") {
                     //delete function here
                  }
            });

         });
         return () => view && view.destroy();
      }
   }, [mapPins]);
   return (
      <div
         className="mapDiv"
         ref={mapDiv}
         style={{height: "83%", backgroundColor: "white", padding: "10px", borderRadius: "4px" }}
      ></div>
   );
}
