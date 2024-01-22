import React from "react";
import "./Home.css";

function Home() {
  function navigateToMap() {
    window.location.href = "/map";
  }
  return (
    <div className="columns">
      <div>Mission Statement</div>
      <div>Tasks</div>
      <div className="map-img" onClick={() => navigateToMap()}></div>
    </div>
  );
}

export default Home;
