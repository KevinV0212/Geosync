import { Link } from "react-router-dom";
import "./navbar.css";

import { useThemeContext } from "../themes/ThemeContextProvider";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Navbar() {
   const { mode, toggleColorMode } = useThemeContext();

   return (
      <>
         <nav className="navbar">
            <div className="navbar-container">
               <Link to="/" className="navbar-logo">
                  GeoSync
               </Link>
               <ul className="nav-menu">
                  <li className="nav-item">
                     <Link to="/" className="nav-links">
                        Home
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/map" className="nav-links">
                        Map
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/wiki" className="nav-links">
                        Wiki
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/documents" className="nav-links">
                        Documents
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/contact" className="nav-links">
                        Contact Us
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to="/faq" className="nav-links">
                        FAQs
                     </Link>
                  </li>
                  <Tooltip title={mode === "dark" ? "Light Mode" : "Dark Mode"}>
                     <IconButton onClick={toggleColorMode}>
                        {mode === "dark" ? (
                           <LightModeIcon sx={{ color: "#FFFFFF" }} />
                        ) : (
                           <DarkModeIcon sx={{ color: "#FFFFFF" }} />
                        )}
                     </IconButton>
                  </Tooltip>
               </ul>
            </div>
         </nav>
      </>
   );
}

export default Navbar;
