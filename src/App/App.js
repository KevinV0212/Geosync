import styles from "./App.module.css";
import Navbar from "../components/navbar/Navbar";
import Home from "../components/fragments/home/Home";
import Contact from "../components/fragments/contact/Contact";
import Documents from "../components/fragments/document/Documents";
import FAQ from "../components/fragments/faq/FAQ";
import Map from "../components/fragments/map/MapFragment";
import Wiki from "../components/fragments/wiki/Wiki";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Box, Container } from "@mui/material";
import {
   ThemeContextProvider,
   useThemeContext,
} from "../themes/ThemeContextProvider";

function App() {
   const { theme } = useThemeContext();
   useEffect(() => {
      axios.interceptors.response.use(
         (response) => {
            return response;
         },
         (error) => {
            if (!error.response) {
               console.log("Please check your internet connection.");
            }

            return Promise.reject(error);
         }
      );
   }, []);
   return (
      <ThemeContextProvider theme={theme}>
         <Box
            id="appContainer"
            sx={{
               height: "inherit",
               display: "flex",
               flexDirection: "column",
            }}
         >
            <Router>
               <Navbar id="navbar" />
               <Container
                  id="fragmentContainer"
                  maxWidth="xl"
                  sx={{
                     boxSizing: "border-box",
                     maxHeight: "90vh",
                     paddingX: 3,
                     paddingY: 5,
                     bgcolor: "plum",

                     flexGrow: 1,
                     display: "flex",
                     flexDirection: "column",
                  }}
               >
                  <Box id="fragmentContent" sx={{ flexBasis: 0, flexGrow: 1 }}>
                     <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route exact path="/map" element={<Map />}></Route>
                        <Route
                           exact
                           path="/contact"
                           element={<Contact />}
                        ></Route>
                        <Route
                           exact
                           path="/documents"
                           element={<Documents />}
                        ></Route>
                        <Route exact path="/faq" element={<FAQ />}></Route>
                        <Route exact path="/wiki" element={<Wiki />}></Route>
                     </Routes>
                  </Box>
               </Container>
            </Router>
         </Box>
      </ThemeContextProvider>
   );
}

export default App;
