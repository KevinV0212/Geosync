import styles from "./App.module.css";
import Navbar from "../components/navbar";
import Home from "../components/fragments/Contact/Home";
import Contact from "../components/fragments/Contact/Contact";
import Documents from "../components/fragments/Documents/Documents";
import FAQ from "../components/fragments/FAQ";
import Map from "../components/fragments/MapFragment";
import Wiki from "../components/fragments/Wiki";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material";

function App() {
   const theme = useTheme();
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
                  height: "90vh",
                  padding: 3,
                  bgcolor: "plum",

                  display: "flex",
                  flexDirection: "column",
               }}
            >
               <Box
                  id="fragmentContent"
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
               >
                  <Routes>
                     <Route exact path="/" element={<Home />}></Route>
                     <Route exact path="/map" element={<Map />}></Route>
                     <Route exact path="/contact" element={<Contact />}></Route>
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
   );
}

export default App;
