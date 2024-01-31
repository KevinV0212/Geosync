import React from "react";
import "./Home.css";

function Home() {
   function navigateToMap() {
      window.location.href = "/map";
   }
   function navigateToDocs() {
      window.location.href = "/documents";
   }

   return (
      <div className="columns">
         <div className="msDocs-img" onClick={() => navigateToDocs()}></div>
         <div className="taskDocs-img" onClick={() => navigateToDocs()}></div>
         <div className="map-img" onClick={() => navigateToMap()}></div>
      </div>
   );
}

export default Home;
