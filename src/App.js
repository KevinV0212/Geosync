import './App.css';
import Navbar from './components/navbar';
import Contact from './fragments/Contact';
import Documents from './fragments/Documents';
import FAQ from './fragments/FAQ';
import Map from './fragments/Map';
import Wiki from './fragments/Wiki';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Map/>}></Route>
            <Route exact path="/contact" element={<Contact/>}></Route>
            <Route exact path="/documents" element={<Documents/>}></Route>
            <Route exact path="/faq" element={<FAQ/>}></Route>
            <Route exact path="/wiki" element={<Wiki/>}></Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
