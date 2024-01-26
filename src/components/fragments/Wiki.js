import React from "react";
import Sidebar from "./WikiSection/Sidebar";
import Nav from "./Nav";
import AddEntry from "../forms/AddEntry";
function Wiki() {
   return (
      <div>
         <AddEntry />
         <Nav />
         <Sidebar />
      </div>
   );
}

export default Wiki;
