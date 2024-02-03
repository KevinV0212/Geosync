import BasicModal from "./BasicModal";
import "./Nav.css";
import { FaPlus } from "react-icons/fa";
import AddEntry from "../forms/AddEntry.js";
function Nav() {
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
         <BasicModal buttonText={"Add Entry"}>
            <AddEntry />
         </BasicModal>
      </nav>
   );
}

export default Nav;
