import React, { useState } from "react";
import {
   IconButton,
   Typography,
   Box,
   SwipeableDrawer,
   List,
   ListItem,
   Divider,
   MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../../themes/ThemeContextProvider";
import aiLogo from "../../assets/AIDIV-White.svg";
import styles from "./SmallScreenMenu.module.css";

const SmallScreenMenu = ({ menuItems }) => {
   const [menuOpen, setMenuOpen] = useState(false);
   const { mode, toggleColorMode } = useThemeContext();
   const toggleDrawer = (open) => (e) => {
      if (e && e.type === "keydown" && (e.key === "Tab" || e.key === "Shift"))
         return;
      setMenuOpen(open);
   };

   return (
      <Box>
         <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: "#FFFFFF" }} />
         </IconButton>
         <SwipeableDrawer
            anchor="left"
            open={menuOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
         >
            <Box
               sx={{ width: 250 }}
               role="presentation"
               onClick={toggleDrawer(false)}
               onKeyDown={toggleDrawer(false)}
            >
               <List>
                  {menuItems.map((item) => (
                     <ListItem key={item} onClick={() => {}}>
                        <Typography variant="h6">{item}</Typography>
                     </ListItem>
                  ))}
                  <Divider />
                  <MenuItem>
                     <IconButton onClick={toggleDrawer(true)}>
                        <SettingsIcon
                           sx={{
                              color: mode === "dark" ? "#FFFFFF" : "#3F3F3F",
                              fontSize: 50,
                              marginRight: "1rem",
                           }}
                        />
                        <Typography variant="h6">Settings</Typography>
                     </IconButton>
                  </MenuItem>
                  <MenuItem>
                     <IconButton onClick={toggleDrawer(true)}>
                        <LogoutIcon
                           sx={{
                              color: mode === "dark" ? "#FFFFFF" : "#3F3F3F",
                              fontSize: 50,
                              marginRight: "1rem",
                           }}
                        />
                        <Typography variant="h6">Log Out</Typography>
                     </IconButton>
                  </MenuItem>

                  <MenuItem>
                     <IconButton onClick={toggleColorMode}>
                        {mode === "dark" ? (
                           <LightModeIcon
                              sx={{
                                 color: "#FFFFFF",
                                 fontSize: 50,
                                 marginRight: "1rem",
                              }}
                           />
                        ) : (
                           <DarkModeIcon
                              sx={{
                                 color: "#3F3F3F",
                                 fontSize: 50,
                                 marginRight: "1rem",
                              }}
                           />
                        )}
                        <Typography variant="h6">
                           {mode === "dark" ? "Light Mode" : "Dark Mode"}
                        </Typography>
                     </IconButton>
                  </MenuItem>
               </List>
            </Box>
            <Box
               component="img"
               src={aiLogo}
               sx={{
                  marginTop: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "50px",
               }}
               width={200}
               height={200}
               alt="ai-logo"
            />
         </SwipeableDrawer>
      </Box>
   );
};

export default SmallScreenMenu;
