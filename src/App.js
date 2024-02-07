import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/fragments/Home";
import Contact from "./components/fragments/Contact";
import Documents from "./components/fragments/Documents";
import FAQ from "./components/fragments/FAQ";
import Map from "./components/fragments/MapFragment";
import Wiki from "./components/fragments/Wiki";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
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
