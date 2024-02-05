import BasicModal from "./BasicModal";
import "./Nav.css";
import { FaPlus } from "react-icons/fa";
import AddEntry from "../forms/AddEntry.js";
import { Button } from "@mui/material";
import { useState } from "react";
function Nav() {
   const [managerView, setManagerView] = useState(true);

   const handleViewChange = () => setManagerView(!managerView);

   const renderManagerControls = () => {
      if (managerView) {
         return (
            <>
               <BasicModal buttonText={"Add Entry"}>
                  <AddEntry />
               </BasicModal>
            </>
         );
      }
   };
   return (
      <nav className="wiki-nav">
         <div className="nav-container">
            <input
               type="text"
               className="search-input"
               placeholder="Enter your search"
            />
         </div>

         <div className="profile-container">
            <a href="/#">
               <FaPlus className="nav-icons" />
            </a>
         </div>
         {renderManagerControls()}

         <Button onClick={handleViewChange}>
            Change to {managerView ? "user view" : "manager view"}
         </Button>
      </nav>
   );
}

export default Nav;
