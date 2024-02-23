import "./App.css";
import Navbar from "../components/navbar";
import Home from "../components/fragments/Home/Home";
import Contact from "../components/fragments/Contact/Contact";
import Documents from "../components/fragments/Documents/Documents";
import FAQ from "../components/fragments/FAQ";
import Map from "../components/fragments/Map/MapFragment";
import Wiki from "../components/fragments/Wiki";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {
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
      <div className="App">
         <Router>
            <Navbar />
            <Routes>
               <Route exact path="/" element={<Home />}></Route>
               <Route exact path="/map" element={<Map />}></Route>
               <Route exact path="/contact" element={<Contact />}></Route>
               <Route exact path="/documents" element={<Documents />}></Route>
               <Route exact path="/faq" element={<FAQ />}></Route>
               <Route exact path="/wiki" element={<Wiki />}></Route>
            </Routes>
         </Router>
      </div>
   );
}

export default App;
