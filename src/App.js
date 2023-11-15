import './App.css';
import Navbar from './components/navbar';
import Home from './pages/Home';
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
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/Contact" element={<Contact/>}></Route>
            <Route exact path="/Documents" element={<Documents/>}></Route>
            <Route exact path="/FAQ" element={<FAQ/>}></Route>
            <Route exact path="/Map" element={<Map/>}></Route>
            <Route exact path="/Wiki" element={<Wiki/>}></Route>

          </Routes>
      </Router>
    </div>
  );
}

export default App;
