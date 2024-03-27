import React from "react";

import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";

import { Container, ThemeProvider } from "@mui/material";
import { navTheme } from "../../themes/theme";

import { useSessionStorage } from "usehooks-ts";
import aiLogo from "../../assets/AIDIV-White.svg";
import styles from "./Navbar.module.css";

const pages = [
   { title: "Home", link: "/" },
   { title: "Map", link: "/map" },
   { title: "Wiki", link: "/wiki" },
   { title: "Documents", link: "/documents" },
   { title: "Contact Us", link: "/contact" },
   { title: "FAQs", link: "/faq" },
];

export default function Navbar() {
   const navigate = useNavigate();

   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [currentPage, setCurrentPage] = useSessionStorage("currentPage", 0);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   return (
      <ThemeProvider theme={navTheme}>
         <AppBar position="sticky" sx={{ paddingX: "2rem" }}>
            <Container maxWidth="xl">
               <Toolbar disableGutters>
                  <Box
                     component="img"
                     src={aiLogo}
                     sx={{
                        width: "65px",
                        display: { xs: "none", lg: "flex" },
                        mr: 1,
                     }}
                     alt="ARSOF logo"
                  />
                  <Typography
                     variant="h5"
                     noWrap
                     component="h1"
                     sx={{
                        mr: 2,
                        display: { xs: "none", lg: "flex" },
                        fontWeight: 700,
                     }}
                  >
                     GeoSync
                  </Typography>

                  <Box
                     sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}
                  >
                     <IconButton
                        size="large"
                        onClick={handleOpenNavMenu}
                        color="white"
                     >
                        <MenuIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                           display: { xs: "block", lg: "none" },
                        }}
                     >
                        {pages.map((page, i) => (
                           <MenuItem
                              key={i}
                              className={
                                 currentPage === i
                                    ? styles.selected
                                    : styles.menuItem
                              }
                              onClick={() => {
                                 handleCloseNavMenu();
                                 navigate(page.link);
                              }}
                           >
                              <Typography textAlign="center">
                                 {page.title}
                              </Typography>
                           </MenuItem>
                        ))}
                     </Menu>
                  </Box>
                  <Box
                     component="img"
                     src={aiLogo}
                     sx={{
                        width: "65px",
                        mr: 1,
                        display: { xs: "flex", lg: "none" },
                     }}
                     alt="ARSOF logo"
                  />
                  <Typography
                     variant="h4"
                     noWrap
                     component="h1"
                     sx={{
                        mr: 2,
                        fontWeight: 700,

                        flexGrow: 1,
                        display: { xs: "flex", lg: "none" },
                     }}
                  >
                     GeoSync
                  </Typography>
                  <Box
                     sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}
                  >
                     {pages.map((page, i) => (
                        <MenuItem
                           key={i}
                           className={
                              currentPage === i
                                 ? styles.selected
                                 : styles.menuItem
                           }
                           onClick={() => {
                              navigate(page.link);
                              setCurrentPage(i);
                           }}
                        >
                           {page.title}
                        </MenuItem>
                     ))}
                  </Box>

                  <Box sx={{ flexGrow: 0 }}></Box>
               </Toolbar>
            </Container>
         </AppBar>
      </ThemeProvider>
   );
}
